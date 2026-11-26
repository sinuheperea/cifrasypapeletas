/* Full election browser. No party grouping; downloads include every matching row. */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id),
    esc = (s) => CYP.esc(s);
  const tr = (es, en) => (CYP.lang === "en" ? en : es);
  const num = (v) => (Number.isFinite(v) ? CYP.int(v) : "—");
  const norm = (s) =>
    String(s ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const index = window.CYP_ARCHIVE_INDEX || [];
  const state = {
    id: new URLSearchParams(location.search).get("election") || index.at(-1)?.id,
    chamber: "congreso",
    territory: "",
    party: "",
    query: "",
    scope: "total",
    view: "results",
    page: 0,
    size: 50,
    sort: "territory",
  };
  if (!index.some((e) => e.id === state.id)) state.id = index.at(-1)?.id;
  let data = null,
    language = null,
    loading = null,
    panel = null,
    generation = 0;
  const dateLabel = (id) =>
    new Date(id + "T12:00:00").toLocaleDateString(CYP.lang === "en" ? "en-GB" : "es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const entry = () => index.find((e) => e.id === state.id);
  const chosenRows = () => {
    if (!data) return [];
    if (state.view === "elected")
      return state.chamber === "congreso"
        ? (data.electedCongress || []).map((r) => ({ territory: r[0], party: r[1], candidate: r[2], votes: null, elected: true }))
        : (data.senate?.filter((r) => r[4]) || data.electedSenate || []).map((r) => ({
            territory: r[0],
            party: r[1],
            candidate: r[2],
            votes: r[3],
            elected: true,
          }));
    if (state.scope === "cera")
      return (state.chamber === "congreso" ? data.congressCera : data.senateCera || []).map((r) => ({
        territory: r[0],
        party: r[1],
        votes: r[2],
        seats: null,
      }));
    if (state.chamber === "congreso") return data.congress.map((r) => ({ territory: r[0], party: r[1], votes: r[2], seats: r[3] }));
    if (data.senate) return data.senate.map((r) => ({ territory: r[0], party: r[1], candidate: r[2], votes: r[3], elected: r[4] }));
    return (data.senateParties || []).map((r) => ({ territory: r[0], party: r[1], votes: r[2], seats: r[3] }));
  };
  function filteredRows() {
    let rows = chosenRows().filter(
      (r) =>
        (!state.territory || r.territory === state.territory) &&
        (!state.party || r.party === state.party) &&
        (!state.query || norm([r.territory, r.party, r.candidate].join(" ")).includes(norm(state.query))),
    );
    return rows.sort((a, b) =>
      state.sort === "votes"
        ? (b.votes ?? -1) - (a.votes ?? -1) || a.party.localeCompare(b.party, "es")
        : state.sort === "party"
          ? a.party.localeCompare(b.party, "es") || a.territory.localeCompare(b.territory, "es")
          : a.territory.localeCompare(b.territory, "es") ||
            (b.votes ?? -1) - (a.votes ?? -1) ||
            String(a.candidate || a.party).localeCompare(String(b.candidate || b.party), "es"),
    );
  }
  function turnout() {
    return data?.turnout?.[state.chamber] || {};
  }
  function stats() {
    const selectedProvince =
      state.chamber === "senado" ? data.senateProvinceByTerritory?.[state.territory] || state.territory : state.territory;
    const ts = Object.entries(turnout())
      .filter(([k]) => !selectedProvince || k === selectedProvince)
      .map(([, v]) => v);
    const suffix = state.scope === "cera" ? "CERA" : "";
    const sum = (key) => {
      const vs = ts.map((t) => t[key + suffix]);
      return vs.length && vs.every(Number.isFinite) ? vs.reduce((a, b) => a + b, 0) : null;
    };
    const voters = sum("votantes"),
      electorate = sum("electores");
    const metrics = [
      [tr("Censo electoral", "Electoral register"), num(electorate)],
      [tr("Votantes", "Voters"), num(voters)],
      [tr("Participación", "Turnout"), electorate && Number.isFinite(voters) ? CYP.pct(voters / electorate, 2) : "—"],
      [tr("Votos en blanco / nulos", "Blank / invalid ballots"), num(sum("blancos")) + " / " + num(sum("nulos"))],
    ];
    $("archive-stats").innerHTML = metrics.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("");
  }
  function renderControls() {
    const rows = chosenRows(),
      territories = (state.view === "participation" ? Object.keys(turnout()) : [...new Set(rows.map((r) => r.territory))]).sort((a, b) =>
        a.localeCompare(b, "es"),
      );
    const parties = [...new Set(rows.filter((r) => !state.territory || r.territory === state.territory).map((r) => r.party))].sort((a, b) =>
      a.localeCompare(b, "es"),
    );
    if (!territories.includes(state.territory)) state.territory = "";
    if (!parties.includes(state.party)) state.party = "";
    const options = (values, chosen, all) =>
      `<option value="">${all}</option>` +
      values.map((v) => `<option value="${esc(v)}"${v === chosen ? " selected" : ""}>${esc(v)}</option>`).join("");
    $("archive-controls").innerHTML =
      `<label>${tr("Cámara", "Chamber")}<select id="archive-chamber"><option value="congreso"${state.chamber === "congreso" ? " selected" : ""}>${tr("Congreso de los Diputados", "Congress of Deputies")}</option><option value="senado"${state.chamber === "senado" ? " selected" : ""}>${tr("Senado", "Senate")}</option></select></label>
      <label>${tr("Territorio", "Territory")}<select id="archive-territory">${options(territories, state.territory, tr("Todos los territorios", "All territories"))}</select></label>
      <label class="party-control">${tr("Candidatura", "Party / coalition")}<select id="archive-party"${state.view === "participation" ? " disabled" : ""}>${options(parties, state.party, tr("Todas las candidaturas", "All parties"))}</select></label>
      <label>${tr("Ámbito del voto", "Vote scope")}<select id="archive-scope"${state.view === "elected" ? " disabled" : ""}><option value="total"${state.scope === "total" ? " selected" : ""}>${tr("Total (incluye CERA)", "Total (includes CERA)")}</option><option value="cera"${state.scope === "cera" ? " selected" : ""}>${tr("Voto exterior · CERA", "Overseas vote · CERA")}</option></select></label>
      <label class="search-control">${tr("Buscar en los resultados", "Search the results")}<input id="archive-search" type="search" value="${esc(state.query)}" placeholder="${tr("Nombre, candidatura o territorio…", "Name, party or territory…")}"${state.view === "participation" ? " disabled" : ""}></label>
      <button id="archive-reset" class="text-button reset-control" type="button">${tr("Restablecer filtros", "Reset filters")}</button>`;
    for (const [id, key] of [
      ["chamber", "chamber"],
      ["territory", "territory"],
      ["party", "party"],
      ["scope", "scope"],
    ])
      $("archive-" + id).addEventListener("change", (e) => {
        state[key] = e.target.value;
        state.page = 0;
        if (key === "chamber" || key === "scope") {
          state.territory = "";
          state.party = "";
        }
        renderControls();
        renderContent();
        $("archive-" + id)?.focus();
      });
    $("archive-search").addEventListener("input", (e) => {
      state.query = e.target.value;
      state.page = 0;
      renderContent();
    });
    $("archive-reset").onclick = () => {
      Object.assign(state, { territory: "", party: "", query: "", scope: "total", page: 0 });
      renderControls();
      renderContent();
    };
  }
  function csv(headers, rows) {
    return "\ufeff" + [headers, ...rows].map((r) => r.map((v) => '"' + String(v ?? "").replace(/"/g, '""') + '"').join(",")).join("\r\n");
  }
  function download(text, name, type) {
    const blob = new Blob([text], { type }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function downloadRows(rows, all = false) {
    download(
      csv(
        ["fecha", "camara", "ambito", "territorio", "candidatura", "persona", "votos", "escanos", "electo", "fuente"],
        rows.map((r) => [
          state.id,
          state.chamber,
          state.scope,
          r.territory,
          r.party,
          r.candidate || "",
          r.votes,
          r.seats,
          r.elected === undefined ? "" : r.elected ? "sí" : "no",
          state.chamber === "senado" && data.senate && state.scope === "total"
            ? data.senateSourceLabel || "BOE / JEC"
            : "Ministerio del Interior · datos abiertos",
        ]),
      ),
      `${state.id}-${state.chamber}-${state.scope}-${all ? "todos" : "seleccion"}.csv`,
      "text/csv;charset=utf-8",
    );
  }
  function coverage() {
    let notes = [];
    if (state.scope === "cera")
      notes.push(
        tr(
          "CERA es un subconjunto del total, no un recuento adicional. Su desglose no está disponible de forma completa para todas las convocatorias.",
          "CERA is a subset of the total, not an additional count. Its breakdown is not complete for every election.",
        ),
      );
    if (state.chamber === "senado" && state.scope === "total" && state.view !== "participation") {
      if (data.senate)
        notes.push(
          tr(
            "Senado: votos por persona y circunscripción, incluidas las candidaturas sin escaño. Cada elector puede votar a varias personas; la suma de votos no equivale al número de votantes.",
            "Senate: votes per person and constituency, including unsuccessful candidates. Each voter may select several people; the sum of votes is not the number of voters.",
          ),
        );
      else
        notes.push(
          tr(
            "Para esta convocatoria, la tabla disponible es el agregado por partido y provincia del Ministerio. Los resultados nominales íntegros se consultan en los documentos oficiales enlazados; no se presenta este agregado como una lista completa de candidatos.",
            "For this election, the available table is the Ministry’s aggregate by party and province. Complete named results are in the linked official documents; this aggregate is not a full candidate list.",
          ),
        );
    }
    if (state.chamber === "congreso" && state.view === "results")
      notes.push(
        tr(
          "Una fila por candidatura y provincia. Se muestran todas las candidaturas con votos o escaños, sin agruparlas en «Otros»; se añaden las candidaturas con cero votos identificadas en los microdatos disponibles.",
          "One row per party and province. Every party with votes or seats is shown, without an “Others” group; identified zero-vote candidatures from available microdata are also included.",
        ),
      );
    const issues = (data.issues || []).filter((x) => !x.chamber || x.chamber === state.chamber).map((x) => tr(x.es, x.en || x.es));
    $("archive-coverage").innerHTML =
      notes.map((n) => `<p class="archive-note">${n}</p>`).join("") +
      issues.map((n) => `<p class="archive-note issue">${esc(n)}</p>`).join("");
  }
  function renderTable() {
    const rows = filteredRows();
    const isPerson = state.view === "elected" || (state.chamber === "senado" && data.senate && state.scope === "total");
    const hasSeats = state.scope !== "cera" && !isPerson;
    const hasPercent = state.chamber === "congreso" && state.view !== "elected";
    const hasVotes = state.view !== "elected" || state.chamber === "senado";
    const start = state.size ? state.page * state.size : 0,
      end = state.size ? Math.min(start + state.size, rows.length) : rows.length;
    const title =
      state.view === "elected"
        ? tr("Relación de personas electas", "Elected representatives")
        : isPerson
          ? tr("Todos los candidatos al Senado", "All Senate candidates")
          : tr("Resultados por candidatura", "Results by party / coalition");
    const pages = state.size ? Math.max(1, Math.ceil(rows.length / state.size)) : 1;
    const pager = (k) =>
      `<span class="pager"><button type="button" class="q pg" data-pg="-1" aria-label="${tr("Anterior", "Previous")}"${start === 0 ? " disabled" : ""}>‹</button><span>${state.size ? state.page + 1 : 1} / ${pages}</span><button type="button" class="q pg" data-pg="1" aria-label="${tr("Siguiente", "Next")}"${end >= rows.length ? " disabled" : ""}>›</button></span>`;
    const bulletins = (entry().sources || [])
      .map((d) => `<a href="${esc(d.local || d.pdf || d.url)}" target="_blank" rel="noopener">${CYP.ICON_DOC}${esc(d.label)}</a>`)
      .join("");
    let html = `<div class="result-toolbar"><h3>${title}</h3><div class="toolbar-actions"><label class="sr-only" for="archive-sort">${tr("Ordenar resultados", "Sort results")}</label><select id="archive-sort" style="width:190px"><option value="territory"${state.sort === "territory" ? " selected" : ""}>${tr("Por territorio", "By territory")}</option><option value="votes"${state.sort === "votes" ? " selected" : ""}>${tr("Más votos primero", "Most votes first")}</option><option value="party"${state.sort === "party" ? " selected" : ""}>${tr("Por candidatura", "By party")}</option></select>${pager()}<button type="button" class="q dl" id="archive-all-csv" title="${tr("Descargar todos los resultados · CSV", "Download all results · CSV")}" aria-label="${tr("Descargar todos los resultados · CSV", "Download all results · CSV")}">${CYP.ICON.copy}</button></div></div>`;
    if (!rows.length)
      html += `<div class="empty-results"><h3>${tr("No hay registros para esta selección", "No records for this selection")}</h3><p>${tr("Prueba a restablecer los filtros o consulta la cobertura en las fuentes.", "Try resetting the filters or check coverage in the sources.")}</p></div>`;
    else
      html += `<div class="archive-table-wrap" tabindex="0" aria-label="${tr("Tabla de resultados, desplazable", "Scrollable results table")}"><table class="archive-table"><caption>${state.chamber === "senado" && state.scope === "total" ? esc(data.senateSourceLabel) : tr("Ministerio del Interior · datos abiertos", "Ministry of the Interior · open data")}<br>${dateLabel(state.id)} · ${tr(state.chamber === "congreso" ? "Congreso" : "Senado", state.chamber === "congreso" ? "Congress" : "Senate")} · ${state.scope === "cera" ? "CERA" : tr("Total del censo", "Whole electoral register")} · ${tr("Filas", "Rows")} ${num(start + 1)}–${num(end)} ${tr("de", "of")} ${num(rows.length)}</caption><thead><tr><th scope="col">${tr("Territorio", "Territory")}</th>${isPerson ? `<th scope="col">${tr("Persona candidata", "Candidate")}</th>` : ""}<th scope="col">${tr("Candidatura", "Party / coalition")}</th>${hasVotes ? `<th class="num" scope="col">${tr("Votos", "Votes")}</th>` : ""}${hasPercent ? `<th class="num" scope="col">${tr("% válidos", "% valid")}</th>` : ""}${hasSeats ? `<th class="num" scope="col">${tr("Escaños", "Seats")}</th>` : ""}${isPerson ? `<th scope="col">${tr("Elección", "Elected")}</th>` : ""}</tr></thead><tbody>${rows
        .slice(start, end)
        .map((r) => {
          const denominator = turnout()[r.territory]?.[state.scope === "cera" ? "validosCERA" : "validos"];
          return `<tr><td class="territory">${esc(r.territory)}</td>${isPerson ? `<td class="person">${esc(r.candidate)}</td>` : ""}<td class="party">${esc(r.party)}</td>${hasVotes ? `<td class="num">${num(r.votes)}${r.votes === null ? `<span class="sr-only"> ${tr("dato no disponible; consulte incidencias", "unavailable; see data issues")}</span>` : ""}</td>` : ""}${hasPercent ? `<td class="num">${denominator && Number.isFinite(r.votes) ? CYP.pct(r.votes / denominator, 2) : "—"}</td>` : ""}${hasSeats ? `<td class="num">${num(r.seats)}</td>` : ""}${isPerson ? `<td>${r.elected ? `<span class="elected">${tr("Electo/a", "Elected")}</span>` : tr("No", "No")}</td>` : ""}</tr>`;
        })
        .join("")}</tbody></table></div>`;
    html += `<div class="archive-pager"><span class="bulletins">${bulletins}</span><div class="toolbar-actions"><label class="sr-only" for="archive-size">${tr("Filas por página", "Rows per page")}</label><select id="archive-size">${[25, 50, 100, 0].map((n) => `<option value="${n}"${n === state.size ? " selected" : ""}>${n || tr("Todas", "All")} ${n ? tr("filas", "rows") : ""}</option>`).join("")}</select>${pager()}</div></div>`;
    if (hasPercent)
      html += `<p class="archive-foot">${tr("El porcentaje usa los votos válidos del territorio, incluidos los votos en blanco.", "Percentages use the territory’s valid votes, including blank ballots.")}</p>`;
    $("archive-panel").innerHTML = html;
    $("archive-sort").onchange = (e) => {
      state.sort = e.target.value;
      state.page = 0;
      renderTable();
    };
    $("archive-all-csv").onclick = () => downloadRows(chosenRows(), true);
    $("archive-size").onchange = (e) => {
      state.size = Number(e.target.value);
      state.page = 0;
      renderTable();
    };
    $("archive-panel")
      .querySelectorAll("[data-pg]")
      .forEach(
        (b) =>
          (b.onclick = () => {
            state.page += Number(b.dataset.pg);
            renderTable();
          }),
      );
  }
  function renderContent() {
    if (!data) return;
    coverage();
    stats();
    renderTable();
  }
  async function loadElection() {
    const g = ++generation,
      id = state.id;
    $("archive-body").hidden = true;
    $("archive-loading").hidden = false;
    $("archive-loading").textContent = tr("Cargando datos de la elección…", "Loading election data…");
    try {
      if (!window.CYP_ARCHIVE_DATA?.[id])
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `data/archivo/${id}.js`;
          script.onload = resolve;
          script.onerror = () => {
            script.remove();
            reject(new Error("load"));
          };
          document.head.append(script);
        });
      if (g !== generation) return;
      data = window.CYP_ARCHIVE_DATA[id];
      if (!data) throw new Error("missing");
      $("archive-loading").hidden = true;
      $("archive-body").hidden = false;
      $("archive-date").textContent = dateLabel(id);
      $("archive-subtitle").textContent =
        id === "1977-06-15"
          ? tr("Elecciones constituyentes · serie histórica completa", "Constituent election · complete historical series")
          : tr("Elecciones a las Cortes Generales", "Election to the Spanish Parliament");
      renderControls();
      renderContent();
    } catch (e) {
      if (g !== generation) return;
      $("archive-loading").innerHTML =
        `${tr("No se han podido cargar los datos.", "The election data could not be loaded.")} <button type="button" class="btn alt sm" id="archive-retry">${tr("Reintentar", "Retry")}</button>`;
      $("archive-retry").onclick = loadElection;
    }
  }
  function mount() {
    if (!$("archive-root") || !index.length) return;
    if (language === CYP.lang && $("archive-body")) return;
    language = CYP.lang;
    $("archive-root").innerHTML =
      `<div class="archive"><p id="archive-loading" role="status"></p><div id="archive-body" class="archive" hidden><div class="archive-head"><div><h2 id="archive-date"></h2><p id="archive-subtitle"></p></div><span class="source-badge">${tr("JEC · BOE · Ministerio del Interior", "JEC · BOE · Ministry of the Interior")}</span></div>
      <div id="archive-stats" class="archive-stats"></div><div class="archive-controls" id="archive-controls"></div><div id="archive-coverage" style="display:grid;gap:10px"></div><div id="archive-panel" class="archive-panel"></div></div></div>`;
    document.querySelectorAll("[data-election]").forEach(
      (b) =>
        (b.onclick = () => {
          state.id = b.dataset.election;
          Object.assign(state, { territory: "", party: "", query: "", page: 0 });
          document.querySelectorAll("[data-election]").forEach((x) => x.setAttribute("aria-pressed", x === b));
          const url = new URL(location.href);
          url.searchParams.set("election", state.id);
          history.replaceState(null, "", url);
          loadElection();
        }),
    );
    loading = loadElection();
  }
  const loadingData = new Map();
  async function getData(id) {
    if (window.CYP_ARCHIVE_DATA?.[id]) return window.CYP_ARCHIVE_DATA[id];
    if (!loadingData.has(id))
      loadingData.set(
        id,
        new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `data/archivo/${id}.js`;
          script.onload = () => resolve(window.CYP_ARCHIVE_DATA[id]);
          script.onerror = () => {
            loadingData.delete(id);
            script.remove();
            reject(new Error("Election data unavailable"));
          };
          document.head.append(script);
        }),
      );
    return loadingData.get(id);
  }
  function choose(id) {
    const changed = state.id !== id;
    state.id = id;
    if (changed) Object.assign(state, { territory: "", party: "", query: "", page: 0 });
    const ready = language === CYP.lang && $("archive-body");
    mount();
    if (ready) loadElection();
  }
  window.CYPArchive = { mount, choose, getData };
})();
