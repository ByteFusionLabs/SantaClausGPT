import React, { ReactNode } from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className={"p-4 h-full w-full"}>{children}</div>;
}
