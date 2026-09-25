---
title: Adobe Express Translate Connectors FAQ
description: Answers to frequently asked questions about Adobe Express Translate Connectors, the connector framework, and the Connector Playground.
audience:
  - developers
keywords:
  - adobe-express
  - connectors
  - faq
nav-title: FAQ
content_type: faq
sidebar: adobe-express-connectors
last-updated: 2026-09-25
hideBreadcrumbNav: true
---

# Frequently Asked Questions

## What is an Adobe Express Translate Connector?

An Adobe Express Translate Connector integrates a third-party service into a native Adobe Express feature. You implement a backend API and define the integration in a `manifest.json` file. Adobe Express reads the manifest to generate the UI and call your service. No panel or frontend code is required.

## How are connectors different from Adobe Express Add-ons?

Add-ons run inside a side panel in Adobe Express and require you to build and maintain a custom UI. Connectors are API-first integrations that surface natively within existing Adobe Express features. Adobe Express generates the UI from your manifest.

## What connector types are available?

Adobe Express currently supports one connector type: **Translate**. Translate connectors power the Translate feature in Adobe Express.

## Can I build a connector if I already have an Add-on?

Yes. The two models are independent. You can offer both an Add-on and a connector for your service. Consider building a connector if your service provides translation capabilities and you want native UI integration.

## Is a connector suitable for all types of integrations?

No. Connectors are designed for service-level integrations that map to specific Adobe Express features. If your integration requires custom UI, document access, or functionality that does not match an existing feature, build an Adobe Express Add-on instead.

## Do I need to write frontend code?

No. You implement a backend service that follows the API contract and write a `manifest.json` file. Adobe Express handles all UI rendering based on your manifest configuration.

## What languages and frameworks can I use to build my service?

Any language or framework that can serve HTTP endpoints. The API contract is defined in an OpenAPI 3.0 specification available as a download from [Getting Started](../../guides/getting-started.md). TypeScript type definitions are also available as a download for TypeScript services.

## Where do I find the API specification?

Download `translate-connector-api.yaml` from [Getting Started](../../guides/getting-started.md). This OpenAPI 3.0 file defines the exact request and response schemas your service must implement. For a human-readable version with field-level detail and examples, see the [Translate Connector API Reference](../../reference/translate-api/index.md).

## What authentication methods does the connector framework support?

The connector framework supports four authentication options: **OAuth 2.0 PKCE**, **Secure API Key**, **plain API Key** (development and testing only), and **no authentication**. Configure the auth type in the `authConfig` section of your manifest and set `useAuth: true` on each endpoint that requires credentials. If your service does not require authentication, omit `authConfig` entirely. One auth type applies uniformly to all endpoints in a connector. See [Endpoint Setup](../../guides/endpoint-setup.md) for full details on each option, implementation examples, and a pre-Playground testing checklist.

## Can I use plain API Key authentication in production?

