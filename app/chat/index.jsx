"use client";
import { startConversation, listener, sendMessage } from "./action";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, SendHorizonal, Loader, X } from "lucide-react";

export const ChatMenu = () => {
    const [showChat, setShowChat] = useState(false);

    const handleChat = () => {
      setShowChat(!showChat)
    }

    return(
        <div>
          {showChat &&
            <div className="fixed bottom-11 right-10 z-10 mb-3 chat-container">
                <Chat handleChat={handleChat} showChat={showChat}/>
            </div>
          }
          <button
            onClick={handleChat}
            className="fixed bottom-4 right-4 z-10 bg-zinc-500 text-white rounded-full p-3 mr-3 hover:scale-105"
          >
            <MessageCircle width={36} height={36}/>
          </button>
      </div>
    )
}
const Chat = ({handleChat, showChat}) => {
  const [messages, setMessages] = useState([]);

  const [conversationId, setConversationId] = useState("");
  const [token, setToken] = useState("");
  const [recommended, setRecommended] = useState(['What are you?','Who is Adrian?','What does he do?']);


  useEffect(() => {
    let webSocket
    const initializeWebSocket = async () => {
      try {
        const { streamUrl, conversationId, token } = await startConversation();
        webSocket = listener(streamUrl, recieveMessage);

        setConversationId(conversationId)
        setToken(token)

        return webSocket
      } catch (error) {
        console.error('Error al iniciar la conversación:', error);
      }
    };

    initializeWebSocket();

    return () => {
      if(webSocket){
        webSocket.close();
      }
    };

  }, [showChat])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const recieveMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  }

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const container = useRef(null);
  const lastMessageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    
    await sendMessage(conversationId, token, question, "user1")

    setQuestion("");

    setLoading(false);
  };

  const handleRecommendation = (recommendation) =>{
    console.log(recommendation)
  }

  return (
    <section>
      <div className="flex flex-col gap-4 m-auto border border-neutral-500/20 p-4 rounded-md mr-4" style={{backgroundColor: 'rgb(0,0,0,0.9)'}}>
        <div className="border-b-[1px] border-zinc-500 text-end">
          <button onClick={handleChat}>
            <X className="text-zinc-500 hover:scale-110"/>
          </button>
        </div>
        <div className="flex overflow-x-auto">
          {recommended.map((recommendation, i) => (
            <button onClick={() => handleRecommendation(recommendation)} 
            className=" text-white bg-zinc-500 rounded-2xl px-3 mr-3 mb-1 py-1 whitespace-nowrap" key={i}>
              <p>{recommendation}</p>
            </button>
          ))}
        </div>
        <div
          ref={container}
          className="flex flex-col gap-4 h-[55vh] overflow-y-auto"
        >
          {messages.map((message, index) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`p-4 mr-1 max-w-[80%] rounded-3xl text-white ${
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
            className={"px-4 py-[9px] text-white bg-zinc-500 rounded-lg rounded-l-none"}
            disabled={loading}
            type="submit"
          >
            {loading ? <Loader className="animate-spin"/> : <SendHorizonal className="hover:scale-105"/>}
          </button>
        </form>
      </div>
    </section>
  );
};
