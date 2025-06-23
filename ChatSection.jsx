import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    const API_KEY ="AIzaSyBzVCXPGmpJEKKZk3yz6bdkDBY0nyvl1Xo"; // Replace with your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    const data = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    setPrompt("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the API");
      }

      const responseData = await response.json();
      const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      const slicedText = text?.slice(0, 800);

      setMessages((prev) => [...prev, { sender: "bot", text: slicedText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    }
  };

  return (
    <section className="chat">
      <div className="container">
        <div className="chat-wrapper">
          <div className="backbtn">
            <Link to="/">
              <button className="backBtnSelect">back</button>
            </Link>
          </div>
          <div className="chat-title">
            <h4>
              ChatBot <FaChevronDown />
            </h4>
            <h4>What can I help with you</h4>
          </div>
          <div className="message">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "message-user" : "message-bot"
                }
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
          <div className="prompt__section">
            <div>
              <form onSubmit={handleSumbit}>
                <textarea
                  className="textarea"
                  placeholder="Ask anything"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </form>
              <div className="faarrow">
                <FaArrowUp className="arrow_icon" onClick={handleSumbit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
