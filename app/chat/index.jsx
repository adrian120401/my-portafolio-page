"use client";
import { sendQuestion } from "./action";

import { useState, useRef } from "react";

export const ChatMenu = () => {
    const [showChat, setShowChat] = useState(false);

    return(
        <div>
            {showChat ? 
                <div className="fixed bottom-0 right-4 z-10 mb-3 mw-[440px]">
                    <Chat />
                </div>
                :
                 <button
                    onClick={() => setShowChat(!showChat)}
                    className="fixed bottom-4 right-4 z-10 px-4 py-2 bg-stone-500 text-white rounded-lg"
                >
                 Show Chat
             </button>}
      </div>
    )
}
const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: Math.random().toString(36).slice(2),
      text: "Ask me anything",
      owner: "user",
    },
    {
      id: Math.random().toString(36).slice(2),
      text: "Helloo",
      owner: "bot",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const container = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessages((messages) =>
      messages.concat({
        id: String(Date.now()),
        text: question,
        owner: "user",
      })
    );
    setQuestion("");

    const answer = await sendQuestion(question);

    setMessages((messages) =>
      messages.concat({
        id: String(Date.now()),
        text: answer,
        owner: "bot",
      })
    );

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
                message.owner === "user"
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
