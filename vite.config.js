import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function devApiPlugin() {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/ask-portfolio' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { handler } = await server.ssrLoadModule('./netlify/functions/ask-portfolio.js');
              const result = await handler({
                httpMethod: 'POST',
                body: body,
              });
              res.statusCode = result.statusCode || 200;
              if (result.headers) {
                for (const [k, v] of Object.entries(result.headers)) {
                  res.setHeader(k, v);
                }
              }
              res.end(result.body);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }

  const isNetlify = process.env.NETLIFY === 'true';

  return {
    base: isNetlify ? '/' : '/DecodeLabs-Internship/',
    plugins: [react(), devApiPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/aos')) {
              return 'vendor-animations';
            }
            if (id.includes('node_modules/react-icons')) {
              return 'vendor-icons';
            }
          },
        },
      },
      chunkSizeWarningLimit: 800,
    },
  };
});
