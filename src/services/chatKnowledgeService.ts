import { requests } from "../utils/request"

const apiUrl = "chatKnowledge";

export interface ChatKnowledge {
    id: number;
    chat_id: number;
    file_link: string;
    file_name: string;
    file_extension: string;
    file_mime_type: string;
}

//tipo: pdf, docx e txt

export const chatKnowledgeApi = {
    getAll: (): Promise<ChatKnowledge[]> => requests.get(apiUrl),
    create: (post: ChatKnowledge): Promise<ChatKnowledge> =>
        requests.post(apiUrl, post),
    delete: (id: number): Promise<void> => requests.delete(`${apiUrl}/${id}`),
};