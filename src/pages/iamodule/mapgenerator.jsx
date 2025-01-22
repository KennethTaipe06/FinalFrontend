import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Card, CardBody } from "@material-tailwind/react";
import mermaid from "mermaid"; // Importar mermaid

const Mapgen = () => {
  const [theme, setTheme] = useState(""); // State for theme
  const [considerations, setConsiderations] = useState(""); // State for considerations
  const [mapCode, setMapCode] = useState(""); // State for the mermaid map code

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  const handleSendMessage = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or token is missing");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_MAPGENERATOR}?userId=${userId}&token=${token}&theme=${theme}&considerations=${considerations}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json().catch(() => null);
      if (response.ok && data) {
        let mermaidCode = data.botMessage.match(/```mermaid\n([\s\S]*?)\n```/)[1];
        mermaidCode = mermaidCode.replace(/^\s*end\s*$/gm, ''); // Eliminar líneas que contienen "end"
        setMapCode(mermaidCode);
        setTheme(""); // Clear the theme field
        setConsiderations(""); // Clear the considerations field
      } else {
        console.error("Failed to send message:", data ? data.message : "No response data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleExportImage = () => {
    const svg = document.querySelector("#mermaid-container svg");
    if (svg) {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svg);
      const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "map.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (mapCode) {
      const mermaidContainer = document.getElementById("mermaid-container");
      mermaidContainer.textContent = mapCode;
      mermaid.init(undefined, mermaidContainer);
    }
  }, [mapCode]);

  return (
    <section className="flex-1 flex flex-col">
      <Typography variant="h2" className="font-bold mb-4">Map Generator</Typography>
      <Card className="flex-1 p-4 shadow-lg flex flex-col">
        <CardBody className="flex-1 flex flex-col">
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Map theme..."
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="flex-grow mr-4"
              style={{ marginRight: '1rem' }}
            />
            <Input
              type="text"
              placeholder="Map considerations..."
              value={considerations}
              onChange={(e) => setConsiderations(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex mb-4">
            <Button onClick={handleSendMessage} className="mr-4">Send</Button>
            <Button onClick={handleExportImage}>Export</Button>
          </div>
          <div id="mermaid-container" className="mt-4 overflow-auto max-h-96"></div>
        </CardBody>
      </Card>
    </section>
  );
};

export default Mapgen;
export { Mapgen };
