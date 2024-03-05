"use client";
import { startConversation, listener, sendMessage } from "./action";
import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

export const ChatMenu = () => {
    const [showChat, setShowChat] = useState(false);

    return(
        <div>
            {showChat ? 
                <div className="fixed bottom-0 right-4 z-10 mb-3 chat-container">
                    <Chat />
                </div>
                :
                 <button
                    onClick={() => setShowChat(!showChat)}
                    className="fixed bottom-4 right-4 z-10 bg-stone-500 text-white rounded-full p-3 mr-3"
                >
                 <MessageCircle width={36} height={36}/>
             </button>}
      </div>
    )
}
const Chat = () => {
  const [messages, setMessages] = useState([]);

  const [conversationId, setConversationId] = useState("");
  const [token, setToken] = useState("");


  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        const { streamUrl, conversationId, token } = await startConversation();
        const webSocket = listener(streamUrl, recieveMessage);

        setConversationId(conversationId)
        setToken(token)

        return () => {
          webSocket.close();
        };
      } catch (error) {
        console.error('Error al iniciar la conversación:', error);
      }
    };

    initializeWebSocket();
  }, [])

  const recieveMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  }

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const container = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    
    await sendMessage(conversationId, token, question, "user1")

    setQuestion("");

    setLoading(false);

  };

  return (
    <section>
      <div className="flex flex-col gap-4 m-auto border border-neutral-500/20 p-4 rounded-md mr-4" style={{backgroundColor: 'rgb(0,0,0,0.9)'}}>
        <div
          ref={container}
          className="flex flex-col gap-4 h-[440px] overflow-y-auto"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 max-w-[80%] rounded-3xl text-white ${
                message.owner === "bot"
                  ? "bg-zinc-600 self-start rounded-bl-none"
                  : "bg-zinc-500 self-end rounded-br-none"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input
            className="rounded rounded-r-none flex-1 border border-neutral-500/20 text-black py-2 px-4"
            type="text"
            name="question"
            placeholder="Ask me something!"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          ></input>
          <button
            className={`px-4 py-2 text-white bg-zinc-600 rounded-lg rounded-l-none ${
              loading ? "bg-zinc-500" : "bg-zinc-600"
            }`}
            disabled={loading}
            type="submit"
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};
