import React, { useState, useEffect } from "react";
import type { Message } from "../../types/types";
import Button from "../ui/Button";
import { Handshake, Trash2 } from "lucide-react";

type MessageDetailProps = {
  message: Message | null;
  onClose: () => void;
};

type User = {
  id: string;
  user_type: "business" | "worker";
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const MessageDetail: React.FC<MessageDetailProps> = ({ message: initialMessage, onClose }) => {
  const [message, setMessage] = useState<Message | null>(initialMessage);
  const [user, setUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Aggiorna il messaggio dalla prop
  useEffect(() => {
    setMessage(initialMessage);
    if (initialMessage?.job_id && initialMessage?.sender?.id) {
      fetchStatus(initialMessage.sender.id, initialMessage.job_id);
    }
  }, [initialMessage]);

  const fetchStatus = async (user_id: string, job_id: number) => {
    try {
      const res = await fetch(`${API_BASE}/user/${user_id}/applications`);
      const data = await res.json();
      const app = data.find((a: any) => a.id === job_id || a.job_id === job_id);
      if (app) setMessage(prev => prev ? { ...prev, status: app.status } : prev);
    } catch (err) {
      console.error("Failed to fetch status:", err);
    }
  };

  const isDisabled = message?.status === "accepted" || message?.status === "rejected";

  if (!message) return <p className="text-gray-500 italic text-center mt-20 select-none">Select a message to read</p>;

  const updateApplicationStatus = async (status: "accepted" | "rejected") => {
    if (!message.sender?.id || !message.job_id) return;

    const body = { user_id: message.sender.id, job_id: message.job_id, status };
    setIsUpdating(true);

    try {
      const res = await fetch(`${API_BASE}/applications/change-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(prev => prev ? { ...prev, status } : prev);
      } else {
        console.error("Failed to update status:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

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
          <>
            <p className="text-sm text-gray-600 mt-1">Regarding: <strong>{message.job.title}</strong></p>
            {message.status && <h3 className="text-sm font-medium mt-2">Status: <span className="capitalize">{message.status}</span></h3>}
          </>
        )}
        <time dateTime={message.created_at} className="text-xs text-gray-400 mt-1 block" title={new Date(message.created_at).toLocaleString()}>
          Sent at: {new Date(message.created_at).toLocaleString()}
        </time>
      </header>

      <article className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base">{message.content}</article>

      {user?.user_type === "business" && (
        <div className="mt-6 flex gap-4">
          <Button
            icon={<Handshake />}
            label="Accept"
            bgColorClass="bg-blue-500"
            textColorClass="text-white"
            hoverBgColorClass="bg-blue-600"
            onClick={() => updateApplicationStatus("accepted")}
            disabled={isDisabled || isUpdating}
          />
          <Button
            icon={<Trash2 />}
            label="Reject"
            bgColorClass="bg-red-500"
            textColorClass="text-white"
            hoverBgColorClass="bg-red-600"
            onClick={() => updateApplicationStatus("rejected")}
            disabled={isDisabled || isUpdating}
          />
        </div>
      )}
    </main>
  );
};

export default MessageDetail;
