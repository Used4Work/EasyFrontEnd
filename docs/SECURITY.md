# Security

MVP uses a mock AI adapter and does not require API keys.

`.env.example` documents that no environment variables are required for the current MVP. Real secrets belong in `.env.local`, GitHub repository secrets, or deployment provider secrets, never in committed files.

Imported project JSON is validated against the DSL before rendering or saving. It must not be treated as executable code.

Uploaded sketch images are transient inputs for sketch parsing. The MVP mock parser does not send files to a network service and does not persist image data inside project DSL.

Future AI integrations must:

- Keep model/API keys in environment variables.
- Avoid logging sensitive user content.
- Define file-size, privacy, and retention limits before sending sketches to external vision models.
- Treat exported code as generated output, not trusted executable input.
- Validate imported DSL before rendering or exporting.
