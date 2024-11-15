import { IChatMessageListComponent } from "@/models/Chat";

export default function ChatMessageListComponent({
  endListRef,
  messageList,
}: IChatMessageListComponent) {
  return (
    <div className="flex flex-col gap-4">
      {messageList.map((message) => (
        <div
          className={`flex w-full p-4 gap-4 ${!message.isCurrentUser ? "flex-row-reverse" : "justify-start"}`}
          key={message.id}
        >
          <div className="hidden sm:block h-12 w-12 rounded-full bg-gray-900 overflow-hidden">
            <img
              className="h-12 w-12"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="flex w-fit max-w-xl p-4 bg-zinc-900">
            {message.text}
          </div>
        </div>
      ))}
      <div ref={endListRef} />
    </div>
  );
}
