/* =========================================================
   Lógica compartida: fechas, datos (Firebase o demo) y calendario
   Firestore:  colección "fechas", documento "AAAA-MM-DD", campo { estado: "reservado" }
   Solo se guarda el estado. Nunca nombres ni tipo de evento.
   ========================================================= */
(function () {
  const C = window.SITE_CONFIG;
  const FB_VER = "10.12.2";
  const FB = (m) => `https://www.gstatic.com/firebasejs/${FB_VER}/firebase-${m}.js`;
  const configurado = !!(C.firebase && C.firebase.apiKey && C.firebase.projectId);

  const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const DIAS_CORTOS = ["Lu","Ma","Mi","Ju","Vi","Sá","Do"];

  const pad = (n) => String(n).padStart(2, "0");
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hoy = () => {
    const partes = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const valor = (tipo) => Number(partes.find(p => p.type === tipo).value);
    return new Date(valor("year"), valor("month") - 1, valor("day"));
  };
  const manana = () => { const d = hoy(); d.setDate(d.getDate() + 1); return d; };
  const desdeIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const largo = (d) => `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;

  /* ---------- Fuente de datos ---------- */
  let fb = null; // { db, fs, auth, authMod }

  async function initFirebase() {
    if (!configurado) return null;
    if (fb) return fb;
    const appMod = await import(FB("app"));
    const fs = await import(FB("firestore"));
    const app = appMod.initializeApp(C.firebase);
    fb = { app, fs, db: fs.getFirestore(app) };
    return fb;
  }

  // Demo: fechas de ejemplo (+ cambios del admin demo guardados en este navegador)
  const DEMO_KEY = "demo-fechas";
  function demoInicial() {
    const m = {};
    const base = hoy();
    // reserva algunos sábados y otros días de ejemplo
    let n = 0;
    for (let i = 1; i < 120; i++) {
      const d = new Date(base); d.setDate(base.getDate() + i);
      if (d.getDay() === 6) { n++; if (n % 2 === 0 || n === 1) m[iso(d)] = "reservado"; }
      else if (d.getDay() === 0 && n % 3 === 0) m[iso(d)] = "reservado";
    }
    return m;
  }
  function demoLeer() {
    try { const s = localStorage.getItem(DEMO_KEY); if (s) return JSON.parse(s); } catch (e) {}
    return demoInicial();
  }
  function demoGuardar(m) { try { localStorage.setItem(DEMO_KEY, JSON.stringify(m)); } catch (e) {} }
  const demoSubs = new Set();

  async function suscribir(cb) {
    if (!configurado) {
      const fn = () => cb(demoLeer());
      demoSubs.add(fn); fn();
      return () => demoSubs.delete(fn);
    }
    const { db, fs } = await initFirebase();
    return fs.onSnapshot(fs.collection(db, "fechas"), (snap) => {
      const m = {};
      snap.forEach((doc) => { const e = doc.data().estado; if (e === "reservado") m[doc.id] = e; });
      cb(m);
    }, (err) => { console.error(err); cb({}, err); });
  }

  async function setEstado(fecha, reservado) {
    if (!configurado) {
      const m = demoLeer();
      if (reservado) m[fecha] = "reservado"; else delete m[fecha];
      demoGuardar(m); demoSubs.forEach((f) => f());
      return;
    }
    const { db, fs } = await initFirebase();
    const ref = fs.doc(db, "fechas", fecha);
    if (reservado) await fs.setDoc(ref, { estado: "reservado", actualizado: fs.serverTimestamp() });
    else await fs.deleteDoc(ref);
  }

  /* ---------- Estado de un día ---------- */
  function estadoDe(d, mapa) {
    if (d < manana()) return "pasada";
    if (!C.diasHabilitados.includes(d.getDay())) return "cerrado";
    return mapa[iso(d)] === "reservado" ? "reservado" : "disponible";
  }

  /* ---------- Render del calendario ----------
     opts: { el, mapa, mes (Date), onSelect(fecha, estado), seleccion, admin } */
  function render(opts) {
    const { el, mapa, mes, onSelect, seleccion, admin } = opts;
    const y = mes.getFullYear(), mo = mes.getMonth();
    const primero = new Date(y, mo, 1);
    const offset = (primero.getDay() + 6) % 7; // semana parte el lunes
    const diasMes = new Date(y, mo + 1, 0).getDate();
    const etiquetas = { disponible: !configurado && !admin ? "Consultar disponibilidad" : "Disponible", reservado: "Reservado", pasada: "No disponible para reservar", cerrado: "No disponible" };

    let h = `<div class="cal-grid" role="grid">`;
    DIAS_CORTOS.forEach((d) => (h += `<div class="cal-dow" role="columnheader">${d}</div>`));
    for (let i = 0; i < offset; i++) h += `<div class="cal-empty"></div>`;
    for (let dia = 1; dia <= diasMes; dia++) {
      const d = new Date(y, mo, dia);
      const f = iso(d);
      const e = estadoDe(d, mapa);
      const clickable = admin ? e !== "pasada" : e === "disponible";
      const sel = seleccion === f ? " sel" : "";
      const esHoy = f === iso(hoy()) ? " hoy" : "";
      h += `<button type="button" class="cal-day ${e}${sel}${esHoy}" data-f="${f}" data-e="${e}" ${clickable ? "" : "disabled"}
              aria-label="${largo(d)}: ${etiquetas[e]}"><span>${dia}</span></button>`;
    }
    h += `</div>`;
    el.innerHTML = h;
    el.querySelectorAll(".cal-day:not([disabled])").forEach((b) =>
      b.addEventListener("click", () => onSelect && onSelect(b.dataset.f, b.dataset.e))
    );
  }

  window.Cal = { C, configurado, MESES, DIAS, iso, hoy, manana, desdeIso, largo, suscribir, setEstado, estadoDe, render, initFirebase, FB };
})();
