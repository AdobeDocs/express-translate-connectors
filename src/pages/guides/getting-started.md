---
title: Getting Started with Adobe Express Connectors
description: Download developer resources, verify Connector Playground access, and learn the steps to build your first Adobe Express Connector.
audience:
  - developers
keywords:
  - adobe-express
  - connectors
  - getting-started
nav-title: Getting Started
content_type: how-to
sidebar: adobe-express-connectors
last-updated: 2026-06-18
hideBreadcrumbNav: true
---

# Getting Started with Adobe Express Connectors

Review prerequisites, download resources, set up the starter project, and verify Playground access before building your connector.

## What you need to build a connector

Building and distributing a connector involves three distinct components:

- **A backend service that conforms to the API spec.** Your service implements the five Translate connector HTTP endpoints (`/health`, `/locales`, `/tones`, `/translate`, `/feedback`) and returns responses that match the schema defined in the [Translate Connector API Reference](../reference/translate-api/index.md). This is the primary thing you need to build. The starter project gives you a working scaffold to start from.
- **Connector Playground to configure your manifest and test locally.** The Playground is a browser-based tool inside Adobe Express. You use it to fill in your connector details through a form builder, generate a `manifest.json`, and connect to your running service for end-to-end testing.
- **A distribution path to deliver the connector to users.** Once your connector is tested, you submit it from **Your integrations** in Adobe Express. Three paths are supported: an [internal listing](submission/internal-listing.md) for users in your enterprise organization, a [public listing](submission/public-listing.md) reviewed by Adobe and enabled for the users and organizations you designate, or a [private share link](submission/private-link.md) for targeted testers. See [Submit your Connector](submission/index.md) to compare the options and pick the right one. Internal listings require an enterprise Adobe account; personal Adobe accounts can't publish internal listings.

## Prerequisites

Before you continue, confirm you have the following:

