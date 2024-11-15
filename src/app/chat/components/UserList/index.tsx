import { IChatUserListProps } from "@/models/Chat";
import ChatUserListComponent from "@/app/chat/components/UserList/component";

export default function ChatUserList({
  isLoading,
  selectedUser,
  userList,
  onSelectUser,
}: IChatUserListProps) {
  // add logic here
  return (
    <ChatUserListComponent
      isLoading={isLoading}
      selectedUser={selectedUser}
      userList={userList}
      onSelectUser={onSelectUser}
    />
  );
}
