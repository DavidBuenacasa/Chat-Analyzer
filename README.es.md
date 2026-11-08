🌐 **Idiomas:** [English](README.md) | Español

# WhatsApp Analyzer 💬📊

Aplicación web para analizar conversaciones exportadas de WhatsApp y visualizar sus patrones de comunicación mediante gráficos y estadísticas.

Importa un archivo `.txt`, selecciona la plataforma de origen y explora la actividad de la conversación desde un dashboard interactivo.

## Características

- 📁 Selección de archivos mediante el explorador o arrastrar y soltar.
- 📊 Comparación del número de mensajes por año y participante.
- 📅 Visualización de la actividad mensual.
- 🍩 Distribución de mensajes por tipo: texto, audio, fotos, vídeos, stickers, GIF y multimedia omitida.
- 🔎 Filtros por periodo y participante, incluida la opción de consultar todos los años.
- 📋 Tabla mensual con el desglose y los totales.
- 👥 Visualización de los participantes reconocidos por el analizador.
- 📱 Diseño adaptable a móviles y ordenadores.
- 🌙 Estilos para modo oscuro.

> Las estadísticas reflejan los mensajes que el analizador reconoce en el archivo exportado. La clasificación de contenido depende del formato y de los indicadores presentes en el chat.

## Compatibilidad

| Plataforma de origen | Estado |
| --- | --- |
| iPhone / iOS | Compatible con el formato admitido por el analizador |
| Android | Pendiente de implementación |

La plataforma de origen es el dispositivo desde el que se exportó el chat. La aplicación puede ejecutarse en un navegador de Windows, macOS o Linux.

## Tecnologías

- React 18 y TypeScript.
- Vite 5.
- React Router.
- Recharts.
- Tailwind CSS y Flowbite React.
- ESLint y Prettier.

## Instalación y ejecución local

### Requisitos

- Node.js compatible con las dependencias del proyecto.
- npm.
- Git.

### 1. Clona el repositorio

```bash
git clone https://github.com/DavidBuenacasa/Whatsapp-Analyzer.git
cd Whatsapp-Analyzer
```

### 2. Instala las dependencias

Si el repositorio incluye `package-lock.json`, ejecuta:

```bash
npm ci
```

Si no incluye ese archivo, utiliza:

```bash
npm install
```

### 3. Inicia el entorno de desarrollo

```bash
npm run dev
```

Abre la dirección que muestre Vite en la terminal, habitualmente `http://localhost:5173`.

> En Windows puedes ejecutar estos comandos desde PowerShell o desde la terminal integrada de Visual Studio Code.

## Cómo analizar una conversación

1. Exporta una conversación de WhatsApp desde un iPhone mediante la opción **Exportar chat → Sin archivos**.
2. Si la exportación genera un archivo `.zip`, extráelo.
3. Abre WhatsApp Analyzer y selecciona o arrastra el archivo `.txt`.
4. Selecciona **iPhone** como plataforma de origen.
5. Pulsa **Analizar conversación**.
6. Explora los gráficos y utiliza los filtros del dashboard.

Los nombres de las opciones de exportación pueden variar según la versión o el idioma de WhatsApp. Consulta el [Centro de ayuda de WhatsApp](https://faq.whatsapp.com/) para obtener las instrucciones oficiales.

### Limitaciones

- Android todavía no está implementado.
- Se admiten archivos `.txt`; los archivos `.zip` deben extraerse antes de importarlos.
- El formato o idioma de la exportación puede afectar al reconocimiento de mensajes.
- Solo se analizan los mensajes incluidos en el archivo exportado.
- Los archivos grandes pueden tardar en procesarse y afectar temporalmente a la respuesta de la interfaz.
- Para abrir el dashboard es necesario haber analizado una conversación.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Comprueba TypeScript y genera la compilación en `dist`. |
| `npm run preview` | Sirve una vista previa local de la compilación generada. |
| `npm run typecheck` | Comprueba los tipos sin generar archivos. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run lint:fix` | Aplica las correcciones automáticas de ESLint. |
| `npm run format` | Formatea los archivos con Prettier. |
| `npm run format:check` | Comprueba el formato de los archivos. |
| `npm run server` | Ejecuta `dist/server/server.js`, si ese archivo se ha generado previamente. |

### Vista previa de la compilación

```bash
npm run build
npm run preview
```

La dirección de la vista previa aparece en la terminal. `preview` está pensado para comprobar la compilación localmente; no sustituye a un servidor de producción.

## Despliegue con Docker 🐳

Los siguientes comandos requieren Docker y un `Dockerfile` configurado para servir la aplicación en el puerto **3000** del contenedor.

### Construye la imagen

Desde la raíz del repositorio:

```bash
docker build -t whatsapp-analyzer-image .
```

### Inicia el contenedor

```bash
docker run -d -p 8459:3000 --name whatsapp-analyzer --restart unless-stopped whatsapp-analyzer-image
```

Abre `http://localhost:8459` o utiliza la dirección IP del equipo donde se ejecuta Docker.

> Si el servidor del contenedor utiliza otro puerto, adapta el segundo número de `8459:3000`. El servidor debe escuchar en una interfaz accesible desde fuera del contenedor.

### Consulta los registros

```bash
docker logs -f whatsapp-analyzer
```

## Desarrollo y contribuciones

Las propuestas de mejora y los informes de errores son bienvenidos. Puedes abrir una incidencia o enviar una pull request en el repositorio.

Antes de enviar cambios, ejecuta:

```bash
npm run typecheck
npm run lint
npm run build
```

Para comunicar problemas del analizador, incluye una muestra anonimizada que conserve las fechas, los separadores y el formato original. Evita publicar conversaciones reales o datos personales.

## Autor

**David Buenacasa** · [GitHub](https://github.com/DavidBuenacasa)

## Licencia

Este proyecto se distribuye bajo la licencia **GNU GPLv3**. Consulta el archivo [LICENSE.md](LICENSE.md) para conocer sus condiciones.
