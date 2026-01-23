export class ChatService {
    private webhookUrl = '/api/chat';
    private sessionId: string;

    constructor() {
        this.sessionId = this.getOrCreateSessionId();
    }

    private getOrCreateSessionId(): string {
    const hasLocalStorage =
            typeof window !== 'undefined' &&
            typeof window.localStorage !== 'undefined' &&
            typeof window.localStorage.getItem === 'function' &&
            typeof window.localStorage.setItem === 'function';

        if (hasLocalStorage) {
            let id = window.localStorage.getItem('chat_session_id');
            if (!id) {
                id = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
                    ? crypto.randomUUID()
                    : Math.random().toString(36).substring(2);
                window.localStorage.setItem('chat_session_id', id);
            }
            return id;
        }

        // Fallback for server or environments without usable localStorage
        return (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2);
    }

    async sendMessage(message: string, onChunk: (chunk: string) => void): Promise<void> {
        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatInput: message,
                    sessionId: this.sessionId
                }),
            });

            if (!response.body) {
                throw new Error('ReadableStream not supported in this browser.');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                let boundary = buffer.indexOf('}');

                while (boundary !== -1) {
                    const potentialJson = buffer.substring(0, boundary + 1);

                    try {
                        const parsed = JSON.parse(potentialJson);
                        buffer = buffer.substring(boundary + 1);

                        if (parsed.content) {
                            onChunk(parsed.content);
                        } else if (parsed.output) {

                            onChunk(parsed.output);
                        }

                        boundary = buffer.indexOf('}');
                    } catch (e) {
                        boundary = buffer.indexOf('}', boundary + 1);
                    }
                }
            }

        } catch (error) {
            console.error('Streaming error:', error);
            onChunk('\n\n*Error: Could not reach the AI service.*');
        }
    }
}
