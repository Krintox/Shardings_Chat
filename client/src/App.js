import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    bulletedList: false,
  });
  const [codeSnippet, setCodeSnippet] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    try {
      if (content && sender) {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('sender', sender);
        formData.append('photo', photo);
        formData.append('formatting', JSON.stringify(formatting));
        formData.append('codeSnippet', codeSnippet);

        await axios.post('http://localhost:4000/api/messages', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        fetchMessages();
        setContent('');
        setSender('');
        setPhoto(null);
        setFormatting({
          bold: false,
          italic: false,
          underline: false,
          strikethrough: false,
          bulletedList: false,
        });
        setCodeSnippet('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <p>{message.sender}</p>
          {message.formatting.bold ? <strong>{message.content}</strong> : null}
          {message.formatting.italic ? <em>{message.content}</em> : null}
          {message.formatting.underline ? <u>{message.content}</u> : null}
          {message.formatting.strikethrough ? <del>{message.content}</del> : null}
          {message.formatting.bulletedList ? <ul>{message.content}</ul> : null}
          {message.codeSnippet ? <code>{message.codeSnippet}</code> : null}
          <hr />
        </div>
      ))}
    </div>
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter code snippet"
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <label>
          <input
            type="checkbox"
            checked={formatting.bold}
            onChange={() => setFormatting((prevFormatting) => ({ ...prevFormatting, bold: !prevFormatting.bold }))}
          />
          Bold
        </label>
        <label>
          <input
            type="checkbox"
            checked={formatting.italic}
            onChange={() => setFormatting((prevFormatting) => ({ ...prevFormatting, italic: !prevFormatting.italic }))}
          />
          Italic
        </label>
        <label>
          <input
            type="checkbox"
            checked={formatting.underline}
            onChange={() => setFormatting((prevFormatting) => ({ ...prevFormatting, underline: !prevFormatting.underline }))}
          />
          Underline
        </label>
        <label>
          <input
            type="checkbox"
            checked={formatting.strikethrough}
            onChange={() =>
              setFormatting((prevFormatting) => ({ ...prevFormatting, strikethrough: !prevFormatting.strikethrough }))
            }
          />
          Strikethrough
        </label>
        <label>
          <input
            type="checkbox"
            checked={formatting.bulletedList}
            onChange={() =>
              setFormatting((prevFormatting) => ({ ...prevFormatting, bulletedList: !prevFormatting.bulletedList }))
            }
          />
          Bulleted List
        </label>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
