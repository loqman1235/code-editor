import React, { useState, useRef, useEffect } from "react";
import styles from "./Editor.module.css";
import { syntaxHighlight } from "../../utils";

const Editor: React.FC = () => {
  const [code, setCode] = useState<string>(`<script>
    console.log("hello world")
</script>`);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setHighlightedCode(syntaxHighlight(code));
  }, [code]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newCode = code.substring(0, start) + "  " + code.substring(end);
        setCode(newCode);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.lineNumbers}>
        {code.split("\n").map((_, index) => (
          <div key={index} className={styles.lineNumber}>
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.codeWrapper}>
        <div
          className={styles.highlightedCode}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
        <textarea
          ref={textareaRef}
          className={styles.codeArea}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default Editor;
