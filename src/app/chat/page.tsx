"use client";
import UserList from "@/app/chat/components/UserList";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import MessageList from "./components/MessageList";
import { socketClient } from "../socket";
import { Socket } from "socket.io-client";
import { TChatMessage, TChatUser } from "@/models/Chat";
import ChatTextInput from "@/app/chat/components/TextInput";
import { SOCKET_ACTIONS } from "../../../app_socket_constants";
import { v4 as uuidv4 } from "uuid";

const tempUserList: TChatUser[] = [
  { id: "id1", name: "John Doe", avatar: "" },
  { id: "id2", name: "John Doe 2", avatar: "" },
  { id: "id3", name: "John Doe 3", avatar: "" },
  { id: "id4", name: "John Doe 4", avatar: "" },
];

export default function Chat() {
  const socket = socketClient as unknown as Socket;
  const textContext = useRef("");

  const [inputValue, setInputValue] = useState<string>("");
  const [messageList, setMessageList] = useState<TChatMessage[]>([]);
  const [isMessageListLoading, setIsMessageListLoading] = useState(false);
  const [isUserListLoading, setIsUserListLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<TChatUser>(tempUserList[0]);

  useEffect(() => {
    socket.on(SOCKET_ACTIONS.CONNECT, () => {
      // on connect routine goes here
      console.log("Connected to WebSocket server");
    });
    socket.on(SOCKET_ACTIONS.DISCONNECT, () => {
      // on disconnect routine goes here
      console.log("Disconnected from WebSocket server");
    });
    socket.on(SOCKET_ACTIONS.NEW_MESSAGE, (message) => {
      // on new message routine goes here
      console.log("new message in DB:", message);
      handleOnAddMessage(message);
    });
    return () => {
      socket.off(SOCKET_ACTIONS.CONNECT);
      socket.off(SOCKET_ACTIONS.DISCONNECT);
      socket.off(SOCKET_ACTIONS.NEW_MESSAGE);
    };
  }, []);

  useEffect(() => {
    const handleOnKeyDown = (e) => {
      if (
        e.keyCode === 13 &&
        e.ctrlKey &&
        textContext.current.trim().length > 0
      )
        handleOnSendMessage(textContext.current);
    };
    document.addEventListener("keydown", handleOnKeyDown);

    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
    };
  }, []);

  const handleOnChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    textContext.current = value;
    setInputValue(value);
  };

  const handleOnAddMessage = (message: TChatMessage) => {
    if (!message.isCurrentUser) setIsMessageListLoading(false); // set isLoading to false when get response from server
    setMessageList((prevState) => [...prevState, message]);
  };

  const handleOnSendMessage = (fromContext?: string) => {
    const message = inputValue.trim() || fromContext;
    if (message) {
      setIsMessageListLoading(true);
      setInputValue("");
      socket.emit(SOCKET_ACTIONS.SEND_MESSAGE, {
        text: message,
        id: uuidv4(),
        isCurrentUser: true,
      });
    }
  };

  const handleOnSelectUser = (user: TChatUser) => {
    setSelectedUser(user);
  };

  return (
    <div className={"p-0 sm:p-8 bg-zinc-900 h-full gap-8 flex flex-row"}>
      <div
        className={"w-1/4 bg-zinc-950 rounded-xl h-full p-8 hidden sm:block"}
      >
        <UserList
          isLoading={isUserListLoading}
          selectedUser={selectedUser}
          userList={tempUserList}
          onSelectUser={handleOnSelectUser}
        />
      </div>
      <div className={"w-full h-full flex flex-col gap-8 "}>
        <div className={"bg-zinc-950 w-full h-full rounded-xl overflow-auto"}>
          <MessageList autoScrollEnabled messageList={messageList} />
        </div>
        <div className={"w-full h-36 rounded-xl overflow-hidden"}>
          <ChatTextInput
            isLoading={isMessageListLoading}
            value={inputValue}
            onChange={handleOnChangeInput}
            onSubmit={handleOnSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
