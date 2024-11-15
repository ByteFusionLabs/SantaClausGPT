import React, { ReactNode } from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={"p-4 sm:p-16 h-full w-full rounded-3xl"}>{children}</div>
  );
}
