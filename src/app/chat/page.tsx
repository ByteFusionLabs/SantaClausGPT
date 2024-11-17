"use client";
import UserList from "@/app/chat/components/UserList";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import MessageList from "./components/MessageList";
import { socketClient } from "../socket";
import { Socket } from "socket.io-client";
import { TChatMessage, TChatMessageDB, TChatUser } from "@/models/Chat";
import ChatTextInput from "@/app/chat/components/TextInput";
import { SOCKET_ACTIONS } from "../../../app_socket_constants";
import { v4 as uuidv4 } from "uuid";
import defaultSantaAvatar from "/public/santa-logo-removebg-preview.png";
import Image from "next/image";

const defaultUser = {
  id: uuidv4(),
  name: "John Doe",
  avatar: defaultSantaAvatar,
};
const defaultChatRoom = defaultUser.id;

export default function Chat() {
  const socket = socketClient as unknown as Socket;
  const textContext = useRef("");
  const userIdContext = useRef(defaultUser.id);

  const [inputValue, setInputValue] = useState<string>("");
  const [messageDB, setMessageDB] = useState<TChatMessageDB>({
    [defaultChatRoom]: { messageList: [] },
  });
  const [isMessageListLoading, setIsMessageListLoading] = useState(false);
  const [isUserListLoading, setIsUserListLoading] = useState(false);
  const [userList, setUserList] = useState<TChatUser[]>([defaultUser]);

  const [selectedUser, setSelectedUser] = useState<TChatUser>(defaultUser);

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
    socket.on("connect_error", () => {
      // handle error
      setIsMessageListLoading(false);
      console.log("error");
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
    console.log(message);
    if (!message.isCurrentUser) setIsMessageListLoading(false); // set isLoading to false when get response from server
    setMessageDB((prevState) => {
      console.log("prev", prevState);
      return {
        ...prevState,
        [message.roomId]: {
          messageList: [
            ...prevState[userIdContext.current].messageList,
            message,
          ],
        },
      };
    });
  };

  const handleOnSendMessage = (fromContext?: string) => {
    console.log(userIdContext.current);
    const message = inputValue.trim() || fromContext;
    if (message) {
      setIsMessageListLoading(true);
      setInputValue("");
      socket.emit(SOCKET_ACTIONS.SEND_MESSAGE, {
        text: message,
        id: uuidv4(),
        isCurrentUser: true,
        roomId: userIdContext.current,
      });
    }
  };

  const handleOnAddUser = (name: string) => {
    const id = uuidv4();
    const newUser: TChatUser = {
      name,
      id,
      avatar: defaultSantaAvatar,
    };
    setUserList((prevState) => [...prevState, newUser]);
    setMessageDB((prevState) => ({
      ...prevState,
      [id]: { messageList: [] },
    }));
  };

  const handleOnRemoveUser = (id: string) => {};

  const handleOnSelectUser = (user: TChatUser) => {
    setSelectedUser(user);
    userIdContext.current = user.id;
  };

  return (
    <div
      className={"p-0 sm:p-4 h-full gap-4 sm:gap-8 flex flex-row bg-zinc-900"}
    >
      <div
        className={"w-1/4 bg-zinc-950 rounded-xl h-full p-4 hidden sm:block"}
      >
        <UserList
          isLoading={isUserListLoading}
          selectedUser={selectedUser}
          userList={userList}
          onAddUser={handleOnAddUser}
          onSelectUser={handleOnSelectUser}
        />
      </div>
      <div className={"w-full h-full flex flex-col gap-8"}>
        <div className="bg-zinc-950 w-full h-full rounded-xl overflow-auto p-4">
          <div className="w-full mb-4 rounded-xl flex p-4 bg-zinc-900 items-center gap-6">
            <div
              className={"h-12 w-12 rounded-full bg-amber-400 overflow-hidden"}
            >
              {selectedUser.avatar && (
                <Image className="h-12 w-12" src={selectedUser.avatar} alt="" />
              )}
            </div>
            <div className="text-white text-2xl">{selectedUser.name}</div>
          </div>
          <MessageList
            autoScrollEnabled
            messageList={messageDB[selectedUser.id].messageList}
          />
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
