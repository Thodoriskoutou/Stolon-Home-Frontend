
import { ChatService } from '$lib/chat';

export const load = async () => {
    return {
        chatService: new ChatService()
    };
};
