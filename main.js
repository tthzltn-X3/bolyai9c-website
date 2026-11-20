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
        const email =[{"admin": "admin@bolyai9c.dev"}]
        return Response.json(email);
      }
  
      if (path === "/atproto" && method === "GET") {
        const atproto =[
          {"Tóth Zoltán": "admin.bolyai9c.dev"},
          {"Tóth Nimród": "nlmrqd.bolyai9c.dev"}
        ]
        return Response.json(atproto);
      }
  
      if (path === "/eid" && method === "GET") {
        return new Response("WIP", { status: 404 });
      }

      if (path === "/eid/lookup" && method === "GET") {
        return new Response("WIP", { status: 404 });
      }
  
      if (path === "/git" && method === "GET") {
        return Response.redirect("https://gitlab.com/bolyai9c-group/website/-/tree/javascript?ref_type=heads", 301);
      }
  
      return new Response("Az endpoint nem található", { status: 404 });
    }
  };
