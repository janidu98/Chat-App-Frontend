import React, { useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async() => {
        const data = await axios.get('/api/chat');
        console.log(data);
    }

  return (
    <div>
      Chat Page
    </div>
  )
}

export default ChatPage
