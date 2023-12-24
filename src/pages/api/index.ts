import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

// You can export a config variable from any API route in Next.js.
// We'll use this to disable the bodyParser, otherwise Next.js
// would read and parse the entire request body before we
// can forward the request to the API. By skipping the bodyParser,
// we can just stream all requests through to the actual API.
export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  // Return a Promise to let Next.js know when we're done
  // processing the request:
  return new Promise(async (resolve, reject) => {
    // Rewrite the URL: strip out the leading '/api'.
    // For example, '/api/login' would become '/login'.
    // ️You might want to adjust this depending
    // on the base path of your API.
    req.url = req?.url?.replace(/^\/api/, '');

    // // Handle error
    proxy.once('error', () => {
      reject();
    });

    proxy.once('proxyRes', () => {
      resolve(true);
    });

    // Forward the request to the API
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      autoRewrite: false,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
