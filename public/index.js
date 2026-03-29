<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Seam</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
<script src="/scram/scramjet.all.js"></script>
<script>
  let scram = null;
  let scramReady = false;
  let scramInitPromise = null;

  function initScramjet() {
    if (scramInitPromise) return scramInitPromise;
    scramInitPromise = (async () => {
      if (typeof ScramjetController === 'undefined') {
        console.error('[seam] ScramjetController not found — scramjet.all.js may not have loaded');
        return;
      }
      try {
        scram = new ScramjetController({
          prefix: "/~/sj/",
          files: {
            wasm: "/scram/scramjet.wasm.wasm",
            all: "/scram/scramjet.all.js",
            sync: "/scram/scramjet.sync.js",
          },
          flags: {
            rewriterLogs: false,
            naiiveRewriter: false,
            scramitize: false,
          },
          config: {
            bare: "wss://apple-apple.up.railway.app/wisp/",
          },
        });
        await scram.init("/scram/scramjet.worker.js");
        window.scram = scram;
        scramReady = true;
        console.log('[seam] Scramjet ready ✓');
      } catch(e) {
        console.error('[seam] Scramjet init failed:', e);
      }
    })();
    return scramInitPromise;
  }

  // Start loading immediately, don't wait for window load
  initScramjet();

  async function encodeUrl(url) {
    if (!url.startsWith("http")) url = "https://" + url;
    if (!scramReady) await initScramjet();
    if (window.scram) return window.scram.encodeUrl(url);
    return "/~/sj/" + btoa(url);
  }
</script>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #080808;
  --surface: #111111;
  --surface2: #181818;
  --border: #222222;
  --border2: #2e2e2e;
  --text: #efefef;
  --muted: #505050;
  --muted2: #383838;
  --accent: #ffffff;
  --radius: 12px;
  --radius-sm: 8px;
}

html, body { height: 100%; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  overflow: hidden;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
}

/* ===== HOME ===== */
#page-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 40px 24px;
  width: 100%;
  height: 100%;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.brand-name {
  font-family: 'Syne', sans-serif;
  font-size: 64px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
  line-height: 1;
}

.brand-tag {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 540px;
}

