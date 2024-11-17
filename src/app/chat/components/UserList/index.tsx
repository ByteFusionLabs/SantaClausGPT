import { IChatUserListProps } from "@/models/Chat";
import ChatUserListComponent from "@/app/chat/components/UserList/component";
import { ChangeEvent, useMemo, useState } from "react";

export default function ChatUserList({
  isLoading,
  selectedUser,
  userList,
  onAddUser,
  onSelectUser,
}: IChatUserListProps) {
  // add logic here
  const [userName, setUserName] = useState("");
  const [addUserMode, setAddUserMode] = useState(false);

  const handleOnToggleAddUserMode = () => {
    if (addUserMode) setUserName("");
    setAddUserMode((prevState) => !prevState);
  };

  const handleOnChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleOnAddUser = () => {
    onAddUser(userName);
    handleOnToggleAddUserMode();
  };

  const isDisabledAddUser = useMemo(() => !userName.trim().length, [userName]);

  return (
    <ChatUserListComponent
      addUserMode={addUserMode}
      isDisabledAddUser={isDisabledAddUser}
      isLoading={isLoading}
      selectedUser={selectedUser}
      userList={userList}
      userName={userName}
      onAddUser={handleOnAddUser}
      onChangeUserName={handleOnChangeUserName}
      onSelectUser={onSelectUser}
      onToggleAddUserMode={handleOnToggleAddUserMode}
    />
  );
}
