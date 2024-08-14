import { requests } from "../utils/request"

const apiUrl = "chatSessionMessage";

export interface ChatSessionMessage {
    id: number;
    chat_session_id: number;
    message: string;
    type: 'SYSTEM' | 'ASSISTANT' | 'USER';
    chat_session_message_response_id: number;
}

export const chatApi = {
    getAll: (): Promise<ChatSessionMessage[]> => requests.get(apiUrl),
    getDetail: (id: number): Promise<ChatSessionMessage> => requests.get(`${apiUrl}/${id}`),
    create: (post: ChatSessionMessage): Promise<ChatSessionMessage> =>
        requests.post(apiUrl, post),
    update: (post: ChatSessionMessage, id: number): Promise<ChatSessionMessage> =>
        requests.put(`${apiUrl}/${id}`, post),
    delete: (id: number): Promise<void> => requests.delete(`${apiUrl}/${id}`),
};