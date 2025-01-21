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
        <aside className="w-full lg:w-64 bg-gray-800 p-4 text-white lg:block hidden">
          <h1 className="text-2xl font-bold mb-6">AI Module</h1>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar en Marketplace"
              className="w-full p-2 pl-10 rounded-full bg-gray-700 text-white focus:outline-none"
            />
          </div>

          <button
            className="w-full mt-4 py-2 bg-gradient-to-r from-gray-300 to-gray-500 text-black rounded hover:from-gray-400 hover:to-gray-600"
            onClick={() => navigate('/marketplace/create-product')}
          >
            ChatBot
          </button>
          <button
            className="w-full mt-4 py-2 bg-gradient-to-r from-gray-300 to-gray-500 text-black rounded hover:from-gray-400 hover:to-gray-600"
            onClick={() => navigate('/marketplace/create-product')}
          >
            Conceptual Map Generator
          </button>
          <button
            className="w-full mt-4 py-2 bg-gradient-to-r from-gray-300 to-gray-500 text-black rounded hover:from-gray-400 hover:to-gray-600"
            onClick={() => navigate('/marketplace/create-product')}
          >
            Summarize
          </button>
          <button
            className="w-full mt-4 py-2 bg-gradient-to-r from-gray-300 to-gray-500 text-black rounded hover:from-gray-400 hover:to-gray-600"
            onClick={() => navigate('/marketplace/create-product')}
          >
            Image Generator
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
                  <Button onClick={handleSendMessage}>Enviar</Button>
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
