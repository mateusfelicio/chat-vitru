import ShowChat from "@/components/showChat";

export default function ChatFullSize({ params }: { params: { id: number } }) {

    const chatId: number = params.id;

    return (
        <ShowChat chatId={chatId} type={'fullsize'} />
    );
}