"use client";
import ChatTextInputComponent from "@/app/chat/components/TextInput/component";
import { useMemo } from "react";
import { IChatTextInputProps } from "@/models/Chat";

export default function ChatTextInput({
  isLoading,
  value,
  onChange,
  onSubmit,
}: IChatTextInputProps) {
  const isDisabled = useMemo(() => !value.trim().length, [value]);

  return (
    <ChatTextInputComponent
      isDisabled={isDisabled}
      isLoading={isLoading}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
