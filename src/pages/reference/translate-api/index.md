---
title: Translate Connector API Reference
description: HTTP API contract for Adobe Express Translate Connectors: endpoints, request and response schemas, behavioral requirements, error codes, and types.
audience:
  - developers
keywords:
  - adobe-express
  - connectors
  - translate
  - api
  - reference
nav-title: Translate API
content_type: reference
sidebar: adobe-express-connectors
api-version: "1"
schema-source: /static/translate-connector-api.yaml
last-updated: 2026-05-18
hideBreadcrumbNav: true
---

# Translate Connector API Reference

This page defines the complete HTTP API contract your service must implement to function as an Adobe Express Translate connector. Adobe Express calls your endpoints based on the configuration in your `manifest.json`, and all responses must match the schemas defined here.

To generate server stubs or run automated validation, download the OpenAPI 3.0 YAML and TypeScript type definitions (`translate-connector-sdk.d.ts`) from the [Getting Started](../../guides/getting-started.md) downloads table.

## Endpoint Overview

All endpoints are relative to the base URL you configure in `apiConfig.{operationName}.endpoint`. Every endpoint must use **HTTPS** in production.

| Method | Path | Required | Purpose |
|--------|------|----------|---------|
| `GET` | `/health` | Recommended | Verify service availability |
| `GET` | `/locales` | Recommended | Return supported translation locales |
| `GET` | `/tones` | Recommended | Return supported translation tones |
| `POST` | `/translate` | Yes | Translate an array of text items |
| `POST` | `/feedback` | Recommended | Receive user feedback on a translation |

Adobe Express calls `/health` and `/locales` when loading the Connector Playground, and `/translate` each time a user requests a translation. `/tones` is called when the connector's `uiConfig` references a tone picker. `/feedback` is called when a user submits feedback on a translation result.

<HorizontalLine />

## GET /health

Returns the current availability status of your service. Adobe Express calls this endpoint when the Playground connects to verify your service is reachable.

### Request

No request body or parameters.

