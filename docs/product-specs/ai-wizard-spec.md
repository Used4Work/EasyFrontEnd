# AI Wizard Spec

The AI wizard collects a small set of guided answers and creates an initial landing-page DSL through an adapter.

## MVP Questions

- What kind of page are you making?
- Who is the audience?
- What is the primary offer?
- What action should visitors take?
- What tone should the page use?

## MVP Behavior

The MVP uses `mockAiAdapter` and returns one of the starter DSL projects. Real LLM integration must preserve the adapter contract.

## Current Implementation

The root route `/` uses a customer-first project start flow. Users select a landing-page scenario, adjust audience, offer, primary action, and tone, then generate a draft through `mockAiAdapter`. The generated DSL is saved to browser storage and opened in `/editor`.
