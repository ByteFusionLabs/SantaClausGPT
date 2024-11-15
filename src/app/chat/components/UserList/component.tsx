import { IChatUserListComponent } from "@/models/Chat";
import Image from "next/image";

export default function ChatUserListComponent({
  isLoading,
  selectedUser,
  userList,
  onSelectUser,
}: IChatUserListComponent) {
  return (
    <ul
      role="list"
      className={`divide-y divide-gray-700 ${isLoading ? "disabled" : ""}`}
    >
      {userList.map((user) => (
        <li
          key={user.id}
          className={`flex justify-between py-4 ${selectedUser.id === user.id ? "active" : ""}`}
          onClick={() => {
            onSelectUser(user);
          }}
        >
          <div className="flex min-w-0 gap-x-4">
            <div
              className={"h-12 w-12 rounded-full bg-gray-900 overflow-hidden"}
            >
              {user.avatar && (
                <Image className="h-12 w-12" src={user.avatar} alt="" />
              )}
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold">{user.name}</p>
              <p className="mt-1 text-xs/5 text-gray-500">Last seen 3h ago</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
