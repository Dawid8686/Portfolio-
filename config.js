// ===== JEDNO MIEJSCE KONFIGURACJI DLA CAŁEJ STRONY (index.html + blog) =====
const CAMREF = "";   // wklej swój camref z Partnerize DOPIERO po akceptacji w programie Adobe
const CONTACT_EMAIL = "bania003@op.pl";
const AFF_ACTIVE = !!CAMREF && !CAMREF.includes("TWÓJ");   // oznaczenia partnerskie pokazują się tylko, gdy linki naprawdę są partnerskie
function affLink(u){ return AFF_ACTIVE ? "https://prf.hn/click/camref:" + CAMREF + "/destination:" + encodeURIComponent(u) : u; }

// ===== CANVA (program partnerski) =====
const CANVA_URL = "";   // wklej swój link partnerski Canva po akceptacji w programie; do tego czasu link prowadzi na zwykłą stronę Canva Pro
const CANVA_ACTIVE = !!CANVA_URL;
const canvaLink = () => CANVA_URL || "https://www.canva.com/pro/";
// ===== SKYLUM / Luminar (Impact; linki z maila powitalnego) =====
const SKYLUM_DESKTOP = "https://skylum.evyy.net/c/7970527/3849543/3255";
const SKYLUM_MOBILE  = "https://skylum.evyy.net/c/7970527/1965581/3255";
const SKYLUM_WEB     = "https://skylum.evyy.net/c/7970527/4071016/3255";
const SKYLUM_ACTIVE = !!SKYLUM_DESKTOP;
// Nowe linki z maila (listopad 2026): Prime jednorazowo (€69), upgrade All-in-One dla subskrybentów (€119/rok), Black Friday
const SKYLUM_PRIME   = "https://skylum.evyy.net/c/7970527/3993634/3255";
const SKYLUM_UPGRADE = "https://skylum.evyy.net/c/7970527/4158121/3255";
const SKYLUM_BF      = "https://skylum.evyy.net/c/7970527/4120783/3255";
const SKYLUM_BF_FROM = "2026-11-18", SKYLUM_BF_TO = "2026-12-02";   // okno promocji Black Friday: SPRAWDŹ datę końca w mailu/panelu Impact i popraw
function bfOn(){ var d=new Date().toISOString().slice(0,10); return d>=SKYLUM_BF_FROM && d<=SKYLUM_BF_TO; }
// typy: "desktop" (domyślny; w oknie BF prowadzi na link Black Friday), "mobile", "web", "prime", "upgrade", "bf"
function skylumLink(t){
  if(t==="mobile") return SKYLUM_MOBILE; if(t==="web") return SKYLUM_WEB;
  if(t==="prime") return SKYLUM_PRIME; if(t==="upgrade") return SKYLUM_UPGRADE; if(t==="bf") return SKYLUM_BF;
  return bfOn() ? SKYLUM_BF : SKYLUM_DESKTOP;
}

const ANY_AFF = AFF_ACTIVE || CANVA_ACTIVE || SKYLUM_ACTIVE;   // oznaczenia partnerskie pokazujemy, gdy którykolwiek link jest naprawdę partnerski

// ===== MIEJSCE NA LINK (nieużywane na stronie) =====
const AWIN_URL = "";   // opcjonalnie: wklej tu link partnerski, gdy będzie potrzebny

// ===== LICZNIK ODWIEDZIN (Cloudflare Worker) =====
const COUNTER_URL = "https://licznik.bania003.workers.dev";   // wklej adres swojego Workera, np. https://licznik.twoja-nazwa.workers.dev (bez / na końcu)
(function(){
  if(!COUNTER_URL) return;   // dopóki puste, licznik jest wyłączony
  function show(n){
    var el=document.getElementById('visits');
    if(el && typeof n==='number'){ el.textContent='· Odwiedziny: '+n.toLocaleString('pl-PL'); el.hidden=false; }
  }
  function hit(){
    fetch(COUNTER_URL.replace(/\/$/,'')+'/hit',{cache:'no-store'})
      .then(function(r){return r.json()}).then(function(d){show(d.n)}).catch(function(){});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',hit); else hit();
})();
