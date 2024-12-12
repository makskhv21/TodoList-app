import React, { useState, useEffect, useRef } from 'react';

function Notes() {
  const [note, setNote] = useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [note]);

  return (
    <div>
      <textarea
        ref={textAreaRef}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Введіть вашу нотатку..."
        rows="1"
        style={{
          width: '90%',
          minHeight: '40px',
          resize: 'none',
          overflow: 'hidden',
        }}
      />
    </div>
  );
}

export default Notes;
