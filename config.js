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
  whatsapp: "56985962740",

  // Días de la semana que arriendas (0=domingo, 1=lunes … 6=sábado).
  // Los días que no estén aquí aparecen como "no disponible".
  // Ej. solo fines de semana: [5, 6, 0]
  diasHabilitados: [0, 1, 2, 3, 4, 5, 6],

  // Cuántos meses hacia adelante se puede navegar en el calendario
  mesesVisibles: 12,

  // Fotos (pon los archivos en la carpeta /fotos). Recomendado: JPG/WebP de 1600 px de ancho, < 300 KB.
  portada: "fotos/piscina1.png",
  fotos: [
    { src: "fotos/piscina1.png", titulo: "Piscina y áreas verdes", categoria: "Piscina" },
    { src: "fotos/exterior1.png", titulo: "Salón de madera junto al jardín", categoria: "Salón" },
    { src: "fotos/salon1-dia.png", titulo: "Interior del salón para celebraciones", categoria: "Salón" },
    { src: "fotos/ingreso2-noche.png", titulo: "Salón iluminado por la noche", categoria: "Salón" },
    { src: "fotos/ingreso1.png", titulo: "Jardín al atardecer", categoria: "Jardines" },
    { src: "fotos/parrilla1.png", titulo: "Patio con parrilla y vista a la piscina", categoria: "Instalaciones" }
  ],

  // Firebase: pega aquí la config de tu proyecto (Consola Firebase → Configuración del proyecto → Tus apps → Web).
  // Si lo dejas vacío, la web permite consultar fechas por WhatsApp, sin agenda sincronizada.
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};