- [**Adobe Express Connectors prerelease access**](https://www.adobeprerelease.com/beta/93675215-DEBF-47E3-E587-6C88E0C042C2/) granted through the [Adobe Prerelease Program](https://www.adobeprerelease.com)
- **A Developer or Administrator role** assigned to your Adobe account by your organization's Adobe administrator. This role is required to enable Add-on Development mode in Adobe Express, which gives you access to the Connector Playground. If you do not have this role, request it from your admin before continuing. If you are unsure who your administrator is, see [How do I contact my org administrator?](https://helpx.adobe.com/enterprise/kb/contact-administrator.html).
- **Node.js 18.8.0 or later**, required to run the TypeScript starter project. You can implement your connector in any language, but the starter project requires Node.js.

## Developer Resources

Three downloadable resources are provided to help you build your connector. All three are also available on the **Downloads** tab of the [Adobe Express Connectors Prerelease](https://www.adobeprerelease.com/beta/93675215-DEBF-47E3-E587-6C88E0C042C2/) program page once you are enrolled.

| Resource | Description |
|----------|-------------|
| [`translate-connector-api.yaml`](/static/translate-connector-api.yaml) | OpenAPI 3.0 specification defining the complete API contract. Use this to generate server stubs or run automated validation. For a human-readable version with examples, see the [Translate Connector API Reference](../reference/translate-api/index.md). |
| [`translate-connector-sdk.d.ts`](/static/translate-connector-sdk.d.ts) | TypeScript type definitions for all request and response payloads. Drop this into your project for compile-time safety and editor autocompletion without any registry setup. |
| [`translate-connector-standalone.zip`](/static/translate-connector-standalone.zip) | Self-contained Node.js starter project that implements all five Translate connector endpoints as stubs. Unzip, run `npm install && npm run serve`, and start building. The SDK type definitions are bundled inside with no registry access required. |

<InlineAlert slots="heading,text" />

**Resources are language-agnostic**

You can implement a Translate connector in any language or framework. The OpenAPI specification is the authoritative contract. The TypeScript types and starter project are provided for convenience and are not required.

## Use the Starter Project

The starter project is the fastest way to get a working connector service running locally before you integrate your own translation logic. Download [`translate-connector-standalone.zip`](translate-connector-standalone.zip) from the table above (or from the **Downloads** tab of the [prerelease program page](https://www.adobeprerelease.com/beta/93675215-DEBF-47E3-E587-6C88E0C042C2/) if you have any issues), then:

1. Unzip and install dependencies:

   ```bash
   npm install
   ```

2. Build and start the server (default port: 8787):

   ```bash
   npm run serve
   ```

3. Verify the service is running:

   ```bash
   curl http://localhost:8787/health
   ```

   Expected response: `{"message":"OK"}`

Open `src/server.ts` to implement your translation logic. The file contains a `MyTranslateConnector` class with all five endpoint methods already stubbed. Locate each `TODO` comment and replace the stub response with a call to your translation service API.

The starter project also includes built-in auth scaffolding. Set the `AUTH_TYPE` environment variable to `none` (default), `api_key`, or `bearer` to test each authentication mode locally before configuring it in the Playground.

The starter project includes CORS support via the `cors` middleware. This is required when testing with the Connector Playground, since Adobe Express makes requests from the browser to your local service. Your `curl` tests will work without it since `curl` is not affected by CORS. If you build your own service in a different language or framework, see [Enable CORS for Playground testing](endpoint-setup.md#enable-cors-for-playground-testing) before connecting.

<InlineAlert slots="heading, text" variant="warning" />

**Expose your local service over HTTPS for Playground testing**

Adobe Express runs over HTTPS and the Connector Playground calls your service directly from the browser. Plain `http://localhost` URLs may work in Chrome and Edge but are not portable, and Safari blocks them outright. Before connecting, expose your local service over HTTPS using a tunneling tool such as [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), or a local HTTPS reverse proxy with a trusted certificate (for example, [mkcert](https://github.com/FiloSottile/mkcert) paired with Caddy or nginx). Enter the HTTPS URL the tunnel or proxy provides in the API Configuration form. For deployed environments, a publicly trusted TLS certificate is required. See [HTTPS Requirements](endpoint-setup.md#https-requirements) for full details.

## Verify Connector Playground Access

The Connector Playground is the tool you will use to configure your connector, generate the manifest, and test end-to-end once your service is running.

Once you are approved for the prerelease program and have a Developer or Administrator role, open the Playground directly:

**[Open Connector Playground](https://www.adobe.com/go/connector-playground)**

This URL opens Adobe Express and launches the Connector Playground automatically. On first launch, review and accept the Adobe Express Connector Developer Terms of Use (DTOU) to continue.

![Adobe Express with the Connector Playground toggle enabled](./img/connector-playground.png)

<InlineAlert slots="heading, text" variant="info" />

**Connector Playground not visible?**

The toggle is only available to developers approved for the prerelease program. The most common reason it is missing is signing in with a different account than the one used to join the prerelease program. If the problem persists after confirming your account, contact [express-connectors-support@adobe.com](mailto:express-connectors-support@adobe.com).

If the Go URL does not open the Playground automatically, you can navigate to it manually:

<Details slots="heading, list" repeat="1" summary="Find the Connector Playground manually" />

- Steps:
  1. Sign in to [Adobe Express](https://www.adobe.com/express/) with the Adobe account that was approved for the prerelease program.
  2. Click the **Add-ons** icon in the left rail to open the Add-ons panel.
  3. Select the **Your add-ons** tab and scroll to the bottom of the panel until you see the **Add-on Development** section.
  4. Enable the **Connector Playground** toggle.
  5. **First time only:** A Developer Terms of Use dialog appears. Review and accept the Adobe Express Connector Developer Terms of Use (DTOU) to continue.

See [Connector Playground](connector-playground.md) for a full walkthrough of the Playground interface.

## Next Steps

With your resources downloaded and Playground access verified, follow this order:

1. **Implement your service endpoints.** Build the five HTTP endpoints defined in the API specification and choose your authentication method. See [Endpoint Setup](endpoint-setup.md) for authentication options, TypeScript response shape examples, and pre-Playground testing with `curl`.
2. **Configure your connector in the Playground.** Once your service is running, use the form builder in the Connector Playground to configure your connector and generate the manifest. See [Connector Playground](connector-playground.md) for a full walkthrough.
3. **Verify the end-to-end flow.** Confirm each endpoint matches the API contract, the connector loads and connects in the Playground, and the Translate panel behaves as expected. See [Test Your Service](test-your-service.md) for the recommended testing order, `curl` checks, and error-handling verification.
