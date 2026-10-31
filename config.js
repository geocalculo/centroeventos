/* =========================================================
   CONFIGURACIÓN DEL SITIO — edita solo este archivo
   ========================================================= */
window.SITE_CONFIG = {
  // Marca
  nombre: "Mi Pimiento",
  bajada: "Centro de Eventos · Máximo 30 personas",
  eslogan: "Donde los recuerdos florecen",
  dominio: "https://mipimiento.cl",
  precio: "$250.000",
  horario: "12:00–20:00",

  // WhatsApp: código país + número, sin "+", espacios ni guiones (ej: 56912345678)
  whatsapp: "56900000000",

  // Días de la semana que arriendas (0=domingo, 1=lunes … 6=sábado).
  // Los días que no estén aquí aparecen como "no disponible".
  // Ej. solo fines de semana: [5, 6, 0]
  diasHabilitados: [0, 1, 2, 3, 4, 5, 6],

  // Cuántos meses hacia adelante se puede navegar en el calendario
  mesesVisibles: 12,

  // Fotos (pon los archivos en la carpeta /fotos). Recomendado: JPG/WebP de 1600 px de ancho, < 300 KB.
  portada: "fotos/piscina.png",
  fotos: [
    { src: "fotos/piscina.png", titulo: "Piscina y áreas verdes", categoria: "Piscina" },
    { src: "fotos/Edificio de madera en jardín soleado.png", titulo: "Salón de madera junto al jardín", categoria: "Salón" },
    { src: "fotos/Salón rústico de cumpleaños iluminado.png", titulo: "Interior del salón para celebraciones", categoria: "Salón" },
    { src: "fotos/Pabellón de madera iluminado por la noche.png", titulo: "Salón iluminado por la noche", categoria: "Salón" },
    { src: "fotos/Jardín tranquilo al atardecer.png", titulo: "Jardín al atardecer", categoria: "Jardines" },
    { src: "fotos/Patio rústico con parrilla y piscina.png", titulo: "Patio con parrilla y vista a la piscina", categoria: "Instalaciones" }
  ],

  // Firebase: pega aquí la config de tu proyecto (Consola Firebase → Configuración del proyecto → Tus apps → Web).
  // Si lo dejas vacío, el sitio funciona en MODO DEMO con fechas de ejemplo.
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};
