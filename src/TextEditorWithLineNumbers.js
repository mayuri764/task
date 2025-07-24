import React, { useState, useRef, useEffect } from 'react';
import './TextEditorWithLineNumbers.css';

const TextEditorWithLineNumbers = () => {
  const [text, setText] = useState('');
  const [lines, setLines] = useState(['']);
  const textAreaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    setLines(text.split('\n'));
  }, [text]);

  const handleScroll = () => {
    lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
  };

  const jumpToLine = () => {
    const lineNum = parseInt(document.getElementById('lineInput').value);
    if (isNaN(lineNum) || lineNum < 1 || lineNum > lines.length) {
      alert('Invalid line number');
      return;
    }

    const lineHeight = parseFloat(
      getComputedStyle(textAreaRef.current).lineHeight
    );
    textAreaRef.current.scrollTop = (lineNum - 1) * lineHeight;
  };

  return (
    
    <div className="editor-wrapper">
       <div className="editor-title">📝 Smart Text Editor</div>
      <div className="jump-bar">
        <input type="number" id="lineInput" placeholder="Go to line" />
        <button onClick={jumpToLine}>Jump</button>
      </div>

      <div className="editor-container">
        <pre className="line-numbers" ref={lineNumbersRef}>
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </pre>
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={handleScroll}
          className="text-editor"
          placeholder="Type or paste your text here..."
        />
      </div>
    </div>
  );
};

export default TextEditorWithLineNumbers;
