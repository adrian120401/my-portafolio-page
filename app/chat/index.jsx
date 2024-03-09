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
            <div className="fixed bottom-14  right-4  z-10 mb-3 chat-container sm:bottom-11 sm:right-10">
                <Chat handleChat={handleChat} showChat={showChat}/>
            </div>
          }
          <button
            onClick={handleChat}
            className="fixed bottom-4 right-4 z-10  text-white rounded-full p-3
              animate-background-shine items-center
              border border-slate-800 bg-[linear-gradient(110deg,rgb(0,0,0),45%,#202020,55%,rgb(0,0,0))]
              bg-[length:200%_100%]
              justify-center hover:scale-105 sm:mr-3"
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


  const handleMessage = async (question) => {
    if (loading) return;

    setLoading(true);
    
    await sendMessage(conversationId, token, question, "user1")

    setQuestion("");

    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleMessage(question);
  };

  const handleRecommendation = (recommendation) =>{
    console.log(recommendation)
    handleMessage(recommendation)
    setRecommended(prev => prev.filter(item => item !== recommendation))
  }

  return (
    <section>
      <div className="flex flex-col gap-2 m-auto border border-neutral-500/20 p-4 rounded-md mr-4 bg-zinc-900 bg-opacity-95">
        <div className="border-b-[1px] border-zinc-500 text-end">
          <button onClick={handleChat}>
            <X className="text-zinc-500 hover:scale-110"/>
          </button>
        </div>
        <div className="flex overflow-x-auto">
          {recommended.map((recommendation, i) => (
            <button onClick={() => handleRecommendation(recommendation)} 
            className=" text-zinc-600 bg-zinc-100 rounded-2xl px-3 mr-3 mb-1 py-1 whitespace-nowrap hover:bg-zinc-300" key={i}>
              <p>{recommendation}</p>
            </button>
          ))}
        </div>
        <div
          ref={container}
          className="flex flex-col gap-4 h-[60vh] overflow-y-auto"
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
