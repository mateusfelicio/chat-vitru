import { requests } from "../utils/request"

const apiUrl = "chatSessionMessage";

export interface ChatSessionMessage {
    id: number;
    chat_session_id: number;
    message: string;
    type: 'SYSTEM' | 'ASSISTANT' | 'USER';
    chat_session_message_response_id: number;
    //feedback: 'positive' | 'negative';
    //feedback-description: text;
}

export const chatSessionMessageApi = {
    getAll: (chatSessionId: number, limit?: number): Promise<ChatSessionMessage[]> => requests.get(`${apiUrl}?chat_session_id=${chatSessionId}`),
    create: (post: ChatSessionMessage): Promise<ChatSessionMessage> =>
        requests.post(apiUrl, post),
};