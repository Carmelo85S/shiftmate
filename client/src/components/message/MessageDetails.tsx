import React from "react";
import type { Message } from "../../types/types";

type MessageDetailProps = {
  message: Message | null;
  onClose: () => void;
};

const MessageDetail: React.FC<MessageDetailProps> = ({ message, onClose }) => {
  if (!message) {
    return <p className="text-gray-500 italic text-center mt-20 select-none">Select a message to read</p>;
  }

  return (
    <main className="w-full md:w-2/3 p-8 overflow-y-auto bg-white relative">
      <button
        aria-label="Close message"
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition"
        onClick={onClose}
      >
        ✕
      </button>
      <header className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          {message.sender ? `${message.sender.name} (${message.sender.email})` : "Unknown sender"}
        </h3>
        {message.job?.title && (
          <p className="text-sm text-gray-600 mt-1">
            Regarding: <strong>{message.job.title}</strong>
          </p>
        )}
        <time
          dateTime={message.created_at}
          className="text-xs text-gray-400 mt-1 block"
          title={new Date(message.created_at).toLocaleString()}
        >
          Sent at: {new Date(message.created_at).toLocaleString()}
        </time>
      </header>
      <article className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base">
        {message.content}
      </article>
    </main>
  );
};

export default MessageDetail;
