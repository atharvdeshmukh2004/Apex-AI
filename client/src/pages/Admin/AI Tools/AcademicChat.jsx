import { useState, useRef, useEffect } from "react";
import { sendChat } from "../../../api/chat";

const SUGGESTIONS = [
  "How to write a strong resume?",
  "Best career paths in data science",
  "How to prepare for GRE?",
  "Tips for cracking college interviews",
  "How to manage study time effectively?",
  "Top skills for software engineering jobs",
];

const BotIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const TypingDots = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, height: 20 }}>
    {[0, 0.2, 0.4].map((delay, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#a0aec0",
          animation: `bounce 1.2s ${delay}s infinite`,
        }}
      />
    ))}
    <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
  </div>
);

export default function AcademicChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const msg = text.trim();
    if (!msg || loading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const history = messages.slice(-16);
      const { reply, blocked } = await sendChat(msg, history);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, blocked },
      ]);
    } catch (err) {
      const errText =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errText, isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const getBubbleStyle = (m) => {
    const base = {
      maxWidth: "70%",
      padding: "10px 14px",
      borderRadius: 16,
      fontSize: "0.9rem",
      lineHeight: 1.6,
    };
    if (m.role === "user")
      return {
        ...base,
        background: "#1a56db",
        color: "#fff",
        borderBottomRightRadius: 4,
      };
    if (m.blocked)
      return {
        ...base,
        background: "#fffbeb",
        border: "1px solid #f6e05e",
        borderBottomLeftRadius: 4,
        color: "#744210",
      };
    if (m.isError)
      return {
        ...base,
        background: "#fff5f5",
        border: "1px solid #fed7d7",
        borderBottomLeftRadius: 4,
        color: "#c53030",
      };
    return {
      ...base,
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderBottomLeftRadius: 4,
      color: "#2d3748",
    };
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        height: "100vh",
        maxHeight: 780,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: 0,
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 20px",
          background: "#1a56db",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            background: "rgba(255,255,255,0.18)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BotIcon />
        </div>
        <div>
          <p
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Academic &amp; Career Assistant
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              opacity: 0.75,
              marginTop: 1,
              margin: 0,
            }}
          >
            Powered by Gemini · Academics &amp; Career only
          </p>
        </div>
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#48bb78",
            marginLeft: "auto",
            flexShrink: 0,
            boxShadow: "0 0 0 2px rgba(72,187,120,0.3)",
          }}
        />
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          //   background: "#f7fafc",
          background: "#fefefe",
        }}
      >
        {isEmpty ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem 1.5rem",
              textAlign: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                background: "#ebf4ff",
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a56db",
                marginBottom: 4,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#1a202c",
                margin: 0,
              }}
            >
              How can I help you?
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#718096",
                maxWidth: 380,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Ask anything about studies, exams, career paths, resumes, or
              interviews.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
                marginTop: 8,
                maxWidth: 520,
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    fontSize: "0.8rem",
                    padding: "7px 14px",
                    borderRadius: 20,
                    background: "#fff",
                    color: "#1a56db",
                    border: "1px solid #bee3f8",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#ebf8ff")}
                  onMouseLeave={(e) => (e.target.style.background = "#fff")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: 16,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                }}
              >
                {m.role === "assistant" && (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "#ebf4ff",
                      color: "#1a56db",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <BotIcon />
                  </div>
                )}
                <div style={getBubbleStyle(m)}>
                  {m.blocked && (
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        background: "#fefcbf",
                        color: "#975a16",
                        border: "1px solid #f6e05e",
                        padding: "1px 7px",
                        borderRadius: 10,
                        marginBottom: 5,
                      }}
                    >
                      Off-topic
                    </span>
                  )}
                  <p
                    style={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {m.content}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "#ebf4ff",
                    color: "#1a56db",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <BotIcon />
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 16,
                    borderBottomLeftRadius: 4,
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px 10px",
          background: "#fff",
          borderTop: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            background: focusedInput ? "#fff" : "#f7fafc",
            border: `1.5px solid ${focusedInput ? "#1a56db" : "#e2e8f0"}`,
            borderRadius: 14,
            padding: "7px 8px 7px 14px",
            transition: "border-color 0.15s",
            opacity: loading ? 0.65 : 1,
          }}
        >
          <textarea
            ref={textareaRef}
            placeholder="Ask about academics or career... (Enter to send)"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocusedInput(true)}
            onBlur={() => setFocusedInput(false)}
            rows={1}
            disabled={loading}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              resize: "none",
              fontSize: "0.9375rem",
              color: "#2d3748",
              lineHeight: 1.5,
              maxHeight: 120,
              minHeight: 26,
              padding: "3px 0",
              fontFamily: "inherit",
              outline: "none",
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#1a56db",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: !input.trim() || loading ? "not-allowed" : "pointer",
              flexShrink: 0,
              opacity: !input.trim() || loading ? 0.4 : 1,
              transition: "opacity 0.15s",
            }}
          >
            <SendIcon />
          </button>
        </div>
        <p
          style={{
            fontSize: "0.7rem",
            color: "#a0aec0",
            textAlign: "center",
            marginTop: 7,
            marginBottom: 0,
          }}
        >
          Only academic &amp; career questions answered · Shift+Enter for new
          line
        </p>
      </div>
    </div>
  );
}
