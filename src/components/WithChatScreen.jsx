import React, { useRef, useEffect } from 'react';
import { Send, Camera } from 'lucide-react';

const WithChatScreen = ({ messages, currentUserId, onSendMessage, inputText, setInputText }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper to format time (e.g., "18:31")
  const formatTime = (timestamp) => {
    return timestamp; // Assuming timestamp is already formatted or we format it here
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans text-[#333]">
      {/* 
        Reference HTML Structure:
        <div class='sp-container with-header'>
          <div class='header'>...</div>
          <div id='topic-header'>...</div>
          <div class='focus-level_container'>...</div>
          <div class='messages'>...</div>
      */}

      {/* Header Area - Simplified for this component, focusing on the chat part mainly but including header relative to container */}
      <div className="relative z-30 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        {/* Navigation / Topic Header */}
        <div id="topic-header" className="flex items-center justify-between px-2 h-14 relative">
          <a className="topic-header_back-link block p-2" href="#">
            <img src="//cdn.with.is/assets/shared/atoms/icons/back-60d2e00a4d61034f7994ded42e7d6c414f1ffba6ee1e958a18790ba399044996.svg" alt="back" className="w-[15px] h-[20px]" />
          </a>
          <div className="topic-header_contents flex items-center justify-center flex-1">
            <a className="topic-header_contents_user-link flex items-center text-decoration-none" href="#">
              <div className="mr-2">
                <img className="topic-header_contents_thumb w-9 h-9 rounded-full object-cover border border-gray-100" src="//cdn.with.is/uploads/user_photo/image/115135197/thumb_image_251015084305.jpg" alt="User Thumb" />
              </div>
              <div className="topic-header_contents_name text-ellipsis font-bold text-[15px] text-[#333] max-w-[120px] overflow-hidden whitespace-nowrap">
                ももか
              </div>
            </a>
            <div className="topic-header_contents_nickname-alias-icon ml-1 cursor-pointer" data-dialog-id="nickname-alias-dialog">
              <img src="//cdn.with.is/assets/shared/system_icons/icn_edit-500076239452230006730245053070036667520037500550000000000.svg" /* Placeholder for edit icon if needed, or CSS icon */ className="w-3 h-3 opacity-30" alt="" />
            </div>
          </div>
          <div className="topic-header_config-btn p-2 cursor-pointer">
            <span className="block w-1 h-1 bg-[#D8D8D8] rounded-full mb-[3px] mx-auto"></span>
            <span className="block w-1 h-1 bg-[#D8D8D8] rounded-full mb-[3px] mx-auto"></span>
            <span className="block w-1 h-1 bg-[#D8D8D8] rounded-full mx-auto"></span>
          </div>
        </div>

        {/* Focus Level Container */}
        <div className="focus-level_container px-3 pb-2 pt-0">
          <div className="focus-level is_focus-level_locked bg-[#F0FBFA] rounded-xl p-2 px-3 flex items-center justify-between h-[54px] relative">
            <div className="focus-level_title text-[10px] text-[#A0A0A0] font-bold leading-tight">
              <span className="size12">あなたへの</span>
              <br />
              <span className="focus-level_title_bottom is_focus-level_locked flex items-center gap-[2px]">
                <span className="text-[#2CC4CB] text-[14px]">✦</span> {/* Using approx color for star */}
                <span className="text-[#333] text-[14px]">関心</span>
              </span>
            </div>
            <div className="text-center">
              <a className="button button-royal-vip button-s focus-level_detail-button bg-[#AD262F] text-white text-[11px] font-bold py-[6px] px-6 rounded-full tracking-tighter inline-block" href="#">
                詳細を見る
              </a>
            </div>
            <div>
              <div className="focus-level_help-icon text-[#D0D0D0] opacity-60">
                {/* Help Icon SVG Placeholder */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages flex-1 overflow-y-auto p-0 bg-white relative">
        <div className="p-4">
          {/* Date Separator Example */}
          <div className="message_date-separator text-center text-[11px] text-[#A0A0A0] font-bold my-6 relative">
            <span className="bg-[#F5F5F5] px-4 py-1 rounded-full">12月9日（火）</span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex w-full mb-[18px] ${isMe ? 'justify-end' : 'justify-start'}`}>

                {/* Partner Avatar */}
                {!isMe && (
                  <a href="#" className="block mr-2 self-end mb-[2px]">
                    <img className="message_thumb w-[36px] h-[36px] rounded-full object-cover" src="//cdn.with.is/uploads/user_photo/image/115135197/thumb_image_251015084305.jpg" alt="Partner" />
                  </a>
                )}

                {/* Message Balloon Wrapper */}
                <div className={`flex flex-col max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-end gap-[6px] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>

                    {/* Bubble */}
                    <div className={`
                        message_balloon has-message relative
                        px-4 py-[9px] text-[14.5px] rounded-[20px] leading-[1.5]
                        shadow-[0_1px_1px_rgba(0,0,0,0.05)]
                        ${isMe
                        ? 'bg-[#FA7670] text-white rounded-tr-sm'
                        : 'bg-[#F2F2F2] text-[#333] rounded-tl-sm'
                      }
                      `}>
                      {/* 
                           Tail Implementation using Pseudo-elements simulation 
                           Tailwind arbitrary values for precise tail rendering if needed, 
                           but rounded-tr-sm / rounded-tl-sm is a good approximation for 'with'. 
                           Real 'with' uses ::before/::after borders.
                        */}
                      {isMe && (
                        <div className="absolute top-0 -right-[6px] w-0 h-0 border-t-[10px] border-t-[#FA7670] border-r-[8px] border-r-transparent"></div>
                      )}
                      {!isMe && (
                        <div className="absolute top-0 -left-[6px] w-0 h-0 border-t-[10px] border-t-[#F2F2F2] border-l-[8px] border-l-transparent"></div>
                      )}

                      <p className="whitespace-pre-wrap break-words m-0">{msg.text}</p>
                    </div>

                    {/* Meta (Read status, Time) */}
                    <div className={`message_sent-at flex flex-col shrink-0 mb-[2px] text-[10px] text-[#B8B8B8] ${isMe ? 'items-end' : 'items-start'}`}>
                      {isMe && msg.status === 'read' && <span className="mb-[1px]">既読</span>}
                      <span>{formatTime(msg.timestamp)}</span>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Footer / Input Area */}
      <div className="bg-white p-2 px-3 pb-8 flex items-center gap-2 border-t border-[#ECECEB] h-[70px]">
        <button className="text-[#D8D8D8] p-1">
          <Camera size={31} strokeWidth={1.2} />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="メッセージを入力"
            className="w-full bg-[#F6F6F6] border-none rounded-[28px] py-[10px] pl-4 pr-10 text-[15.5px] outline-none placeholder-[#C0C0C0]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D8D8D8] text-[20px]">
            ☺
          </button>
        </div>
        <button
          onClick={onSendMessage}
          disabled={!inputText.trim()}
          className="p-1"
        >
          <Send size={28} className={inputText.trim() ? "text-[#FA7670] fill-[#FA7670]" : "text-[#E0E0E0]"} />
        </button>
      </div>
    </div>
  );
};

export default WithChatScreen;
