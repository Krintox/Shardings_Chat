import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:4000'; // Base URL of your backend API

const ChatRoomList = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/chat/rooms`) // Update the API URL with the base URL
      .then((response) => response.json())
      .then((data) => setChatRooms(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const createChatRoom = () => {
    fetch(`${baseUrl}/api/chat/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'New Chat Room' }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Chat room created successfully:', data);
        const newChatRoomId = data._id;
        navigate(`/chat/${newChatRoomId}`); // Redirect to the newly created chat room
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Chat Rooms</h1>
      <button onClick={createChatRoom}>Create New Chat Room</button>
      <ul>
        {chatRooms.map((chatRoom) => (
          <li key={chatRoom._id}>
            <Link to={`/chat/${chatRoom._id}`}>{chatRoom.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
