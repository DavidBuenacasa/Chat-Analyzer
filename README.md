🌐 **Languages:** English | [Español](README.es.md)

# chat-analyzer 💬📊

A web application for analyzing exported WhatsApp conversations and visualizing communication patterns through charts and statistics.

Import a `.txt` file, select the source platform, and explore your conversation through an interactive dashboard.

## Features

- 📁 Upload files using the file picker or drag and drop.
- 📊 Compare message counts by year and participant.
- 📅 Explore monthly activity.
- 🍩 View message types: text, audio, photos, videos, stickers, GIFs, and omitted media.
- 🔎 Filter by period and participant, including an all-years view.
- 📋 Inspect monthly breakdowns and totals in a detailed table.
- 👥 View the participants recognized by the analyzer.
- 📱 Responsive layout for desktop and mobile devices.
- 🌙 Dark mode styles.

> Statistics reflect the messages recognized by the analyzer in the exported file. Content classification depends on the export format and the markers present in the conversation.

## Compatibility

| Source platform | Status |
| --- | --- |
| iPhone / iOS | Supported for export formats recognized by the analyzer |
| Android | Not yet implemented |

The source platform is the device used to export the chat. The application itself can run in a web browser on Windows, macOS, or Linux.

## Tech stack

- React 18 and TypeScript.
- Vite 5.
- React Router.
- Recharts.
- Tailwind CSS and Flowbite React.
- ESLint and Prettier.

## Getting started

### Requirements

- A Node.js version compatible with the project's dependencies.
- npm.
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/DavidBuenacasa/chat-analyzer.git
cd chat-analyzer
```

### 2. Install dependencies

If the repository includes a `package-lock.json` file, run:

```bash
npm ci
```

Otherwise, use:

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the address displayed by Vite in your terminal, typically `http://localhost:5173`.

> On Windows, you can run these commands in PowerShell or the integrated terminal in Visual Studio Code.

## Analyzing a conversation

1. Export a WhatsApp conversation from an iPhone using **Export Chat → Without Media**.
2. If the export produces a `.zip` archive, extract it first.
3. Open chat-analyzer and select or drag in the `.txt` file.
4. Select **iPhone** as the source platform.
5. Click the analysis button (**Analizar conversación** in the current Spanish interface).
6. Explore the charts and use the dashboard filters.

Export option names may vary depending on your WhatsApp version and language. See the [WhatsApp Help Center](https://faq.whatsapp.com/) for official instructions.

### Limitations

- Android support is not yet implemented.
- Only `.txt` files are accepted; extract `.zip` archives before importing them.
- The export format or language may affect message recognition.
- Only messages included in the exported file can be analyzed.
- Large files may take longer to process and temporarily affect interface responsiveness.
- You must analyze a conversation before viewing its dashboard.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Checks TypeScript and generates the build in `dist`. |
| `npm run preview` | Serves a local preview of the generated build. |
| `npm run typecheck` | Checks types without generating files. |
| `npm run lint` | Runs ESLint. |
| `npm run lint:fix` | Applies automatic ESLint fixes. |
| `npm run format` | Formats files with Prettier. |
| `npm run format:check` | Checks file formatting. |
| `npm run server` | Runs `dist/server/server.js`, if that file has already been generated. |

### Previewing the build

```bash
npm run build
npm run preview
```

The preview address appears in the terminal. `preview` is intended for checking the build locally; it is not a production server.

## Docker deployment 🐳

These commands require Docker and a `Dockerfile` configured to serve the application on port **3000** inside the container.

### Build the image

From the repository root:

```bash
docker build -t chat-analyzer-image .
```

### Start the container

```bash
docker run -d -p 8459:3000 --name chat-analyzer --restart unless-stopped chat-analyzer-image
```

Open `http://localhost:8459`, or use the IP address of the machine running Docker.

> If the container's server uses a different port, adjust the second number in `8459:3000`. The server must listen on an interface accessible from outside the container.

### View logs

```bash
docker logs -f chat-analyzer
```

## Development and contributions

Suggestions and bug reports are welcome. Open an issue or submit a pull request in the repository.

Before submitting changes, run:

```bash
npm run typecheck
npm run lint
npm run build
```

When reporting parser issues, include an anonymized sample that preserves the original dates, separators, and formatting. Avoid publishing real conversations or personal information.

## Author

**David Buenacasa** · [GitHub](https://github.com/DavidBuenacasa)

## License

This project is licensed under **GNU GPLv3**. See [LICENSE.md](LICENSE.md) for details.
