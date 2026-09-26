---
title: Connector Manifest Reference
description: Complete field reference for the Adobe Express connector manifest.json schema: fields, types, constraints, defaults, and examples by connector type.
audience:
  - developers
keywords:
  - adobe-express
  - connectors
  - manifest
  - reference
  - schema
nav-title: Manifest Reference
content_type: reference
sidebar: adobe-express-connectors
last-updated: 2026-09-25
hideBreadcrumbNav: true
---

# Connector Manifest Reference

The connector `manifest.json` file defines the complete configuration of an Adobe Express Connector.

## manifest.json file

Adobe Express uses the `manifest.json` file to know which API endpoints to call, what UI to render, and how to authenticate requests to your service. You will use the [Connector Playground](../../guides/connector-playground.md) to configure and validate it, but this reference is provided to help you understand:

1. How your authentication can be configured and mapped to your endpoints. 
2. How to configure the UI for your connector.

## Example manifest

### OAuth 2.0 PKCE

The following is an example of a connector manifest with OAuth 2.0 PKCE authentication, API-sourced locale and tone pickers, and all five recommended endpoints.

```json
{
  "id": "acme-translate",
  "name": "Acme Translate",
  "type": "Translate",
  "version": "1.0.0",
  "manifestVersion": 1,
  "connectorVersion": 1,
  "apps": [
    {
      "name": "Express",
      "supportedDeviceClass": ["desktop"]
    }
  ],
  "authConfig": {
    "type": "OAUTH_2_0_PKCE",
    "authorizationUrl": "https://auth.acme-translations.example/authorize",
    "tokenUrl": "https://auth.acme-translations.example/token",
    "clientId": "your-client-id",
    "scope": "translate.read translate.write"
  },
  "apiConfig": [
    {
      "id": "health",
      "endpoint": "https://api.acme-translations.example/health",
      "method": "GET",
      "useAuth": false
    },
    {
      "id": "locales",
      "endpoint": "https://api.acme-translations.example/locales",
      "method": "GET",
      "queryParams": {
        "preferredLanguage": "$app_preferredLanguage"
      },
      "useAuth": true
    },
    {
      "id": "tones",
      "endpoint": "https://api.acme-translations.example/tones",
      "method": "GET",
      "useAuth": true
    },
    {
      "id": "translate",
      "endpoint": "https://api.acme-translations.example/translate",
      "method": "POST",
      "useAuth": true
    },
    {
      "id": "feedback",
      "endpoint": "https://api.acme-translations.example/feedback",
      "method": "POST",
      "useAuth": true
    }
  ],
  "uiConfig": {
    "description": "Translate your designs with Acme Translate",
    "entrypoints": [
      {
        "id": "TranslatePanel",
        "label": "Translate",
        "formInput": [
          {
            "id": "targetLocale",
            "type": "MultiSelectPicker",
            "dataSource": {
              "type": "API",
              "apiId": "$api_locales"
            },
            "attributes": {
              "label": "Translate to",
              "placeholder": "Select one or more languages",
              "maxItems": 5
            }
          },
          {
            "id": "tone",
            "type": "Picker",
            "dataSource": {
              "type": "API",
              "apiId": "$api_tones"
            },
            "attributes": {
              "label": "Tone of voice",
              "placeholder": "Select a tone (optional)"
            }
          }
        ]
      }
    ]
  }
}
```

### Secure API Key

The following is a complete, valid manifest with Secure API Key authentication and all five endpoints. The `$secureApiKey` placeholder appears in every endpoint's `headers` object where `useAuth: true` is set. Adobe's secure bridge resolves the placeholder at request time.

