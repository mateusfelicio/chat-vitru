import { requests } from "../utils/request"

const apiUrl = "chat";

export interface Chat {
    id: number;
    title: string;
    description: string;
    active: boolean;
}

export const chatApi = {
    getAll: (): Promise<Chat[]> => requests.get(apiUrl),
    getDetail: (id: number): Promise<Chat> => requests.get(`${apiUrl}/${id}`),
    create: (post: Chat): Promise<Chat> =>
        requests.post(apiUrl, post),
    update: (post: Chat, id: number): Promise<Chat> =>
        requests.put(`${apiUrl}/${id}`, post),
    delete: (id: number): Promise<void> => requests.delete(`${apiUrl}/${id}`),
};