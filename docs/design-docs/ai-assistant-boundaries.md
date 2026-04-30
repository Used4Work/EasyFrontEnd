# AI Assistant Boundaries

AI is a design assistant for drafting and improving structured page DSL. It is not the final authority over user intent.

## Allowed

- Generate an initial DSL draft from guided answers.
- Suggest clearer copy for a selected section.
- Recommend adding proof, FAQ, pricing, or CTA sections.
- Explain quality score issues in beginner-friendly language.

## Not Allowed

- Replace the entire page without explicit user confirmation.
- Create an opaque code blob that cannot be visually edited.
- Mutate exported code separately from the DSL.
- Hide important design tradeoffs from the user.

The MVP uses `mockAiAdapter` so the adapter contract is ready before real LLM integration.
