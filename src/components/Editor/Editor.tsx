import { useEffect, useRef, useState } from "react";
import styles from "./Editor.module.css";
import { MdOpenInFull, MdCloseFullscreen } from "react-icons/md";
import { syntaxHighlight } from "../../utils";

interface EditorProps {
  displayName: string;
  onChange: (code: string) => void;
}

const Editor = ({ displayName, onChange }: EditorProps) => {
  const [code, setCode] = useState(
    displayName === "HTML"
      ? "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My HTML Document</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>"
      : displayName === "CSS"
      ? "/* Add your CSS here */"
      : "/* Add your JavaScript here */"
  );
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [open, setOpen] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && outputRef.current) {
      outputRef.current.scrollTop = textareaRef.current.scrollTop;
      outputRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    setHighlightedCode(syntaxHighlight(code));
  }, [code]);

  useEffect(() => {
    onChange(code);
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
        <textarea
          spellCheck="false"
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <div
          ref={outputRef}
          className={styles.editorOutput}
          spellCheck="false"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        ></div>
      </div>
    </div>
  );
};

export default Editor;
