import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography, Card, CardBody } from "@material-tailwind/react";

const Iamodule = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or token is missing");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_CHATBOT}?userId=${userId}&token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json().catch(() => null);
      if (response.ok && data) {
        setChatHistory([...chatHistory, { userMessage: message, botMessage: data.botMessage }]);
        setMessage("");
      } else {
        console.error("Failed to send message:", data ? data.message : "No response data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="relative block h-[11vh] bg-black">
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <div className="flex flex-col lg:flex-row h-[89vh] bg-white text-black">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-black p-4 text-white lg:block hidden">
          <h1 className="text-2xl font-bold mb-6">AI Module</h1>
        

          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-full h-12">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full text-center">
              ChatBot
            </span>
          </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-full h-12">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full text-center">
              Conceptual Map Generator
            </span>
          </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 w-full h-12">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full text-center">
              Summarize
            </span>
          </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 w-full h-12">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full text-center">
              Image Generator
            </span>
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-white bg-opacity-75 flex flex-col">
          <section className="flex-1 flex flex-col">
            <Typography variant="h2" className="font-bold mb-4">ChatBot</Typography>
            <Card className="flex-1 p-4 shadow-lg flex flex-col">
              <CardBody className="flex-1 flex flex-col">
                <div className="chat-history flex-1 max-h-full overflow-y-auto mb-4">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className="mb-4 flex flex-col">
                      <div className="self-end bg-blue-500 text-white p-2 rounded-lg mb-1 max-w-xs">
                        <Typography variant="small" className="font-bold">
                          <strong>Tú:</strong> {chat.userMessage}
                        </Typography>
                      </div>
                      <div className="self-start bg-gray-200 text-black p-2 rounded-lg max-w-xs">
                        <Typography variant="small" className="font-bold">
                          <strong>Bot:</strong> {chat.botMessage}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <button onClick={handleSendMessage} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 w-1/5 h-12">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full text-center">
              Send
            </span>
          </button>
                </div>
              </CardBody>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
};

export default Iamodule;
export { Iamodule };
