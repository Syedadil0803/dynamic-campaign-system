// Worker entry point — handles API routes for R2 config storage
// All other requests fall through to static assets (the admin panel SPA)

interface Env {
  CAMPAIGN_BUCKET: R2Bucket;
  ASSETS: Fetcher;
}

const CONFIG_KEY = 'campaign-config.json';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS headers - allow your domain in production, localhost for development
    const corsHeaders = {
      'Access-Control-Allow-Origin':
        request.headers.get('origin') === 'http://localhost:5173'
          ? 'http://localhost:5173'
          : 'https://admin.aairavx.com',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API Routes
    if (url.pathname === '/api/config') {
      // GET — Read config from R2
      if (request.method === 'GET') {
        try {
          const object = await env.CAMPAIGN_BUCKET.get(CONFIG_KEY);

          if (!object) {
            return new Response(JSON.stringify({ error: 'No config found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }

          const data = await object.text();
          return new Response(data, {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              ...corsHeaders,
            },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: 'Failed to read config' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      }

      // PUT — Write config to R2
      if (request.method === 'PUT') {
        try {
          const body = await request.text();

          // Validate it's valid JSON
          JSON.parse(body);

          await env.CAMPAIGN_BUCKET.put(CONFIG_KEY, body, {
            httpMetadata: {
              contentType: 'application/json',
            },
          });

          return new Response(JSON.stringify({ success: true, message: 'Config saved to R2' }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: 'Failed to save config' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      }
    }

    // Everything else → static assets (admin panel SPA)
    return env.ASSETS.fetch(request);
  },
};
