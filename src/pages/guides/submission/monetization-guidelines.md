---
title: Connector monetization guidelines
description: Pricing models, payment options, and rejected patterns for monetized Adobe Express Translate Connectors published as a public listing.
audience:
  - developers
content_type: reference
keywords:
  - adobe-express
  - connectors
  - monetization
  - public-listing
  - pricing
nav-title: Monetization guidelines
sidebar: adobe-express-connectors
last-updated: 2026-09-25
hideBreadcrumbNav: true
faq:
  - question: "Can I monetize my Adobe Express Connector?"
    answer: "Yes, when you publish your connector as a public listing. Internal listings and private share links are not monetized through Adobe Express."
  - question: "What payment models are supported?"
    answer: "Free, Free and paid plans available, Free trial, and Paid. For non-free models, choose one or more payment options: one-time payment, recurring subscription, or micro-transactions."
  - question: "Does Adobe Express handle checkout for connectors?"
    answer: "No. You build the checkout experience inside your own service or website. Adobe does not collect, process, or hold payments for connectors."
  - question: "Can I use the word Premium to describe my paid tier?"
    answer: "No. Premium is reserved for the Adobe Express Premium plan. Use words like Upgrade, Plus, Subscribe, or Pro for your paid tier."
---

# Connector monetization guidelines

These guidelines apply when you publish your Adobe Express Connector as a [public listing](public-listing.md). Internal listings and private share links are not monetized through Adobe Express, so these guidelines apply only when you fill in the **Monetization details** section of a public listing submission.

## General principles

Adobe expects every monetized connector to:

- Be honest about price, recurring fees, refund policy, and cancellation flow.
- Provide a clear support channel for billing and access questions.
- Comply with all applicable laws, including payment regulations, taxation, data privacy, and security.

### Transparency

Users must be able to:

- See the total price, including recurring fees, before they pay.
- Locate refund instructions (publish a refund policy on your site).
- Cancel any recurring payment, including subscriptions.
- Update their payment method.

### Support

Provide a support channel users can reach for billing, access, and refund requests. The support email on your listing's publisher profile is the canonical contact for end users.

### Premium terminology

Do not describe your paid tier as **Premium**. The word **Premium** is reserved for the Adobe Express Premium plan, which provides extra content, increased storage, and additional features. Adobe rejects submissions that use the word **Premium** for the connector's paid tier or that apply crown icons, the Adobe Express Premium gradient, or any styling associated with Adobe Express Premium.

Use neutral, action-oriented terms instead:

- Upgrade
- Subscribe
- Plus
- Pro

## Payment models

The [public listing](public-listing.md) **Monetization details** section requires you to select one model:

| Model | Description |
|---|---|
| Free | The connector is completely free to use. |
| Free and paid plans available | The connector can be used to some capacity for free. Users can pay for additional functionality or features. |
| Free trial | A free trial is offered. The user must pay to keep using the connector after the trial ends. |
| Paid | The user must pay to use the connector. |

## Payment options

When you choose a non-Free model, select one or more payment options:

| Option | Description |
|---|---|
| One-time payment | The user pays once for full access to the connector. |
| Recurring subscription | The user pays a recurring fee (for example, monthly or yearly) for upgraded access. |
| Micro-transactions | The user can purchase access to specific assets or features individually or in packages. |

You can combine options. For example, a connector with both a one-time unlock and a recurring premium tier should select both **One-time payment** and **Recurring subscription**.

## Examples by model

| Selection | What users see in the listing | Example connector copy |
|---|---|---|
| Free | "This connector does not require any payment." | "Free translation connector with support for 50 source languages." |
| Free and paid plans available | "Upgrade is available for additional functionality or features." | "Translate up to 1000 characters per session for free. Upgrade for unlimited characters and document-level translation." |
| Free trial | "A free trial is offered but the user must pay to continue." | "Try the advanced translation engine free for 7 days. Subscribe to continue after the trial." |
| Paid | "Upgrade is available through a one-time purchase." | "Unlock the connector with a one-time purchase. No subscription required." |

The live preview in the [submission form](public-listing.md#step-5-choose-monetization-details) shows how your selection renders on the connector's public listing detail page.

## Additional details field

The **Additional details** field (250 characters max) is your chance to state specific payment terms in plain text. Examples:

- "7-day free trial"
- "$9.99/month"
- "First 100 translations free, then $0.01 per character"
- "Annual subscription required for document translation"

Use this field to set price expectations clearly. Vague or misleading terms are a common [review](public-listing.md#what-adobe-reviews) rejection reason.

## Language and patterns to prefer

| Prefer | Avoid |
|---|---|
| "Upgrade today" | "Go Premium" |
| "Subscribe to access unlimited translations" | "This item is premium" |
| "Add this feature by upgrading the connector" | "Premium feature" |
| "You'll need to pay to upgrade outside of Adobe" | (No external-payment disclosure) |

Include a disclaimer in your own checkout flow (which runs outside Adobe Express) stating that upgrading the connector does not change the user's Adobe Express Premium status:

> "This upgrade only applies to the *[your connector name]* connector and does not grant or remove access to Adobe Express Premium."

## Related documentation

- [Public listing guide](public-listing.md)
- [Submit your Connector](index.md)
- [Internal listing guide](internal-listing.md)
- [Private share link guide](private-link.md)
- [Connector Playground](../connector-playground.md)
- [Connector manifest schema](../../reference/manifest-schema/index.md)
- [Getting Started](../getting-started.md)
- [FAQ](../../support/faqs/index.md)
- [Troubleshooting](../../support/troubleshooting/index.md)
- [Adobe Express add-on monetization guidelines](https://developer.adobe.com/express/add-ons/docs/guides/build/distribute/guidelines/monetization)
