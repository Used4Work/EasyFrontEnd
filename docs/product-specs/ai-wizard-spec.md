# AI Wizard Spec

The AI wizard is auxiliary. It collects a small set of guided answers and creates an initial landing-page DSL through an adapter, but the primary product surface is the visual editor.

## MVP Questions

- What kind of page are you making?
- Who is the audience?
- What is the primary offer?
- What action should visitors take?
- What tone should the page use?

## MVP Behavior

The MVP uses `mockAiAdapter` and returns one of the starter DSL projects. Real LLM integration must preserve the adapter contract.

## Current Implementation

The `/start` route uses the customer-first AI draft flow. Users select a landing-page scenario, adjust audience, offer, primary action, and tone, then generate a draft through `mockAiAdapter`. The generated DSL is saved to browser storage and opened in the editor-first `/` route.
