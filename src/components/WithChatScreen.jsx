import React, { useRef, useEffect } from 'react';
import { Send, Camera } from 'lucide-react';

const WithChatScreen = ({ messages, currentUserId, onSendMessage, onSendImage, inputText, setInputText, partnerName, partnerIcon }) => {
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper to format time (e.g., "18:31")
  const formatTime = (timestamp) => {
    return timestamp; // Assuming timestamp is already formatted or we format it here
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && onSendImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ReadReceiptAppeal = () => (
    <div className='message-read-receipt-appeal bg-[#F8F8F8] p-4 my-6 rounded-xl relative border border-[#EEE] overflow-hidden'>
      <div className='flex items-center gap-2 mb-2'>
        <div className='w-4 h-4 bg-[#FA7670] rounded-full flex items-center justify-center'>
          <div className='w-1.5 h-1.5 bg-white rounded-full'></div>
        </div>
        <span className='text-[11px] text-[#A0A0A0]'>あなただけに表示されています</span>
      </div>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 shrink-0'>
          <img className="w-full h-full object-contain"
            src="//cdn.with.is/assets/shared/atoms/icons/read_red-7d0f09cd33106253af5db4cb6e93f133a9dd561d608e748d439158f9d4fef44d.png" alt="" />
        </div>
        <div className='flex-1'>
          <div className='text-[12px] text-[#888] mb-0.5'>メッセージが既読か知りたい方へ</div>
          <div className='text-[14px] font-bold text-[#333] mb-1'>既読機能を使ってみませんか？</div>
          <button className='text-[#FA7670] text-[13px] font-bold'>詳細を見る</button>
        </div>
      </div>
    </div>
  );

  const ResponseReceivedCard = ({ partnerName, partnerIcon }) => (
    <div className="message-response-received-card mt-8 mb-4">
      <div className="bg-[#FFF5F5] rounded-2xl p-3 flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#FFE8E8]">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200 shrink-0">
          {partnerIcon ? (
            <img src={partnerIcon} className="w-full h-full object-cover" />
          ) : (
            <img src="//cdn.with.is/uploads/user_photo/image/115135197/thumb_image_251015084305.jpg" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[#FA7670] font-bold text-[14px] leading-tight mb-[2px]">{partnerName || 'あや'}さんから</span>
          <span className="text-[#333] font-bold text-[15px] leading-tight">回答が届きました</span>
        </div>
        <div className="ml-auto text-[#FFB0B0]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </div>
    </div>
  );

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
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-100 bg-gray-200">
                  {partnerIcon ? (
                    <img className="w-full h-full object-cover" src={partnerIcon} alt="User Thumb" />
                  ) : (
                    <img className="w-full h-full object-cover" src="//cdn.with.is/uploads/user_photo/image/115135197/thumb_image_251015084305.jpg" alt="User Thumb" />
                  )}
                </div>
              </div>
              <div className="topic-header_contents_name text-ellipsis font-bold text-[15px] text-[#333] max-w-[120px] overflow-hidden whitespace-nowrap">
                {partnerName || 'ももか'}
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
          {messages.map((msg, index) => {
            if (msg.type === 'date') {
              return (
                <div key={`date-${index}`} className="message_date-separator text-center text-[11px] text-[#A0A0A0] font-bold my-6 relative">
                  <span className="bg-[#F5F5F5] px-4 py-1 rounded-full">{msg.text}</span>
                </div>
              );
            }

            if (msg.type === 'appeal') {
              return <ReadReceiptAppeal key={`appeal-${index}`} />;
            }

            if (msg.type === 'response-card') {
              return <ResponseReceivedCard key={`card-${index}`} partnerName={partnerName} partnerIcon={partnerIcon} />;
            }

            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id || index} className={`flex w-full mb-[18px] ${isMe ? 'justify-end' : 'justify-start'}`}>

                {/* Partner Avatar */}
                {!isMe && (
                  <a href="#" className="block mr-2 self-end mb-[2px]">
                    <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-gray-200">
                      {partnerIcon ? (
                        <img className="w-full h-full object-cover" src={partnerIcon} alt="Partner" />
                      ) : (
                        <img className="w-full h-full object-cover" src="//cdn.with.is/uploads/user_photo/image/115135197/thumb_image_251015084305.jpg" alt="Partner" />
                      )}
                    </div>
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
                        : 'bg-white text-[#333] rounded-tl-sm border border-[#F2F2F2]'
                      }
                      `}>
                      {isMe && (
                        <div className="absolute top-0 -right-[6px] w-0 h-0 border-t-[10px] border-t-[#FA7670] border-r-[8px] border-r-transparent"></div>
                      )}
                      {!isMe && (
                        <div className="absolute top-0 -left-[6px] w-0 h-0 border-t-[10px] border-t-[#F2F2F2] border-l-[8px] border-l-transparent"></div>
                      )}

                      <p className="whitespace-pre-wrap break-words m-0">
                        {msg.image ? (
                          <img src={msg.image} alt="Sent" className="max-w-full rounded-lg" />
                        ) : (
                          msg.text
                        )}
                      </p>
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
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button className="text-[#D8D8D8] p-1" onClick={handleCameraClick}>
          <Camera size={31} strokeWidth={1.2} />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="メッセージを入力"
            className="w-full bg-[#F6F6F6] border-none rounded-[28px] py-[10px] px-4 text-[15.5px] outline-none placeholder-[#C0C0C0]"
          />
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
