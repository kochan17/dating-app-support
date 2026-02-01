import React, { useState, useRef, useEffect } from 'react';

const WithChatScreen = ({
  senderMode,
  partnerName,
  partnerIcon,
  messages,
  onSendMessage,
  onDeleteMessage,
  onUpdateMessage
}) => {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [hiddenMessageIds, setHiddenMessageIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        // Send as an img tag with the appropriate class from index.css
        onSendMessage(`<img class="message_balloon_photo" src="${base64}" alt="uploaded photo" />`);
      }
    };
    reader.readAsDataURL(file);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const toggleMessageHidden = (id) => {
    setHiddenMessageIds((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendClick = () => {
    if (!inputText.trim()) return;
    const messageToSend = inputText;
    setInputText(''); // Clear input immediately
    onSendMessage(messageToSend);
  };

  return (
    <div className="sp-container with-header flex flex-col h-full bg-white relative overflow-hidden">
      {/* Header / Navigation */}
      <div className='header shrink-0'>
        <div id='navigation'>
          <a className="navigation_item size5 " href="#">
            <div className='icn-search navigation_icon'><span className='badge_wrap'></span></div>
            <span className='navigation_item-label'>さがす</span>
          </a>
          <a className="navigation_item size5 " href="#">
            <div className='icn-thumbs-up navigation_icon'><span className='badge_wrap'></span></div>
            <span className='navigation_item-label'>いいね</span>
          </a>
          <a className="navigation_item size5 is-active" href="#">
            <div className='icn-messages navigation_icon'><span className='badge_wrap' data-badge='17'></span></div>
            <span className='navigation_item-label'>トーク</span>
          </a>
          <a className="navigation_item size5 " href="#">
            <div className='icn-community navigation_icon'><span className='badge_wrap'></span></div>
            <span className='navigation_item-label'>好みカード</span>
          </a>
          <a className="navigation_item size5 " href="#">
            <div className='icn-mypage navigation_icon'><span className='badge_wrap'></span></div>
            <span className='navigation_item-label'>マイページ</span>
          </a>
        </div>
      </div>

      <div className='header_banner shrink-0'></div>

      <div id='topic-header' className="shrink-0 font-sans">
        <a className="topic-header_back-link" href="#"></a>
        <div className='topic-header_contents'>
          <div className="topic-header_contents_user-link flex items-center">
            <div><img className="topic-header_contents_thumb" src={partnerIcon} alt="" /></div>
            <div className='topic-header_contents_name text-ellipsis'>{partnerName}</div>
          </div>
          <div className='topic-header_contents_nickname-alias-icon'></div>
        </div>
        <div className='topic-header_config-btn'></div>
      </div>


      {/* Messages Scroll Area */}
      <div className='messages' style={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            {msg.dateSeparator ? (
              <div
                className="message_date-separator"
                onMouseEnter={() => setHoveredMessageId(msg.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
                onClick={() => {
                  setEditingId(msg.id);
                  setEditText(msg.dateSeparator);
                }}
                style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {editingId === msg.id ? (
                  <input
                    type="text"
                    value={editText}
                    autoFocus
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => {
                      onUpdateMessage(msg.id, { dateSeparator: editText });
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onUpdateMessage(msg.id, { dateSeparator: editText });
                        setEditingId(null);
                      } else if (e.key === 'Escape') {
                        setEditingId(null);
                      }
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 'inherit',
                      width: '100%',
                      outline: 'none'
                    }}
                  />
                ) : (
                  msg.dateSeparator
                )}
                {hoveredMessageId === msg.id && editingId !== msg.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteMessage(msg.id);
                    }}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`message_balloon has-message ${hiddenMessageIds.includes(msg.id) ? 'is-hidden' : ''}`}
                data-sender={msg.sender}
                onMouseEnter={() => setHoveredMessageId(msg.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
                onClick={() => toggleMessageHidden(msg.id)}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                {msg.sender === 'partner' && (
                  <a href="#"><img className="message_thumb" src={partnerIcon} alt="" /></a>
                )}
                <div className={`message_sent-at ${msg.sender === 'me' ? 'is-left' : 'is-right'}`}>
                  {msg.timestamp}
                </div>

                {/* Delete Button */}
                {hoveredMessageId === msg.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent toggling hidden state when deleting
                      onDeleteMessage(msg.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      [msg.sender === 'me' ? 'left' : 'right']: '-8px',
                      background: '#ef4444',
                      color: 'white',
                      border: '1px solid white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '14px',
                      lineHeight: '1',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      zIndex: 10
                    }}
                    title="メッセージを削除"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
        <div ref={chatEndRef} />
        <div style={{ clear: 'both' }}></div>
      </div>

      {/* Footer / Input Area */}
      <div className='topic-footer shrink-0' style={{ zIndex: 100 }}>
        <form
          className='topic-footer_message-form'
          onSubmit={(e) => {
            e.preventDefault();
            handleSendClick();
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div
            className='topic-footer_message-form_photo'
            onClick={handlePhotoClick}
          ></div>
          <textarea
            placeholder="メッセージを入力"
            onKeyDown={(e) => {
              // Command+Enter (Mac) or Ctrl+Enter (Windows) to send
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleSendClick();
              }
              // Allow plain Enter for new lines (default behavior)
            }}
            rows="1"
            className="topic-footer_message-form_body"
            id="message_form_body"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className={`topic-footer_message-form_submit ${inputText.trim() ? 'is-active' : ''}`}
          ></button>
        </form>
      </div>

      <div style={{ clear: 'both' }}></div>
    </div>
  );
};

export default WithChatScreen;
