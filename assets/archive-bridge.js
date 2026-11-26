/* Converts an archive election into the long table used by the analysis panel. */
(() => {
  const norm = (s) =>
    String(s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  const families = [
    ["PP", /\bPP\b|PARTIDO POPULAR|PARTIT POPULAR/],
    ["PSOE", /PSOE|PARTIDO SOCIALISTA OBRERO ESPANOL/],
    ["VOX", /\bVOX\b/],
    ["SUMAR", /SUMAR|FRENTE AMPLIO/],
    ["UP", /PODEMOS|PODEM\b|EN COMU|ELKARREKIN/],
    ["CS", /CIUDADANOS|CIUTADANS|\bCS\b/],
    ["UCD", /UNION DE CENTRO DEMOCRATICO|\bUCD\b/],
    ["AP", /ALIANZA POPULAR|\bAP\b/],
    ["IU", /IZQUIERDA UNIDA|ESQUERRA UNIDA|\bIU\b/],
    ["PCE", /PARTIDO COMUNISTA DE ESPANA|\bPCE\b/],
    ["CDS", /CENTRO DEMOCRATICO Y SOCIAL|\bCDS\b/],
    ["CiU", /CONVERGENCIA I UNIO|\bCIU\b/],
    ["PNV", /\bPNV\b/],
    ["ERC", /ESQUERRA REPUBLICANA|\bERC\b/],
  ];
  const family = (p) => families.find(([, rx]) => rx.test(norm(p)))?.[0] || "OTROS";
  const fixed = {
    PP: "#1f6fd1",
    AP: "#1f6fd1",
    PSOE: "#d12e2e",
    VOX: "#2f9e44",
    UCD: "#2f9e44",
    CDS: "#2f9e44",
    SUMAR: "#e8b400",
    IU: "#e8b400",
    UP: "#7b4fc8",
    CS: "#e07b00",
    CiU: "#e07b00",
    PCE: "#d6478f",
  };
  function entry(id) {
    const e = window.CYP_ARCHIVE_INDEX.find((e) => e.id === id);
    return {
      ...e,
      name: {
        es: id.startsWith("1977") ? "Elecciones constituyentes" : "Elecciones generales",
        en: id.startsWith("1977") ? "Constituent election" : "General election",
      },
      sources: e.sources.map((s) => ({ label: s.label, url: s.url, es: "", en: "" })),
    };
  }
  function graph(d, e) {
    const rows = [];
    for (const r of d.congress) rows.push(["congreso", "ES", r[0], r[1], family(r[1]), r[2], ""]);
    for (const r of d.senate) rows.push(["senado", "ES", r[0], r[1], family(r[1]), r[3], r[2]]);
    for (const [key, chamber] of [
      ["congressCera", "congreso"],
      ["senateCera", "senado"],
    ])
      for (const r of d[key] || []) rows.push([chamber, "CERA", r[0], r[1], family(r[1]), r[2], "CERA"]);
    // 2023: overseas register by consulate; other years: totals by province.
    const original = window.CYP_ELECTION_DATA?.[d.date];
    const census = original?.rows.filter((r) => r[0] === "censo") || [];
    if (census.length) rows.push(...census);
    else
      for (const [province, t] of Object.entries(d.turnout.congreso)) {
        if (Number.isFinite(t.electoresCERA))
          rows.push(["censo", "CERA", province, "electores", "", t.electoresCERA, "Censo CERA por provincia"]);
        if (Number.isFinite(t.votantesCERA))
          rows.push(["censo", "CERA", province, "sobres", "", t.votantesCERA, "Votantes CERA por provincia"]);
      }
    const totals = {};
    for (const r of rows) if (r[0] === "congreso" && r[1] === "ES" && r[4] !== "OTROS") totals[r[4]] = (totals[r[4]] || 0) + r[5];
    let spare = 0;
    const colours = ["#00a3a3", "#8c6d1f", "#5b6b7a", "#b05cc6"];
    const fs = Object.keys(totals)
      .sort((a, b) => totals[b] - totals[a])
      .slice(0, 4)
      .map((id) => ({ id, colour: fixed[id] || colours[spare++], votos: totals[id] }));
    const keep = new Set(fs.map((f) => f.id));
    for (const r of rows) if (r[4] && !keep.has(r[4])) r[4] = "OTROS";
    return { ...e, rows, families: fs, sources: e.sources };
  }
  window.CYPArchiveBridge = { entry, graph };
})();
