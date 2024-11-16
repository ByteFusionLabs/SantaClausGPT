import Spinner from "@/app/components/Spinner";
import React from "react";
import { IChatTextInputComponent } from "@/models/Chat";

export default function ChatTextInputComponent({
  isDisabled,
  isLoading,
  value,
  onChange,
  onSubmit,
}: IChatTextInputComponent) {
  return (
    <div className="overflow-hidden w-full h-full flex">
      <textarea
        value={value}
        id="messagesInput"
        className="p-4 w-full h-full bg-neutral-900 sm:bg-zinc-950 resize-none border-none align-top focus:ring-0 sm:text-sm outline-0"
        placeholder="Type your message here ..."
        onChange={onChange}
      ></textarea>
      <div className="h-full flex items-end justify-end gap-2 bg-neutral-900 sm:bg-zinc-950 p-3">
        <button
          type="button"
          className="rounded bg-indigo-800 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-900 disabled:bg-gray-400"
          onClick={onSubmit}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? <Spinner /> : <span>Send</span>}
        </button>
      </div>
    </div>
  );
}
