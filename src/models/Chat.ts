//interfaces
import { ChangeEvent, MutableRefObject } from "react";

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
  readonly onSelectUser: (user: TChatUser) => void;
}

export type IChatUserListComponent = Pick<
  IChatUserListProps,
  "isLoading" | "selectedUser" | "userList" | "onSelectUser" // add new props here
>;

//types

export type TChatMessageDB = {
  readonly [chatRoom: string]: { readonly messageList: TChatMessage[] };
};

export type TChatMessage = {
  readonly text: string;
  readonly id: string;
  readonly isCurrentUser: boolean;
};

export type TChatUser = {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
};
