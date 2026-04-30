# DSL-First Rendering

EasyFrontEnd does not ask AI to directly emit final, uncontrolled frontend code because that would make the page hard to inspect, edit, validate, and export consistently.

Preview, save state, quality scoring, and export all come from the same DSL. This prevents the visual canvas from drifting away from generated code.

The DSL supports visual editing by breaking a page into typed sections with semantic content and constrained style choices. Inspector controls mutate these fields, and the renderer turns them into a stable UI.
