---
title: Adobe Express Translate Connectors Guides
description: Build native service integrations for Adobe Express. Connect your translation or content service using a declarative manifest-driven framework.
audience:
  - developers
keywords:
  - adobe-express
  - connectors
nav-title: Guides
last-updated: 2026-09-25
hideBreadcrumbNav: true
---

<Superhero slots="heading, text" background="linear-gradient(180deg, #c946eb, #6372f5)" variant="default" textColor="white"/>

# Adobe Express Translate Connectors

Build native service integrations for Adobe Express using a declarative, manifest-driven connector framework. Connect your translation service directly into Adobe Express workflows without building a panel or UI from scratch.

Adobe Express Translate Connectors integrate third-party services directly into native Adobe Express features. You configure your integration through the Connector Playground, which generates a `manifest.json` that Adobe Express uses to render the UI and route API calls to your service. Connectors do not require a panel or custom UI code.

Adobe Express currently supports **Translate** connectors, which power the Translate feature in Adobe Express. Additional connector types are planned for future releases.

<DiscoverBlock slots="heading, link, text" width="33%"/>

## Start Here

[Getting Started](getting-started.md)

Download the developer resources and prepare your environment before building your first connector.

<DiscoverBlock slots="link, text" width="33%"/>

[Overview](overview.md)

Learn how translate connectors work, what you can build, and the core concepts behind the manifest-driven model.

<DiscoverBlock slots="link, text" width="33%"/>

[Endpoint Setup](endpoint-setup.md)

Choose an authentication method, implement the five Translate API endpoints, and test your service locally with the provided spec and sample code.

<DiscoverBlock slots="link, text" width="33%"/>

[App Builder Template](app-builder-template.md)

Skip hosting your own service. Deploy your Translate connector as Adobe I/O Runtime actions using the App Builder starter template.

<DiscoverBlock slots="heading, link, text" width="33%"/>

## Configure & Test

[Connector Playground](connector-playground.md)

Use the Connector Playground to configure your connector, generate the manifest, validate your setup, and connect your service.

<DiscoverBlock slots="link, text" width="33%"/>

[Test Your Service](test-your-service.md)

Verify each endpoint with `curl`, then validate the end-to-end integration in the Connector Playground and the Translate panel.

<DiscoverBlock slots="link, text" width="33%"/>

[Manifest Schema Reference](../reference/manifest-schema/index.md)

Understand every section of the `manifest.json` file: identity, app targets, API configuration, auth, and UI configuration.

<DiscoverBlock slots="heading, link, text" width="50%"/>

## References

[Translate API Reference](../reference/translate-api/index.md)

Complete HTTP API contract for Translate connectors: all endpoints, request/response schemas, and error codes.

<DiscoverBlock slots="link, text" width="50%"/>

[FAQ and Known Limitations](../support/faqs/index.md)

Answers to common questions about Adobe Express Translate Connectors and known limitations.

<DiscoverBlock slots="heading, link, text" width="50%"/>

## Support

[Troubleshooting](../support/troubleshooting/index.md)

Diagnose and resolve common errors in the Connector Playground, manifest validation, authentication, and the Translate panel.

<DiscoverBlock slots="heading, link, text" width="50%"/>

## Distribute

[Submit your Connector](submission/index.md)

Distribute your connector through an internal listing, a public listing, or a private share link. Compare options and start the submission process.