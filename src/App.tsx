import { useState } from "react";
import { Editor } from "./components/Editor";

const App = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");

  const getCombinedCode = () => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
    <script>${jsCode}</script>
  </body>
  </html>
`;

  return (
    <div className="container">
      <div className="section top-section">
        <Editor displayName="HTML" onChange={setHtmlCode} />
        <Editor displayName="CSS" onChange={setCssCode} />
        <Editor displayName="JS" onChange={setJsCode} />
      </div>
      <div className="section">
        <iframe title="output" srcDoc={getCombinedCode()} />
      </div>
    </div>
  );
};

export default App;
