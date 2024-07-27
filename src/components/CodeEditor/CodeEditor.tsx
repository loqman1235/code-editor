import { useEffect, useState } from "react";
import styles from "./CodeEditor.module.css";
import { MdOpenInFull, MdCloseFullscreen } from "react-icons/md";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  displayName: string;
  onChange: (code: string) => void;
}

const CodeEditor = ({ displayName, onChange }: CodeEditorProps) => {
  const [code, setCode] = useState(
    displayName === "html"
      ? "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My HTML Document</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>"
      : displayName === "css"
      ? "*, *:before, *:after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}"
      : "/* Add your JavaScript here */"
  );
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(code);
    }, 300);

    return () => clearTimeout(timer);
  }, [code, onChange]);

  return (
    <div
      className={styles.editorContainer}
      style={{
        flexGrow: open ? 1 : 0,
      }}
    >
      <div className={styles.editorHeader}>
        <p>{displayName}</p>
        <button
          type="button"
          className={styles.expandCollapseBtn}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <MdCloseFullscreen /> : <MdOpenInFull />}
        </button>
      </div>
      <div className={styles.editor}>
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage={displayName}
          defaultValue={code}
          options={{
            wordWrap: "on",
            minimap: {
              enabled: false,
            },
            scrollbar: {
              vertical: "hidden",
            },
            tabSize: 2,
            fontSize: 14,
            fontFamily: "Roboto Mono, monospace",
          }}
          onChange={(value) => setCode(value ?? "")}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
