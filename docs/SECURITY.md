# Security

MVP uses a mock AI adapter and does not require API keys.

Future AI integrations must:

- Keep model/API keys in environment variables.
- Avoid logging sensitive user content.
- Treat exported code as generated output, not trusted executable input.
- Validate imported DSL before rendering or exporting.