```json
{
  "id": "acme-translate",
  "name": "Acme Translate",
  "type": "Translate",
  "version": "1.0.0",
  "manifestVersion": 1,
  "connectorVersion": 1,
  "apps": [
    {
      "name": "Express",
      "supportedDeviceClass": ["desktop"]
    }
  ],
  "authConfig": {
    "type": "SECURE_API_KEY"
  },
  "apiConfig": [
    {
      "id": "health",
      "endpoint": "https://api.acme-translations.example/health",
      "method": "GET",
      "useAuth": false
    },
    {
      "id": "locales",
      "endpoint": "https://api.acme-translations.example/locales",
      "method": "GET",
      "queryParams": {
        "preferredLanguage": "$app_preferredLanguage"
      },
      "headers": { "x-api-key": "$secureApiKey" },
      "useAuth": true
    },
    {
      "id": "tones",
      "endpoint": "https://api.acme-translations.example/tones",
      "method": "GET",
      "headers": { "x-api-key": "$secureApiKey" },
      "useAuth": true
    },
    {
      "id": "translate",
      "endpoint": "https://api.acme-translations.example/translate",
      "method": "POST",
      "headers": { "x-api-key": "$secureApiKey" },
      "useAuth": true
    },
    {
      "id": "feedback",
      "endpoint": "https://api.acme-translations.example/feedback",
      "method": "POST",
      "headers": { "x-api-key": "$secureApiKey" },
      "useAuth": true
    }
  ],
  "uiConfig": {
    "description": "Translate your designs with Acme Translate",
    "entrypoints": [
      {
        "id": "TranslatePanel",
        "label": "Translate",
        "formInput": [
          {
            "id": "targetLocale",
            "type": "MultiSelectPicker",
            "dataSource": {
              "type": "API",
              "apiId": "$api_locales"
            },
            "attributes": {
              "label": "Translate to",
              "placeholder": "Select one or more languages",
              "maxItems": 5
            }
          }
        ]
      }
    ]
  }
}
```

## Top-level identity fields

These fields identify your connector to Adobe Express. They appear at the root of the manifest and are required on every connector.  

```json
{
  "id": "acme-translate",
  "name": "Acme Translate",
  "type": "Translate",
  "version": "1.0.0",
  "manifestVersion": 1,
  "connectorVersion": 1,
  "apps": [
    {
      "name": "Express",
      "supportedDeviceClass": ["desktop"]
    }
  ]
}
```

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| `id` | string | Yes | Unique identifier for your connector. Letters, numbers, and hyphens only. 2-30 characters. Example: `"acme-translate"`. |
| `name` | string | Yes | Display name shown in the Adobe Express UI. Letters, numbers, and spaces only (no hyphens or special characters). Must start with a letter or number. 3-31 characters total. Example: `"Acme Translate"`. |
| `type` | string | Yes | Connector type. Must be `"Translate"`. |
| `version` | string | Yes | Semantic version of your connector in `major.minor.patch` format. Example: `"1.0.0"`. |
| `manifestVersion` | number | Yes | Version of the manifest schema. Must be `1`. Set automatically by the Connector Playground. |
| `connectorVersion` | number | Yes | Version of the connector integration in the host application. Must be `1`. Set automatically by the Connector Playground. |
| `apps` | array | Yes | Target host applications and supported device classes. Set automatically by the Connector Playground based on your account permissions. Each entry has a `name` field (must be `"Express"`) and an optional `supportedDeviceClass` array (for example, `["desktop"]`). Verify the generated values in your manifest before connecting. |

## authConfig

Defines how Adobe Express authenticates API requests to your service. This field is optional. If your service does not require authentication, omit `authConfig` and set `useAuth: false` on each endpoint in `apiConfig`.

Choose the authentication type that fits your service architecture. For a full explanation of each option including when to use it, how Adobe Express delivers credentials, and how to implement token validation in your service, see [Endpoint Setup](../../guides/endpoint-setup.md).

<InlineAlert slots="heading,text" variant="warning" />

**Important** 

The authentication type you choose is the only one you can apply to your connector's endpoints - you cannot use different auth types for different endpoints (for example, API Key for `/locales` and `/tones` but OAuth 2.0 PKCE for `/translate`).


### Option 1: OAuth 2.0 PKCE

Use when each user must authorize your service with their own account. Adobe Express opens a popup to your `authorizationUrl`, the user authorizes, and Adobe Express exchanges the code for an access token using your `tokenUrl`. That token is sent with every subsequent request to endpoints where `useAuth: true` is set in the `apiConfig`.

