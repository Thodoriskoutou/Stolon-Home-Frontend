
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const n8nUrl = 'https://n8n.stolon.gr/webhook/8f4a5c1c-856b-43a5-9036-35138f2244c1/chat';

    try {
        const body = await request.json();

        const response = await fetch(n8nUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.body) {
            return new Response('N8N response body is empty', { status: 500 });
        }


        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            }
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to proxy request' }), { status: 500 });
    }
};
