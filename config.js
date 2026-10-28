// ===== JEDNO MIEJSCE KONFIGURACJI DLA CAŁEJ STRONY (index.html + blog) =====
const CAMREF = "";   // wklej swój camref z Partnerize DOPIERO po akceptacji w programie Adobe
const CONTACT_EMAIL = "bania003@op.pl";
const AFF_ACTIVE = !!CAMREF && !CAMREF.includes("TWÓJ");   // oznaczenia partnerskie pokazują się tylko, gdy linki naprawdę są partnerskie
function affLink(u){ return AFF_ACTIVE ? "https://prf.hn/click/camref:" + CAMREF + "/destination:" + encodeURIComponent(u) : u; }
