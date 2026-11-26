(() => {
  "use strict";
  const CYP = (window.CYP = {});
  const L10 = Math.log10;
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

  const I18N = {
    es: {
      "tab.inicio": "Inicio",
      "tab.pruebalo": "Pruébalo",
      "tab.hemeroteca": "Hemeroteca",
      "tab.info": "Más info",
      "lang.cur": "Español · cambiar a English",
      "mode.s": "s-valor (caras seguidas)",
      "mode.p": "p-valor",
      "q.mode":
        "<b>p</b>: probabilidad de ver al menos una desviación así por puro azar, si los datos siguieran la ley.<br><b>s</b>: lo mismo, contado como caras seguidas al lanzar una moneda (s = −log₂ p).",
      "home.h1": "¿Siguen los votos en España el patrón numérico esperado?",
      "home.lead":
        "En casi cualquier lista de datos reales hay más números que empiezan por 1 que por 9. Este fenómeno se llama Ley de Benford. Aquí lo comprobamos con las elecciones generales en España desde 1977, más abajo con algunos casos célebres e incluso puedes probar con tus propios datos.",
      "home.examples":
        "Casos célebres. Cada barra indica qué parte de los números empieza por 1, por 2… hasta 9. La línea discontinua marca lo que predice la ley y las barras rojas se salen de lo esperado. Pulsa «¿Qué estoy viendo?» para conocer la historia de cada caso.",
      "home.what": "¿Qué estoy viendo?",
      "cd.d": "días",
      "cd.h": "horas",
      "cd.m": "min",
      "cd.s": "s",
      "hem.h1": "Hemeroteca",
      "hem.lead":
        "Elige unas elecciones generales, de 1977 a 2023, en el desplegable «Convocatoria». En «Análisis» verás si los votos de cada partido en cada provincia siguen el patrón de la Ley de Benford. En «Resultados» tienes las tablas oficiales con todos los votos y la participación.",
      "hem.camara": "Cámara",
      "hem.cera": "Extranjero",
      "hem.prov": "Provincia",
      "hem.censo": "Censo exterior",
      "hem.none": "Ninguna cifra cumple los filtros.",
      "hem.byparty": "Por candidatura",
      "try.h1": "Pruébalo",
      "try.lead":
        "Sube tus datos en Excel (.xlsx, .xls, .ods), CSV, PDF, Word (.docx), texto (.txt) o una foto (JPG, PNG) y te mostraremos cuánto se ajustan a la Ley de Benford: si la primera cifra de tus números sigue el patrón esperado. Todo se calcula en tu navegador; el archivo no sale de tu equipo.",
      "try.drop": "Arrastra o elige un archivo o una foto",
      "try.btn": "Analizar",
      "info.h1": "Más info",
      congreso: "Congreso",
      senado: "Senado",
      censo: "Censo exterior",
      OTROS: "Otros",
      yours: "Tus datos",
      "fig.n": "Cifras",
      "fig.mad": "Desviación",
      "fig.s": "s-valor",
      "fig.p": "p-valor",
      "fig.dstar": "Distancia",
      "fig.orders": "Escala",
      "conf.close": "muy cerca",
      "conf.acceptable": "cerca",
      "conf.marginal": "dudoso",
      "conf.non": "no se ajusta",
      "conf.na": "—",
      "t.d1": "Primer dígito",
      "t.d2": "Segundo dígito",
      "t.f2": "Dos primeros dígitos",
      "t.l1": "Último dígito",
      "t.pos": "Dígitos por posición",
      "t.sus": "Cifras sospechosas",
      "t.dup": "Cifras repetidas",
      "t.img": "Mapa de la imagen",
      "leg.out": "Anómalo",
      "leg.exp": "Benford",
      "leg.unif": "Uniforme",
      "chart.tip": "<b>{label}</b>&ensp;{obs} ({exp} {ref})&ensp;#{count}",
      "col.line": "#",
      "col.value": "Cifra",
      "col.context": "Dónde",
      "status.reading": "Leyendo {name}…",
      "status.done": "✓ {n} cifras",
      "status.none": "✗ No hay cifras en {name}",
      "status.error": "✗ {name}: {msg}",
      "status.lib": "Cargando lector…",
      "img.pal.seq": "secuencial",
      "img.pal.rb": "arcoíris",
      copy: "Copiar diagrama",
      pause: "Pausar",
      play: "Reanudar",
      copied: "✓ Diagrama copiado",
      copyfail: "✗ No se pudo copiar",
      pct: "Tabla de porcentajes",
      "q.n": "Cuántos números se han analizado. Los ceros no cuentan.",
      "q.mad":
        "Cuánto se aparta, de media, cada barra de la línea de la ley (MAD) <i>(Nigrini, 2012)</i>.<br><span class='lamp g'></span> ✓✓ muy cerca · ✓ cerca<br><span class='lamp a'></span> <i class='warn'></i> dudoso · <span class='lamp r'></span> ✗ no se ajusta<br>Pulsa el semáforo para ver el valor.",
      "q.madv": "MAD = <b>{mad}</b><br>E[MAD] ≈ {h0}<br>si se cumpliera Benford<br>{th}",
      "q.madna": "MAD = <b>{mad}</b><br>Esta prueba no tiene umbrales de referencia.",
      "q.s":
        "Tan improbable como sacar <b>{k} caras seguidas</b> al lanzar una moneda, si los datos siguieran la ley.<br>Hasta 4 o 5 caras: nada raro. Decenas: algo se aparta claramente.",
      "q.p":
        "Probabilidad de ver una desviación así por puro azar, si los datos siguieran la ley: p&nbsp;{pe}.<br><i>Prueba χ², {df} grados de libertad.</i>",
      "q.dstar":
        "Cuánto se aleja el reparto de primeras cifras del que predice la ley: 0 es idéntico y 1, lo más lejos posible <i>(Wei y Vellwock, 2020)</i>. Por encima de 0,25, conviene mirar con cuidado <i>(Goodman, 2016)</i>.",
      "q.orders":
        "Los números van de {min} a {max}. La ley funciona mejor cuando hay a la vez números pequeños y muy grandes; aquí el mayor es unas 10<sup>{o}</sup> veces el menor.",
      "q.out": "La barra se sale del margen que cabría esperar por azar ({ci}) si se cumpliera la ley.",
      "q.exp": "Lo que predice la Ley de Benford para cada dígito.",
      "q.unif": "Reparto uniforme: 10 % para cada dígito.",
      "q.sigma":
        "Intervalo de confianza: si se cumpliera la ley, contiene el 68,3 % (1σ), el 95,4 % (2σ) o el 99,7 % (3σ) de las muestras.",
      "q.d1": "¿Qué parte de los números empieza por 1, por 2…?",
      "q.d2": "La segunda cifra: todas aparecen casi por igual, del 12 % (el 0) al 8,5 % (el 9).",
      "q.f2": "Los dos primeros dígitos, de 10 a 99. Un pico suele delatar un importe repetido.",
      "q.l1":
        "En recuentos grandes, la última cifra debería repartirse por igual (10 % cada una). Quien inventa números suele romper ese reparto <i>(Beber y Scacco, 2012)</i>.",
      "q.pos": "Cada cifra en cada posición (primera, segunda…). Azul: aparece menos de lo esperado. Rojo: más.",
      "q.sus":
        "Los grupos de dos primeras cifras que más se apartan y los números que contienen, para revisarlos uno a uno (como la función getSuspects del programa R benford.analysis).",
      "q.dup": "Las cifras que más se repiten y dos lugares al azar donde aparecen. Pulsa ▶ para ver otros.",
      "q.img":
        "Cada zona de la foto, coloreada por lo que se aparta de la Ley de Benford. Zonas muy distintas pueden indicar retoque, pero también cielo liso o texto.",
      "q.upload": "Hojas de cálculo, CSV, PDF, Word, texto o fotos. Todo se calcula en tu navegador: el archivo no sale de tu equipo.",
      "q.camara":
        "Congreso: votos a listas por circunscripción. Senado: votos a cada candidato. Censo exterior: electores y sobres por consulado.",
      "q.where":
        "Total: todos los votos, incluidos los de quienes viven en el extranjero. Extranjero: solo el voto de los españoles residentes fuera (CERA).",
      "q.family":
        "Los cuatro partidos más votados en cada elección. Las listas aliadas cuentan con su partido (por ejemplo, PSC con PSOE).",
      theme: "Modo claro / oscuro",
      "opt.sign": "Signo",
      "opt.min": "Mínimo |x|",
      "opt.how": "Grupos ⚑",
      "opt.years": "Ignorar años",
      "opt.pct": "Ignorar %",
      "opt.locale": "Formato",
      "q.opt.sign": "Qué cifras entran: solo positivas, solo negativas o todas en valor absoluto.",
      "q.opt.min": "Descarta las cifras más pequeñas que este valor.",
      "q.opt.how": "Cuántos grupos de dos primeros dígitos se listan en «Cifras sospechosas».",
      "q.opt.years": "No cuenta números como 1999 o 2026, que suelen ser fechas.",
      "q.opt.pct": "No cuenta porcentajes (12 %).",
      "q.opt.locale": "Cómo se escriben los miles y los decimales: 1.234,5 (España) o 1,234.5 (Reino Unido, EE. UU.). «auto» lo detecta.",
      close: "Cerrar",
    },
    en: {
      "tab.inicio": "Home",
      "tab.pruebalo": "Try it",
      "tab.hemeroteca": "Archive",
      "tab.info": "More info",
      "lang.cur": "English · switch to Español",
      "mode.s": "s-value (heads in a row)",
      "mode.p": "p-value",
      "q.mode":
        "<b>p</b>: probability of seeing at least a deviation this large by pure chance, if the data followed the law.<br><b>s</b>: the same, counted as heads in a row when tossing a coin (s = −log₂ p).",
      "home.h1": "Do Spanish election results follow the expected number pattern?",
      "home.lead":
        "In almost any list of real data, more numbers start with 1 than with 9. This phenomenon is called Benford's Law. Here we test it on Spanish general elections since 1977, further down on some famous cases, and you can even try it with your own data.",
      "home.examples":
        "Famous cases. Each bar shows what share of the numbers starts with 1, 2… up to 9. The dashed line is what the law predicts, and red bars fall outside the expected range. Press “What am I looking at?” to read the story of each case.",
      "home.what": "What am I looking at?",
      "cd.d": "days",
      "cd.h": "hours",
      "cd.m": "min",
      "cd.s": "s",
      "hem.h1": "Archive",
      "hem.lead":
        "Choose a general election, from 1977 to 2023, in the “Election” menu. “Analysis” shows whether the votes of each party in each province follow the Benford pattern. “Results” gives the official tables with every vote and the turnout.",
      "hem.camara": "Chamber",
      "hem.cera": "Abroad",
      "hem.prov": "Province",
      "hem.censo": "Overseas roll",
      "hem.none": "No figures match the filters.",
      "hem.byparty": "By party",
      "try.h1": "Try it",
      "try.lead":
        "Upload your data as Excel (.xlsx, .xls, .ods), CSV, PDF, Word (.docx), text (.txt) or a photo (JPG, PNG) and we will show you how well it follows Benford's Law: whether the first digit of your numbers follows the expected pattern. Everything runs in your browser; the file never leaves your computer.",
      "try.drop": "Drop or choose a file or a photo",
      "try.btn": "Analyse",
      "info.h1": "More info",
      congreso: "Congress",
      senado: "Senate",
      censo: "Overseas roll",
      OTROS: "Others",
      yours: "Your data",
      "fig.n": "Figures",
      "fig.mad": "Deviation",
      "fig.s": "s-value",
      "fig.p": "p-value",
      "fig.dstar": "Distance",
      "fig.orders": "Scale",
      "conf.close": "very close",
      "conf.acceptable": "close",
      "conf.marginal": "doubtful",
      "conf.non": "does not fit",
      "conf.na": "—",
      "t.d1": "First digit",
      "t.d2": "Second digit",
      "t.f2": "First two digits",
      "t.l1": "Last digit",
      "t.pos": "Digits by position",
      "t.sus": "Suspect figures",
      "t.dup": "Repeated figures",
      "t.img": "Image map",
      "leg.out": "Anomalous",
      "leg.exp": "Benford",
      "leg.unif": "Uniform",
      "chart.tip": "<b>{label}</b>&ensp;{obs} ({exp} {ref})&ensp;#{count}",
      "col.line": "#",
      "col.value": "Figure",
      "col.context": "Where",
      "status.reading": "Reading {name}…",
      "status.done": "✓ {n} figures",
      "status.none": "✗ No figures in {name}",
      "status.error": "✗ {name}: {msg}",
      "status.lib": "Loading reader…",
      "img.pal.seq": "sequential",
      "img.pal.rb": "rainbow",
      copy: "Copy diagram",
      pause: "Pause",
      play: "Resume",
      copied: "✓ Diagram copied",
      copyfail: "✗ Could not copy",
      pct: "Percentage table",
      "q.n": "How many numbers were analysed. Zeros do not count.",
      "q.mad":
        "How far, on average, each bar is from the law's line (MAD) <i>(Nigrini, 2012)</i>.<br><span class='lamp g'></span> ✓✓ very close · ✓ close<br><span class='lamp a'></span> <i class='warn'></i> doubtful · <span class='lamp r'></span> ✗ does not fit<br>Tap the traffic light to see the value.",
      "q.madv": "MAD = <b>{mad}</b><br>E[MAD] ≈ {h0}<br>if Benford held<br>{th}",
      "q.madna": "MAD = <b>{mad}</b><br>This test has no reference thresholds.",
      "q.s": "Like <b>{k} heads in a row</b>, if Benford held.<br><i>S = −log₂ p (Greenland, 2019)</i>",
      "q.p":
        "Probability of a deviation this large by pure chance, if the data followed the law: p&nbsp;{pe}.<br><i>χ² test, {df} degrees of freedom.</i>",
      "q.dstar":
        "How far the spread of first digits is from the law: 0 means identical and 1 as far as possible <i>(Wei and Vellwock, 2020)</i>. Above 0.25, look carefully <i>(Goodman, 2016)</i>.",
      "q.orders":
        "Numbers range from {min} to {max}. The law works best when small and very large numbers appear together; here the largest is about 10<sup>{o}</sup> times the smallest.",
      "q.out": "The bar falls outside the range expected by chance ({ci}) if the law held.",
      "q.exp": "What Benford's Law predicts for each digit.",
      "q.unif": "Uniform spread: 10% for each digit.",
      "q.sigma": "Confidence interval: if the law held, it contains 68.3% (1σ), 95.4% (2σ) or 99.7% (3σ) of samples.",
      "q.d1": "What share of the numbers starts with 1, with 2…?",
      "q.d2": "The second digit: all appear almost equally, from 12% (0) to 8.5% (9).",
      "q.f2": "The first two digits, 10 to 99.",
      "q.l1":
        "In large counts the last digit should be evenly spread (10% each). People who invent numbers often break that pattern <i>(Beber and Scacco, 2012)</i>.",
      "q.pos": "Each digit in each position (first, second…). Blue: less often than expected. Red: more often.",
      "q.sus":
        "The first-two-digit groups that deviate most and the numbers they contain, to check them one by one (like the getSuspects function in the R package benford.analysis).",
      "q.dup": "The most repeated figures and two random places where they appear. Press ▶ to see others.",
      "q.img":
        "Each area of the photo, coloured by how far it departs from Benford's Law. Very different areas may indicate editing, but also flat sky or text.",
      "q.upload": "Spreadsheets, CSV, PDF, Word, text or photos. Everything runs in your browser: the file never leaves your computer.",
      "q.camara":
        "Congress: votes for lists per constituency. Senate: votes for each candidate. Overseas roll: voters and envelopes per consulate.",
      "q.where":
        "Total: all votes, including those of people living abroad. Abroad: only the vote of Spaniards living outside Spain (CERA).",
      "q.family": "The four most voted parties in each election. Allied lists count with their party (for example, PSC with PSOE).",
      theme: "Light / dark mode",
      "opt.sign": "Sign",
      "opt.min": "Minimum |x|",
      "opt.how": "Groups ⚑",
      "opt.years": "Skip years",
      "opt.pct": "Skip %",
      "opt.locale": "Format",
      "q.opt.sign": "Which figures count: only positive, only negative or all in absolute value.",
      "q.opt.min": "Drops figures smaller than this value.",
      "q.opt.how": "How many first-two-digit groups are listed in “Suspect figures”.",
      "q.opt.years": "Ignores numbers such as 1999 or 2026, which are usually dates.",
      "q.opt.pct": "Ignores percentages (12%).",
      "q.opt.locale": "How thousands and decimals are written: 1.234,5 (Spain) or 1,234.5 (UK, US). “auto” detects it.",
      close: "Close",
    },
  };
  CYP.I18N = I18N;
  const store = (k, v) => {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) {
      return null;
    }
  };
  CYP.lang = store("cyp-lang") || "es";
  CYP.mode = store("cyp-mode") || "s";
  CYP.t = (k, vars) => {
    let s = (I18N[CYP.lang] && I18N[CYP.lang][k]) ?? I18N.es[k] ?? k;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");
    return s;
  };
  CYP.L = (o) => (o && typeof o === "object" ? (o[CYP.lang] ?? o.es) : o);
  CYP.applyI18n = (root = document) => {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = CYP.t(el.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.placeholder = CYP.t(el.dataset.i18nPh);
    });
    root.querySelectorAll("[data-es]").forEach((el) => {
      el.hidden = el.dataset.es !== CYP.lang;
    });
    document.documentElement.lang = CYP.lang;
  };
  CYP.setLang = (l) => {
    CYP.lang = l;
    store("cyp-lang", l);
    CYP.applyI18n();
    CYP.renderBar();
    document.dispatchEvent(new CustomEvent("cyp:change"));
  };
  CYP.setMode = (m) => {
    CYP.mode = m;
    store("cyp-mode", m);
    CYP.renderBar();
    document.dispatchEvent(new CustomEvent("cyp:change"));
  };
  const locale = () => (CYP.lang === "en" ? "en-GB" : "es-ES");
  CYP.fmt = (x, d = 0) => (Number.isFinite(x) ? x.toLocaleString(locale(), { minimumFractionDigits: d, maximumFractionDigits: d }) : "—");
  CYP.int = (x) => (Number.isFinite(x) ? Math.round(x).toLocaleString(locale(), { useGrouping: true }) : "—");
  CYP.pct = (x, d = 1) => (Number.isFinite(x) ? CYP.fmt(100 * x, d) + " %" : "—");
  CYP.esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  CYP.heads = (S) => (Number.isFinite(S) ? Math.floor(S) : NaN);
  CYP.sup = (x) =>
    String(x)
      .replace(/-/g, "⁻")
      .replace(/[.,]/g, "·")
      .replace(/\d/g, (c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]);
  CYP.sf = (x, k = 3) =>
    Number.isFinite(x) ? x.toLocaleString(locale(), { minimumSignificantDigits: k, maximumSignificantDigits: k }) : "—";
  const sciParts = (log10x, k) => {
    let e = Math.floor(log10x),
      m = +(10 ** (log10x - e)).toPrecision(k);
    if (m >= 10) {
      m /= 10;
      e += 1;
    }
    return [m, e];
  };
  CYP.sciLog = (log10x, k = 3) => {
    if (!Number.isFinite(log10x)) return "—";
    const [m, e] = sciParts(log10x, k);
    return e === 0 ? CYP.fmt(m, k - 1) : `${CYP.fmt(m, k - 1)}·10<sup>${e}</sup>`;
  };
  CYP.sci = (x, k = 3) => (x === 0 ? "0" : Number.isFinite(x) ? (x < 0 ? "−" : "") + CYP.sciLog(L10(Math.abs(x)), k) : "—");
  CYP.count = (n) => (n < 10000 ? CYP.int(n) : CYP.sci(n, 3));
  const log10pOf = (S) => -S * Math.LOG10E * Math.LN2;
  const plain = (S) => {
    const p = 2 ** -S;
    return p >= 0.01 && p <= 0.99;
  };
  CYP.pfmt = (S) =>
    !Number.isFinite(S)
      ? "—"
      : log10pOf(S) < -4
        ? "&lt;&nbsp;" + CYP.fmt(0.0001, 4)
        : plain(S)
          ? CYP.sf(2 ** -S, 3)
          : CYP.sciLog(log10pOf(S), 3);
  CYP.sfmt = (S) => (!Number.isFinite(S) ? "—" : S > 100 ? "&gt;100" : plain(S) ? CYP.sf(S, 3) : CYP.sci(S, 3));
  CYP.sigma = +(store("cyp-sigma") || 2);
  CYP.CI = { 1: 0.6827, 2: 0.9545, 3: 0.9973 };
  CYP.setSigma = (k) => {
    CYP.sigma = k;
    store("cyp-sigma", k);
    CYP.renderBar();
    document.dispatchEvent(new CustomEvent("cyp:redraw"));
  };
  const sysDark = () => !!(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  CYP.theme = store("cyp-theme") || (sysDark() ? "dark" : "light");
  document.documentElement.dataset.theme = CYP.theme;
  CYP.setTheme = (t) => {
    CYP.theme = t;
    store("cyp-theme", t);
    document.documentElement.dataset.theme = t;
    CYP.renderBar();
    document.dispatchEvent(new CustomEvent("cyp:redraw"));
  };

  /* ------------------------------------------------------- Benford reference */
  function nthDigitProb(n, d) {
    if (n === 1) return d === 0 ? 0 : L10(1 + 1 / d);
    let s = 0;
    for (let k = 10 ** (n - 2); k < 10 ** (n - 1); k++) s += L10(1 + 1 / (10 * k + d));
    return s;
  }
  const REF = {
    d1: range(1, 9).map((d) => L10(1 + 1 / d)),
    d2: range(0, 9).map((d) => nthDigitProb(2, d)),
    d3: range(0, 9).map((d) => nthDigitProb(3, d)),
    d4: range(0, 9).map((d) => nthDigitProb(4, d)),
    f2: range(10, 99).map((n) => L10(1 + 1 / n)),
    l1: Array(10).fill(0.1),
    l2: Array(100).fill(0.01),
  };
  CYP.REF = REF;
  CYP.DSTAR_MAX = Math.max(...REF.d1.map((b) => Math.sqrt(REF.d1.reduce((s, x) => s + x * x, 0) - 2 * b + 1)));

  const TESTS = {
    d1: { labels: range(1, 9).map(String), exp: REF.d1, key: (s) => (s.length >= 1 ? +s[0] - 1 : -1), mad: [0.006, 0.012, 0.015] },
    d2: { labels: range(0, 9).map(String), exp: REF.d2, key: (s) => (s.length >= 2 ? +s[1] : -1), mad: [0.008, 0.01, 0.011] },
    d3: { labels: range(0, 9).map(String), exp: REF.d3, key: (s) => (s.length >= 3 ? +s[2] : -1), mad: null },
    f2: {
      labels: range(10, 99).map(String),
      exp: REF.f2,
      key: (s) => (s.length >= 2 ? +s.slice(0, 2) - 10 : -1),
      mad: [0.0012, 0.0018, 0.0022],
    },
    l1: { labels: range(0, 9).map(String), exp: REF.l1, key: (s) => (s.length >= 2 ? +s[s.length - 1] : -1), mad: null, uniform: true },
    l2: {
      labels: range(0, 99).map((x) => String(x).padStart(2, "0")),
      exp: REF.l2,
      key: (s) => (s.length >= 3 ? +s.slice(-2) : -1),
      mad: null,
      uniform: true,
    },
  };
  CYP.TESTS = TESTS;

  /* ------------------------------------------------------------ statistics */
  function lnGamma(x) {
    const c = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
    if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lnGamma(1 - x);
    x -= 1;
    let a = c[0];
    const t = x + 7.5;
    for (let i = 1; i < 9; i++) a += c[i] / (x + i);
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }
  function lnGammaQ(a, x) {
    if (x <= 0) return 0;
    const lead = -x + a * Math.log(x) - lnGamma(a);
    if (x < a + 1) {
      let ap = a,
        sum = 1 / a,
        del = sum;
      for (let n = 0; n < 1000; n++) {
        ap += 1;
        del *= x / ap;
        sum += del;
        if (Math.abs(del) < Math.abs(sum) * 1e-15) break;
      }
      return Math.log(Math.max(1e-300, 1 - sum * Math.exp(lead)));
    }
    let b = x + 1 - a,
      c = 1e300,
      d = 1 / b,
      h = d;
    for (let i = 1; i < 1000; i++) {
      const an = -i * (i - a);
      b += 2;
      d = an * d + b;
      if (Math.abs(d) < 1e-300) d = 1e-300;
      c = b + an / c;
      if (Math.abs(c) < 1e-300) c = 1e-300;
      d = 1 / d;
      const del = d * c;
      h *= del;
      if (Math.abs(del - 1) < 1e-15) break;
    }
    return lead + Math.log(h);
  }
  CYP.chiSquareLnP = (chi2, df) => lnGammaQ(df / 2, chi2 / 2);
  CYP.chiSquareP = (chi2, df) => Math.exp(CYP.chiSquareLnP(chi2, df));
  CYP.surprise = (lnp) => Math.max(0, -lnp / Math.LN2);

  function conformity(mad, th) {
    if (!th) return "na";
    if (mad <= th[0]) return "close";
    if (mad <= th[1]) return "acceptable";
    if (mad <= th[2]) return "marginal";
    return "non";
  }
  CYP.confClass = (c) => ({ close: "ok", acceptable: "ok", marginal: "warn", non: "crit" })[c] || "";

  const DMAX = {};
  const dmax = (exp) => Math.max(...exp.map((b) => Math.sqrt(exp.reduce((s, x) => s + x * x, 0) - 2 * b + 1)));
  function testFromCounts(id, counts) {
    const def = TESTS[id];
    const n = counts.reduce((a, b) => a + b, 0);
    if (n < 5) return null;
    const K = counts.length,
      exp = def.exp,
      cc = 1 / (2 * n);
    const props = counts.map((c) => c / n);
    let chi2 = 0,
      mad = 0,
      ss = 0;
    const z = [],
      sd = [];
    for (let i = 0; i < K; i++) {
      const p = exp[i],
        e = n * p,
        diff = props[i] - p,
        s = Math.sqrt((p * (1 - p)) / n);
      chi2 += (counts[i] - e) ** 2 / e;
      mad += Math.abs(diff);
      ss += diff * diff;
      z.push((Math.sign(diff) * (Math.abs(diff) - (Math.abs(diff) > cc ? cc : 0))) / s);
      sd.push(s);
    }
    mad /= K;
    const madH0 = exp.reduce((acc, p) => acc + Math.sqrt((2 * p * (1 - p)) / (Math.PI * n)), 0) / K;
    const res = {
      id,
      madH0,
      labels: def.labels,
      exp,
      counts,
      props,
      n,
      z,
      sd,
      chi2,
      df: K - 1,
      th: def.mad,
      p: CYP.chiSquareP(chi2, K - 1),
      S: CYP.surprise(CYP.chiSquareLnP(chi2, K - 1)),
      mad,
      conformity: conformity(mad, def.mad),
      uniform: !!def.uniform,
      dstar: Math.sqrt(ss) / (DMAX[id] ||= dmax(exp)),
    };
    Object.defineProperty(res, "band", { get: () => sd.map((x) => CYP.sigma * x + cc) });
    Object.defineProperty(res, "out", { get: () => props.map((x, i) => Math.abs(x - exp[i]) > CYP.sigma * sd[i] + cc) });
    return res;
  }
  CYP.testFromCounts = testFromCounts;

  function decimalsOf(a) {
    const s = a.toPrecision(15);
    if (s.includes("e")) return 4;
    const f = (s.split(".")[1] || "").replace(/0+$/, "");
    return Math.min(f.length, 4);
  }
  function sigString(a) {
    const s = a.toPrecision(15);
    if (s.includes("e")) {
      const [m, e] = s.split("e");
      let md = m.replace(".", "").replace(/0+$/, "");
      if (+e >= 0) md = md.padEnd(+e + 1, "0");
      return md.replace(/^0+/, "");
    }
    const [ip, fp = ""] = s.split(".");
    const i = ip.replace(/^0+/, ""),
      f = fp.replace(/0+$/, "");
    return i ? i + f : f.replace(/^0+/, "");
  }
  CYP.sigString = sigString;

  CYP.analyse = function (records, opts = {}) {
    const sign = opts.sign || "positive";
    const min = +opts.min || 0;
    const used = [];
    let zeros = 0,
      negatives = 0,
      invalid = 0,
      belowMin = 0;
    for (const r of records) {
      const v = r.v;
      if (!Number.isFinite(v)) {
        invalid++;
        continue;
      }
      if (v === 0) {
        zeros++;
        continue;
      }
      if (v < 0) {
        negatives++;
        if (sign === "positive") continue;
      } else if (sign === "negative") continue;
      if (Math.abs(v) < min) {
        belowMin++;
        continue;
      }
      used.push(r);
    }
    const decHist = [0, 0, 0, 0, 0];
    for (const r of used) decHist[decimalsOf(Math.abs(r.v))]++;
    let dec = 0;
    for (let d = 4; d >= 1; d--) {
      const share = decHist.slice(d).reduce((a, b) => a + b, 0) / Math.max(1, used.length);
      if (share >= 0.05) {
        dec = d;
        break;
      }
    }
    const scale = 10 ** dec;
    let lo = Infinity,
      hi = 0,
      mSum = 0,
      cSum = 0,
      sSum = 0,
      mSq = 0;
    const counts = {};
    for (const id in TESTS) counts[id] = new Array(TESTS[id].labels.length).fill(0);
    const pos = [1, 2, 3, 4].map(() => new Array(10).fill(0));
    const dup = new Map();
    for (const r of used) {
      const a = Math.abs(r.v);
      const si = Math.round(a * scale);
      const s = si >= 1 && si < 1e15 ? String(si) : sigString(a);
      r.s = s;
      r.a = a;
      if (a < lo) lo = a;
      if (a > hi) hi = a;
      const m = ((L10(a) % 1) + 1) % 1;
      mSum += m;
      mSq += m * m;
      cSum += Math.cos(2 * Math.PI * m);
      sSum += Math.sin(2 * Math.PI * m);
      for (const id in TESTS) {
        const k = TESTS[id].key(s);
        if (k >= 0) counts[id][k]++;
      }
      for (let k = 0; k < 4 && k < s.length; k++) pos[k][+s[k]]++;
      const dk = si >= 1 ? si : a * scale;
      let de = dup.get(dk);
      if (!de) dup.set(dk, (de = { c: 0, ctx: [] }));
      de.c++;
      if (de.ctx.length < 40) de.ctx.push(r.ctx || (r.row ? "#" + r.row : ""));
    }
    const n = used.length;
    const tests = {};
    for (const id in TESTS) tests[id] = testFromCounts(id, counts[id]);
    const positions = pos.map((c, k) => {
      const nk = c.reduce((a, b) => a + b, 0);
      const exp = k === 0 ? [0, ...REF.d1] : REF["d" + (k + 1)];
      return {
        k: k + 1,
        n: nk,
        counts: c,
        props: c.map((x) => (nk ? x / nk : 0)),
        exp,
        z: c.map((x, d) => {
          if (!nk || exp[d] === 0) return 0;
          const p = exp[d];
          return (x / nk - p) / Math.sqrt((p * (1 - p)) / nk);
        }),
      };
    });
    const mean = n ? mSum / n : NaN;
    const L2 = n ? (cSum / n) ** 2 + (sSum / n) ** 2 : NaN;
    const mantissa = { mean, variance: n > 1 ? (mSq - n * mean * mean) / (n - 1) : NaN, L2, p: Math.exp(-L2 * n) };
    const dups = [...dup.entries()]
      .filter(([, e]) => e.c > 1)
      .sort((a, b) => b[1].c - a[1].c)
      .slice(0, 15)
      .map(([k, e]) => ({ value: k / scale, count: e.c, share: e.c / n, ctx: e.ctx.filter(Boolean) }));
    const res = {
      n,
      total: records.length,
      zeros,
      negatives,
      invalid,
      belowMin,
      decimals: dec,
      used,
      tests,
      positions,
      mantissa,
      dups,
      range: { min: lo, max: hi, orders: n ? L10(hi / lo) : NaN },
      sign,
    };
    res.suspects = CYP.getSuspects(res, opts.howMany || 2);
    return res;
  };

  CYP.getSuspects = function (res, k = 2) {
    const t = res.tests.f2;
    if (!t) return { bins: [], table: [], records: [], total: 0 };
    const table = t.labels
      .map((label, i) => ({
        label,
        count: t.counts[i],
        expected: t.n * t.exp[i],
        absdiff: Math.abs(t.counts[i] - t.n * t.exp[i]),
        z: t.z[i],
      }))
      .sort((a, b) => b.absdiff - a.absdiff);
    const bins = table.slice(0, k);
    const keys = new Set(bins.map((b) => b.label));
    const records = res.used.filter((r) => r.s.length >= 2 && keys.has(r.s.slice(0, 2)));
    return { bins, table: table.slice(0, 12), records, total: records.length };
  };

  CYP.d1Vector = (res) => (res.tests.d1 ? res.tests.d1.props.slice() : null);

  /* ------------------------------------------------------ number extraction */
  const TOKEN = /(?<![\w.,/:\-])([-−]?)(\d+(?:[.,]\d+)*)(?![\w/:])(\s?%)?/g;
  CYP.detectLocale = function (text) {
    let es = 0,
      en = 0;
    for (const m of text.matchAll(TOKEN)) {
      const t = m[2];
      if (/^\d{1,3}(\.\d{3}){2,}$/.test(t) || /^\d{1,3}(\.\d{3})+,\d+$/.test(t) || /^\d+,\d{1,2}$/.test(t)) es++;
      else if (/^\d{1,3}(,\d{3}){2,}$/.test(t) || /^\d{1,3}(,\d{3})+\.\d+$/.test(t) || /^\d+\.\d{1,2}$/.test(t)) en++;
    }
    return en > es ? "en" : "es";
  };
  CYP.parseNumber = function (raw, loc = "es") {
    if (typeof raw === "number") return raw;
    if (raw == null) return NaN;
    let t = String(raw)
      .trim()
      .replace(/[\s  €$£%]/g, "")
      .replace("−", "-");
    let neg = false;
    if (/^\(.*\)$/.test(t)) {
      neg = true;
      t = t.slice(1, -1);
    }
    if (t.startsWith("-")) {
      neg = true;
      t = t.slice(1);
    }
    if (!/^\d+(?:[.,]\d+)*$/.test(t)) return NaN;
    const hasDot = t.includes("."),
      hasCom = t.includes(",");
    let v;
    if (hasDot && hasCom) {
      v = t.lastIndexOf(",") > t.lastIndexOf(".") ? +t.replace(/\./g, "").replace(",", ".") : +t.replace(/,/g, "");
    } else if (hasDot || hasCom) {
      const sep = hasDot ? "." : ",";
      const parts = t.split(sep);
      const groupsOk = parts[0].length <= 3 && parts.slice(1).every((p) => p.length === 3);
      if (parts.length > 2) v = groupsOk ? +parts.join("") : NaN;
      else if (groupsOk && ((sep === "." && loc === "es") || (sep === "," && loc === "en"))) v = +parts.join("");
      else v = +parts.join(".");
    } else v = +t;
    return neg ? -v : v;
  };
  CYP.extractNumbers = function (text, opts = {}) {
    const loc = opts.locale && opts.locale !== "auto" ? opts.locale : CYP.detectLocale(text);
    const out = [];
    const lines = text.split(/\r?\n/);
    lines.forEach((line, li) => {
      for (const m of line.matchAll(TOKEN)) {
        const t = m[2];
        if (opts.skipPercent && m[3]) continue;
        if (opts.skipYears && /^(19|20)\d\d$/.test(t)) continue;
        if (/^0\d+$/.test(t)) continue;
        const v = CYP.parseNumber((m[1] ? "-" : "") + t, loc);
        if (Number.isFinite(v))
          out.push({
            v,
            row: li + 1,
            ctx: line
              .trim()
              .replace(/\s{2,}/g, "  ")
              .slice(0, 140),
          });
      }
    });
    out.locale = loc;
    return out;
  };

  CYP.tableFromRows = function (rows, opts = {}) {
    rows = rows.filter((r) => r && r.some((c) => c !== null && c !== undefined && String(c).trim() !== ""));
    if (!rows.length) return null;
    const loc =
      opts.locale && opts.locale !== "auto"
        ? opts.locale
        : CYP.detectLocale(
            rows
              .slice(0, 400)
              .map((r) => r.filter((c) => typeof c === "string").join(" "))
              .join("\n"),
          );
    const isNum = (c) => typeof c === "number" || (typeof c === "string" && Number.isFinite(CYP.parseNumber(c, loc)));
    let h = 0;
    for (let i = 0; i < Math.min(rows.length, 20); i++) {
      const cells = rows[i].filter((c) => c !== null && c !== undefined && String(c).trim() !== "");
      const strs = cells.filter((c) => !isNum(c)).length;
      if (cells.length >= 2 && strs >= cells.length / 2 && rows[i + 1] && rows[i + 1].some(isNum)) {
        h = i;
        break;
      }
    }
    const headerRow = rows[h] || [];
    const body = rows.slice(h + 1);
    const width = Math.max(...rows.map((r) => r.length));
    const headers = range(0, width - 1).map((j) => String(headerRow[j] ?? "").trim() || `Col ${j + 1}`);
    const numeric = [];
    for (let j = 0; j < width; j++) {
      let filled = 0,
        nums = 0;
      for (const r of body) {
        const c = r[j];
        if (c === null || c === undefined || String(c).trim() === "") continue;
        filled++;
        if (isNum(c)) nums++;
      }
      if (filled && nums / filled >= 0.6) numeric.push(j);
    }
    const idLike =
      /(^id$|_id$|^id_|c[oó]d|code|a[ñn]o|year|fecha|date|^cp$|zip|postal|mesa|secci[oó]n|distrito|tel|dni|nif|^n[ºo°]?$|^num$)/i;
    const selected = numeric.filter((j) => !idLike.test(headers[j]));
    return { headers, body, numeric, selected: selected.length ? selected : numeric.slice(), locale: loc };
  };
  CYP.recordsFromTable = function (tb) {
    const out = [];
    const ctxCols = range(0, tb.headers.length - 1)
      .filter((j) => !tb.numeric.includes(j))
      .slice(0, 3);
    tb.body.forEach((r, i) => {
      const ctx = ctxCols
        .map((j) => r[j])
        .filter((x) => x !== null && x !== undefined && String(x).trim() !== "")
        .join(" · ");
      for (const j of tb.selected) {
        const v = CYP.parseNumber(r[j], tb.locale);
        if (Number.isFinite(v)) out.push({ v, row: i + 1, ctx: (ctx ? ctx + " · " : "") + tb.headers[j] });
      }
    });
    return out;
  };

  /* ------------------------------------------------------------- loaders */
  const loaded = {};
  CYP.loadScript = (src) =>
    (loaded[src] ||= new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => ok();
      s.onerror = () => ko(new Error("No se pudo cargar " + src));
      document.head.appendChild(s);
    }));
  const LIBS = {
    xlsx: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
    pdf: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    pdfWorker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
    mammoth: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
    mathjax: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.min.js",
  };
  CYP.LIBS = LIBS;
  CYP.readSheet = async (buf) => {
    await CYP.loadScript(LIBS.xlsx);
    const wb = XLSX.read(buf, { type: "array" });
    const sheets = wb.SheetNames.map((name) => ({
      name,
      rows: XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, raw: true, defval: null }),
    }));
    return sheets.sort((a, b) => b.rows.length - a.rows.length);
  };
  CYP.readPdfText = async (buf) => {
    await CYP.loadScript(LIBS.pdf);
    await CYP.loadScript(LIBS.pdfWorker);
    pdfjsLib.GlobalWorkerOptions.workerSrc = LIBS.pdfWorker;
    const doc = await pdfjsLib.getDocument({ data: buf, isEvalSupported: false }).promise;
    const lines = [];
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      const rows = new Map();
      for (const it of tc.items) {
        if (!it.str || !it.str.trim()) continue;
        const y = Math.round(it.transform[5] / 2);
        if (!rows.has(y)) rows.set(y, []);
        rows.get(y).push({ x: it.transform[4], w: it.width || 0, s: it.str });
      }
      [...rows.entries()]
        .sort((a, b) => b[0] - a[0])
        .forEach(([, items]) => {
          items.sort((a, b) => a.x - b.x);
          let line = "",
            end = -1e9;
          for (const it of items) {
            line += (line && it.x - end > 2 ? "   " : "") + it.s;
            end = it.x + it.w;
          }
          lines.push(line);
        });
    }
    return lines.join("\n");
  };
  CYP.readDocxText = async (buf) => {
    await CYP.loadScript(LIBS.mammoth);
    const r = await mammoth.extractRawText({ arrayBuffer: buf });
    return r.value;
  };
  CYP.sha256 = async (buf) => {
    try {
      const h = await crypto.subtle.digest("SHA-256", buf);
      return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
      return null;
    }
  };

  /* -------------------------------------------------------- image forensics */
  const COS = (() => {
    const c = new Float64Array(64);
    for (let u = 0; u < 8; u++)
      for (let x = 0; x < 8; x++) c[u * 8 + x] = (u === 0 ? Math.SQRT1_2 : 1) * 0.5 * Math.cos(((2 * x + 1) * u * Math.PI) / 16);
    return c;
  })();
  CYP.imageForensics = function (source, opts = {}) {
    const maxSide = opts.maxSide || 1600,
      tile = opts.tile || 64;
    const sw = source.naturalWidth || source.width,
      sh = source.naturalHeight || source.height;
    const f = Math.min(1, maxSide / Math.max(sw, sh));
    const W = Math.floor((sw * f) / 8) * 8,
      H = Math.floor((sh * f) / 8) * 8;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(source, 0, 0, W, H);
    const px = ctx.getImageData(0, 0, W, H).data;
    const Y = new Float64Array(W * H);
    for (let i = 0, j = 0; i < Y.length; i++, j += 4) Y[i] = 0.299 * px[j] + 0.587 * px[j + 1] + 0.114 * px[j + 2] - 128;
    const tc = Math.ceil(W / tile),
      tr = Math.ceil(H / tile);
    const tiles = Array.from({ length: tc * tr }, () => new Array(9).fill(0));
    const total = new Array(9).fill(0);
    const blk = new Float64Array(64),
      tmp = new Float64Array(64);
    for (let by = 0; by < H; by += 8)
      for (let bx = 0; bx < W; bx += 8) {
        for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) blk[y * 8 + x] = Y[(by + y) * W + bx + x];
        for (let v = 0; v < 8; v++)
          for (let x = 0; x < 8; x++) {
            let s = 0;
            for (let y = 0; y < 8; y++) s += COS[v * 8 + y] * blk[y * 8 + x];
            tmp[v * 8 + x] = s;
          }
        const t = tiles[Math.floor(by / tile) * tc + Math.floor(bx / tile)];
        for (let v = 0; v < 8; v++)
          for (let u = 0; u < 8; u++) {
            if (!u && !v) continue;
            let s = 0;
            for (let x = 0; x < 8; x++) s += COS[u * 8 + x] * tmp[v * 8 + x];
            let a = Math.round(Math.abs(s));
            if (a < 1) continue;
            while (a >= 10) a = (a / 10) | 0;
            t[a - 1]++;
            total[a - 1]++;
          }
      }
    const d1 = testFromCounts("d1", total);
    const tileMad = tiles.map((c) => {
      const n = c.reduce((a, b) => a + b, 0);
      if (n < 300) return null;
      return c.reduce((s, x, i) => s + Math.abs(x / n - REF.d1[i]), 0) / 9;
    });
    return {
      W,
      H,
      scale: f,
      canvas: cv,
      d1,
      tiles: { cols: tc, rows: tr, size: tile, mad: tileMad },
      fit: d1 ? CYP.fitGeneralised(d1.props) : null,
    };
  };
  CYP.fitGeneralised = function (props) {
    let best = null;
    for (let q = 0.5; q <= 3.0001; q += 0.01)
      for (let s = -0.6; s <= 1.5001; s += 0.01) {
        const raw = range(1, 9).map((d) => L10(1 + 1 / (s + d ** q)));
        if (raw.some((x) => !Number.isFinite(x) || x <= 0)) continue;
        const N = 1 / raw.reduce((a, b) => a + b, 0);
        const sse = raw.reduce((acc, x, i) => acc + (N * x - props[i]) ** 2, 0);
        if (!best || sse < best.sse) best = { N, q, s, sse };
      }
    return best;
  };

  /* ------------------------------------------------------------------- SVG */
  const NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs = {}, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, s, attrs = {}) {
    const t = el("text", { x, y, ...attrs }, parent);
    t.textContent = s;
    return t;
  }
  function niceStep(max, ticks = 5) {
    const raw = max / ticks,
      p = 10 ** Math.floor(L10(raw)),
      m = raw / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
  }
  CYP.cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hover = (node, html) => {
    node.addEventListener("mousemove", (ev) => CYP.tip.show(html, ev));
    node.addEventListener("mouseleave", CYP.tip.hide);
    node.addEventListener("click", (ev) => CYP.tip.show(html, ev));
  };
  CYP.smooth = (pts) => {
    const n = pts.length;
    if (n < 3) return "M" + pts.map((p) => p.join(",")).join("L");
    const d = [],
      m = [];
    for (let i = 0; i < n - 1; i++) d.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
    m.push(d[0]);
    for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
    m.push(d[n - 2]);
    for (let i = 0; i < n - 1; i++) {
      if (d[i] === 0) {
        m[i] = 0;
        m[i + 1] = 0;
        continue;
      }
      const a = m[i] / d[i],
        b = m[i + 1] / d[i],
        h = a * a + b * b;
      if (h > 9) {
        const t = 3 / Math.sqrt(h);
        m[i] = t * a * d[i];
        m[i + 1] = t * b * d[i];
      }
    }
    let path = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < n - 1; i++) {
      const [x0, y0] = pts[i],
        [x1, y1] = pts[i + 1],
        h = (x1 - x0) / 3;
      path += `C${x0 + h},${y0 + m[i] * h} ${x1 - h},${y1 - m[i + 1] * h} ${x1},${y1}`;
    }
    return path;
  };
  const roundTop = (x0, y, bw, base, r) =>
    `M${x0},${base}V${y + r}Q${x0},${y} ${x0 + r},${y}H${x0 + bw - r}Q${x0 + bw},${y} ${x0 + bw},${y + r}V${base}Z`;

  let tipEl = null;
  CYP.tip = {
    show(html, ev) {
      if (!tipEl) {
        tipEl = document.createElement("div");
        tipEl.className = "tooltip";
        tipEl.setAttribute("role", "status");
        document.body.appendChild(tipEl);
      }
      tipEl.innerHTML = html;
      tipEl.hidden = false;
      const r = tipEl.getBoundingClientRect();
      let x = ev.clientX + 14,
        y = ev.clientY + 14;
      if (x + r.width > innerWidth - 8) x = ev.clientX - r.width - 14;
      if (y + r.height > innerHeight - 8) y = ev.clientY - r.height - 14;
      tipEl.style.left = Math.max(8, x) + "px";
      tipEl.style.top = Math.max(8, y) + "px";
    },
    hide() {
      if (tipEl) tipEl.hidden = true;
    },
  };

  /* ------------------------------------------------------------- popovers */
  let popEl = null,
    popOwner = null,
    popPinned = false;
  CYP.q = (key, vars) =>
    `<button type="button" class="q" data-pop="${key}"${vars ? ` data-vars="${CYP.esc(JSON.stringify(vars))}"` : ""} aria-label="?">?</button>`;
  CYP.qHTML = (html) => `<button type="button" class="q" data-pop="x" data-html="${CYP.esc(html)}" aria-label="?">?</button>`;
  function popShow(btn, pin) {
    if (!popEl) {
      popEl = document.createElement("div");
      popEl.className = "popover";
      popEl.setAttribute("role", "dialog");
      document.body.appendChild(popEl);
    }
    const vars = btn.dataset.vars ? JSON.parse(btn.dataset.vars) : null;
    popEl.innerHTML = btn.dataset.html || CYP.t(btn.dataset.pop, vars);
    popEl.hidden = false;
    popOwner = btn;
    popPinned = pin;
    btn.setAttribute("aria-expanded", "true");
    const b = btn.getBoundingClientRect(),
      r = popEl.getBoundingClientRect();
    let x = b.left + b.width / 2 - r.width / 2,
      y = b.bottom + 10;
    x = Math.max(10, Math.min(innerWidth - r.width - 10, x));
    if (y + r.height > innerHeight - 10) y = Math.max(10, b.top - r.height - 10);
    popEl.style.left = x + "px";
    popEl.style.top = y + "px";
  }
  function popHide() {
    if (popEl) popEl.hidden = true;
    if (popOwner) popOwner.setAttribute("aria-expanded", "false");
    popOwner = null;
    popPinned = false;
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pop]");
    if (btn) {
      e.preventDefault();
      if (popOwner === btn && popPinned) popHide();
      else popShow(btn, true);
      return;
    }
    if (popEl && !popEl.contains(e.target)) popHide();
    if (!e.target.closest(".chart")) CYP.tip.hide();
    document.querySelectorAll("details.dd[open]").forEach((d) => {
      if (!d.contains(e.target)) d.open = false;
    });
  });
  document.addEventListener("mouseover", (e) => {
    if (!matchMedia("(hover: hover)").matches) return;
    const btn = e.target.closest("[data-pop]");
    if (btn && !popPinned) popShow(btn, false);
  });
  document.addEventListener("mouseout", (e) => {
    const btn = e.target.closest("[data-pop]");
    if (btn && btn === popOwner && !popPinned) popHide();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popHide();
      CYP.tip.hide();
    }
  });
  addEventListener(
    "scroll",
    () => {
      if (!popPinned) popHide();
    },
    { passive: true },
  );

  let modalEl = null;
  CYP.modal = (html) => {
    if (!modalEl) {
      modalEl = document.createElement("dialog");
      modalEl.className = "modal";
      modalEl.addEventListener("click", (e) => {
        if (e.target === modalEl || e.target.closest(".modal-close")) modalEl.close();
      });
      document.body.appendChild(modalEl);
    }
    modalEl.innerHTML = `<div class="modal-body"><button type="button" class="modal-close" aria-label="${CYP.t("close")}">×</button>${html}</div>`;
    if (modalEl.showModal) modalEl.showModal();
    else modalEl.setAttribute("open", "");
  };

  CYP.responsive = function (node, draw) {
    if (node._ro) node._ro.disconnect();
    let last = -1,
      raf = 0;
    const run = () => {
      const w = Math.round(node.clientWidth);
      if (w && Math.abs(w - last) > 8) {
        last = w;
        draw(w);
      }
    };
    run();
    if (window.ResizeObserver) {
      node._ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(run);
      });
      node._ro.observe(node);
    }
  };

  /* --------------------------------------------------------------- charts */
  CYP.CH = 300;
  CYP.barChart = function (container, test, opts = {}) {
    container.innerHTML = "";
    if (!test) {
      container.innerHTML = "<p class='status'>—</p>";
      return null;
    }
    const K = test.labels.length,
      wide = K > 20,
      band = test.band,
      out = test.out;
    const W = Math.max(wide ? 640 : 300, opts.width || container.clientWidth || 640);
    const H = opts.height || CYP.CH;
    const ml = 40,
      mr = 8,
      mt = 12,
      mb = 28,
      iw = W - ml - mr,
      ih = H - mt - mb,
      base = mt + ih;
    const maxV = Math.max(...test.props, ...test.exp.map((e, i) => e + band[i])) * 1.08;
    const step = niceStep(maxV),
      top = Math.ceil(maxV / step) * step;
    const yS = (v) => mt + ih - (v / top) * ih;
    const slot = iw / K,
      bw = Math.max(2, slot * (wide ? 0.72 : 0.62));
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": opts.title || test.id });
    const dec = Math.abs(Math.round(step * 100) - step * 100) > 1e-9 ? 1 : 0;
    for (let v = 0; v <= top + 1e-12; v += step) {
      el("line", { x1: ml, x2: W - mr, y1: yS(v), y2: yS(v), class: "gridline" }, svg);
      txt(svg, ml - 6, yS(v) + 4, CYP.fmt(100 * v, dec) + "%", { "text-anchor": "end" });
    }
    test.labels.forEach((lab, i) => {
      const cx = ml + slot * (i + 0.5),
        p = test.props[i],
        e = test.exp[i],
        b = band[i],
        x0 = cx - bw / 2;
      const y1 = yS(Math.min(top, e + b)),
        y2 = yS(Math.max(0, e - b));
      el("rect", { x: x0, width: bw, y: y1, height: Math.max(0, y2 - y1), rx: Math.min(6, bw / 3), class: "bandrect" }, svg);
      const y = yS(p),
        h = base - y,
        r = Math.min(wide ? 2.5 : 8, bw * 0.32, h);
      if (h > 0) {
        const bar = el("path", { d: roundTop(x0, y, bw, base, r), class: "bar" + (out[i] ? " out" : "") }, svg);
        if (opts.colour) {
          bar.setAttribute("class", "bar");
          bar.setAttribute("style", out[i] ? outlined(opts.colour) : `fill:${opts.colour}`);
        }
      }
      if (!wide || i % 10 === 0) txt(svg, cx, H - mb + 16, lab, { "text-anchor": "middle" });
    });
    el("path", { d: CYP.smooth(test.exp.map((e, i) => [ml + slot * (i + 0.5), yS(e)])), class: "expected" }, svg);
    el("line", { x1: ml, x2: W - mr, y1: base, y2: base, class: "axis" }, svg);
    const ref = test.uniform ? CYP.t("leg.unif").toLowerCase() : "Benford";
    test.labels.forEach((lab, i) => {
      hover(
        el("rect", { x: ml + slot * i, width: slot, y: mt, height: ih, class: "hit" }, svg),
        CYP.t("chart.tip", {
          label: lab,
          obs: CYP.pct(test.props[i], 1),
          exp: CYP.pct(test.exp[i], 1),
          ref,
          count: CYP.int(test.counts[i]),
        }),
      );
    });
    container.appendChild(svg);
    return svg;
  };

  const outlined = (colour) => `fill:var(--surface);stroke:${colour};stroke-width:1.5`;
  CYP.sparkline = function (test, colour, W = 120, H = 38) {
    if (!test) return "";
    const top = Math.max(...test.props, ...test.exp) * 1.1,
      sl = W / test.labels.length,
      out = test.out;
    const y = (v) => H - 2 - (v / top) * (H - 4);
    const bars = test.props
      .map(
        (p, i) =>
          `<path d="${roundTop(i * sl + sl * 0.16, y(p), sl * 0.68, H - 2, Math.min(3, sl * 0.25, H - 2 - y(p)))}" class="bar${out[i] && !colour ? " out" : ""}"${colour ? ` style="${out[i] ? outlined(colour) : `fill:${colour}`}"` : ""} vector-effect="non-scaling-stroke"/>`,
      )
      .join("");
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${bars}<path d="${CYP.smooth(test.exp.map((e, i) => [i * sl + sl / 2, y(e)]))}" class="expected" style="stroke-width:1.5" vector-effect="non-scaling-stroke"/></svg>`;
  };

  function mix(c1, c2, t) {
    const ctx = document.createElement("canvas").getContext("2d");
    const p = (c) => {
      ctx.fillStyle = c;
      const h = ctx.fillStyle;
      return h.startsWith("#")
        ? [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
        : h
            .match(/\d+(\.\d+)?/g)
            .slice(0, 3)
            .map(Number);
    };
    const a = p(c1),
      b = p(c2);
    return `rgb(${a.map((x, i) => Math.round(x + (b[i] - x) * t)).join(",")})`;
  }
  CYP.mix = mix;

  CYP.positionMatrix = function (container, positions) {
    container.innerHTML = "";
    const W = Math.max(300, container.clientWidth || 640),
      ml = 34,
      mt = 22,
      cw = (W - ml - 4) / 10,
      H = CYP.CH,
      ch = (H - mt - 6) / positions.length;
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": CYP.t("t.pos") });
    const neg = CYP.cssVar("--bar"),
      posc = CYP.cssVar("--bar-out"),
      mid = CYP.cssVar("--surface-2"),
      ink = CYP.cssVar("--ink");
    for (let d = 0; d < 10; d++) txt(svg, ml + cw * (d + 0.5), mt - 8, String(d), { "text-anchor": "middle", class: "title" });
    positions.forEach((P, r) => {
      txt(svg, ml - 8, mt + ch * r + ch / 2 + 4, `D${P.k}`, { "text-anchor": "end", class: "title" });
      for (let d = 0; d < 10; d++) {
        if (P.k === 1 && d === 0) continue;
        const x = ml + cw * d,
          y = mt + ch * r,
          z = Math.max(-4, Math.min(4, P.z[d] || 0)),
          t = Math.abs(z) / 4;
        el("rect", { x: x + 1, y: y + 1, width: cw - 2, height: ch - 2, rx: 6, fill: mix(mid, z < 0 ? neg : posc, t) }, svg);
        const tt = txt(svg, x + cw / 2, y + ch / 2 + 4, P.n ? CYP.fmt(100 * P.props[d], cw < 40 ? 0 : 1) : "—", {
          "text-anchor": "middle",
          class: "cell-text",
        });
        tt.setAttribute("style", `fill:${t > 0.55 ? "#fff" : ink}`);
        hover(
          el("rect", { x, y, width: cw, height: ch, class: "hit" }, svg),
          CYP.t("chart.tip", {
            label: `D${P.k} = ${d}`,
            obs: CYP.pct(P.props[d], 1),
            exp: CYP.pct(P.exp[d], 1),
            ref: "Benford",
            count: CYP.int(P.counts[d]),
          }),
        );
      }
    });
    container.appendChild(svg);
  };

  CYP.DIGIT_COLOURS = ["#D55E00", "#009E73", "#0072B2", "#F0E442"];
  CYP.digitsChart = function (container) {
    container.innerHTML = "";
    const W = Math.max(300, container.clientWidth || 640),
      H = CYP.CH;
    const ml = 40,
      mr = 8,
      mt = 12,
      mb = 28,
      iw = W - ml - mr,
      ih = H - mt - mb,
      base = mt + ih;
    const series = [[0, ...REF.d1], REF.d2, REF.d3, REF.d4],
      top = 0.32,
      yS = (v) => base - (v / top) * ih;
    const slot = iw / 10,
      bw = (slot * 0.84) / 4;
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img", "aria-label": "D1 D2 D3 D4" });
    for (let v = 0; v <= top + 1e-9; v += 0.05) {
      el("line", { x1: ml, x2: W - mr, y1: yS(v), y2: yS(v), class: "gridline" }, svg);
      txt(svg, ml - 6, yS(v) + 4, CYP.fmt(100 * v, 0) + "%", { "text-anchor": "end" });
    }
    for (let d = 0; d < 10; d++) {
      const x = ml + slot * d + slot * 0.08;
      series.forEach((s, k) => {
        if (!s[d]) return;
        const y = yS(s[d]);
        el(
          "path",
          { d: roundTop(x + k * bw, y, bw - 1, base, Math.min(4, bw * 0.4, base - y)), fill: CYP.DIGIT_COLOURS[k], class: "dbar" + k },
          svg,
        );
      });
      txt(svg, ml + slot * (d + 0.5), H - mb + 16, String(d), { "text-anchor": "middle" });
      hover(
        el("rect", { x: ml + slot * d, width: slot, y: mt, height: ih, class: "hit" }, svg),
        `<b>d = ${d}</b><br>${series.map((s, k) => `D<sub>${k + 1}</sub> ${s[d] ? CYP.pct(s[d], 1) : "—"}`).join("&ensp;")}`,
      );
    }
    el("line", { x1: ml, x2: W - mr, y1: base, y2: base, class: "axis" }, svg);
    const lx = W - mr - 4 * 46 - 4,
      lg = el("g", { class: "inlegend" }, svg);
    el("rect", { x: lx - 8, y: mt + 2, width: 4 * 46 + 12, height: 26, rx: 8, class: "legbg" }, lg);
    CYP.DIGIT_COLOURS.forEach((c, k) => {
      el("rect", { x: lx + k * 46, y: mt + 9, width: 12, height: 12, rx: 3, fill: c, class: "dbar" + k }, lg);
      const t = txt(lg, lx + k * 46 + 17, mt + 19.5, "", { class: "title" });
      t.appendChild(document.createTextNode("D"));
      const sub = el("tspan", { dy: 3, "font-size": "9" }, t);
      sub.textContent = String(k + 1);
    });
    container.appendChild(svg);
  };

  CYP.turbo = (t) => {
    t = Math.max(0, Math.min(1, t));
    const r = 34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))));
    const g = 23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))));
    const b = 27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))));
    return `rgb(${[r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x)))).join(",")})`;
  };

  async function copyGraphic(node) {
    let canvas = node;
    if (node.tagName.toLowerCase() === "svg") {
      const clone = node.cloneNode(true),
        src = [node, ...node.querySelectorAll("*")],
        dst = [clone, ...clone.querySelectorAll("*")];
      const P = [
        "fill",
        "fill-opacity",
        "stroke",
        "stroke-width",
        "stroke-dasharray",
        "opacity",
        "font-family",
        "font-size",
        "font-weight",
        "font-style",
      ];
      src.forEach((e, i) => {
        const cs = getComputedStyle(e);
        dst[i].setAttribute("style", P.map((k) => `${k}:${cs.getPropertyValue(k)}`).join(";"));
      });
      clone.querySelectorAll(".hit").forEach((h) => h.remove());
      const W = +node.getAttribute("width"),
        H = +node.getAttribute("height");
      clone.setAttribute("xmlns", NS);
      clone.insertBefore(el("rect", { width: W, height: H, fill: CYP.cssVar("--surface") }), clone.firstChild);
      const img = new Image();
      await new Promise((ok, ko) => {
        img.onload = ok;
        img.onerror = ko;
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(clone));
      });
      canvas = document.createElement("canvas");
      canvas.width = W * 2;
      canvas.height = H * 2;
      const c = canvas.getContext("2d");
      c.scale(2, 2);
      c.drawImage(img, 0, 0);
    }
    const blob = await new Promise((ok) => canvas.toBlob(ok, "image/png"));
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  }

  /* -------------------------------------------------------------- icons */
  const svgI = (body, w = 20) =>
    `<svg class="ico" viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const ICON = {
    home: svgI(`<path d="M3 11.2 12 3.5l9 7.7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>`, 26),
    upload: svgI(`<path d="M12 15V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v4h16v-4"/>`),
    cal: svgI(
      `<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M7.5 14h2M11 14h2M14.5 14h2M7.5 17h2M11 17h2"/>`,
    ),
    info: svgI(`<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r="0.6" fill="currentColor"/>`),
    hash: svgI(`<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>`),
    ruler: svgI(
      `<path d="m9 6 3-3.2L15 6"/><rect x="2.5" y="10" width="19" height="8" rx="1.5"/><path d="M6.5 10v3.2M10.5 10v2.2M14.5 10v3.2M18.5 10v2.2"/>`,
    ),
    lens: svgI(`<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>`),
    copy: svgI(
      `<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>`,
      17,
    ),
    arrow: svgI(`<path d="M4 12h16"/><path d="m13 5 7 7-7 7"/>`, 24),
    doc: svgI(`<path d="M6 2.8h8l4.2 4.2v14.2H6z"/><path d="M14 2.8V7h4.2"/>`, 15),
    book: svgI(
      `<path d="M3 4.5h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H3z"/><path d="M21 4.5h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H21z"/>`,
      16,
    ),
    pen: svgI(
      `<g transform="rotate(45 12 12)"><path d="M12 3.5 16 10.5 12 18.5 8 10.5z"/><path d="M12 18.5V12.4"/><circle cx="12" cy="11" r="1.1"/></g><path d="M7.3 16.7c-1.4 1.6-2.7 3-4.2 3.7 1.5.5 3.4.3 5-.5"/>`,
      16,
    ),
    globe: svgI(
      `<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/>`,
      16,
    ),
  };
  CYP.ICON = ICON;

  /* -------------------------------------------------------- small widgets */
  CYP.COIN = `<svg class="coin" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10.5" class="coin-rim"/><circle cx="12" cy="12" r="8" class="coin-face"/><text x="12" y="15.6" text-anchor="middle" class="coin-mark">1</text></svg>`;
  const LAMP = { close: "g", acceptable: "g", marginal: "a", non: "r" };
  CYP.lamp = (c) => LAMP[c] || "";
  CYP.CONFSYM = { close: "✓✓", acceptable: "✓", marginal: "<i class='warn'></i>", non: "✗", na: "—" };
  const num = (x) => x.toLocaleString(locale(), { maximumFractionDigits: 6 });
  CYP.sema = (test) => {
    const th = test.th,
      mad = CYP.sf(test.mad, 3);
    const html = th
      ? CYP.t("q.madv", {
          mad,
          h0: CYP.sf(test.madH0, 3),
          th: `<span class='lamp g'></span> ✓✓ ≤ ${num(th[0])} · ✓ ≤ ${num(th[1])}<br><span class='lamp a'></span> <i class='warn'></i> ≤ ${num(th[2])} · <span class='lamp r'></span> ✗`,
        })
      : CYP.t("q.madna", { mad });
    const on = CYP.lamp(test.conformity);
    return `<button type="button" class="sema" data-pop="x" data-html="${CYP.esc(html)}" aria-label="MAD ${mad}">${["g", "a", "r"].map((k) => `<i class="${k}${k === on ? " on" : ""}"></i>`).join("")}</button>`;
  };
  CYP.sigValue = (test) => (CYP.mode === "s" ? `<span>${CYP.sfmt(test.S)}</span>${CYP.COIN}` : `<span>${CYP.pfmt(test.S)}</span>`);
  CYP.sigQ = (test) =>
    CYP.mode === "s"
      ? CYP.q("q.s", { k: CYP.sfmt(test.S) })
      : CYP.q("q.p", { pe: (log10pOf(test.S) < -4 ? "" : "=&nbsp;") + CYP.pfmt(test.S), df: test.df });
  CYP.digitTable = (test) =>
    test
      ? `<table><thead><tr><th>d</th><th>n</th><th>%</th><th>${test.uniform ? "=" : "Benford"}</th></tr></thead><tbody>${test.labels.map((l, i) => `<tr><td class="data">${l}</td><td>${CYP.int(test.counts[i])}</td><td class="${test.out[i] ? "crit-text" : ""}">${CYP.pct(test.props[i], 1)}</td><td>${CYP.pct(test.exp[i], 1)}</td></tr>`).join("")}</tbody></table>`
      : "";
  const pillHTML = (s) => CYP.esc(s).replace(/⋯/g, '<span class="cdots">···</span>').replace(/^·/, '<span class="cdots">·</span>');

  /* ---------------------------------------------------------------- panel */
  const TABS = {
    d1: ["D⋯", "t.d1", "q.d1"],
    d2: ["·d⋯", "t.d2", "q.d2"],
    f2: ["Dd⋯", "t.f2", "q.f2"],
    l1: ["⋯d", "t.l1", "q.l1"],
    pos: ["D⋯d", "t.pos", "q.pos"],
    sus: ["⚑", "t.sus", "q.sus"],
    dup: ["×2", "t.dup", "q.dup"],
    img: ["▦", "t.img", "q.img"],
  };
  const BARS = ["d1", "d2", "f2", "l1", "sus"];
  CYP.panels = new Set();
  document.addEventListener("cyp:redraw", () =>
    CYP.panels.forEach((p) => {
      if (!p.root.isConnected) CYP.panels.delete(p);
      else if (p.data) p.render();
    }),
  );
  CYP.Panel = class {
    constructor(root, o = {}) {
      this.root = root;
      this.o = o;
      this.tab = "d1";
      root.classList.add("panel");
      root.innerHTML = `
        <div class="herocard">
          <div class="stage">
            <div class="stage-top"><div class="pillbox"><div class="figtools"></div><span class="tabname"></span><nav class="subnav" role="tablist"></nav></div><div class="legend-box"></div></div>
            <div class="chart main"></div>
          </div>
          <div class="caption"><button class="round prev" type="button" aria-label="‹">‹</button>
            <div class="ttl"><span class="kicker"></span><span class="name"></span></div><button class="round pause" type="button"></button><button class="whatbtn" type="button"></button><span class="about"></span>
            <div class="dots"></div><button class="round next" type="button" aria-label="›">›</button></div>
        </div>
        <div class="figstrip"></div>
        <div class="detail"></div>`;
      this.$ = (s) => root.querySelector(s);
      this.$(".prev").addEventListener("click", () => o.carousel && o.carousel.move(-1));
      this.$(".next").addEventListener("click", () => o.carousel && o.carousel.move(1));
      this.$(".pause").addEventListener("click", () => {
        if (o.carousel) {
          o.carousel.toggle();
          this.render();
        }
      });
      this.$(".whatbtn").addEventListener("click", () => {
        if (this.data && this.data.story) CYP.modal(this.data.story(this.res));
      });
      CYP.panels.add(this);
    }
    set(data) {
      this.data = data;
      if (data.kind === "image") {
        const r = CYP.imageForensics(data.image);
        this.img = r;
        this.res = { tests: { d1: r.d1 }, n: r.d1 ? r.d1.n : 0, range: { orders: NaN } };
        if (!["d1", "img"].includes(this.tab)) this.tab = "d1";
      } else {
        this.res = CYP.analyse(data.records, data.opts || {});
        if (this.tab === "img") this.tab = "d1";
      }
      this.render();
    }
    render() {
      const d = this.data,
        res = this.res,
        T = CYP.t,
        c = this.o.carousel;
      if (!d) return;
      this.$(".kicker").textContent = CYP.L(d.kicker) || "";
      this.$(".kicker").hidden = !d.kicker;
      this.$(".name").textContent = CYP.L(d.name) || "";
      this.$(".about").innerHTML = d.about && !d.story ? CYP.qHTML(CYP.L(d.about)) : "";
      this.$(".whatbtn").hidden = !d.story;
      this.$(".whatbtn").textContent = T("home.what");
      this.$(".prev").hidden = !c;
      this.$(".next").hidden = !c;
      this.$(".pause").hidden = !c;
      if (c) {
        const pz = c.paused();
        this.$(".pause").innerHTML = pz ? "▶" : "❚❚";
        this.$(".pause").title = T(pz ? "play" : "pause");
        this.$(".pause").setAttribute("aria-label", T(pz ? "play" : "pause"));
      }
      this.$(".dots").innerHTML = c
        ? Array.from({ length: c.count() }, (_, i) => `<i class="${i === c.index() ? "on" : ""}"></i>`).join("")
        : "";
      if (!res.tests.d1) {
        this.$(".figstrip").innerHTML = `<p class="status">${T("hem.none")}</p>`;
        ["chart.main", "subnav", "detail", "legend-box", "tabname"].forEach((k) => {
          this.$("." + k).innerHTML = "";
        });
        return;
      }
      const ids = d.kind === "image" ? ["d1", "img"] : ["d1", "d2", "f2", "l1", "pos", "sus", "dup"];
      this.$(".subnav").innerHTML = ids
        .map(
          (id) =>
            `<button type="button" role="tab" aria-selected="${id === this.tab}" data-t="${id}" title="${T(TABS[id][1])}" aria-label="${T(TABS[id][1])}">${pillHTML(TABS[id][0])}</button>`,
        )
        .join("");
      this.$(".subnav")
        .querySelectorAll("button")
        .forEach((b) =>
          b.addEventListener("click", () => {
            this.tab = b.dataset.t;
            this.render();
          }),
        );
      this.$(".tabname").innerHTML = `<span>${T(TABS[this.tab][1])}</span>${CYP.q(TABS[this.tab][2])}`;
      this.renderTab();
    }
    figs(test) {
      const T = CYP.t,
        res = this.res,
        img = this.data.kind === "image";
      const fig = (cls, sym, k, v, q) =>
        `<div class="fig ${cls}"><span class="sym">${sym}</span><span class="k">${k}</span><span class="v">${/^<span/.test(v) ? v : `<span>${v}</span>`}</span>${q}</div>`;
      const o = res.range.orders;
      return [
        fig("f-n", ICON.hash, T("fig.n"), CYP.count(test.n), CYP.q("q.n")),
        fig("f-d", ICON.ruler, T("fig.dstar"), CYP.sf(test.dstar, 3), CYP.q("q.dstar")),
        fig(
          "f-o",
          ICON.lens,
          T("fig.orders"),
          img || !Number.isFinite(o) ? "—" : `10<sup>${CYP.sf(o, 3)}</sup>`,
          img || !Number.isFinite(o)
            ? ""
            : CYP.q("q.orders", { min: CYP.sf(res.range.min, 3), max: CYP.count(res.range.max), o: CYP.sf(o, 3) }),
        ),
        fig("f-s", `<span class="ltr">${CYP.mode}</span>`, T(CYP.mode === "s" ? "fig.s" : "fig.p"), CYP.sigValue(test), CYP.sigQ(test)),
        fig(
          "f-m",
          CYP.sema(test),
          T("fig.mad"),
          `<span class="state ${CYP.lamp(test.conformity)}" title="${T("conf." + test.conformity)}">${CYP.CONFSYM[test.conformity] || "—"}</span>`,
          CYP.q("q.mad"),
        ),
      ].join("");
    }
    renderTab() {
      const tab = this.tab,
        res = this.res,
        T = CYP.t,
        main = this.$(".chart.main"),
        det = this.$(".detail"),
        leg = this.$(".legend-box");
      const bars = BARS.includes(tab),
        test = tab === "sus" ? res.tests.f2 : bars ? res.tests[tab] : res.tests.d1;
      const ci = CYP.fmt(100 * CYP.CI[CYP.sigma], 1) + " %";
      const items = [];
      if (bars && test) {
        items.push(
          `<span class="li"><i class="sw-out"></i>${T("leg.out")}${CYP.q("q.out", { ci })}</span>`,
          `<span class="li"><i class="sw-exp"></i>${T(test.uniform ? "leg.unif" : "leg.exp")}${CYP.q(test.uniform ? "q.unif" : "q.exp")}</span>`,
        );
      }
      leg.innerHTML = items.join("");
      this.$(".figtools").innerHTML =
        (bars && test
          ? `<details class="dd"><summary class="q pct" title="${T("pct")}" aria-label="${T("pct")}">%</summary><div class="dd-body">${CYP.digitTable(test)}</div></details>`
          : "") +
        (tab !== "dup" ? `<button type="button" class="q copy" title="${T("copy")}" aria-label="${T("copy")}">${ICON.copy}</button>` : "") +
        `<span class="copied" role="status"></span>`;
      this.$(".figstrip").innerHTML = test ? this.figs(test) : "";
      const cp = this.$(".figtools .copy");
      if (cp) cp.addEventListener("click", () => this.copy());
      clearInterval(this._rot);
      this._rot = 0;
      main.innerHTML = "";
      det.innerHTML = "";
      const colour = this.data.colour;
      if (bars) CYP.responsive(main, (w) => CYP.barChart(main, test, { width: w, colour }));
      if (tab === "pos") CYP.responsive(main, () => CYP.positionMatrix(main, res.positions));
      else if (tab === "sus") {
        const s = res.suspects;
        det.innerHTML = `<div class="tags">${s.bins.map((b) => `<span class="tag crit">⚑ ${b.label} · ${CYP.int(b.count)} / ${CYP.fmt(b.expected, 0)}</span>`).join("")}</div>
          <div class="table-wrap" style="max-height:360px"><table><thead><tr><th>${T("col.line")}</th><th>${T("col.value")}</th><th style="text-align:left">${T("col.context")}</th></tr></thead><tbody>
          ${s.records
            .slice(0, 150)
            .map(
              (r) =>
                `<tr><td>${r.row}</td><td class="data">${CYP.fmt(r.v, res.decimals)}</td><td class="text">${CYP.esc(r.ctx || "")}</td></tr>`,
            )
            .join("")}</tbody></table></div>`;
      } else if (tab === "dup") {
        const top = res.dups.slice(0, 12),
          mx = Math.max(1, ...top.map((x) => x.count));
        const pick = (c) => {
          const a = c.slice();
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a
            .slice(0, 2)
            .map((x) => `<span class="dc">${CYP.esc(x)}</span>`)
            .join("");
        };
        if (top.length)
          leg.innerHTML = `<span class="li"><button type="button" class="q dplay" aria-label="${T("play")}" title="${T("play")}">▶</button></span>`;
        main.innerHTML = top.length
          ? `<div class="dups">${top.map((x, i) => `<div class="drow"><span class="data">${CYP.fmt(x.value, res.decimals)}</span><span class="dtrack"><span class="dbar" style="width:${(100 * x.count) / mx}%"></span></span><span class="data">×${CYP.int(x.count)}</span><span class="dctx" data-i="${i}" title="${CYP.esc(x.ctx.slice(0, 12).join("\n"))}">${pick(x.ctx)}</span></div>`).join("")}</div>`
          : "<p class='status'>—</p>";
        const btn = leg.querySelector(".dplay");
        const step = () =>
          main.querySelectorAll(".dctx").forEach((n) => {
            const c = top[+n.dataset.i].ctx;
            if (c.length > 2) {
              n.classList.remove("in");
              void n.offsetWidth;
              n.innerHTML = pick(c);
              n.classList.add("in");
            }
          });
        if (btn)
          btn.addEventListener("click", () => {
            if (this._rot) {
              clearInterval(this._rot);
              this._rot = 0;
              btn.textContent = "▶";
              btn.title = T("play");
              return;
            }
            step();
            btn.textContent = "❚❚";
            btn.title = T("pause");
            this._rot = setInterval(() => {
              if (!main.isConnected) {
                clearInterval(this._rot);
                this._rot = 0;
              } else step();
            }, 2200);
          });
      } else if (tab === "img") this.renderImage(main, leg);
    }
    renderImage(main, leg) {
      const r = this.img,
        T = CYP.t,
        pal = this.palette || "seq";
      main.innerHTML = `<div class="imgstage"><canvas></canvas></div>`;
      leg.insertAdjacentHTML(
        "afterbegin",
        `<span class="li scale"><span>0</span><span class="ramp"></span><span class="rmax"></span><select aria-label="palette"><option value="seq"${pal === "seq" ? " selected" : ""}>${T("img.pal.seq")}</option><option value="turbo"${pal === "turbo" ? " selected" : ""}>${T("img.pal.rb")}</option></select></span>`,
      );
      leg.querySelector("select").addEventListener("change", (e) => {
        this.palette = e.target.value;
        this.renderTab();
      });
      const cv = main.querySelector("canvas");
      cv.width = r.W;
      cv.height = r.H;
      const c = cv.getContext("2d");
      c.drawImage(r.canvas, 0, 0);
      const mx = Math.max(0.02, ...r.tiles.mad.filter((x) => x != null));
      const colour = (t) => (pal === "turbo" ? CYP.turbo(t) : mix(CYP.cssVar("--sky"), CYP.cssVar("--bar-out"), t));
      c.globalAlpha = 0.55;
      r.tiles.mad.forEach((m, i) => {
        if (m != null) {
          c.fillStyle = colour(m / mx);
          c.fillRect((i % r.tiles.cols) * r.tiles.size, Math.floor(i / r.tiles.cols) * r.tiles.size, r.tiles.size, r.tiles.size);
        }
      });
      c.globalAlpha = 1;
      leg.querySelector(".ramp").style.background = `linear-gradient(90deg, ${[0, 0.25, 0.5, 0.75, 1].map(colour).join(",")})`;
      leg.querySelector(".rmax").textContent = CYP.sf(mx, 3);
      cv.addEventListener("mousemove", (ev) => {
        const b = cv.getBoundingClientRect(),
          x = ((ev.clientX - b.left) / b.width) * r.W,
          y = ((ev.clientY - b.top) / b.height) * r.H;
        const m = r.tiles.mad[Math.floor(y / r.tiles.size) * r.tiles.cols + Math.floor(x / r.tiles.size)];
        CYP.tip.show(m == null ? "—" : `MAD ${CYP.sf(m, 3)}`, ev);
      });
      cv.addEventListener("mouseleave", CYP.tip.hide);
    }
    async copy() {
      const flag = this.$(".copied"),
        node = this.$(".chart.main svg") || this.$(".chart.main canvas");
      const say = (k) => {
        if (flag) {
          flag.textContent = CYP.t(k);
          clearTimeout(this._ct);
          this._ct = setTimeout(() => {
            flag.textContent = "";
          }, 2200);
        }
      };
      if (!node) return say("copyfail");
      try {
        await copyGraphic(node);
        say("copied");
      } catch (e) {
        say("copyfail");
      }
    }
  };

  /* ------------------------------------------------------- election cards */
  CYP.ICON_DOC = ICON.doc;
  CYP.electionCard = function (entry, data, inner = "", side = "") {
    const day = new Date(entry.date + "T12:00:00");
    const long = day.toLocaleDateString(locale(), { day: "numeric", month: "long", year: "numeric" });
    const srcs = (data && data.sources) || entry.sources || [];
    return `<article class="card ecard${entry.page ? " linked" : ""}" id="e-${entry.id}">
      <div class="ehead${side ? " has-side" : ""}">
        <div class="cal-mini" aria-hidden="true"><b>${entry.date.slice(8, 10)}</b><span>${day.toLocaleDateString(locale(), { month: "short" }).replace(".", "")}</span><span>${entry.date.slice(0, 4)}</span></div>
        <div class="emain">
          <h2>${entry.page ? `<a class="stretch" href="${CYP.base}${entry.page}${location.protocol === "file:" ? "index.html" : ""}">` : ""}${CYP.esc(CYP.L(entry.name))}<span class="edate"> · ${long}</span>${entry.page ? `</a>` : ""}</h2>
          <ul class="srcs">${srcs.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${ICON.doc}${CYP.esc(s.label)}</a><span>${CYP.esc(CYP.L(s))}</span></li>`).join("")}</ul>
        </div>
        ${side ? `<div class="eside">${side}</div>` : ""}
      </div>
      ${inner ? `<div class="ebody">${inner}</div>` : ""}
    </article>`;
  };
  CYP.electionData = (id) => (window.CYP_ELECTION_DATA || {})[id];
  CYP.loadElection = async (entry) => {
    if (!entry.file) return null;
    if (!CYP.electionData(entry.id)) await CYP.loadScript(entry.file);
    return CYP.electionData(entry.id);
  };

  CYP.math = async function (node) {
    if (!window.MathJax || !window.MathJax.typesetPromise) {
      window.MathJax = {
        tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] },
        svg: { fontCache: "global" },
        startup: { typeset: false },
        options: { enableMenu: false },
      };
      try {
        await CYP.loadScript(LIBS.mathjax);
        await window.MathJax.startup.promise;
      } catch (e) {
        return;
      }
    }
    try {
      await window.MathJax.typesetPromise([node]);
    } catch (e) {
      /* TeX source stays */
    }
  };

  /* ------------------------------------------------------------ top bar */
  const FLAG = {
    es: `<svg viewBox="0 0 30 20" width="28" height="19" aria-hidden="true"><rect width="30" height="20" rx="2" fill="#c60b1e"/><rect y="5" width="30" height="10" fill="#ffc400"/></svg>`,
    en: `<svg viewBox="0 0 60 40" width="28" height="19" aria-hidden="true"><clipPath id="ukc"><rect width="60" height="40" rx="4"/></clipPath><g clip-path="url(#ukc)"><rect width="60" height="40" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="8"/><path d="M0 0 60 40M60 0 0 40" stroke="#c8102e" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="12"/><path d="M30 0v40M0 20h60" stroke="#c8102e" stroke-width="7"/></g></svg>`,
  };
  const LOGO = `<svg width="40" height="40" viewBox="0 0 54 54" aria-hidden="true"><rect width="54" height="54" rx="12" fill="var(--blue)"/>${REF.d1.map((p, i) => `<rect x="${7 + i * 4.6}" y="${46 - p * 105}" width="3.2" height="${p * 105}" rx="1" fill="#fff" opacity="${1 - i * 0.06}"/>`).join("")}<rect x="7" y="47.5" width="40" height="2" rx="1" fill="#fff"/></svg>`;
  CYP.LOGO = LOGO;
  const NAV = [
    ["inicio", ICON.home],
    ["pruebalo", ICON.upload],
    ["hemeroteca", ICON.cal],
    ["info", ICON.info],
  ];
  const SUN = svgI(
    `<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>`,
    19,
  );
  const MOON = svgI(`<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>`, 19);
  CYP.base = window.CYP_BASE || "";
  CYP.home = CYP.base ? (location.protocol === "file:" ? CYP.base + "index.html" : CYP.base) : "";
  CYP.renderBar = function () {
    const bar = document.getElementById("bar");
    if (!bar) return;
    const cur = CYP.route || "inicio",
      to = CYP.lang === "es" ? "en" : "es";
    bar.innerHTML = `<div class="wrap bar-in">
      <a class="brand" href="${CYP.home}#inicio" aria-label="CIFRAS Y PAPELETAS">${LOGO}<span class="name">CIFRAS Y<br>PAPELETAS</span></a>
      <nav class="tabs" aria-label="Secciones">${NAV.map(([id, ic]) => `<a href="${CYP.home}#${id}" data-route="${id}"${id === cur ? ' aria-current="page"' : ""} title="${CYP.t("tab." + id)}"><span class="ic">${ic}</span><span class="lbl">${CYP.t("tab." + id)}</span></a>`).join("")}<button type="button" class="flag themebtn" id="theme-btn" title="${CYP.t("theme")}" aria-label="${CYP.t("theme")}">${CYP.theme === "dark" ? MOON : SUN}</button><button type="button" class="flag" id="lang-btn" title="${CYP.t("lang.cur")}" aria-label="${CYP.t("lang.cur")}">${FLAG[CYP.lang]}</button></nav>
      <div class="ctl">
        <div class="seg" role="group" aria-label="p / s"><button type="button" data-mode="p" aria-pressed="${CYP.mode === "p"}" title="${CYP.t("mode.p")}">p</button><button type="button" data-mode="s" aria-pressed="${CYP.mode === "s"}" title="${CYP.t("mode.s")}">s</button></div>${CYP.q("q.mode")}
        <span class="ctlgap"></span><span class="sigl" aria-hidden="true">σ</span><div class="seg sig" role="group" aria-label="σ">${[1, 2, 3].map((k) => `<button type="button" data-sigma="${k}" aria-pressed="${CYP.sigma === k}" title="${k}σ · ${CYP.fmt(100 * CYP.CI[k], 1)} %">${k}</button>`).join("")}</div>${CYP.q("q.sigma")}
      </div></div>`;
    bar.querySelector("#lang-btn").addEventListener("click", () => CYP.setLang(to));
    bar.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => CYP.setMode(b.dataset.mode)));
    bar.querySelectorAll("[data-sigma]").forEach((b) => b.addEventListener("click", () => CYP.setSigma(+b.dataset.sigma)));
    bar.querySelector("#theme-btn").addEventListener("click", () => CYP.setTheme(CYP.theme === "dark" ? "light" : "dark"));
  };
})();