```json
"authConfig": {
  "type": "OAUTH_2_0_PKCE",
  "authorizationUrl": "https://auth.your-service.example/authorize",
  "tokenUrl": "https://auth.your-service.example/token",
  "clientId": "your-client-id",
  "scope": "translate.read translate.write"
}
```

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| `type` | string | Yes | Must be `"OAUTH_2_0_PKCE"`. |
| `authorizationUrl` | string | Yes | URL where users authorize your service. Must use HTTPS. |
| `tokenUrl` | string | Yes | URL Adobe Express calls to exchange an authorization code for an access token. Must use HTTPS. |
| `clientId` | string | Yes | OAuth 2.0 client identifier registered with your authorization server. |
| `scope` | string | Yes | Space-separated list of OAuth scopes your service requires. |
| `additionalParams` | object | No | Extra query parameters passed to your authorization server's authorization URL. Use for provider-specific requirements such as `audience` (Auth0), `resource` (Azure AD), or `prompt`. Example: `{ "audience": "https://api.your-service.example" }`. |

   
**Register Redirect URIs**

If you've chosen this method, make sure you've registered the Adobe Express redirect URIs with your authorization server. See [Endpoint Setup](../../guides/endpoint-setup.md) for the exact values and instructions.

### Option 2: API Key (development and testing only)

Use when a single static key is sufficient for all users and you are still in development or end-to-end testing. The key is stored in `authConfig.apiKey`. To send it with a request, add the `$apiKey` placeholder as the value for a header in each endpoint's `apiConfig.headers`:

```json
"authConfig": {
  "type": "API_KEY",
  "apiKey": "your-api-key"
},
"apiConfig": [
  {
    "id": "translate",
    "endpoint": "https://your-service.example/translate",
    "method": "POST",
    "headers": { "x-api-key": "$apiKey" },
    "useAuth": true
  }
]
```

Adobe Express resolves `$apiKey` to the stored key value before making the request. The header name is your choice and must match what your backend reads. `$apiKey` can also appear in `queryParams` or `body`, but headers are the recommended placement.

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| `type` | string | Yes | Must be `"API_KEY"`. |
| `apiKey` | string | Yes | The key value. Injected wherever `$apiKey` appears in `apiConfig` headers, query params, or body. |

<InlineAlert slots="heading, text" variant="warning" />

**Plain API Key is not approved for production**

