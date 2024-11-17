//interfaces
import { ChangeEvent, MutableRefObject } from "react";
import { StaticImageData } from "next/image";

export interface IChatMessageListProps {
  readonly autoScrollEnabled: boolean;
  readonly messageList: TChatMessage[];
}

export interface IChatMessageListComponent
  extends Pick<IChatMessageListProps, "messageList"> {
  readonly endListRef: MutableRefObject<HTMLDivElement | null>;
}

export interface IChatTextInputProps {
  readonly isLoading: boolean;
  readonly value: string;
  readonly onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly onSubmit: () => void;
}

export interface IChatTextInputComponent
  extends Pick<
    IChatTextInputProps,
    "isLoading" | "value" | "onChange" | "onSubmit"
  > {
  readonly isDisabled: boolean;
}

export interface IChatUserListProps {
  readonly isLoading: boolean;
  readonly selectedUser: TChatUser;
  readonly userList: TChatUser[];
  readonly onAddUser: (userName: string) => void;
  readonly onSelectUser: (user: TChatUser) => void;
}

export interface IChatUserListComponent
  extends Pick<
    IChatUserListProps,
    "isLoading" | "selectedUser" | "userList" | "onSelectUser"
  > {
  readonly addUserMode: boolean;
  readonly isDisabledAddUser: boolean;
  readonly userName: string;
  readonly onAddUser: () => void;
  readonly onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly onToggleAddUserMode: () => void;
}

//types

export type TChatMessageDB = {
  readonly [chatRoom: string]: { readonly messageList: TChatMessage[] };
};

export type TChatMessage = {
  readonly text: string;
  readonly id: string;
  readonly isCurrentUser: boolean;
  readonly roomId: string;
};

export type TChatUser = {
  readonly id: string;
  readonly name: string;
  readonly avatar: string | StaticImageData;
};
