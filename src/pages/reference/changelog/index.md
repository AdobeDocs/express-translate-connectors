---
title: Adobe Express Translate Connectors Changelog
description: Version history and release notes for the Adobe Express Translate Connectors manifest schema and Translate connector API contract.
audience:
  - developers
doc-type:
  - reference
keywords:
  - adobe-express
  - connectors
  - reference
  - changelog
nav-title: Changelog
sidebar: adobe-express-connectors
last-updated: 2026-09-28
hideBreadcrumbNav: true
---

# Adobe Express Translate Connectors Changelog

## 2026-09-28

Adobe Express Translate Connectors is now **generally available (GA)**. This documentation is public, and eligible accounts can use the Connector Playground and submit connectors without prerelease program enrollment.

### Added

- Self-service Secure API Key credential management. Add, update, or delete your connector's Secure API Key from the **Connector credentials** section of the **Settings** tab in Your integrations. Takes effect immediately, no email or confirmation from Adobe required. A connector has a single Secure API Key credential that applies globally, replacing the previous per-organization registration process. See [Register your Secure API Key with Adobe](../../guides/submission/index.md#register-your-secure-api-key-with-adobe).
- Connector Playground: **Upload a manifest**. Use **More > Upload manifest** to load an existing `manifest.json` into your current session instead of rebuilding it field by field in the form builder. See [Upload a manifest](../../guides/connector-playground.md#upload-a-manifest).
- Connector Playground: a reminder toast now appears when you select **Secure API Key** in the Authentication Type dropdown, and the **Connect** button is disabled for the rest of the session since Secure API Key connectors can't be tested end to end in the Playground yet. See [Secure API Key](../../guides/connector-playground.md#secure-api-key).

### Changed

- Enterprise Adobe accounts with a Developer or Administrator role get automatic access to the Connector Playground and connector submission for private link sharing and internal listings.
- Personal Adobe accounts must request access using the new [Connector interest form](https://airtable.com/appiNBn2w6uT0cpkR/pag3db7joqgtwXSOv/form) before using the Connector Playground or submitting a connector.
- Personal Adobe accounts approved through the interest form can now open a private share link, not just create one. This requirement applies to anyone opening the link, not only its creator: an enterprise account, or a personal account separately approved through the interest form, is required either way. See [Private share link: Treat the link like a credential](../../guides/submission/private-link.md#before-you-begin).
- Public listing distribution remains gated for every account, enterprise or personal, and requires separate approval. Request access using the same [Connector interest form](https://airtable.com/appiNBn2w6uT0cpkR/pag3db7joqgtwXSOv/form).

## 2026-09-08

### Added

- New [App Builder Translation Template](../../guides/app-builder-template.md) guide, covering how to build and deploy a Translate connector as Adobe I/O Runtime actions using the `translate-connector-compatibility-service` starter template. Covers App Builder vs. standalone hosting tradeoffs, required and optional actions, OAuth-secured action variants, environment variable configuration, and deployment to Adobe I/O Runtime.

## 2026-08-03

### Added

- Self-service [public listing submission](../../guides/submission/public-listing.md) for connectors. After Adobe review, Adobe enables the connector for the users and enterprises you designate.
- Self-service [private share link](../../guides/submission/private-link.md) for connectors. Share a connector with specific testers or stakeholders without publishing it broadly.
- [Monetization guidelines](../../guides/submission/monetization-guidelines.md) for connectors, covering supported payment models, payment options, and patterns to avoid.
- New [Submit your Connector](../../guides/submission/index.md) overview that compares the three distribution paths (private link, internal listing, public listing), walks through the shared setup steps in Your integrations, and provides a consolidated field reference for every submission form.
- **Secure API Key** authentication is now available for production connectors, and is selectable in the Connector Playground's Authentication Configuration dropdown. Declare `"type": "SECURE_API_KEY"` in `authConfig` and use the `$secureApiKey` placeholder in `apiConfig.headers` for the header your service validates. Adobe's secure bridge resolves the key per the user's Adobe org and injects it at request time, so the key never appears in the manifest or on client devices. In this release, the Playground supports Secure API Key for manifest generation only: end-to-end testing of Secure API Key connectors in the Playground isn't supported yet. Test your connector with API Key first, then switch to Secure API Key before downloading the manifest. See [Connector Playground: Secure API Key](../../guides/connector-playground.md#secure-api-key) and [Endpoint Setup: Secure API Key](../../guides/endpoint-setup.md#option-3-secure-api-key).
- [Register your Secure API Key with Adobe](../../guides/submission/index.md#register-your-secure-api-key-with-adobe), a new section in the Submit your Connector guide covering the connector ID and organization ID handoff for Secure API Key connectors. Registration applies to any listing type (private, internal, or public). Public listings must complete it before submitting for review so the review team can sign in and test the connector.

### Changed

- The internal listing guide moved from `guides/submission/index.md` to [guides/submission/internal-listing.md](../../guides/submission/internal-listing.md). The overview page replaces the previous guide at the original URL.
- Moved Secure API Key registration guidance from Endpoint Setup to [Submit your Connector](../../guides/submission/index.md#register-your-secure-api-key-with-adobe), since registration needs a connector ID that isn't assigned until you create a connector listing.
- Public listing guidance now asks developers to gather a connector ID, target organization details, a test account, and a private share link before submitting for review, instead of after approval. See [Get your connector ready for review](../../guides/submission/public-listing.md#get-your-connector-ready-for-review).

## 2026-06-01

### Added

- Self-service [internal listing submission](../../guides/submission/internal-listing.md). (Enterprise Adobe account required).

## May 2026

### Added

- Initial release of the [Connector Playground](../../guides/connector-playground.md) for configuring and testing translate connectors inside Adobe Express.