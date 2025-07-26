import React from "react";
import type { Message } from "../../types/types";

type MessageListProps = {
  messages: Message[];
  selectedMsg: Message | null;
  onSelect: (msg: Message) => void;
  onDelete: (id: string) => void;
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  selectedMsg,
  onSelect,
  onDelete,
}) => {
  return (
    <aside className="w-full md:w-1/3 border-r overflow-y-auto bg-gray-50">
      <ul className="divide-y divide-gray-200">
        {messages.map((msg) => (
          <li
            key={msg.id}
            onClick={() => onSelect(msg)}
            className={`
              px-5 py-4 cursor-pointer select-none
              flex flex-col justify-center
              transition-colors duration-200
              ${selectedMsg?.id === msg.id ? "bg-white shadow-md border-l-4 border-yellow-400 text-gray-900" : "hover:bg-yellow-50"}
              ${msg.is_read ? "text-gray-600" : "bg-yellow-100 font-semibold"}
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <span title={msg.sender?.name || "Unknown sender"} className="truncate max-w-[70%]">
                {msg.sender?.name || "Unknown sender"}
              </span>
              {!msg.is_read && (
                <span aria-label="Unread message" className="w-3 h-3 bg-red-500 rounded-full ml-2 flex-shrink-0" />
              )}
            </div>
            <p title={msg.content} className="text-sm truncate max-w-full leading-relaxed">
              {msg.content}
            </p>
            <time
              dateTime={msg.created_at}
              className="mt-1 text-xs text-gray-400"
              title={new Date(msg.created_at).toLocaleString()}
            >
              {new Date(msg.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(msg.id);
              }}
              className="ml-auto text-red-600 hover:text-red-800 text-sm font-semibold"
              aria-label="Delete message"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default MessageList;
