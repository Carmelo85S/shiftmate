import { useEffect, useState } from "react";
import type { Message } from "../../types/types";
import MessageList from "./MessageList";
import MessageDetails from "./MessageDetails";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [,setMarkingReadId] = useState<string | null>(null);

  useEffect(() => {
    const safeParseUser = () => {
      try {
        return JSON.parse(localStorage.getItem("user") || "{}");
      } catch {
        return {};
      }
    };

    const fetchMessages = async () => {
      const user = safeParseUser();
      if (!user.id) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
      const res = await fetch(`http://localhost:3000/api/messages/${user.id}/all?userType=${user.user_type}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch messages");

        setMessages(data);

        // Update unread count globally if function exists
        const unreadCount = data.filter((msg: Message) => !msg.is_read).length;
        if (typeof window.updateMessageCount === "function") {
          window.updateMessageCount(unreadCount);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Correctly define handleMessageClick outside markAsRead
  const handleMessageClick = (msg: Message) => {
    if (!msg.is_read) {
      markAsRead(msg);
    }
    setSelectedMsg(msg);
  };

  const markAsRead = async (msg: Message) => {
    if (msg.is_read) return;

    setMarkingReadId(msg.id);

    try {
      const res = await fetch('http://localhost:3000/api/messages/mark-read', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message_id: msg.id }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to mark as read (status ${res.status})`);
      }

      // Update the message in state with is_read = true (don't remove it)
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
      );

      setSelectedMsg({ ...msg, is_read: true });

      // Update unread count globally
      const unreadCount = messages.filter((m) => m.id !== msg.id && !m.is_read).length;
      if (typeof window.updateMessageCount === 'function') {
        window.updateMessageCount(unreadCount);
      }
    } catch (error: any) {
      console.error('Failed to mark as read', error);
      alert('Failed to mark message as read: ' + error.message);
    } finally {
      setMarkingReadId(null);
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (messages.length === 0) return <p>No messages.</p>;

  const deleteMessage = async (id: string) => {
  const confirmed = window.confirm("Delete this message? This action cannot be undone.");

  if (!confirmed) return;

  try {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userType = user.user_type; // 'business' or 'worker'
  const userId = user.id;

  const res = await fetch(`http://localhost:3000/api/messages/${id}/delete`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userType, userId }),
  });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete message");
      }

      // Remove from state
      setMessages((prev) => prev.filter((msg) => msg.id !== id));

      // If deleted message was selected, close detail view
      if (selectedMsg?.id === id) {
        setSelectedMsg(null);
      }

  } catch (error: any) {
    alert("Error deleting message: " + error.message);
  }
};


  return (
    <section className="h-[80vh] max-w-7xl mx-auto mt-24 border rounded-lg overflow-hidden shadow-lg">
      <div className="flex h-full flex-col md:flex-row">
        <MessageList
          messages={messages}
          selectedMsg={selectedMsg}
          onSelect={handleMessageClick}
          onDelete={deleteMessage}
        />
        <MessageDetails message={selectedMsg} onClose={() => setSelectedMsg(null)} />
      </div>
    </section>
  );
};

export default Messages;
