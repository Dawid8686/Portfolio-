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
function skylumLink(t){ return t==="mobile" ? SKYLUM_MOBILE : t==="web" ? SKYLUM_WEB : SKYLUM_DESKTOP; }
const ANY_AFF = AFF_ACTIVE || CANVA_ACTIVE || SKYLUM_ACTIVE;   // oznaczenia partnerskie pokazujemy, gdy którykolwiek link jest naprawdę partnerski

// ===== AWIN: World Businesses for Sale =====
const AWIN_URL = "";   // wklej swój link śledzący Awin (panel Awin > Linki) DOPIERO po akceptacji w programie; do tego czasu zostaw puste
const AWIN_CODE = "AWIN10";   // regulamin: wolno używać tylko zatwierdzonych ofert i materiałów, więc kod musi być Twoim kodem z panelu Awin (przypisanym do Twojego konta); pokazuje się tylko gdy AWIN_URL jest wypełniony
const AWIN_PLAIN = "https://www.worldbusinessesforsale.com/";   // zwykły adres serwisu (bez prowizji) używany do czasu wklejenia AWIN_URL; sprawdź, czy jest poprawny
const AWIN_ACTIVE = !!AWIN_URL;
function awinLink(ref){ if(!AWIN_ACTIVE) return AWIN_PLAIN; return AWIN_URL + (AWIN_URL.indexOf("?")>-1 ? "&" : "?") + "clickref=" + encodeURIComponent(ref||""); }

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
