// Licznik odwiedzin – Cloudflare Worker + baza D1 (binding o nazwie DB)
const ALLOWED = ["https://dav-studio.vercel.app"];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const okOrigin = ALLOWED.includes(origin);
    const headers = {
      "Access-Control-Allow-Origin": okOrigin ? origin : ALLOWED[0],
      "Vary": "Origin",
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...headers, "Access-Control-Allow-Methods": "GET" } });
    }

    const path = new URL(request.url).pathname;
    try {
      await env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY, n INTEGER NOT NULL)"
      ).run();

      let row;
      if (path === "/hit" && okOrigin) {
        // liczymy tylko wejścia ze strony (nagłówek Origin), nie ręczne wejście na adres Workera
        row = await env.DB.prepare(
          "INSERT INTO counter (id, n) VALUES (1, 1) ON CONFLICT(id) DO UPDATE SET n = n + 1 RETURNING n"
        ).first();
      } else {
        row = await env.DB.prepare("SELECT n FROM counter WHERE id = 1").first();
      }
      return new Response(JSON.stringify({ n: row ? row.n : 0 }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: "db" }), { status: 500, headers });
    }
  },
};
