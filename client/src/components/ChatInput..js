import React, { useState } from 'react';

const ChatInput = ({ sendMessage }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    sendMessage(messageInput);
    setMessageInput('');
  };

  return (
    <div>
      <input
        type="text"
        value={messageInput}
        onChange={e => setMessageInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatInput;
