import { useEffect, useState } from "react";

interface Message {
  id: string;
  content: string;
  created_at: string;
  job_id: number;
  is_read: boolean;
  job?: { title: string } | null;
  sender: { id: string; name: string; email: string } | null;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [markingReadId, setMarkingReadId] = useState<string | null>(null);

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
        const res = await fetch(`http://localhost:3000/api/messages/${user.id}`, {
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

  return (
<section className="h-[80vh] max-w-7xl mx-auto mt-24 border rounded-lg overflow-hidden shadow-lg">
  <div className="flex h-full flex-col md:flex-row">
    {/* Sidebar: Message List */}
    <aside className="w-full md:w-1/3 border-r overflow-y-auto bg-gray-50">
      <ul className="divide-y divide-gray-200">
        {messages.map((msg) => (
          <li
            key={msg.id}
            onClick={() => handleMessageClick(msg)}
            className={`
              px-5 py-4 cursor-pointer select-none
              flex flex-col justify-center
              transition-colors duration-200
              ${selectedMsg?.id === msg.id ? "bg-white shadow-md border-l-4 border-yellow-400 text-gray-900" : "hover:bg-yellow-50"}
              ${msg.is_read ? "text-gray-600" : "bg-yellow-100 font-semibold"}
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <span
                title={msg.sender?.name || "Unknown sender"}
                className="truncate max-w-[70%]"
              >
                {msg.sender?.name || "Unknown sender"}
              </span>
              {!msg.is_read && (
                <span
                  aria-label="Unread message"
                  className="w-3 h-3 bg-red-500 rounded-full ml-2 flex-shrink-0"
                />
              )}
            </div>
            <p
              title={msg.content}
              className="text-sm truncate max-w-full leading-relaxed"
            >
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
          </li>
        ))}
      </ul>
    </aside>

    {/* Main: Message Detail */}
    <main className="w-full md:w-2/3 p-8 overflow-y-auto bg-white relative">
      {selectedMsg ? (
        <>
          <button
            aria-label="Close message"
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition"
            onClick={() => setSelectedMsg(null)}
          >
            ✕
          </button>
          <header className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {selectedMsg.sender
                ? `${selectedMsg.sender.name} (${selectedMsg.sender.email})`
                : "Unknown sender"}
            </h3>
            {selectedMsg.job?.title && (
              <p className="text-sm text-gray-600 mt-1">
                Regarding: <strong>{selectedMsg.job.title}</strong>
              </p>
            )}
            <time
              dateTime={selectedMsg.created_at}
              className="text-xs text-gray-400 mt-1 block"
              title={new Date(selectedMsg.created_at).toLocaleString()}
            >
              Sent at: {new Date(selectedMsg.created_at).toLocaleString()}
            </time>
          </header>
          <article className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base">
            {selectedMsg.content}
          </article>
        </>
      ) : (
        <p className="text-gray-500 italic text-center mt-20 select-none">
          Select a message to read
        </p>
      )}
    </main>
  </div>
</section>


  );
};

export default Messages;
