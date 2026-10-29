// ===== JEDNO MIEJSCE KONFIGURACJI DLA CAŁEJ STRONY (index.html + blog) =====
const CAMREF = "";   // wklej swój camref z Partnerize DOPIERO po akceptacji w programie Adobe
const CONTACT_EMAIL = "bania003@op.pl";
const AFF_ACTIVE = !!CAMREF && !CAMREF.includes("TWÓJ");   // oznaczenia partnerskie pokazują się tylko, gdy linki naprawdę są partnerskie
function affLink(u){ return AFF_ACTIVE ? "https://prf.hn/click/camref:" + CAMREF + "/destination:" + encodeURIComponent(u) : u; }

// ===== CANVA (program partnerski) =====
const CANVA_URL = "";   // wklej swój link partnerski Canva po akceptacji w programie; do tego czasu link prowadzi na zwykłą stronę Canva Pro
const CANVA_ACTIVE = !!CANVA_URL;
const canvaLink = () => CANVA_URL || "https://www.canva.com/pro/";
const ANY_AFF = AFF_ACTIVE || CANVA_ACTIVE;   // oznaczenia partnerskie pokazujemy, gdy którykolwiek link jest naprawdę partnerski