The `apiKey` value is stored in plain text in the manifest, which is distributed to client devices. Treat any plain `apiKey` value as effectively public. Use a key scoped to the minimum permissions your connector needs, rotate it if it is ever exposed, and never paste a production secret here. For production, use OAuth 2.0 PKCE. For a static-credential model in production, use [Secure API Key](#option-3-secure-api-key).

### Option 3: Secure API Key

Use when you need a production-supported static-credential model. Your manifest declares `SECURE_API_KEY` as the auth type and uses the `$secureApiKey` placeholder in `apiConfig.headers` (and optionally in `queryParams` or `body`, though headers are strongly recommended). Adobe stores the key server-side and injects it into the request before forwarding to your service. The key is never stored in the manifest and never distributed to client devices.

Only Secure API Key connectors are routed through Adobe's secure bridge. OAuth 2.0 PKCE and plain API Key connectors call your service directly.

```json
"authConfig": {
  "type": "SECURE_API_KEY"
}
```

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| `type` | string | Yes | Must be `"SECURE_API_KEY"`. |

Use the `$secureApiKey` placeholder in `apiConfig.headers` for the header your service validates. You choose the header name (for example, `x-api-key`). Set `useAuth: true` on any endpoint that authenticates against your service to make intent explicit in the manifest:

```json
"apiConfig": [
  {
    "id": "translate",
    "endpoint": "https://your-service.example/translate",
    "method": "POST",
    "headers": { "x-api-key": "$secureApiKey" },
    "useAuth": true
  }
]
```

For full guidance on backend validation, key registration, local testing, and migration from plain API Key, see [Endpoint Setup: Secure API Key](../../guides/endpoint-setup.md#option-3-secure-api-key).

### Option 4: No authentication

Omit `authConfig` entirely and set `useAuth: false` (or omit `useAuth`) on each endpoint in `apiConfig`. Your service receives requests with no `Authorization` header.

Use no authentication when:

* Your service is protected at the network level (for example, IP allowlisting)  
* Your service is intentionally designed to be open to the internet  
* You are running your service locally for development only  
* Your service uses a custom authorization mechanism outside of `authConfig`

## apiConfig

Defines the API endpoints Adobe Express calls during the translation workflow. `apiConfig` is an array of endpoint configuration objects. Each object requires a unique `id` that you assign. 

```json
"apiConfig": [
  {
    "id": "health",
    "endpoint": "https://api.your-service.example/health",
    "method": "GET",
    "useAuth": false
  },
  {
    "id": "locales",
    "endpoint": "https://api.your-service.example/locales",
    "method": "GET",
    "queryParams": {
      "preferredLanguage": "$app_preferredLanguage"
    },
    "useAuth": true
  },
  {
    "id": "tones",
    "endpoint": "https://api.your-service.example/tones",
    "method": "GET",
    "useAuth": true
  },
  {
    "id": "translate",
    "endpoint": "https://api.your-service.example/translate",
    "method": "POST",
    "useAuth": true
  },
  {
    "id": "feedback",
    "endpoint": "https://api.your-service.example/feedback",
    "method": "POST",
    "useAuth": true
  }
]
```

The Translate connector type requires entries with `id` values of `"locales"` and `"translate"`. Entries for `"health"`, `"tones"`, and `"feedback"` are optional but recommended.

### Endpoint configuration fields

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| `id` | string | Yes | Unique identifier for this endpoint.  |
| `endpoint` | string | Yes | Full URL of the API endpoint. Must use HTTPS in production. |
| `method` | string | Yes | HTTP method. Accepted values: `"GET"`, `"POST"`. |
| `body` | object | No | Static key-value pairs sent as the request body. Only applies to POST requests. For GET requests, `body` is defined in the schema but ignored at runtime. |
| `headers` | object | No | Static headers included with every request to this endpoint. |
| `pathParams` | object | No | Path parameter substitutions for URL placeholders in `:paramName` format. |
| `queryParams` | object | No | Query parameters appended to the endpoint URL. Supports dynamic value prefixes (see below). |
| `useAuth` | boolean | No | Whether to include the `authConfig` credentials with this request. Defaults to `false`. Set to `false` (or omit) for `/health`. |

## Dynamic value prefixes

The manifest supports dynamic value placeholders. These are special strings Adobe Express resolves at runtime before making the API call. Your service receives the resolved value, not the placeholder.

| Prefix | Resolved by | Used in | Example |
| :---- | :---- | :---- | :---- |
| `$app_` | Adobe Express (host application) | `queryParams`, `body`, `headers`, `pathParams` | `$app_preferredLanguage` |
| `$api_` | An `apiConfig` endpoint response | `uiConfig` form input `dataSource.apiId` | `$api_locales` |
| `$userInput_` | A value the user entered in a form input | `queryParams`, `body`, `headers`, `pathParams` | `$userInput_targetLocale` |
| `$apiKey` | `authConfig.apiKey` (API Key connectors only) | `apiConfig.headers`, `queryParams`, `body` | `"x-api-key": "$apiKey"` |
| `$secureApiKey` | Adobe's secure bridge (Secure API Key connectors only) | `apiConfig.headers`, `queryParams`, `body`. Prefer `headers`. Avoid `queryParams` and `body` (values appear in logs). | `"x-api-key": "$secureApiKey"` |

### $app_ prefix

`$app_` values are injected by Adobe Express from the current user's application context.

The only currently supported `$app_` value is `$app_preferredLanguage`: the user's preferred display language from their Adobe Express settings (for example, `"fr-FR"`). Use this in your `/locales` and `/tones` query parameters so your service can return locale labels in the user's own language (for example, returning `"Espagnol"` instead of `"Spanish"` for a French-speaking user).

```json
"queryParams": {
  "preferredLanguage": "$app_preferredLanguage"
}
```

### $api_ prefix

`$api_` values appear only in `uiConfig` form inputs, specifically in `dataSource.apiId`. They tell Adobe Express which `apiConfig` entry (aka: endpoint) to call for populating the form input specified with the returned response. The name after `$api_` must exactly match the `id` of an entry in your `apiConfig`. In the following example, `$api_locales` references the `apiConfig` entry with `id`: `"locales"`. When the Translate panel opens, Adobe Express calls the `/locales` endpoint and uses the response to populate the form input.

```json
"dataSource": {
  "type": "API",
  "apiId": "$api_locales"
}
```

`$api_` is only valid in `uiConfig` form input data sources, not in `queryParams`, `body`, or other `apiConfig` fields.

### $userInput_ prefix

`$userInput_` values reference a value the user has entered or selected in a form input. The name after `$userInput_` must match the `id` of a `formInput` entry in your `uiConfig`. For example, `$userInput_targetLocale` would resolve to the locale the user selected.

This prefix is defined for future use and is not required for the current Translate connector release. The formInput ids you choose now (such as `targetLocale` and `tone`) will determine how you reference them with this prefix when it becomes available.

### $secureApiKey

`$secureApiKey` is a fixed placeholder, not a prefix. It does not take a suffix. Use it as the value for a header entry in `apiConfig.headers` on endpoints where `useAuth: true` is set and your `authConfig.type` is `SECURE_API_KEY`:

```json
"headers": { "x-api-key": "$secureApiKey" }
```

Adobe's secure bridge resolves this placeholder to the registered key for the user's Adobe org and injects it into the request before forwarding to your service. The resolved key exists only for the lifetime of the forwarded request and is never exposed to clients or included in the manifest.

Always place `$secureApiKey` in `apiConfig.headers`. While the runtime also resolves it in `queryParams` and `body`, avoid those positions: query strings appear in server access logs and browser history, and body values surface in application logs. Both would expose the key. `$secureApiKey` has no effect in `pathParams`, and cannot be used when `authConfig.type` is `API_KEY`, `OAUTH_2_0_PKCE`, or absent.

### $apiKey

`$apiKey` is a fixed placeholder, not a prefix. It does not take a suffix. Use it as the value for a header entry (or query param or body field) in `apiConfig` on endpoints where `useAuth: true` is set and your `authConfig.type` is `API_KEY`:

```json
"headers": { "x-api-key": "$apiKey" }
```

Adobe Express resolves this placeholder to the value stored in `authConfig.apiKey` and injects it before making the request. `$apiKey` resolves to the entire field value. It cannot be embedded within a string (for example, `"Bearer $apiKey"` will not be substituted; the placeholder must be the complete value).

`$apiKey` has no effect when `authConfig.type` is `SECURE_API_KEY`, `OAUTH_2_0_PKCE`, or absent.

## uiConfig

Defines the UI Adobe Express renders for your connector. Adobe Express generates the interface from this configuration; you do not write any frontend code.

`uiConfig` is optional in the base schema, but required for Translate connectors. Omitting it from a Translate connector manifest will cause a validation error in the Connector Playground.

The Translate panel always renders the following elements regardless of your `uiConfig`:

- **Translation service:** displays your connector `name`. Not configurable.
- **Translate All Pages:** a checkbox that lets users translate all pages or only the current page. Not configurable. Your service receives a boolean flag indicating the user's selection.

Your `formInput` entries appear between these fixed elements.

```json
"uiConfig": {
  "description": "Translate your designs with Acme Translate",
  "entrypoints": [
    {
      "id": "TranslatePanel",
      "label": "Translate",
      "formInput": [
        {
          "id": "targetLocale",
          "type": "MultiSelectPicker",
          "dataSource": {
            "type": "API",
            "apiId": "$api_locales"
          },
          "attributes": {
            "label": "Translate to",
            "placeholder": "Select one or more languages",
            "maxItems": 5
          }
        }
      ]
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | `string` | No | Short description of your connector displayed in the Adobe Express UI. |
| `entrypoints` | `UIEntrypoint[]` | Yes | Array of UI entrypoints. |

### UIEntrypoint Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Entrypoint identifier. Must be `"TranslatePanel"` for Translate connectors. |
| `label` | `string` | Yes | Label displayed to the user for this entrypoint. |
| `formInput` | `FormInput[]` | No (required for Translate) | Array of form input configurations. Translate connectors must include an entry with `id: "targetLocale"` for the locale picker. Each entry requires a unique `id` within the entrypoint. |

### Form Input Types

Adobe Express supports three form input types:

| Type | Description |
|------|-------------|
| `Picker` | A single-select dropdown. Requires a `dataSource` (static or API). |
| `MultiSelectPicker` | A multi-select dropdown. Requires a `dataSource` (static or API). Supports `maxItems` in `attributes`. |

Each form input is an object with a required `id` and `type`. `Picker` and `MultiSelectPicker` also require a `dataSource`. The optional `attributes` object controls display labels, placeholder text, and validation settings.

<InlineAlert slots="text" variant="info" />

For Translate connectors, the locale picker form input must use `"id": "targetLocale"`. This is enforced during manifest validation and any other value causes a validation error. The locale picker can use either `Picker` (single-select) or `MultiSelectPicker` (multi-select) as its type. Use `MultiSelectPicker` to let users choose multiple target locales at once.

The tone picker id is not enforced by the validator. Use a consistent convention such as `"tone"` to match the form builder default. Unlike the locale picker, the tone picker and its associated `tones` endpoint are both optional.

### Form Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for this form input within the entrypoint. |
| `type` | `string` | Yes | Form input type: , `"MultiSelectPicker"` or `"Picker"`. |
| `dataSource` | `object` | Yes | Source of the options displayed in the input. |
| `attributes` | `object` | No | Display settings: `label`, `placeholder`, `required`, `readonly`, `value`, and `maxItems` (`MultiSelectPicker` only). |

### Form Input Source Types

| Source Type | Description |
|-------------|-------------|
| `Static` | Options are defined inline in the manifest as an array of `{ value, label, group? }` objects. |
| `API` | Options are fetched at runtime from an `apiConfig` endpoint. Reference the endpoint using its `id` with the `$api_` prefix. |

**Static source example:**

```json
{
  "id": "tone",
  "type": "Picker",
  "dataSource": {
    "type": "Static",
    "value": [
      { "value": "Formal", "label": "Formal" },
      { "value": "Informal", "label": "Informal" }
    ]
  },
  "attributes": {
    "label": "Tone of voice",
    "placeholder": "Select a tone (optional)"
  }
}
```

The optional `group` field visually groups options under a shared label in the dropdown. Options with the same `group` value are displayed together. This is useful for organizing longer lists:

```json
{
  "id": "tone",
  "type": "Picker",
  "dataSource": {
    "type": "Static",
    "value": [
      { "value": "Formal",       "label": "Formal",       "group": "Business" },
      { "value": "Professional", "label": "Professional", "group": "Business" },
      { "value": "Casual",       "label": "Casual",       "group": "Everyday" },
      { "value": "Informal",     "label": "Informal",     "group": "Everyday" }
    ]
  },
  "attributes": {
    "label": "Tone of voice",
    "placeholder": "Select a tone (optional)"
  }
}
```

<InlineAlert slots="text" variant="info" />

For API-sourced locale pickers, the equivalent grouping field is `category` on the `Locale` object returned by your `/locales` endpoint (for example, `"category": "Popular languages"`). The `group` field applies only to inline static source options.

**API source example:**

```json
{
  "id": "targetLocale",
  "type": "MultiSelectPicker",
  "dataSource": {
    "type": "API",
    "apiId": "$api_locales"
  },
  "attributes": {
    "label": "Translate to",
    "placeholder": "Select one or more languages",
    "maxItems": 5
  }
}
```

<InlineAlert slots="text" variant="info" />

API source endpoints are called when the Translate panel opens. Slow `/locales` or `/tones` responses delay panel rendering for users. If your options list is fixed, use a `Static` source instead.

## Mapping curl commands to manifest configuration

A common question during development is how the credentials you test with `curl` map to the fields in your connector manifest. The table below shows the relationship for each authentication type. As described above, your authentication method is declared in the `authConfig` section of the `manifest.json`, and applied for any endpoints where you've set `useAuth: true`. Adobe Express automatically handles the credential exchange on behalf of your users.

### API Key

The mapping below applies to the **plain API Key** auth type, which is supported for development and end-to-end testing only. See [authConfig Option 2](#option-2-api-key-development-and-testing-only) for the production caveats.

When you test with `curl`, use the header name you configured with `$apiKey` in your manifest (for example, `x-api-key`):

```shell
curl http://localhost:8787/locales \
  -H "x-api-key: your-api-key"
```

This maps to the following manifest sections:

```json
"authConfig": {
  "type": "API_KEY",
  "apiKey": "your-api-key"
},
"apiConfig": [
  {
    "id": "locales",
    "endpoint": "https://api.your-service.example/locales",
    "method": "GET",
    "headers": { "x-api-key": "$apiKey" },
    "useAuth": true
  }
]
```

Adobe Express resolves `$apiKey` to the stored `authConfig.apiKey` value and injects it into whichever header, query param, or body field you placed the placeholder in. To migrate to a static-credential model for production, see [Secure API Key](#option-3-secure-api-key).

### OAuth 2.0 PKCE

When you test token validation locally with a known good access token for OAuth:

```shell
curl -X POST http://localhost:8787/translate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-test-token>" \
  -d '{"sourceLocale":"en-US","targetLocale":"fr-FR","items":["Hello"]}'
```

This maps to the following manifest sections:

```json
"authConfig": {
  "type": "OAUTH_2_0_PKCE",
  "authorizationUrl": "https://auth.your-service.example/authorize",
  "tokenUrl": "https://auth.your-service.example/token",
  "clientId": "your-client-id",
  "scope": "translate.read translate.write"
},
"apiConfig": [
  {
    "id": "translate",
    "endpoint": "https://api.your-service.example/translate",
    "method": "POST",
    "useAuth": true
  }
]
```

During local testing you supply the bearer token yourself. When using the Connector Playground, Adobe Express handles the full OAuth flow - it opens `authorizationUrl` in a popup, the user authorizes, Adobe Express exchanges the authorization code at `tokenUrl`, and then sends the resulting access token as `Authorization: Bearer <access_token>` on all requests where `useAuth: true` is set. Your token validation logic handles both cases the same way.

### Secure API Key

When you test your endpoint locally before key registration, supply the key value directly in the header you configured in `apiConfig.headers`:

```shell
curl -X POST http://localhost:8787/translate \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-registered-key" \
  -d '{"sourceLocale":"en-US","targetLocale":"fr-FR","items":["Hello"]}'
```

This maps to the following manifest sections:

```json
"authConfig": {
  "type": "SECURE_API_KEY"
},
"apiConfig": [
  {
    "id": "translate",
    "endpoint": "https://your-service.example/translate",
    "method": "POST",
    "headers": { "x-api-key": "$secureApiKey" },
    "useAuth": true
  }
]
```

During local testing you supply the key value directly in the header. When using the Connector Playground after key registration, Adobe's secure bridge resolves `$secureApiKey` to the registered key for the user's Adobe org and populates the `x-api-key` header automatically. Your header validation logic handles both cases the same way.

### No authentication

When you test with no credentials:

```shell
curl http://localhost:8787/locales
```

This maps to omitting `authConfig` entirely and setting `useAuth: false` (or omitting `useAuth`) on each endpoint:

```json
"apiConfig": [
  {
    "id": "locales",
    "endpoint": "https://api.your-service.example/locales",
    "method": "GET",
    "useAuth": false
  }
]
```

## Related resources

* [Getting Started](../../guides/getting-started.md): A guide to getting started with Adobe Express Translate Connectors.
* [Endpoint Setup:](../../guides/endpoint-setup.md) Full details on each auth type, how Adobe Express delivers credentials, token validation code examples, and pre-Playground testing steps. 
* [Connector Playground](../../guides/connector-playground.md): Use the Connector Playground to load, validate, and test your connector without a full deployment.
* `translate-connector-api.yaml`: OpenAPI 3.0 specification defining the complete API contract your service must implement. Download from [Getting Started](../../guides/getting-started.md#developer-resources).
* `translate-connector-sdk.d.ts`: TypeScript type definitions for all request and response payloads. Download from [Getting Started](../../guides/getting-started.md#developer-resources).
* `translate-connector-standalone.zip`: Self-contained Node.js starter project with all five endpoints implemented as stubs, plus the SDK types bundled inside. Download from [Getting Started](../../guides/getting-started.md#developer-resources).
