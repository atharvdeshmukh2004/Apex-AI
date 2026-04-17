export default function ChatMessage({ msg }) {
  return (
    <div
      className={`p-2 my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
    >
      <span className="bg-gray-200 p-2 rounded">{msg.content}</span>
    </div>
  );
}