No. Plain API Key (`"type": "API_KEY"`) is supported in the Connector Playground for development and end-to-end testing only. The `apiKey` value is stored in plain text in the manifest, which is distributed to client devices, so any plain key is effectively public. For production, use **OAuth 2.0 PKCE** when each user must authorize with their own account, or **Secure API Key** when you need a static-credential model. See [Endpoint Setup: Secure API Key](../../guides/endpoint-setup.md#option-3-secure-api-key) for the migration steps from plain API Key.

## How does Secure API Key work?

Your manifest declares `"type": "SECURE_API_KEY"` in `authConfig` and uses the `$secureApiKey` placeholder in `apiConfig.headers` for the header your service validates. When a translation request is triggered, Adobe Express routes it through Adobe's secure bridge. The bridge resolves the registered key for the user's Adobe org, injects it into the header you specified, and forwards the request to your service. The key never appears in the manifest and never reaches client devices.

Currently, registration is handled by the Adobe team, and you don't need to submit a listing first. Create a connector integration in **Your integrations**, then open its **Settings** tab and click **Copy** to copy your Connector URL. Email [express-connectors-support@adobe.com](mailto:express-connectors-support@adobe.com) with that URL pasted as-is. Adobe derives your Connector ID from it, so you don't need to extract it yourself. (This ID is a different value from the `id` field in your connector manifest.) Include the Adobe org ID(s) the connector should be visible to in the same email. Separately, share the secure API key(s) mapped to those org IDs using a secure-sharing tool of your choice. Never paste key values into the email itself: raw keys should never be exposed over email. A self-managed UI for registering and rotating your own keys is planned for a future release.

See [Endpoint Setup: Secure API Key](../../guides/endpoint-setup.md#option-3-secure-api-key) for the manifest configuration, backend validation sample, registration steps, and migration path from plain API Key.

## Can I test Secure API Key connectors end-to-end in the Connector Playground?

No, not in this release. The Playground lets you select Secure API Key to generate a manifest with the correct schema, but it can't validate connectivity through Adobe's secure bridge yet. Configure and test your connector with API Key in the Playground first, then switch to Secure API Key and download the manifest before submitting it. See [Connector Playground: Secure API Key](../../guides/connector-playground.md#secure-api-key) and [Endpoint Setup: Secure API Key](../../guides/endpoint-setup.md#option-3-secure-api-key) for the full flow.

## Do all connectors route through Adobe's bridge?

No. Only Secure API Key connectors are routed through Adobe's secure bridge. OAuth 2.0 PKCE and plain API Key connectors call your service endpoint directly.

## Does my service need to be publicly accessible?

Your service endpoint must be reachable from Adobe Express.

## What is `$app_preferredLanguage`?

`$app_preferredLanguage` is a dynamic value provided by Adobe Express at runtime. It represents the display language preference of the current user. Use it as a query parameter on your `/locales` and `/tones` endpoints to return labels in the user's preferred language.

## What does `$api_locales` mean in a form input source?

`$api_locales` is a reference to the endpoint with `id: "locales"` in your `apiConfig`. When a form input declares `"apiId": "$api_locales"` as its data source, Adobe Express calls your `/locales` endpoint and uses the response to populate the input options. The `$api_` prefix always references an endpoint by its `id` in `apiConfig`.

## Does my service need to support tones?

No. If your service does not support tones, omit the `/tones` endpoint entirely and do not include a `tones` entry in `apiConfig`. Adobe Express will not render a tone picker when tones are not configured in the manifest.

If you implement the `/tones` endpoint, always return at least one entry in the `tones` array. See [Endpoint Setup](../../guides/endpoint-setup.md#get-tones) for the endpoint contract.

## Can I use static options instead of API-sourced options for pickers?

Yes. Set `"dataSource": { "type": "Static", "value": [...] }` in your form input configuration to provide a fixed list of options. Use static options when the options do not change (for example, a fixed list of supported tones).

## How do I validate my manifest before loading it in the Playground?

Use the form builder in the Connector Playground. It validates your manifest in real time as you fill in fields and highlights errors as you type. Resolve all errors before selecting **Connect**. See [Connector Playground](../../guides/connector-playground.md) for details.

## Do I edit the manifest JSON directly?

No. Connector Playground generates the manifest through the form builder. The generated JSON is visible in the Playground, but direct editing is not supported in this release.

## Can I upload or paste an existing manifest into the Playground?

Not in this release. Manifest upload and paste are planned for a future release. Use the form builder to configure your connector.

## What is the Connector Playground?

The Connector Playground is a browser-based tool built into Adobe Express that allows you to load a connector manifest, run the authentication flow, verify API responses, and test the translation experience. It is available to enterprise Adobe accounts with a Developer or Administrator role, and to personal accounts approved through the [Connector interest form](https://airtable.com/appiNBn2w6uT0cpkR/pag3db7joqgtwXSOv/form).

## How do I access the Connector Playground?

Sign in to Adobe Express with your enterprise Adobe account, or a personal account approved through the Connector interest form. Access the Playground from the developer tools section within Adobe Express. See [Connector Playground](../../guides/connector-playground.md) for step-by-step instructions.

## Does the Playground save my work?

Yes. The Playground saves your manifest and connection state within your Adobe account session. Your last loaded manifest is restored when you return to the Playground.

## Can I test without a deployed service?

No. The Connector Playground calls your service endpoints directly. Your service must be running and reachable from your browser or from Adobe Express servers during testing.

## How do I submit my connector for distribution?

You have three distribution paths: an [internal listing](../../guides/submission/internal-listing.md) for users in your enterprise organization, a [public listing](../../guides/submission/public-listing.md) reviewed by Adobe and enabled for the users and enterprises you designate, or a [private share link](../../guides/submission/private-link.md) for targeted testers. Open **Your integrations** in Adobe Express, select your connector, then open the **Publish** tab (for internal or public listing) or the **Private link** tab. See [Submit your Connector](../../guides/submission/index.md) to compare the options.

## Can I publish a connector from a personal Adobe account?

Personal Adobe accounts must first request access using the [Connector interest form](https://airtable.com/appiNBn2w6uT0cpkR/pag3db7joqgtwXSOv/form). Once approved, personal accounts can create private share links and submit public listings, but cannot publish internal listings, because internal listings require an enterprise Adobe account.

## Can any Adobe Express user use a Translate connector?

Translate connectors, whether private, internal, or public, are currently supported for Adobe Express users signed in with an enterprise account.

## Can I monetize my connector?

Yes, when you publish your connector as a [public listing](../../guides/submission/public-listing.md). Internal listings and private share links are not monetized through Adobe Express. See the [connector monetization guidelines](../../guides/submission/monetization-guidelines.md) for supported payment models, payment options, and rules.

## How do I contact support?

Email the Adobe Express Translate Connectors team at [express-connectors-support@adobe.com](mailto:express-connectors-support@adobe.com). Include your Connector URL (copied from the Settings tab of your integration) and a description of your question or issue.

## Known Limitations

### Only the Translate connector type is supported

This release covers Translate connectors only.

### The locale picker form input must use `"id": "targetLocale"`

The `formInput` entry that displays the locale picker in the Translate panel must use `"id": "targetLocale"`. This value is required by manifest validation. Any other value will cause a validation error.

### The form input `id` value `"tone"` is reserved

Do not use `"id": "tone"` for a `formInput` entry in `uiConfig`. This value conflicts with an internal identifier used by Adobe Express and will cause unexpected behavior in the Translate panel. Use `"id": "tones"` instead.

### Connector Playground is the only authoring path

The manifest is generated through Connector Playground. Direct manifest upload and editing are not supported in this release.

### Connector submissions require account access

Submitting a connector (private link, internal listing, or public listing) requires an Adobe account with access. Enterprise Adobe accounts with a Developer or Administrator role get automatic access to private link and internal listing submission. Personal Adobe accounts must first request access using the [Connector interest form](https://airtable.com/appiNBn2w6uT0cpkR/pag3db7joqgtwXSOv/form). Public listings require separate approval for both personal and enterprise accounts. Submit the same [interest form](https://airtable.com/appiNBn2w6uT0cpkR/pag3db7joqgtwXSOv/form) so the team can review your use case. If **Connector** does not appear as an integration type in the **Create new integration** dialog, your account does not yet have access. See [Submit your Connector](../../guides/submission/index.md) to compare distribution options.

### Adobe Admin Console administration details are not yet finalized

Distribution through Adobe Admin Console is supported, but detailed step-by-step guidance will be added when the enterprise administration workflow is finalized.