### Response

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | `string` | No | Optional human-readable message about service status. |
| `errorCode` | `string` | No | One of the [general error codes](#error-codes). Present only on error. |
| `errorMessage` | `string` | No | Human-readable description of the error. Present only on error. |

**Success example:**

```json
{
  "message": "Service is available"
}
```

**Error example:**

```json
{
  "errorCode": "GenericError",
  "errorMessage": "Service is temporarily unavailable"
}
```

**Behavioral requirements:**

- Return HTTP `200` when your service is available. When degraded or unavailable, you may return an appropriate HTTP error status or return `200` with `errorCode` set in the body to describe the condition.
- The Connector Playground calls `/health` on initial connect to confirm your service is reachable before allowing the developer to proceed.

<HorizontalLine />

## GET /locales

Returns the list of translation locales your service supports. Adobe Express calls this endpoint to populate the language picker in the Translate panel.

### Request

No request body. Query parameters are passed by Adobe Express if you configure them in `apiConfig.locales.queryParams`. Use `$app_preferredLanguage` to receive the current user's display language preference and return locale labels in that language.

**Example query parameter configuration in `manifest.json`:**

```json
"apiConfig": [
  {
    "id": "locales",
    "endpoint": "https://your-service.example.com/locales",
    "method": "GET",
    "queryParams": {
      "preferredLanguage": "$app_preferredLanguage"
    }
  }
]
```

### Response

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `locales` | `Locale[]` | Yes | Array of supported locales. Must contain at least one entry. |
| `errorCode` | `string` | No | One of the [general error codes](#error-codes). Present only on error. |
| `errorMessage` | `string` | No | Human-readable description of the error. Present only on error. |

**Locale object:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `string` | Yes | IETF language tag (e.g., `"en-US"`, `"fr-FR"`, `"ja-JP"`). |
| `label` | `string` | Yes | Human-readable locale name (e.g., `"English (US)"`, `"French (France)"`). |
| `category` | `string` | No | Group label for organizing locales in the picker (e.g., `"Popular languages"`, `"Other languages"`). |

**Success example:**

```json
{
  "locales": [
    { "code": "en-US", "label": "English (US)", "category": "Popular languages" },
    { "code": "fr-FR", "label": "French (France)", "category": "Popular languages" },
    { "code": "de-DE", "label": "German (Germany)", "category": "Popular languages" },
    { "code": "ja-JP", "label": "Japanese", "category": "Other languages" }
  ]
}
```

**Behavioral requirements:**

- The `locales` array must not be empty. An empty array will leave the language picker blank.
- `code` values must use valid IETF language tags. Adobe Express passes these codes as `sourceLocale` and `targetLocale` in `/translate` requests.
- Only return locales your service can actually translate. Adobe Express does not validate locale codes against any allowlist.
- The `uiConfig` form input that displays the locale picker must use `"id": "targetLocale"`. This identifier is required by manifest validation - any other value will cause a validation error.

<HorizontalLine />

## GET /tones

Returns the list of translation tones your service supports. Adobe Express calls this endpoint to populate the tone picker in the Translate panel if your `uiConfig` references a tone form input.

This endpoint is optional but recommended if your service supports tone-of-voice customization.

### Request

No request body. Query parameters are passed by Adobe Express if you configure them in `apiConfig.tones.queryParams`.

### Response

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tones` | `Tone[]` | Yes | Array of supported tones. |
| `errorCode` | `string` | No | One of the [general error codes](#error-codes). Present only on error. |
| `errorMessage` | `string` | No | Human-readable description of the error. Present only on error. |

**Tone object:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | `string` | Yes | The tone identifier sent in `/translate` requests (e.g., `"Formal"`, `"Informal"`). |
| `label` | `string` | Yes | Human-readable label shown in the UI (e.g., `"Formal"`, `"Casual"`). |

**Success example:**

```json
{
  "tones": [
    { "value": "Formal", "label": "Formal" },
    { "value": "Informal", "label": "Casual" },
    { "value": "Technical", "label": "Technical" }
  ]
}
```

**Behavioral requirement:** The `value` field from a selected tone is sent in the `tone` field of `/translate` requests. Ensure your `/translate` endpoint accepts and acts on these values consistently.

<HorizontalLine />

## POST /translate

Translates an array of text items from a source locale to a target locale, optionally applying a tone. This is the core endpoint of every Translate connector.

### Request

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sourceLocale` | `string` | Yes | IETF language tag of the source language (e.g., `"en-US"`). |
| `targetLocale` | `string` | Yes | IETF language tag of the target language (e.g., `"fr-FR"`). |
| `items` | `string[]` | Yes | Array of text strings to translate. May contain one or more items. |
| `tone` | `string` | No | Tone value from `/tones` (e.g., `"Formal"`). Omitted when no tone is selected. |

**Request example:**

```json
{
  "sourceLocale": "en-US",
  "targetLocale": "fr-FR",
  "items": [
    "Welcome to Adobe Express",
    "Create stunning designs in minutes"
  ],
  "tone": "Formal"
}
```

### Response

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `result` | `string[]` | Yes | Translated text items. Must have the same length and order as the request `items`. |
| `errorCode` | `string` | No | One of the [translate error codes](#translate-specific-error-codes) or [general error codes](#error-codes). Present only on error. |
| `errorMessage` | `string` | No | Human-readable description of the error. Present only on error. |

**Success example:**

```json
{
  "result": [
    "Bienvenue sur Adobe Express",
    "Créez des designs époustouflants en quelques minutes"
  ]
}
```

**Error example:**

```json
{
  "result": [],
  "errorCode": "UnsupportedLocale",
  "errorMessage": "The locale zh-TW is not supported by this service"
}
```

**Behavioral requirements:**

- `result` must contain exactly the same number of items as `items` in the request, in the same order. Adobe Express maps each result back to its source item by index.
- Do not return `null` values in `result`. Return an error response instead of a partial result.
- Use standard HTTP status codes to signal errors (`401` for authentication failures, `400` for malformed requests, `500` for unexpected server errors). For translate-specific application errors, include `errorCode` in the response body.
- `errorCode` values in the translate response determine which message Adobe Express shows to the user. See [translate-specific error codes](#translate-specific-error-codes).

<HorizontalLine />

## POST /feedback

Receives user feedback on a translation result. Adobe Express sends feedback when a user rates a translation as helpful or unhelpful.

This endpoint is optional but recommended. Implementing it allows you to collect quality signals from Adobe Express users.

### Request

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | Feedback polarity. One of: `"Positive"`, `"Negative"`. |
| `reason` | `string` | Yes | Reason for the feedback. See [feedback reason values](#feedback-reason-values). |
| `note` | `string` | No | Optional free-text note from the user. |

**Positive feedback example:**

```json
{
  "type": "Positive",
  "reason": "AccurateTranslation"
}
```

**Negative feedback example:**

```json
{
  "type": "Negative",
  "reason": "TranslationError",
  "note": "The brand name was incorrectly translated"
}
```

### Response

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `errorCode` | `string` | No | One of the [general error codes](#error-codes). Present only on error. |
| `errorMessage` | `string` | No | Human-readable description of the error. Present only on error. |

**Success example:**

```json
{}
```

**Behavioral requirement:** Return an empty JSON object `{}` on success. Adobe Express does not surface feedback errors to users, but errors are logged in the Playground console.

### Feedback Reason Values

**Positive reasons** (`type: "Positive"`):

| Value | Description |
|-------|-------------|
| `AccurateTranslation` | The translation was accurate. |
| `CorrectTone` | The tone of voice was correct. |
| `PreservedLayout` | The layout and formatting were preserved. |
| `QuickLoad` | The translation loaded quickly. |
| `Impressive` | The result exceeded expectations. |
| `Other` | Other positive reason. |

**Negative reasons** (`type: "Negative"`):

| Value | Description |
|-------|-------------|
| `HarmfulOrBiasContent` | The content contains harmful stereotypes or bias. |
| `CopyrightTrademarkViolation` | The content violates copyright or trademark. |
| `NudityOrSexualContent` | The content contains nudity or sexual content. |
| `ViolenceOrGore` | The content contains violence or gore. |
| `TranslationError` | The translation contains errors. |
| `IncorrectTone` | The tone of voice was incorrect. |
| `IncorrectLayout` | The layout and/or formatting were incorrect. |
| `LongLoadTime` | The translation took a long time to load. |
| `Other` | Other negative reason. |

<HorizontalLine />

## Error Codes

All endpoints use the same error response envelope. Set `errorCode` in the response body alongside the appropriate HTTP status code to signal errors. Return standard HTTP status codes: `401` for authentication failures, `400` for malformed requests, and `500` for unexpected server errors.

### General Error Codes

These codes apply to any endpoint. Return them in the response body alongside the matching HTTP status code.

| Code | HTTP status | When to use |
|------|-------------|-------------|
| `BadRequest` | `400` | The request body or parameters are malformed, a required field is missing, or a field value is invalid. |
| `Unauthorized` | `401` | The request is missing valid authentication credentials, or the token or API key failed validation. |
| `GenericError` | `500` | An unexpected server-side error occurred. Use as a fallback for errors that do not match another code. |

### Translate-Specific Error Codes

These codes apply only to the `/translate` endpoint. Each code maps to a specific message Adobe Express displays to the user.

| Code | Description | Adobe Express behavior |
|------|-------------|----------------------|
| `UnsupportedLocale` | The requested target locale is not supported. | Displays an unsupported locale message. |
| `SourceTargetLocaleSame` | The source and target locale are identical. | Displays a message asking the user to select a different target. |
| `UnsafeSourceContentDetected` | The input content contains unsafe material. | Displays a content safety message. |
| `InputTokenLimitExceeded` | The input exceeds the service's token limit. | Displays a content-too-long message. |
| `ServiceCapacity` | The service is currently at capacity or overloaded. | Displays a service unavailable message and may prompt a retry. |
| `MaxSizeExceeded` | The request payload exceeds the maximum allowed size. | Displays a request-too-large message. |

Use the most specific code that applies. `GenericError` should be a last resort.

<HorizontalLine />

## TypeScript Types

If your service is implemented in TypeScript, use `translate-connector-sdk.d.ts` for compile-time safety and editor autocompletion. Download the file from [Getting Started](../../guides/getting-started.md), or use it as bundled inside the starter project. See [Getting Started](../../guides/getting-started.md) for setup instructions.

Once configured, import types using the subpath:

```typescript
import type {
  HealthResponse,
  LocalesResponse,
  Locale,
  TonesResponse,
  Tone,
  TranslationRequest,
  TranslationResponse,
  FeedbackRequest,
  FeedbackResponse,
  ErrorCode,
  TranslateResponseErrorCode,
  FeedbackType,
  FeedbackPositiveReason,
  FeedbackNegativeReason
} from "@adobe-ccwebext/ccweb-connector-sdk-types/translate";
```

The type definitions are the authoritative source for field names, types, and nullability. When the TypeScript types and this page differ, the TypeScript types take precedence.

<HorizontalLine />

## Related Resources

- [Translate Connector OpenAPI Specification](/static/translate-connector-api.yaml): Machine-readable spec for generating stubs and clients.
- [Endpoint Setup](../../guides/endpoint-setup.md): Authentication options, TypeScript response shape examples, and pre-Playground testing for all five endpoints.
- [Test Your Service](../../guides/test-your-service.md): Recommended testing order, per-endpoint `curl` verification, and end-to-end checks in the Connector Playground.
- [Connector Manifest Reference](../manifest-schema/index.md): How to wire your endpoints to the manifest `apiConfig`.
