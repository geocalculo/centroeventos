# Mi Pimiento | Centro de Eventos

**Donde los recuerdos florecen** · Dominio de referencia: https://mipimiento.cl/

## Vista local en VS Code

Abre esta carpeta en VS Code. Con la extensión Live Server instalada, haz clic derecho sobre `index.html` y selecciona **Open with Live Server**. Abre `admin.html` en la misma dirección para revisar el panel demo. No se necesita compilación ni configurar Firebase para visualizar el sitio.

El dominio es una referencia de marca y metadatos; su conexión al alojamiento y DNS queda pendiente. Se incluyen las siete fotos disponibles de `fotos/`; el contacto real sigue pendiente. La ubicación se entrega personalmente a cada cliente. La sección Nuestra historia está dedicada a María Inah Echegaray Aguirre, nacida en Copiapó en 1904 y fallecida en Copiapó a los 85 años, sin fotografía.

**FOTOS → DISPONIBILIDAD → WHATSAPP**

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Web pública: portada, galería, calendario, qué incluye, compartir |
| `admin.html` | Panel privado: **Bloquear fecha / Liberar fecha** (nada más) |
| `config.js` | **Lo único que editas**: nombre, precio, WhatsApp, fotos, Firebase |
| `calendario.js` | Lógica compartida del calendario y Firestore (no hace falta tocarlo) |
| `firestore.rules` | Seguridad: todos leen, solo tu correo escribe |
| `firebase.json` | Configuración de Firebase Hosting |
| `fotos/` | Aquí van las fotos |

## Cómo funciona la agenda

- Firestore, colección `fechas`, un documento por día: `2026-11-14 → { estado: "reservado" }`.
- **Toda fecha que no esté bloqueada se muestra disponible** (si el día de la semana está en `diasHabilitados`).
- Liberar una fecha = borrar su documento. Así la base de datos solo tiene las fechas ocupadas.
- Públicamente solo se ve *Disponible / Reservado / Fecha pasada*. Las reglas de Firestore **impiden** guardar cualquier otro dato (nombres, tipo de evento, etc.).
- Si ya tienes documentos con `estado: "disponible"`, también funcionan (se tratan como libres).

## Puesta en marcha (≈15 min)

1. **Fotos**: copia 1 portada + 8 fotos en `fotos/` con estos nombres (o cambia los nombres en `config.js`):
   `portada.jpg, piscina.png, quincho.jpg, parrilla.png, cocina-lena.jpg, quincho-interior.jpg, piscina-tarde.jpg, jardin.jpg, estacionamiento.jpg`
   Recomendado: 1600 px de ancho, JPG/WebP, menos de 300 KB cada una (squoosh.app las optimiza gratis).
2. **config.js**: pon el nombre, tu WhatsApp (`569XXXXXXXX`).
3. **Firebase** (consola.firebase.google.com):
   - Crea/abre el proyecto → *Firestore Database* → crear (modo producción).
   - *Authentication* → *Sign-in method* → activa **Correo/contraseña** → *Users* → agrega tu usuario (`geocalculo@gmail.com`).
   - *Configuración del proyecto* → *Tus apps* → app web → copia el objeto `firebaseConfig` dentro de `firebase:` en `config.js`.
   - Si usarás otro correo de admin, cámbialo en `firestore.rules`.
4. **Publicar**:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase use --add          # elige tu proyecto
   firebase deploy             # sube la web y las reglas
   ```
   Quedará en `https://TU-PROYECTO.web.app` (puedes conectar un dominio propio en Hosting).
5. **Admin**: entra a `https://TU-PROYECTO.web.app/admin.html` desde el celular, inicia sesión y guárdalo en la pantalla de inicio.
6. En `index.html` cambia la imagen `og:image` por la URL completa de tu portada (para que WhatsApp muestre la foto al compartir).

## Mensaje de WhatsApp

Al tocar un día libre y luego *Consultar por WhatsApp*, se abre:

> Hola! Vi la web de Mi Pimiento y quiero consultar por el sábado 14 de noviembre de 2026 (12:00–20:00). ¿Está disponible?

El texto se edita en `index.html` (busca `Vi la web de`).

## Modo demo

Mientras `firebase.apiKey` esté vacío, la web muestra fechas de ejemplo y el admin guarda los cambios solo en el navegador. Aparece una etiqueta amarilla “Modo demo” para que no se olvide.

## Fotografías comerciales

La portada utiliza `fotos/piscina.png`. La galería muestra las siete fotos disponibles, agrupadas en Piscina, Salón, Jardines e Instalaciones. Solo se incluyen en la galería archivos disponibles; agrega nuevas entradas a `config.js` al incorporar más fotos.

Copia las fotos reales dentro de `fotos/`. Los espacios pendientes se reemplazan al cargar los archivos y recargar la página con Live Server.

- `portada.jpg`: panorámica del recinto; recomendado 2400 × 1350 px, sujeto principal centrado para el recorte móvil.
- `piscina.png`, `piscina-tarde.jpg`: piscina.
- `quincho.jpg`, `quincho-interior.jpg`: quincho.
- `jardin.jpg`: jardines.
- `parrilla.png`, `cocina-lena.jpg`, `banos.jpg`, `estacionamiento.jpg`: instalaciones.

Optimiza los JPG antes de copiarlos (idealmente menos de 400 KB por foto de galería y menos de 700 KB para la portada). No se incluyen fotografías ficticias. La ficha comercial presenta capacidad de 30 personas, horario de 12:00 a 20:00 horas, valor referencial de $250.000 CLP y servicios de piscina, baños, parrilla y cocina a leña.
