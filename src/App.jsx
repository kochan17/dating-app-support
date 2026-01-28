import React, { useState } from 'react';
import WithChatScreen from './components/WithChatScreen';
import ControlPanel from './components/ControlPanel';

function App() {
  // Initial data for reset
  const initialMessages = [
    { id: 1, sender: 'me', text: '雰囲気タイプすぎていいねさせていただきました🙇‍♂️', timestamp: '18:31', dateSeparator: '12月9日（火）' },
    { id: 2, sender: 'partner', text: 'はじめまして(*^^*)<br>最近ハイボールが好きでよく飲みます！<br>Akiraさんはどんなお酒を飲まれますか？', timestamp: '22:39' },
    { id: 3, sender: 'me', text: 'あやさん！女性らしい優しさと美しさが詰まったようなステキな名前ですね！', timestamp: '00:23', dateSeparator: '12月10日（水）' },
    { id: 4, sender: 'me', text: '僕はコウタといいます！', timestamp: '00:24' },
    { id: 5, sender: 'me', text: 'ジョージ最近見ないな〜って思ってたら、あやさんのとこにいたんですね', timestamp: '00:25' },
    { id: 6, sender: 'partner', text: '（メッセージ内容を表示中）', timestamp: '04:14' },
    { id: 7, sender: 'partner', text: '（メッセージ内容を表示中）', timestamp: '04:15' },
    { id: 8, sender: 'me', text: 'あ, ジョージUFOキャッチャーに転職してたんだ！', timestamp: '14:48' },
    { id: 10, sender: 'me', text: 'あやさんが頑張って自分のところに人事異動させたんですね', timestamp: '14:49', dateSeparator: '2月15日（木）' },
  ];

  const [senderMode, setSenderMode] = useState('me');
  const [partnerName, setPartnerName] = useState('あや');
  const [partnerIcon, setPartnerIcon] = useState("./uploads/user_photo/images/thumb_image_251015084305.jpg");

  // State for messages with localStorage persistence
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  // State for chat width with localStorage persistence
  const [chatWidth, setChatWidth] = useState(() => {
    const saved = localStorage.getItem('chat_width');
    return saved ? parseInt(saved, 10) : 402;
  });

  // Save to localStorage whenever messages change
  React.useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Save to localStorage and update CSS variable whenever chatWidth changes
  React.useEffect(() => {
    localStorage.setItem('chat_width', chatWidth.toString());
    document.documentElement.style.setProperty('--sp-max-width', `${chatWidth}px`);
  }, [chatWidth]);

  // Custom time setting (empty means use current time)
  const [customTime, setCustomTime] = useState('');

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    let timestamp;
    if (customTime) {
      timestamp = customTime;
    } else {
      const now = new Date();
      timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    setMessages([...messages, {
      id: Date.now(),
      sender: senderMode,
      text: text.replace(/\n/g, '<br />'),
      timestamp: timestamp
    }]);
  };

  const handleAddDateSeparator = (dateString) => {
    if (!dateString.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      sender: 'system',
      dateSeparator: dateString,
      timestamp: null
    }]);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleResetMessages = () => {
    if (confirm('会話履歴を初期状態に戻しますか？')) {
      setMessages(initialMessages);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#f0f2f5' }}>
      {/* Sidebar Control Panel */}
      <div style={{ width: '300px', flexShrink: 0, height: '100%', zIndex: 20 }}>
        <ControlPanel
          senderMode={senderMode}
          setSenderMode={setSenderMode}
          partnerName={partnerName}
          setPartnerName={setPartnerName}
          partnerIcon={partnerIcon}
          setPartnerIcon={setPartnerIcon}
          customTime={customTime}
          setCustomTime={setCustomTime}
          onAddDateSeparator={handleAddDateSeparator}
          onResetMessages={handleResetMessages}
          chatWidth={chatWidth}
          setChatWidth={setChatWidth}
        />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: 'var(--sp-max-width)', height: '100%', backgroundColor: 'white', position: 'relative', boxShadow: '0 0 20px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <WithChatScreen
            senderMode={senderMode}
            partnerName={partnerName}
            partnerIcon={partnerIcon}
            messages={messages}
            onSendMessage={handleSendMessage}
            onDeleteMessage={handleDeleteMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