.search-bar {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  height: 48px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-bar:focus-within {
  border-color: #fff;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.04);
}

.search-bar svg { color: var(--muted); flex-shrink: 0; }

.search-bar input {
  flex: 1; background: none; border: none; outline: none;
  color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
}

.search-bar input::placeholder { color: var(--muted); }

.search-btn {
  background: none; border: none; cursor: pointer;
  color: var(--muted); display: flex; align-items: center;
  padding: 0; transition: color 0.15s;
}
.search-btn:hover { color: #fff; }

.engine-select {
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  height: 48px;
  cursor: pointer;
  outline: none;
  appearance: none;
  padding: 0 30px 0 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23505050' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  transition: border-color 0.2s;
}
.engine-select:focus { border-color: #fff; }

.quicklinks {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.ql-item {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  cursor: pointer; text-decoration: none; background: none; border: none;
}

.ql-icon {
  width: 54px; height: 54px;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.ql-item:hover .ql-icon {
  background: var(--surface2);
  border-color: #fff;
  transform: translateY(-3px);
}

.ql-icon svg { color: var(--text); }
.ql-label { font-size: 11px; color: var(--muted); letter-spacing: 0.04em; }

/* ===== PAGES ===== */
.page { display: none; flex-direction: column; width: 100%; height: 100%; }
.page.active { display: flex; animation: fadeIn 0.2s ease both; }

.tab-bar {
  display: flex; align-items: center;
  border-bottom: 1px solid var(--border);
  padding: 0 20px; background: var(--bg);
  flex-shrink: 0;
}

.tab-back {
  background: none; border: none; color: var(--muted);
  cursor: pointer; padding: 14px 12px 14px 0;
  display: flex; align-items: center; gap: 6px;
  font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
  transition: color 0.15s; flex-shrink: 0; letter-spacing: -0.02em;
}
.tab-back:hover { color: #fff; }

.tab-divider { width: 1px; height: 16px; background: var(--border2); margin: 0 12px; flex-shrink: 0; }

.tabs { display: flex; overflow-x: auto; scrollbar-width: none; flex: 1; }
.tabs::-webkit-scrollbar { display: none; }

.tab {
  display: flex; align-items: center; gap: 7px;
  padding: 14px 16px; font-size: 13px; color: var(--muted);
  cursor: pointer; border-bottom: 2px solid transparent;
  white-space: nowrap; transition: color 0.15s, border-color 0.15s; flex-shrink: 0;
}
.tab:hover { color: #ddd; }
.tab.active { color: #fff; border-bottom-color: #fff; }

.page-content {
  flex: 1; overflow-y: auto; padding: 28px 24px;
  scrollbar-width: thin; scrollbar-color: #222 transparent;
}
.page-content::-webkit-scrollbar { width: 4px; }
.page-content::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }

.tab-panel { display: none; }
.tab-panel.active { display: block; animation: fadeIn 0.2s ease both; }

.section-title {
  font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted);
  margin-bottom: 14px;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px; margin-bottom: 28px;
}

.link-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 14px;
  text-decoration: none; color: var(--text);
  display: flex; flex-direction: column; gap: 8px;
  transition: border-color 0.15s, background 0.15s, transform 0.15s;
  cursor: pointer;
}
.link-card:hover { border-color: var(--border2); background: var(--surface2); transform: translateY(-2px); }

.link-card-icon {
  width: 32px; height: 32px; background: var(--surface2);
  border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;
}
.link-card-icon svg { color: #888; width: 16px; height: 16px; }
.link-card-name { font-size: 13px; font-weight: 500; color: var(--text); line-height: 1.2; }
.link-card-desc { font-size: 11px; color: var(--muted); line-height: 1.4; }

/* GAME GRID */
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
  gap: 12px; margin-bottom: 28px;
}

.game-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden; cursor: pointer;
  transition: border-color 0.15s, transform 0.15s, background 0.15s;
}
.game-card:hover { border-color: var(--border2); transform: translateY(-3px); background: var(--surface2); }

.game-thumb {
  width: 100%; aspect-ratio: 1 / 1;
  display: flex; align-items: center; justify-content: center;
}

.game-info { padding: 10px 12px 12px; }
.game-name { font-size: 13px; font-weight: 500; color: var(--text); line-height: 1.3; }
.game-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

/* FOOTER */
.footer {
  grid-row: 2;
  display: flex; align-items: center; justify-content: flex-end;
  gap: 18px; padding: 10px 24px;
  border-top: 1px solid var(--border);
  font-size: 12px; color: var(--muted);
}
.footer a { color: var(--muted); text-decoration: none; transition: color 0.15s; }
.footer a:hover { color: #fff; }

.status-dot {
  width: 6px; height: 6px; background: #3ddc84;
  border-radius: 50%; display: inline-block; margin-right: 5px;
}

/* OVERLAY */
#game-overlay {
  position: fixed; inset: 0; z-index: 99999;
  background: #000; flex-direction: column; display: none;
}
#game-overlay.active { display: flex; }

#game-overlay-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 0 16px; height: 44px;
  background: var(--bg); border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

#game-overlay-title {
  font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
  color: var(--text); flex: 1; letter-spacing: -0.02em;
}

.overlay-btn {
  background: none; border: none; color: var(--muted); cursor: pointer;
  font-size: 13px; font-family: 'DM Sans', sans-serif;
  display: flex; align-items: center; gap: 6px;
  transition: color 0.15s; padding: 0;
}
.overlay-btn:hover { color: #fff; }

#game-frame { flex: 1; width: 100%; border: none; }

/* LOADING OVERLAY */
#proxy-loading {
  position: fixed; inset: 0; z-index: 99998;
  background: rgba(0,0,0,0.85);
  display: none; align-items: center; justify-content: center;
  flex-direction: column; gap: 16px;
}
#proxy-loading.active { display: flex; }
.loading-spinner {
  width: 28px; height: 28px;
  border: 2px solid var(--border2);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.loading-text { font-size: 13px; color: var(--muted); }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
</head>
<body>

<div class="center">

  <!-- HOME -->
  <div id="page-home">
    <div class="brand">
      <div class="brand-name">seam</div>
      <div class="brand-tag">your browser, your way</div>
    </div>

    <div class="search-wrap">
      <div class="search-bar">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Search or enter a URL" id="searchInput" />
        <button class="search-btn" id="searchBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
      <select class="engine-select" id="engineSelect">
        <option value="https://duckduckgo.com/?q=">DuckDuckGo</option>
        <option value="https://www.google.com/search?q=">Google</option>
        <option value="https://search.brave.com/search?q=">Brave</option>
      </select>
    </div>

    <div class="quicklinks">
      <button class="ql-item" onclick="openPage('movies')">
        <div class="ql-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg></div>
        <span class="ql-label">Movies</span>
      </button>
      <button class="ql-item" onclick="openPage('music')">
        <div class="ql-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>
        <span class="ql-label">Music</span>
      </button>
      <button class="ql-item" onclick="openPage('games')">
        <div class="ql-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h4M10 9v6"/></svg></div>
        <span class="ql-label">Games</span>
      </button>
      <button class="ql-item" onclick="openPage('ai')">
        <div class="ql-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
        <span class="ql-label">AI</span>
      </button>
      <button class="ql-item" onclick="openPage('social')">
        <div class="ql-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
        <span class="ql-label">Social</span>
      </button>
      <button class="ql-item" onclick="openPage('news')">
        <div class="ql-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"/></svg></div>
        <span class="ql-label">News</span>
      </button>
      <button class="ql-item" onclick="openPage('credits')">
        <div class="ql-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>
        <span class="ql-label">Credits</span>
      </button>
    </div>
  </div>

  <!-- MOVIES PAGE -->
  <div class="page" id="page-movies">
    <div class="tab-bar">
      <button class="tab-back" onclick="goHome()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        seam
      </button>
      <div class="tab-divider"></div>
      <div class="tabs">
        <div class="tab active" onclick="switchTab('movies','streaming')">Streaming</div>
        <div class="tab" onclick="switchTab('movies','discover')">Discover</div>
        <div class="tab" onclick="switchTab('movies','ratings')">Ratings</div>
      </div>
    </div>
    <div class="page-content">
      <div class="tab-panel active" id="movies-streaming">
        <div class="section-title">Streaming</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://netflix.com','Netflix')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></div><div class="link-card-name">Netflix</div><div class="link-card-desc">Movies & TV</div></div>
          <div class="link-card" onclick="launchUrl('https://disneyplus.com','Disney+')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg></div><div class="link-card-name">Disney+</div><div class="link-card-desc">Disney, Marvel, Star Wars</div></div>
          <div class="link-card" onclick="launchUrl('https://hulu.com','Hulu')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg></div><div class="link-card-name">Hulu</div><div class="link-card-desc">TV, movies & live</div></div>
          <div class="link-card" onclick="launchUrl('https://primevideo.com','Prime Video')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 19-9-9 19-2-8-8-2z"/></svg></div><div class="link-card-name">Prime Video</div><div class="link-card-desc">Amazon originals</div></div>
          <div class="link-card" onclick="launchUrl('https://max.com','Max')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-3 5-8 8-9 3-9 3"/><path d="M2 4s3 5 8 8 9 3 9 3"/></svg></div><div class="link-card-name">Max</div><div class="link-card-desc">HBO & Warner Bros</div></div>
          <div class="link-card" onclick="launchUrl('https://youtube.com','YouTube')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></div><div class="link-card-name">YouTube</div><div class="link-card-desc">Free streaming</div></div>
        </div>
      </div>
      <div class="tab-panel" id="movies-discover">
        <div class="section-title">Discover</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://letterboxd.com','Letterboxd')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div><div class="link-card-name">Letterboxd</div><div class="link-card-desc">Film discovery & logs</div></div>
          <div class="link-card" onclick="launchUrl('https://imdb.com','IMDb')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg></div><div class="link-card-name">IMDb</div><div class="link-card-desc">Database & ratings</div></div>
          <div class="link-card" onclick="launchUrl('https://justwatch.com','JustWatch')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div><div class="link-card-name">JustWatch</div><div class="link-card-desc">Find where to watch</div></div>
          <div class="link-card" onclick="launchUrl('https://rottentomatoes.com','Rotten Tomatoes')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="link-card-name">Rotten Tomatoes</div><div class="link-card-desc">Critics & audience</div></div>
        </div>
      </div>
      <div class="tab-panel" id="movies-ratings">
        <div class="section-title">Ratings & Reviews</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://imdb.com/chart/top','IMDb Top 250')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="link-card-name">IMDb Top 250</div><div class="link-card-desc">Best rated films ever</div></div>
          <div class="link-card" onclick="launchUrl('https://metacritic.com/movie','Metacritic')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div><div class="link-card-name">Metacritic</div><div class="link-card-desc">Aggregated reviews</div></div>
          <div class="link-card" onclick="launchUrl('https://rogerebert.com','RogerEbert.com')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/></svg></div><div class="link-card-name">RogerEbert.com</div><div class="link-card-desc">Trusted film criticism</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- MUSIC PAGE -->
  <div class="page" id="page-music">
    <div class="tab-bar">
      <button class="tab-back" onclick="goHome()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> seam</button>
      <div class="tab-divider"></div>
      <div class="tabs">
        <div class="tab active" onclick="switchTab('music','streaming')">Streaming</div>
        <div class="tab" onclick="switchTab('music','discover')">Discover</div>
        <div class="tab" onclick="switchTab('music','lyrics')">Lyrics</div>
      </div>
    </div>
    <div class="page-content">
      <div class="tab-panel active" id="music-streaming">
        <div class="section-title">Streaming</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://open.spotify.com','Spotify')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div><div class="link-card-name">Spotify</div><div class="link-card-desc">Music & podcasts</div></div>
          <div class="link-card" onclick="launchUrl('https://music.apple.com','Apple Music')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/></svg></div><div class="link-card-name">Apple Music</div><div class="link-card-desc">Apple's music library</div></div>
          <div class="link-card" onclick="launchUrl('https://music.youtube.com','YouTube Music')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></div><div class="link-card-name">YouTube Music</div><div class="link-card-desc">Music & videos</div></div>
          <div class="link-card" onclick="launchUrl('https://soundcloud.com','SoundCloud')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 17l2.76-7.24A5 5 0 0 1 12 8h6"/></svg></div><div class="link-card-name">SoundCloud</div><div class="link-card-desc">Independent artists</div></div>
          <div class="link-card" onclick="launchUrl('https://bandcamp.com','Bandcamp')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/></svg></div><div class="link-card-name">Bandcamp</div><div class="link-card-desc">Support indie artists</div></div>
        </div>
      </div>
      <div class="tab-panel" id="music-discover">
        <div class="section-title">Discover</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://last.fm','Last.fm')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><div class="link-card-name">Last.fm</div><div class="link-card-desc">Scrobble & discover</div></div>
          <div class="link-card" onclick="launchUrl('https://rateyourmusic.com','RateYourMusic')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="link-card-name">RateYourMusic</div><div class="link-card-desc">Community ratings</div></div>
          <div class="link-card" onclick="launchUrl('https://pitchfork.com','Pitchfork')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg></div><div class="link-card-name">Pitchfork</div><div class="link-card-desc">Music criticism</div></div>
        </div>
      </div>
      <div class="tab-panel" id="music-lyrics">
        <div class="section-title">Lyrics & Tabs</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://genius.com','Genius')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div class="link-card-name">Genius</div><div class="link-card-desc">Lyrics & annotations</div></div>
          <div class="link-card" onclick="launchUrl('https://ultimate-guitar.com','Ultimate Guitar')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m11 4 2-2 2 2"/><path d="m20 11 2 2-2 2"/><path d="m13 20-2 2-2-2"/><path d="m4 13-2-2 2-2"/></svg></div><div class="link-card-name">Ultimate Guitar</div><div class="link-card-desc">Tabs & chords</div></div>
          <div class="link-card" onclick="launchUrl('https://azlyrics.com','AZLyrics')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="link-card-name">AZLyrics</div><div class="link-card-desc">Song lyrics archive</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- GAMES PAGE -->
  <div class="page" id="page-games">
    <div class="tab-bar">
      <button class="tab-back" onclick="goHome()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> seam</button>
      <div class="tab-divider"></div>
      <div style="font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);">Games</div>
    </div>
    <div class="page-content">
      <div class="game-grid">
        <div class="game-card" onclick="launchLocal('clbitlife.html','BitLife')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#7c3aed,#4f46e5)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <div class="game-info"><div class="game-name">BitLife</div><div class="game-sub">Life simulator</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('clbasketballstars.html','Basketball Stars')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#ea580c,#dc2626)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg></div>
          <div class="game-info"><div class="game-name">Basketball Stars</div><div class="game-sub">1v1 hoops</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('clbackrooms.html','Backrooms')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#854d0e,#713f12)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
          <div class="game-info"><div class="game-name">Backrooms</div><div class="game-sub">Horror exploration</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('cldriftboss.html','Drift Boss')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#0891b2,#0e7490)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 15v-5l-5-3H6v8"/></svg></div>
          <div class="game-info"><div class="game-name">Drift Boss</div><div class="game-sub">Drifting car game</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('cleggycar.html','Eggy Car')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#ca8a04,#a16207)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><ellipse cx="12" cy="13" rx="7" ry="9"/></svg></div>
          <div class="game-info"><div class="game-name">Eggy Car</div><div class="game-sub">Don't drop the egg</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('clgrannyy.html','Granny Original')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#374151,#111827)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div class="game-info"><div class="game-name">Granny Original</div><div class="game-sub">Horror escape</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('clmotox3mm.html','Moto X3M')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#16a34a,#15803d)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><circle cx="18" cy="17" r="3"/><circle cx="6" cy="17" r="3"/><path d="M21 6l-6 4H9l-3 4h15"/></svg></div>
          <div class="game-info"><div class="game-name">Moto X3M</div><div class="game-sub">Bike stunts</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('cl1v1lol.html','1v1.lol')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#2563eb,#1d4ed8)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
          <div class="game-info"><div class="game-name">1v1.lol</div><div class="game-sub">Build & battle</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('clamongus.html','Among Us')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#dc2626,#b91c1c)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><path d="M12 2C8 2 5 5 5 9v6l-2 4h18l-2-4V9c0-4-3-7-7-7z"/><circle cx="15" cy="8" r="2"/></svg></div>
          <div class="game-info"><div class="game-name">Among Us</div><div class="game-sub">Social deduction</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('clbaldisbasics.html','Baldi\'s Basics')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#65a30d,#4d7c0f)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
          <div class="game-info"><div class="game-name">Baldi's Basics</div><div class="game-sub">School horror</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('cldrivemady.html','Drive Mad')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#d97706,#b45309)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><rect x="1" y="10" width="22" height="8" rx="2"/><path d="M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>
          <div class="game-info"><div class="game-name">Drive Mad</div><div class="game-sub">Crazy driving</div></div>
        </div>
        <div class="game-card" onclick="launchLocal('clfivenightsatepsteins.html','FNAF')">
          <div class="game-thumb" style="background:linear-gradient(135deg,#1c1917,#44403c)"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>
          <div class="game-info"><div class="game-name">FNAF</div><div class="game-sub">Five Nights at BIG E</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- AI PAGE -->
  <div class="page" id="page-ai">
    <div class="tab-bar">
      <button class="tab-back" onclick="goHome()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> seam</button>
      <div class="tab-divider"></div>
      <div class="tabs">
        <div class="tab active" onclick="switchTab('ai','chatbots')">Chatbots</div>
        <div class="tab" onclick="switchTab('ai','image')">Image</div>
        <div class="tab" onclick="switchTab('ai','tools')">Tools</div>
      </div>
    </div>
    <div class="page-content">
      <div class="tab-panel active" id="ai-chatbots">
        <div class="section-title">AI Chatbots</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://claude.ai','Claude')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><div class="link-card-name">Claude</div><div class="link-card-desc">Anthropic's AI</div></div>
          <div class="link-card" onclick="launchUrl('https://chatgpt.com','ChatGPT')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg></div><div class="link-card-name">ChatGPT</div><div class="link-card-desc">OpenAI's chatbot</div></div>
          <div class="link-card" onclick="launchUrl('https://gemini.google.com','Gemini')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div class="link-card-name">Gemini</div><div class="link-card-desc">Google's AI</div></div>
          <div class="link-card" onclick="launchUrl('https://perplexity.ai','Perplexity')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div><div class="link-card-name">Perplexity</div><div class="link-card-desc">AI-powered search</div></div>
        </div>
      </div>
      <div class="tab-panel" id="ai-image">
        <div class="section-title">Image Generation</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://midjourney.com','Midjourney')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div><div class="link-card-name">Midjourney</div><div class="link-card-desc">AI art generation</div></div>
          <div class="link-card" onclick="launchUrl('https://stability.ai','Stable Diffusion')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div class="link-card-name">Stable Diffusion</div><div class="link-card-desc">Open source image AI</div></div>
          <div class="link-card" onclick="launchUrl('https://runwayml.com','Runway')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></div><div class="link-card-name">Runway</div><div class="link-card-desc">AI video generation</div></div>
        </div>
      </div>
      <div class="tab-panel" id="ai-tools">
        <div class="section-title">AI Tools</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://github.com/features/copilot','GitHub Copilot')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div><div class="link-card-name">GitHub Copilot</div><div class="link-card-desc">AI coding assistant</div></div>
          <div class="link-card" onclick="launchUrl('https://cursor.sh','Cursor')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/></svg></div><div class="link-card-name">Cursor</div><div class="link-card-desc">AI code editor</div></div>
          <div class="link-card" onclick="launchUrl('https://elevenlabs.io','ElevenLabs')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg></div><div class="link-card-name">ElevenLabs</div><div class="link-card-desc">AI voice generation</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- SOCIAL PAGE -->
  <div class="page" id="page-social">
    <div class="tab-bar">
      <button class="tab-back" onclick="goHome()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> seam</button>
      <div class="tab-divider"></div>
      <div class="tabs">
        <div class="tab active" onclick="switchTab('social','platforms')">Platforms</div>
        <div class="tab" onclick="switchTab('social','messaging')">Messaging</div>
      </div>
    </div>
    <div class="page-content">
      <div class="tab-panel active" id="social-platforms">
        <div class="section-title">Social Platforms</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://x.com','X')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16M20 4L4 20"/></svg></div><div class="link-card-name">X</div><div class="link-card-desc">Formerly Twitter</div></div>
          <div class="link-card" onclick="launchUrl('https://reddit.com','Reddit')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div><div class="link-card-name">Reddit</div><div class="link-card-desc">Community forums</div></div>
          <div class="link-card" onclick="launchUrl('https://instagram.com','Instagram')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></div><div class="link-card-name">Instagram</div><div class="link-card-desc">Photo & video</div></div>
          <div class="link-card" onclick="launchUrl('https://tiktok.com','TikTok')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></div><div class="link-card-name">TikTok</div><div class="link-card-desc">Short-form video</div></div>
          <div class="link-card" onclick="launchUrl('https://bsky.app','Bluesky')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><div class="link-card-name">Bluesky</div><div class="link-card-desc">Decentralized social</div></div>
        </div>
      </div>
      <div class="tab-panel" id="social-messaging">
        <div class="section-title">Messaging</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://discord.com/app','Discord')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div class="link-card-name">Discord</div><div class="link-card-desc">Community chat</div></div>
          <div class="link-card" onclick="launchUrl('https://web.telegram.org','Telegram')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></div><div class="link-card-name">Telegram</div><div class="link-card-desc">Encrypted messaging</div></div>
          <div class="link-card" onclick="launchUrl('https://slack.com','Slack')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/></svg></div><div class="link-card-name">Slack</div><div class="link-card-desc">Work messaging</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- NEWS PAGE -->
  <div class="page" id="page-news">
    <div class="tab-bar">
      <button class="tab-back" onclick="goHome()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> seam</button>
      <div class="tab-divider"></div>
      <div class="tabs">
        <div class="tab active" onclick="switchTab('news','general')">General</div>
        <div class="tab" onclick="switchTab('news','tech')">Tech</div>
        <div class="tab" onclick="switchTab('news','science')">Science</div>
      </div>
    </div>
    <div class="page-content">
      <div class="tab-panel active" id="news-general">
        <div class="section-title">General News</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://apnews.com','AP News')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/></svg></div><div class="link-card-name">AP News</div><div class="link-card-desc">Unbiased reporting</div></div>
          <div class="link-card" onclick="launchUrl('https://reuters.com','Reuters')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div><div class="link-card-name">Reuters</div><div class="link-card-desc">Global news wire</div></div>
          <div class="link-card" onclick="launchUrl('https://bbc.com/news','BBC News')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg></div><div class="link-card-name">BBC News</div><div class="link-card-desc">UK public broadcaster</div></div>
          <div class="link-card" onclick="launchUrl('https://theguardian.com','The Guardian')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div class="link-card-name">The Guardian</div><div class="link-card-desc">Independent journalism</div></div>
        </div>
      </div>
      <div class="tab-panel" id="news-tech">
        <div class="section-title">Tech News</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://theverge.com','The Verge')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div><div class="link-card-name">The Verge</div><div class="link-card-desc">Tech & culture</div></div>
          <div class="link-card" onclick="launchUrl('https://arstechnica.com','Ars Technica')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg></div><div class="link-card-name">Ars Technica</div><div class="link-card-desc">Deep-dive tech news</div></div>
          <div class="link-card" onclick="launchUrl('https://wired.com','Wired')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></div><div class="link-card-name">Wired</div><div class="link-card-desc">Technology & ideas</div></div>
          <div class="link-card" onclick="launchUrl('https://techcrunch.com','TechCrunch')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg></div><div class="link-card-name">TechCrunch</div><div class="link-card-desc">Startups & VC</div></div>
        </div>
      </div>
      <div class="tab-panel" id="news-science">
        <div class="section-title">Science & Space</div>
        <div class="link-grid">
          <div class="link-card" onclick="launchUrl('https://nasa.gov','NASA')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg></div><div class="link-card-name">NASA</div><div class="link-card-desc">Space agency</div></div>
          <div class="link-card" onclick="launchUrl('https://nature.com','Nature')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V12M12 12C12 12 7 9 7 4a5 5 0 0 1 10 0c0 5-5 8-5 8z"/></svg></div><div class="link-card-name">Nature</div><div class="link-card-desc">Scientific journal</div></div>
          <div class="link-card" onclick="launchUrl('https://scientificamerican.com','Scientific American')"><div class="link-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg></div><div class="link-card-name">Sci American</div><div class="link-card-desc">Popular science</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- CREDITS PAGE -->
  <div class="page" id="page-credits">
    <div class="tab-bar">
      <button class="tab-back" onclick="goHome()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> seam</button>
      <div class="tab-divider"></div>
      <div class="tabs"><div class="tab active">Credits</div></div>
    </div>
    <div class="page-content" style="display:flex;align-items:center;justify-content:center;height:100%;">
      <div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:24px;">
        <div style="font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);">Made by</div>
        <div style="font-family:'Syne',sans-serif;font-size:48px;font-weight:800;letter-spacing:-0.03em;color:var(--text);line-height:1.05;">NB<br>/LebronJahemis</div>
        <div style="width:40px;height:1px;background:#fff;opacity:0.1;"></div>
        <div style="font-size:12px;color:var(--muted);">seam — your browser, your way</div>
      </div>
    </div>
  </div>

</div>

<div class="footer">
  <a href="#">Sign in</a>
  <a href="#">TOS</a>
  <a href="#">Privacy</a>
  <span><span class="status-dot"></span>online</span>
</div>

<!-- LOADING -->
<div id="proxy-loading">
  <div class="loading-spinner"></div>
  <div class="loading-text">Connecting proxy...</div>
</div>

<!-- OVERLAY -->
<div id="game-overlay">
  <div id="game-overlay-bar">
    <button class="overlay-btn" onclick="closeOverlay()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      Back to seam
    </button>
    <div id="game-overlay-title"></div>
    <button class="overlay-btn" onclick="document.getElementById('game-frame').requestFullscreen()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
      Fullscreen
    </button>
  </div>
  <iframe id="game-frame" allowfullscreen allow="fullscreen"></iframe>
</div>

<script>
  const input = document.getElementById('searchInput');
  const engineSelect = document.getElementById('engineSelect');

  async function doSearch() {
    const q = input.value.trim();
    if (!q) return;
    const isUrl = /^(https?:\/\/)/i.test(q) || (/^[\w-]+\.[\w.-]+/.test(q) && !q.includes(' '));
    const rawUrl = isUrl
      ? (/^https?:\/\//i.test(q) ? q : 'https://' + q)
      : engineSelect.value + encodeURIComponent(q);
    await launchUrl(rawUrl, q);
  }

  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

  function openPage(name) {
    document.getElementById('page-home').style.display = 'none';
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + name);
    if (page) page.classList.add('active');
  }

  function goHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-home').style.display = 'flex';
  }

  function switchTab(page, tab) {
    const pageEl = document.getElementById('page-' + page);
    pageEl.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    pageEl.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    pageEl.querySelectorAll('.tab').forEach(t => {
      if (t.getAttribute('onclick') === `switchTab('${page}','${tab}')`) t.classList.add('active');
    });
    const panel = document.getElementById(page + '-' + tab);
    if (panel) panel.classList.add('active');
  }

  function showOverlay(src, name) {
    const overlay = document.getElementById('game-overlay');
    const frame = document.getElementById('game-frame');
    document.getElementById('game-overlay-title').textContent = name;
    frame.src = src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    const overlay = document.getElementById('game-overlay');
    document.getElementById('game-frame').src = '';
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Launch external URL through Scramjet proxy
  async function launchUrl(url, name) {
    if (!url.startsWith('http')) url = 'https://' + url;
    const loading = document.getElementById('proxy-loading');
    loading.classList.add('active');
    try {
      const encoded = await encodeUrl(url);
      loading.classList.remove('active');
      showOverlay(encoded, name);
    } catch(e) {
      loading.classList.remove('active');
      showOverlay(url, name);
    }
  }

  // Launch local game file directly in iframe
  function launchLocal(file, name) {
    showOverlay(file, name);
  }
</script>
</body>
</html>
