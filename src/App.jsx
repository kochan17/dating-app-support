import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Camera, Send, User, Users, Smartphone, RefreshCcw, Download, Image as ImageIcon, ChevronLeft, MoreHorizontal, Phone, Video } from 'lucide-react';

const MODES = {
  LINE: 'line',
  PAIRS: 'pairs',
  WITH: 'with',
};

const INITIAL_MESSAGES = [
  { id: 1, sender: 'partner', text: 'はじめまして。よろしくおねがいします(^^)\n漫画読んだり、カフェを開拓したりするのが好きです。\nよろしくお願いします。\n\n中国語はけっこう話せるんですか？😊', timestamp: '18:48', status: 'read' },
  { id: 2, sender: 'me', text: 'はじめまして！素敵なご趣味ですね😊私もカフェは興味があるのですが、なかなか一人でお店に入れず良いお店を知らないので教えていただけたら嬉しいです！\n\n中国語は趣味でやっているだけなのでまだまだです〜💦今年こそ頑張りたいと思っています...！外国語は本当に難しいですね...！', timestamp: '08:56', status: 'read' },
];

function App() {
  const [mode, setMode] = useState(MODES.WITH);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [icons, setIcons] = useState(() => {
    const saved = localStorage.getItem('chat_icons');
    return saved ? JSON.parse(saved) : { me: null, partner: null };
  });
  const [partnerName, setPartnerName] = useState(() => {
    const saved = localStorage.getItem('partner_name');
    return saved || 'みー';
  });
  const [inputText, setInputText] = useState('');
  const [sender, setSender] = useState('me');
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chat_icons', JSON.stringify(icons));
  }, [icons]);

  useEffect(() => {
    localStorage.setItem('partner_name', partnerName);
  }, [partnerName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMessage = {
      id: Date.now(),
      sender,
      text: inputText,
      timestamp: timeStr,
      status: 'read',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleImageSend = (imageData) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMessage = {
      id: Date.now(),
      sender,
      image: imageData,
      timestamp: timeStr,
      status: 'read',
    };
    setMessages([...messages, newMessage]);
  };

  const handleIconUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcons(prev => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const takeScreenshot = async () => {
    if (chatContainerRef.current) {
      const canvas = await html2canvas(chatContainerRef.current, {
        useCORS: true,
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `chat-demo-${mode}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const clearChat = () => {
    if (confirm('トーク履歴を削除してもよろしいですか？')) {
      setMessages([]);
    }
  };

  // Helper to get theme-specific styles
  const getThemeStyles = () => {
    switch (mode) {
      case MODES.PAIRS:
        return {
          bg: 'bg-[#F4F7F8]',
          header: 'bg-white border-b border-gray-200 text-gray-800',
          bubbleMe: 'bg-[#00ADC1] text-white rounded-[1.2rem] rounded-tr-none px-3 py-2 text-sm',
          bubblePartner: 'bg-white text-gray-800 rounded-[1.2rem] rounded-tl-none shadow-sm px-3 py-2 text-sm',
          partnerName: 'hidden',
          time: 'text-[10px] text-gray-400 mx-1 mb-0.5',
          input: 'bg-white border-t border-gray-200',
        };
      case MODES.WITH:
        return {
          bg: 'bg-white',
          header: 'bg-white text-gray-800',
          bubbleMe: 'bg-[#FA7670] text-white rounded-[18px] px-4 py-[7px] text-[14.5px] relative after:content-[""] after:absolute after:top-0 after:-right-[5px] after:w-0 after:h-0 after:border-t-[10px] after:border-t-[#FA7670] after:border-r-[8px] after:border-r-transparent',
          bubblePartner: 'bg-[#F2F2F2] text-[#333] rounded-[18px] px-4 py-[7px] text-[14.5px] relative before:content-[""] before:absolute before:top-0 before:-left-[5px] before:w-0 before:h-0 before:border-t-[10px] before:border-t-[#F2F2F2] before:border-l-[8px] before:border-l-transparent',
          partnerName: 'hidden',
          time: 'text-[10px] text-[#B8B8B8] mx-1 mb-[1px] leading-tight',
          input: 'bg-white border-t border-gray-100',
        };
      default: // LINE
        return {
          bg: 'bg-[#849EB2]',
          header: 'bg-[#242d36]/90 backdrop-blur-sm text-white',
          bubbleMe: 'bg-[#74D673] text-gray-800 rounded-2xl rounded-tr-none relative after:content-[""] after:absolute after:top-0 after:-right-2 after:border-8 after:border-transparent after:border-t-[#74D673] text-sm px-3 py-2',
          bubblePartner: 'bg-white text-gray-800 rounded-2xl rounded-tl-none relative before:content-[""] before:absolute before:top-0 before:-left-2 before:border-8 before:border-transparent before:border-t-white text-sm px-3 py-2',
          partnerName: 'text-xs text-white mb-1 ml-1',
          time: 'text-[10px] text-gray-100 mx-1 mb-0.5',
          input: 'bg-white',
        };
    }
  };

  const styles = getThemeStyles();

  // Render Header based on mode
  const renderHeader = () => {
    const commonProps = "flex items-center px-4 h-14 shrink-0 w-full";
    switch (mode) {
      case MODES.LINE:
        return (
          <div className={`${commonProps} bg-[#262626]/80 text-white justify-between relative`}>
            <div className="flex items-center gap-3 z-10">
              <button className="p-1"><ChevronLeft size={24} /></button>
              <span className="text-lg font-bold">公式アカウント</span>
            </div>
            <div className="flex gap-4 z-10">
              <button><Users size={20} /></button>
              <button><div className="w-[1px] h-5 bg-white/20 rotate-12"></div></button>
              <button><MoreHorizontal size={20} /></button>
            </div>
          </div>
        );
      case MODES.PAIRS:
        return (
          <div className={`${commonProps} bg-white border-b border-gray-100 justify-between text-gray-800 h-14`}>
            <button className="p-2 text-gray-400"><ChevronLeft size={28} className="text-gray-300" /></button>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">まぁお</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white">✓</div>
              </div>
              <span className="text-[10px] text-gray-400">25歳 • 東京</span>
            </div>
            <button className="p-2 text-gray-300"><MoreHorizontal size={24} /></button>
          </div>
        );
      case MODES.WITH:
        return (
          <div className="flex flex-col w-full bg-white relative shadow-[0_1px_2px_rgba(0,0,0,0.03)] z-30">
            <div className="flex items-center justify-between px-2 h-14">
              <div className="flex items-center">
                <button className="p-2"><ChevronLeft size={30} className="text-[#C8C8C8]" strokeWidth={2.5} /></button>
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-2">
                  {icons.partner ? <img src={icons.partner} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center"><User size={24} className="text-white" /></div>}
                </div>
                <span className="font-bold text-[#444] text-[16px]">みー</span>
                <div className="flex items-center ml-1 gap-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#C8C8C8]"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C8C8C8" className="text-[#C8C8C8]"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"></path></svg>
                </div>
              </div>
              <button className="p-2 text-[#C8C8C8]"><MoreHorizontal size={26} /></button>
            </div>

            <div className="mx-3 mt-0 mb-2 bg-[#F0FBFA] rounded-xl p-3 flex items-center justify-between relative h-[54px]">
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-[10px] text-[#A0A0A0] font-bold">あなたへの</span>
                <div className="flex items-center gap-[2px]">
                  <span className="text-[#3DD3B6] text-[15px]">✦</span>
                  <span className="font-bold text-[#444] text-[14px]">関心</span>
                </div>
              </div>
              <button className="bg-[#B7373F] text-white text-[11px] font-bold py-[7px] px-6 rounded-full tracking-tighter">
                詳細を見る
              </button>
              <div className="absolute top-[50%] -translate-y-1/2 right-[100px] text-[#D0D0D0] opacity-60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  // Render Footer based on mode
  const renderFooter = () => {
    switch (mode) {
      case MODES.LINE:
        return (
          <div className="bg-white p-2 px-3 pb-8 flex items-end gap-3 border-t border-gray-200">
            <button className="text-gray-500 mb-2"><div className="w-7 h-7 flex items-center justify-center text-3xl font-light leading-none">+</div></button>
            <button className="text-gray-500 mb-2.5"><Camera size={22} /></button>
            <button className="text-gray-500 mb-2.5"><ImageIcon size={22} /></button>
            <div className="flex-1 bg-[#F3F3F3] rounded-2xl flex items-center px-3 py-2 min-h-[40px] mb-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Aa"
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
              />
              <button className="text-gray-400 ml-2">☺</button>
            </div>
            {inputText.trim() ? (
              <button onClick={handleSend} className="mb-2 text-[#3285DE]"><Send size={24} className="fill-current" /></button>
            ) : (
              <button className="mb-2 text-gray-800"><div className="w-6 h-6 flex items-center justify-center">🎤</div></button>
            )}
          </div>
        );
      case MODES.PAIRS:
        return (
          <div className="bg-white p-3 pb-8 flex items-center gap-2 border-t border-gray-100">
            <button className="text-[#B3B3B3] bg-[#F5F5F5] p-2.5 rounded-full"><ImageIcon size={20} /></button>
            <button className="text-[#B3B3B3] bg-[#F5F5F5] p-2.5 rounded-full"><Camera size={20} /></button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="メッセージを入力"
                className="w-full bg-[#F5F5F5] border-none rounded-[20px] py-2.5 pl-4 pr-10 text-sm outline-none placeholder-gray-400"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">☺</button>
            </div>
            <button
              onClick={handleSend}
              className={`p-2.5 rounded-full transition-all ${inputText.trim() ? 'bg-[#00ADC1] text-white' : 'bg-[#E0E0E0] text-white'}`}
            >
              <Send size={18} className="fill-current" />
            </button>
          </div>
        );
      case MODES.WITH:
        return (
          <div className="bg-white p-2 px-3 pb-8 flex items-center gap-2 border-t border-gray-100 h-20">
            <button className="text-[#D8D8D8] p-1"><Camera size={31} strokeWidth={1.2} /></button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="メッセージを入力"
                className="w-full bg-[#F6F6F6] border-none rounded-[28px] py-[10px] pl-4 pr-10 text-[15.5px] outline-none placeholder-[#C0C0C0]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D8D8D8] text-[20px]">☺</button>
            </div>
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-1"
            >
              <Send size={28} className={inputText.trim() ? "text-[#FA7670] fill-[#FA7670]" : "text-[#E0E0E0]"} />
            </button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row p-4 gap-4 font-sans">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-gray-800 p-6 rounded-3xl shadow-2xl space-y-8 overflow-y-auto max-h-[90vh]">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Chat Screen Demo
        </h1>

        {/* Style Selection */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Style Selection</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: MODES.LINE, label: 'LINE', color: 'bg-[#06C755]' },
              { id: MODES.PAIRS, label: 'Pairs', color: 'bg-[#3D99F5]' },
              { id: MODES.WITH, label: 'with', color: 'bg-[#FA7670]' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${mode === m.id ? 'bg-white/10 ring-2 ring-white/20' : 'hover:bg-white/5'
                  }`}
              >
                <div className={`w-3 h-3 rounded-full ${m.color}`} />
                <span className="font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sender Selection */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Speaking As</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSender('me')}
              className={`flex-1 p-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${sender === 'me' ? 'bg-pink-500 text-white shadow-lg' : 'bg-gray-700 text-gray-400'}`}
            >
              <User size={16} /> 自分
            </button>
            <button
              onClick={() => setSender('partner')}
              className={`flex-1 p-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${sender === 'partner' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-700 text-gray-400'}`}
            >
              <Users size={16} /> 相手
            </button>
          </div>
        </div>

        {/* Icon Customization */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Icon Customization</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-sm">自分 (Me)</span>
              <label className="cursor-pointer">
                <input type="file" className="hidden" onChange={(e) => handleIconUpload('me', e)} />
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-600 hover:border-gray-400">
                  {icons.me ? <img src={icons.me} className="w-full h-full object-cover" /> : <User size={20} />}
                </div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-sm">相手 (Partner)</span>
              <label className="cursor-pointer">
                <input type="file" className="hidden" onChange={(e) => handleIconUpload('partner', e)} />
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-600 hover:border-gray-400">
                  {icons.partner ? <img src={icons.partner} className="w-full h-full object-cover" /> : <Users size={20} />}
                </div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-sm">相手の名前</span>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="w-32 bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-sm outline-none focus:border-pink-500"
                placeholder="名前"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <button
            onClick={takeScreenshot}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
          >
            <Download size={18} /> 保存 (Screenshot)
          </button>
          <button
            onClick={clearChat}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 p-3 rounded-xl font-medium hover:bg-gray-650 transition-all"
          >
            <RefreshCcw size={18} /> リセット
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 flex justify-center items-center bg-gray-950/50 rounded-3xl overflow-hidden p-4">
        {/* Smartphone Frame */}
        <div className="relative w-full max-w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden flex flex-col font-sans">

          {/* Dynamic Header */}
          {mode !== MODES.WITH && renderHeader()}

          {/* Wrapper for unified screens or fragmented screens */}
          {mode === MODES.WITH ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
              <WithChatScreen
                messages={messages}
                currentUserId="me"
                onSendMessage={handleSend}
                onSendImage={handleImageSend}
                inputText={inputText}
                setInputText={setInputText}
                partnerName={partnerName}
                partnerIcon={icons.partner}
              />
            </div>
          ) : (
            <>
              {/* Chat Container (Target for Screenshot) */}
              <div ref={chatContainerRef} className={`flex-1 flex flex-col ${styles.bg} overflow-hidden`}>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 pt-2 space-y-4">
                  {/* Date Separator */}
                  <div className="text-center my-6">
                    {mode === MODES.LINE ? (
                      <span className="text-[11px] text-white/90 bg-black/20 px-3 py-1 rounded-full">今日</span>
                    ) : (
                      <span className="text-[12px] text-gray-500 font-bold">2/15(木)</span>
                    )}
                  </div>

                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start gap-2.5'} items-end mb-2`}>
                      {msg.sender === 'partner' && mode !== MODES.WITH && (
                        <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex-shrink-0 overflow-hidden self-start">
                          {icons.partner ? <img src={icons.partner} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white"><User size={24} /></div>}
                        </div>
                      )}

                      <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} max-w-[76%]`}>
                        <div className={`flex items-end gap-[6px] ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'} group`}>
                          <div className={`whitespace-pre-wrap leading-relaxed break-words shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${msg.sender === 'me' ? styles.bubbleMe : styles.bubblePartner}`}>
                            {msg.text}
                          </div>
                          <div className="flex flex-col shrink-0 mb-[2px]">
                            {msg.sender === 'me' && mode === MODES.LINE && <span className="text-[10px] text-white leading-none mb-0.5">既読</span>}
                            {msg.sender === 'me' && mode === MODES.PAIRS && <span className="text-[10px] text-[#00ADC1] leading-none mb-0.5 font-bold">既読</span>}
                            <span className={styles.time}>{msg.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>
              {/* Dynamic Footer */}
              {renderFooter()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
