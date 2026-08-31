---
title: Adobe Express Connectors Overview
description: Learn what Adobe Express Connectors are, what you can build, and the core concepts behind the manifest-driven integration model.
audience:
  - developers
content_type: concept
keywords:
  - adobe-express
  - connectors
nav-title: Overview

sidebar: adobe-express-connectors
last-updated: 2026-06-18
hideBreadcrumbNav: true
---

# Adobe Express Connectors Overview

## What is an Adobe Express Connector?

An Adobe Express Connector is a manifest-driven integration that lets your external service plug directly into Adobe Express workflows. You implement a set of HTTP endpoints, generate a `manifest.json` file, and Adobe Express handles the UI rendering, credential exchange, and API orchestration on behalf of your users. 

The first phase of the connectors support focuses on a single connector type: **Translate**. Your service provides translation capabilities and Adobe Express surfaces them through the built-in Translate panel.

## What you can do

- Build a Translate connector backed by your own service
- Configure the connector in Connector Playground
- Test the connector in the Adobe Express Translate panel
- Distribute the connector through an [internal listing](submission/internal-listing.md) for users in your enterprise organization, a [public listing](submission/public-listing.md) reviewed by Adobe and enabled for the users and enterprises you designate, or a [private share link](submission/private-link.md) for targeted testers. Start at [Submit your Connector](submission/index.md) to compare options.

### Development workflow

1. Implement the required Translate connector endpoints in your service.
2. Open Connector Playground in Adobe Express.
3. Use the form builder to define your connector configuration.
4. Connector Playground generates a `manifest.json` for your connector.
5. Select **Connect** to validate the manifest and verify service availability.
6. Open the Translate panel and test your connector in Adobe Express.
7. [Submit your connector](submission/index.md) as an internal listing, public listing, or private share link when it's ready to share.

## How Adobe Express calls your service

When a user opens the Translate panel in Adobe Express with your connector active, the following sequence occurs:

1. Adobe Express reads your connector manifest to discover endpoints, authentication, and UI configuration.
2. Adobe Express renders the Translate panel UI based on your `uiConfig`.
3. If your manifest declares API-sourced form inputs (for example, a locale picker backed by your `/locales` endpoint), Adobe Express calls that endpoint immediately to populate the input. This happens when the panel opens, so slow responses here affect how quickly the panel becomes usable.
4. When the user selects options and submits the translation request, Adobe Express sends a `POST` request to your `/translate` endpoint with the source text, target locale, and any selected options such as tone.
5. Adobe Express displays the translated result to the user.
6. If the user rates the translation, Adobe Express sends a `POST` request to your `/feedback` endpoint with the rating type, reason, and optional note.

This sequence means your `/locales` and `/tones` endpoints are called on panel open, not on translation submit. If those responses are slow, users see a loading state before the panel is ready. Consider caching those responses on your service side if the option lists are mostly static.

## Core concepts

### Connector

A connector is an integration that allows Adobe Express to call your service and render a product-defined UI based on your manifest configuration.

### Connector type

A connector type defines the capabilities and runtime contract for a specific category of integration. The first phase supports the **Translate** connector type.

### Manifest

The `manifest.json` describes your connector to Adobe Express. It includes metadata, endpoint configuration, authentication settings, and UI configuration.

### Connector Playground

Connector Playground is the development environment inside Adobe Express. Use it to configure a connector, generate the manifest, validate the configuration, and connect your service for testing.

## Next steps
- [Getting Started](./getting-started.md)
- [Endpoint Setup](./endpoint-setup.md)
- [Connector Playground](./connector-playground.md)
- [Test Your Service](./test-your-service.md)
