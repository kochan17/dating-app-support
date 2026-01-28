import React, { useState, useRef, useEffect } from 'react';

const WithChatScreen = ({ senderMode, partnerName, partnerIcon }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'me', text: '雰囲気タイプすぎていいねさせていただきました🙇‍♂️', timestamp: '18:31', dateSeparator: '12月9日（火）' },
    { id: 2, sender: 'partner', text: 'はじめまして(*^^*)<br>最近ハイボールが好きでよく飲みます！<br>Akiraさんはどんなお酒を飲まれますか？', timestamp: '22:39' },
    { id: 3, sender: 'me', text: 'あやさん！女性らしい優しさと美しさが詰まったようなステキな名前ですね！', timestamp: '00:23', dateSeparator: '12月10日（水）' },
    { id: 4, sender: 'me', text: '僕はコウタといいます！', timestamp: '00:24' },
    { id: 5, sender: 'me', text: 'ジョージ最近見ないな〜って思ってたら、あやさんのとこにいたんですね', timestamp: '00:25' },
    { id: 6, sender: 'partner', text: '（メッセージ内容を表示中）', timestamp: '04:14' },
    { id: 7, sender: 'partner', text: '（メッセージ内容を表示中）', timestamp: '04:15' },
    { id: 8, sender: 'me', text: 'あ, ジョージUFOキャッチャーに転職してたんだ！', timestamp: '14:48' },
    { id: 10, sender: 'me', text: 'あやさんが頑張って自分のところに人事異動させたんですね', timestamp: '14:49', dateSeparator: '2月15日（木）' },
  ]);

  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    setMessages([...messages, {
      id: Date.now(),
      sender: senderMode,
      text: inputText.replace(/\n/g, '<br />'),
      timestamp: timestamp
    }]);
    setInputText('');
  };

  // Replace manual mentions of "あや" with the dynamic partnerName
  const formatText = (text) => {
    if (!text) return "";
    return text.replace(/あや/g, partnerName);
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

      <div className='focus-level_container shrink-0'>
        <div className='focus-level is_focus-level_locked'>
          <div className='focus-level_title'>
            <span className='size12'>あなたへの</span><br />
            <span className='focus-level_title_bottom is_focus-level_locked'>関心</span>
          </div>
          <div className='text-center'>
            <a className="button button-royal-vip button-s focus-level_detail-button" href="#">詳細を見る</a>
          </div>
          <div><div className='focus-level_help-icon'></div></div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className='messages' style={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            {msg.dateSeparator && <div className="message_date-separator">{msg.dateSeparator}</div>}

            <div className='message_balloon has-message' data-sender={msg.sender}>
              <p dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}></p>
              {msg.sender === 'partner' && (
                <a href="#"><img className="message_thumb" src={partnerIcon} alt="" /></a>
              )}
              <div className={`message_sent-at ${msg.sender === 'me' ? 'is-left' : 'is-right'}`}>
                {msg.timestamp}
              </div>
            </div>
          </React.Fragment>
        ))}
        <div ref={chatEndRef} />
        <div style={{ clear: 'both' }}></div>
      </div>

      {/* Footer / Input Area */}
      <div className='topic-footer shrink-0'>
        <div className='topic-footer_message-form'>
          <div className='topic-footer_message-form_photo is-disabled'></div>
          <textarea
            placeholder="メッセージを入力"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="topic-footer_message-form_body"
            id="message_form_body"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ height: 'auto', minHeight: '38px', borderRadius: '20px', backgroundColor: '#f6f6f6', border: 'none', padding: '10px 15px' }}
          />
          <button
            type="button"
            className="topic-footer_message-form_submit"
            onClick={handleSendMessage}
            style={{ opacity: inputText.trim() ? 1 : 0.5 }}
          ></button>
        </div>
      </div>

      <div style={{ clear: 'both' }}></div>
    </div>
  );
};

export default WithChatScreen;
