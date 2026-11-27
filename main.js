const EID_HTML = `
<!DOCTYPE html>
<html>
<head><title>EID Lookup</title></head>
<body>
  <h1>EID Lookup</h1>
  <form method="POST" action="/eid/lookup">
    <input type="text" name="id" placeholder="Enter ID" required>
    <button type="submit">Search</button>
  </form>
  <div id="results"></div>
  <script>
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      fetch('/eid/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
        .then(r => r.json())
        .then(data => {
          document.getElementById('results').innerHTML =
            data.length ? '<pre>' + JSON.stringify(data, null, 2) + '</pre>' : '<p>No results.</p>';
        });
    }
  </script>
</body>
</html>`;

export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;

      if (path === "/" && method === "GET") {
        return new Response("Hello World!", {
          headers: { "content-type": "text/plain" }
        });
      }

      if (path === "/emails" && method === "GET") {
        const email = [{"admin": "admin@bolyai9c.dev"}];
        return Response.json(email);
      }

      if (path === "/atproto" && method === "GET") {
        const atproto = [
          {"Tóth Zoltán": "admin.bolyai9c.dev"},
          {"Tóth Nimród": "nlmrqd.bolyai9c.dev"}
        ];
        return Response.json(atproto);
      }

      if (path === "/eid" && method === "GET") {
        return new Response("WIP", { status: 404 });
      }

      if (path === "/eid/lookup") {
        if (method === "GET") {
          return new Response(EID_HTML, {
            headers: { "content-type": "text/html" }
          });
        }
        if (method === "POST") {
          const { id } = await request.json();
          const stmt = env.data.prepare("SELECT * FROM eidv1 WHERE id = ?");
          const results = await stmt.bind(id).all();
          return Response.json(results.results);
        }
      }

      if (path === "/git" && method === "GET") {
        return Response.redirect("https://gitlab.com/bolyai9c-group/website/-/tree/javascript?ref_type=heads", 301);
      }

      return new Response("Az endpoint nem található", { status: 404 });
    }
  };   
