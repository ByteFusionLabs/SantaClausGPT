import { IChatUserListComponent } from "@/models/Chat";
import Image from "next/image";

export default function ChatUserListComponent({
  addUserMode,
  isDisabledAddUser,
  isLoading,
  selectedUser,
  userList,
  userName,
  onAddUser,
  onToggleAddUserMode,
  onChangeUserName,
  onSelectUser,
}: IChatUserListComponent) {
  return (
    <div className="h-full flex w-full flex-col">
      <div>
        <ul
          role="list"
          className={`w-full divide-gray-700 ${isLoading ? "disabled" : ""}`}
        >
          {userList.map((user) => (
            <li
              key={user.id}
              className={`cursor-pointer rounded-xl flex justify-between p-4 ${selectedUser.id === user.id ? "bg-zinc-900" : ""} hover:bg-zinc-700`}
              onClick={() => {
                onSelectUser(user);
              }}
            >
              <div className="flex min-w-0 gap-x-4">
                <div
                  className={
                    "h-12 w-12 rounded-full bg-amber-400 overflow-hidden"
                  }
                >
                  {user.avatar && (
                    <Image className="h-12 w-12" src={user.avatar} alt="" />
                  )}
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 text-white font-semibold">
                    {user.name}
                  </p>
                  <p className="mt-1 text-xs/5 text-gray-500">
                    Last seen 3h ago
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        {addUserMode ? (
          <div className="flex gap-2 items-end">
            <div className="w-full ">
              <label
                htmlFor="user-name-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User name
              </label>
              <input
                value={userName}
                onChange={onChangeUserName}
                type="text"
                id="user-name-input"
                className="block w-full p-2 rounded-lg text-white bg-gray-700"
              />
            </div>

            <button
              disabled={isDisabledAddUser}
              className="rounded min-w-10 h-10 w-10 bg-amber-400 hover:bg-amber-300 font-semibold text-zinc-950 disabled:bg-gray-400 disabled:text-white"
              onClick={onAddUser}
            >
              +
            </button>
            <button
              className="rounded min-w-10 h-10 w-10 bg-red-400 hover:bg-red-300 font-semibold text-zinc-950"
              onClick={onToggleAddUserMode}
            >
              x
            </button>
          </div>
        ) : (
          <button
            className="rounded w-full p-4 bg-amber-400 hover:bg-amber-300 font-semibold text-zinc-950"
            onClick={onToggleAddUserMode}
          >
            ADD USER +
          </button>
        )}
      </div>
    </div>
  );
}
