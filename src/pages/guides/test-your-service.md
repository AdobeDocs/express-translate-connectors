---
title: Test Your Connector Service
description: Validate your Adobe Express Translate connector endpoints with curl, then verify the end-to-end integration in the Connector Playground and the Translate panel.
audience:
  - developers
content_type: how-to
keywords:
  - adobe-express
  - connectors
  - testing
nav-title: Test Your Service
sidebar: adobe-express-connectors
last-updated: 2026-09-25
hideBreadcrumbNav: true
---

# Test Your Connector Service

Testing a connector involves two distinct phases: verifying that your service implementation matches the API contract, and validating the end-to-end integration using the Connector Playground.

## Recommended testing order

Test your connector in this order:

1. Verify each endpoint outside Adobe Express.
2. Configure the connector in Connector Playground.
3. Select **Connect** and resolve any manifest or connectivity errors.
4. Test the connector in the Translate panel.
5. Repeat until the end-to-end flow is stable.

## Step 1: Test outside Adobe Express

Before opening Connector Playground, test each endpoint directly with `curl` or any HTTP client and verify the responses match the expected contract.

### Verify `/health`

```bash
curl http://localhost:8787/health
```

**Expected response:**

```json
{
  "message": "OK"
}
```

### Verify `/locales`

```bash
curl http://localhost:8787/locales
```

**Expected response:**

```json
{
  "locales": [
    { "code": "en-US", "label": "English (US)", "category": "Popular languages" },
    { "code": "fr-FR", "label": "French (France)", "category": "Popular languages" }
  ]
}
```

Requirements:
- The response must include a `locales` array with at least one entry.
- Each locale must include `code` and `label`. `category` is optional.
- `code` must be a valid IETF language tag (e.g. `"en-US"`, `"fr-FR"`, `"ja-JP"`).

### Verify `/tones` (if supported)

```bash
curl http://localhost:8787/tones
```

**Expected response:**

```json
{
  "tones": [
    { "value": "Formal", "label": "Formal" },
    { "value": "Informal", "label": "Informal" }
  ]
}
```

Requirements:
- The response must include a `tones` array.
- Each tone must include `value` and `label`.

### Verify `/translate`

```bash
curl -X POST http://localhost:8787/translate \
  -H "Content-Type: application/json" \
  -d '{
    "sourceLocale": "en-US",
    "targetLocale": "fr-FR",
    "items": ["Hello, world!", "This is a test."],
    "tone": "Formal"
  }'
```

The `tone` field is optional. Include it when your service supports tones. If your service ignores it, the response should still be `200` with results.

**Expected response:**

```json
{
  "result": ["Bonjour, le monde!", "Ceci est un test."]
}
```

Requirements:
- The `result` array must contain the same number of items as `items` in the request, in the same order.
- Do not return `null` values in `result`. Return an error response instead of a partial result.

### Verify `/feedback` (if supported)

```bash
curl -X POST http://localhost:8787/feedback \
  -H "Content-Type: application/json" \
  -d '{"type":"Positive","reason":"AccurateTranslation"}'
```

**Expected response:**

```json
{}
```

### Verify authentication (if your service uses OAuth 2.0 PKCE, API Key, or Secure API Key)

If your service requires authentication, confirm that requests with a missing or invalid credential return `401` and requests with a valid credential return `200` before connecting to the Playground. For `curl` examples and expected responses for each auth type, see [Endpoint Setup](./endpoint-setup.md#choose-your-authentication-type).

## Step 2: Test in Connector Playground

After your service and manifest pass local validation, load the connector in the Playground and run a complete end-to-end test. See [Connector Playground](connector-playground.md) for access and step-by-step instructions.

When testing in the Playground, verify:

1. **Authentication flow completes:** the Connect button transitions to a Connected state. This check doesn't apply to Secure API Key in this release: the Playground can't validate Secure API Key connectivity end to end. Test with API Key instead, then switch to Secure API Key and download the manifest once testing is complete. See [Connector Playground: Secure API Key](connector-playground.md#secure-api-key).
2. **Locales populate correctly:** the language picker displays the locales returned by your `/locales` endpoint.
3. **Tones populate correctly:** if supported, the tone picker displays the tones returned by your `/tones` endpoint.
4. **Translation returns the correct result:** the translated output matches the expected translation.
5. **Error states display correctly:** trigger known error conditions and verify Adobe Express handles the error codes appropriately.

## Step 3: Test in the Translate panel

After a successful connection, verify that:

- Your connector appears in development mode
- Locale labels are correct and readable
- Tone labels are correct and readable
- User selections are passed to your service
- Returned translations appear correctly in the workflow

## Test error handling

Return error responses with the appropriate HTTP status (`401` for authentication failures, `400` for malformed requests, `500` for unexpected server errors) and include `errorCode` in the response body. For `/translate`, return `errorCode` in the body alongside HTTP `200` so Adobe Express can display the correct user-facing message. For the complete list of values, including the `/translate`-specific codes and feedback reason values, see [Error Codes](../reference/translate-api/index.md#error-codes) and [Feedback Reason Values](../reference/translate-api/index.md#feedback-reason-values) in the Translate Connector API Reference.

To verify your error handling, send requests that trigger each error code and confirm:

1. Your service returns the correct `errorCode` value in the response body.
2. The `errorMessage` is descriptive and consistent with the error.
3. Adobe Express displays the appropriate message to the user in the Playground.

**Example: test `UnsupportedLocale`**

Send a translate request with a locale your service does not support:

```bash
curl -X POST http://localhost:8787/translate \
  -H "Content-Type: application/json" \
  -d '{
    "sourceLocale": "en-US",
    "targetLocale": "xx-XX",
    "items": ["Hello"]
  }'
```

**Expected response:**

```json
{
  "result": [],
  "errorCode": "UnsupportedLocale",
  "errorMessage": "The locale xx-XX is not supported."
}
```

## If something does not work

For symptom-based fixes covering manifest validation, authentication, API responses, and Connector Playground issues, see the [Troubleshooting](../support/troubleshooting/index.md) guide.
