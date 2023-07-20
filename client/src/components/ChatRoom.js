import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const baseUrl = 'http://localhost:4000'; // Base URL of your backend API

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${baseUrl}/api/chat/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId, userId: 'yourUserId', message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message sent successfully:', data);
        setMessage('');
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    fetch(`${baseUrl}/api/chat/messages/${roomId}`) // Update the API URL with the base URL
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Error:', error));
  }, [roomId]);

  return (
    <div>
      <h1>Chat Room {roomId}</h1>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <p>User: {message.userId}</p>
            <p>Message: {message.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
