import { requests } from "../utils/request"

const apiUrl = "chatSessionMessage";

export interface ChatSessionMessage {
    id: number;
    chat_session_id: number;
    message: string;
    type: 'SYSTEM' | 'ASSISTANT' | 'USER';
    chat_session_message_response_id: number;
    feedback?: 'positive' | 'negative';
    feedback_description?: string;
}

export const chatSessionMessageApi = {
    getAll: (chatSessionId: number, limit?: number): Promise<ChatSessionMessage[]> => requests.get(`${apiUrl}?chat_session_id=${chatSessionId}`),
    create: (post: ChatSessionMessage): Promise<ChatSessionMessage> =>
        requests.post(apiUrl, post),
    createFeedback: async ({ id, feedback, feedback_description }: {
        id: number;
        feedback: 'positive' | 'negative';
        feedback_description: string;
    }): Promise<ChatSessionMessage> => {
        return requests.get(`${apiUrl}?id=${id}`)
            .then(result => {
                if (result.length > 0) {
                    result[0].feedback = feedback;
                    result[0].feedback_description = feedback_description;

                    return requests.put(`${apiUrl}/${id}`, result[0]);
                } else {
                    return Promise.reject(new Error('No message found with the given id'));
                }
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
};