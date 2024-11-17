import { IChatMessageListComponent } from "@/models/Chat";
import Image from "next/image";
import defaultSantaAvatar from "/public/santa-logo-removebg-preview.png";

export default function ChatMessageListComponent({
  endListRef,
  messageList,
}: IChatMessageListComponent) {
  const randomAvatarUrl =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"';

  return (
    <div className="flex flex-col gap-4">
      {messageList.map((message) => (
        <div
          className={`flex w-full gap-4 ${!message.isCurrentUser ? "flex-row-reverse" : "justify-start"}`}
          key={message.id}
        >
          <div
            className={`hidden sm:block h-12 w-12 rounded-full ${message.isCurrentUser ? "sm:bg-gray-900" : "sm:bg-amber-400"} overflow-hidden`}
          >
            {message.isCurrentUser ? (
              <img
                className="h-12 w-12"
                src={randomAvatarUrl}
                alt="user-logo"
              />
            ) : (
              <Image
                width={48}
                height={48}
                src={defaultSantaAvatar}
                alt="santa-logo"
              />
            )}
          </div>
          <div className="flex w-fit max-w-xl p-4 bg-black sm:bg-zinc-900 text-white">
            {message.text}
          </div>
        </div>
      ))}
      <div ref={endListRef} />
    </div>
  );
}
