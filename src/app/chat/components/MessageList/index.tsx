import { IChatMessageListProps } from "@/models/Chat";
import { useEffect, useRef } from "react";
import ChatMessageListComponent from "@/app/chat/components/MessageList/component";

export default function ChatMessageList({
  autoScrollEnabled,
  messageList,
}: IChatMessageListProps) {
  const endListRef = useRef(null);
  const handleOnScrollToTheEnd = () => {
    (endListRef.current as HTMLDivElement).scrollIntoView();
  };

  useEffect(() => {
    if (autoScrollEnabled) if (endListRef.current) handleOnScrollToTheEnd();
  }, [autoScrollEnabled, messageList]);

  return (
    <ChatMessageListComponent
      messageList={messageList}
      endListRef={endListRef}
    />
  );
}
