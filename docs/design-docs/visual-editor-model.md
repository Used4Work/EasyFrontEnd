# Visual Editor Model

EasyFrontEnd editing exists at four levels:

## Page-Level Editing

Users choose page type, industry scenario, tone, overall color, and density.

## Section-Level Editing

Users add, remove, hide, duplicate, reorder, and configure sections such as Hero, Pricing, FAQ, and CTA.

In the MVP, section reorder is available through drag interactions in the page structure tree and directly on the rendered canvas. This still changes the DSL, not a separate visual-only layer model.

## Component-Level Editing

Users edit business content inside a section, such as feature cards, FAQ items, plan benefits, CTA labels, or image placeholders.

## Advanced Code-Level Editing

Future versions may expose generated code or advanced token controls for technical users.

The MVP implements parts of the first three levels. It does not make code-level editing a core workflow.
