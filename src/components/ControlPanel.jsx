import React, { useRef } from 'react';

const ControlPanel = ({
  senderMode,
  setSenderMode,
  partnerName,
  setPartnerName,
  partnerIcon,
  setPartnerIcon,
  customTime,
  setCustomTime,
  onAddDateSeparator,
  onResetMessages,
  chatWidth,
  setChatWidth,
  chatContainerRef
}) => {
  const fileInputRef = useRef(null);

  const handleTakeScreenshot = async () => {
    if (!chatContainerRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = chatContainerRef.current;

      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight,
        windowWidth: 1200, // Use a standard large window width
        windowHeight: element.offsetHeight + 200,
        x: element.getBoundingClientRect().left,
        y: element.getBoundingClientRect().top,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        onclone: (clonedDoc) => {
          // Fix fixed positioning in the cloned document
          const clonedHeader = clonedDoc.querySelector('.header');
          const clonedTopicHeader = clonedDoc.querySelector('#topic-header');
          const clonedFooter = clonedDoc.querySelector('.topic-footer');

          if (clonedHeader) clonedHeader.style.position = 'absolute';
          if (clonedTopicHeader) {
            clonedTopicHeader.style.position = 'absolute';
            clonedTopicHeader.style.top = '50px'; // Below navigation
          }
          if (clonedFooter) clonedFooter.style.position = 'absolute';
        }
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');

      const now = new Date();
      const timestamp = now.toISOString().replace(/T/, '_').replace(/:/g, '').split('.')[0].replace(/-/g, '');
      const filename = `screenshot_${timestamp}.png`;

      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Screenshot failed:', err);
      alert('スクリーンショットの撮影に失敗しました。');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPartnerIcon(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      width: '300px',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      boxShadow: '4px 0 10px rgba(0,0,0,0.2)',
      overflowY: 'auto'
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #4a5568', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        <span>操作メニュー</span>
      </h2>

      {/* Mode Toggle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>送信者モード選択</label>
        <div style={{ display: 'flex', background: '#1a252f', borderRadius: '8px', padding: '4px', border: '1px solid #374151' }}>
          <button
            onClick={() => setSenderMode('me')}
            style={{
              flex: 1, padding: '8px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', transition: 'all 0.2s', border: 'none', cursor: 'pointer',
              background: senderMode === 'me' ? '#fe6970' : 'transparent',
              color: senderMode === 'me' ? 'white' : '#94a3b8'
            }}
          >
            自分
          </button>
          <button
            onClick={() => setSenderMode('partner')}
            style={{
              flex: 1, padding: '8px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', transition: 'all 0.2s', border: 'none', cursor: 'pointer',
              background: senderMode === 'partner' ? '#fe6970' : 'transparent',
              color: senderMode === 'partner' ? 'white' : '#94a3b8'
            }}
          >
            相手
          </button>
        </div>
      </div>

      {/* Partner Name Change */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>相手の名前を変更</label>
        <input
          type="text"
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
          style={{
            width: '100%', background: '#1a252f', border: '1px solid #4b5563', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: 'white', outline: 'none'
          }}
          placeholder="名前を入力..."
        />
      </div>

      {/* Partner Image Change */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>相手の画像を変更</label>
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%', background: '#34495e', border: '1px solid #4b5563', borderRadius: '8px', padding: '12px', fontSize: '14px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          画像を選択
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed #4b5563' }}>
          <img src={partnerIcon} alt="Preview" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(254,105,112,0.5)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>プレビュー</span>
            <span style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{partnerName}</span>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </div>

      <div style={{ borderTop: '1px solid #4a5568', margin: '8px 0' }}></div>

      {/* Advanced Controls */}
      <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#cbd5e1', marginTop: '0px' }}>高度な設定</h3>

      {/* Message Time Setting */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', color: '#94a3b8' }}>送信時刻（空欄で現在時刻）</label>
        <input
          type="time"
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
          style={{
            width: '100%', background: '#1a252f', border: '1px solid #4b5563', borderRadius: '6px', padding: '8px', fontSize: '13px', color: 'white', outline: 'none'
          }}
        />
      </div>

      {/* Date Separator */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', color: '#94a3b8' }}>日付区切り線を追加</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="例: 12月15日（金）"
            id="date-separator-input"
            style={{
              flex: 1, background: '#1a252f', border: '1px solid #4b5563', borderRadius: '6px', padding: '8px', fontSize: '13px', color: 'white', outline: 'none', minWidth: 0
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddDateSeparator(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.getElementById('date-separator-input');
              if (input && input.value) {
                onAddDateSeparator(input.value);
                input.value = '';
              }
            }}
            style={{
              background: '#34495e', border: '1px solid #4b5563', borderRadius: '6px', padding: '0 10px', color: 'white', cursor: 'pointer'
            }}
          >
            ＋
          </button>
        </div>
      </div>

      {/* Responsive Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '12px', color: '#94a3b8' }}>画面幅の切り替え</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { label: 'iPhone 17', width: 402 },
            { label: '17 Max', width: 440 }
          ].map(p => (
            <button
              key={p.width}
              onClick={() => setChatWidth(p.width)}
              style={{
                flex: 1, padding: '8px 4px', fontSize: '12px', background: chatWidth === p.width ? '#fe6970' : '#34495e', border: chatWidth === p.width ? '1px solid #fe6970' : '1px solid #4b5563', borderRadius: '8px', color: 'white', cursor: 'pointer', transition: 'all 0.2s', fontWeight: chatWidth === p.width ? 'bold' : 'normal'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={onResetMessages}
          style={{
            width: '100%', background: 'transparent', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px', fontSize: '13px', color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 'bold'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}
        >
          会話履歴を初期化
        </button>

        <button
          onClick={handleTakeScreenshot}
          style={{
            width: '100%',
            background: '#fe6970',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(254,105,112,0.2)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 8px rgba(254,105,112,0.3)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(254,105,112,0.2)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          スクリーンショットを保存
        </button>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #374151', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '0.1em' }}>DATING-PPP-SUPPORT</div>
        <div style={{ fontSize: '10px', color: '#475569' }}>v1.1.1-fixed</div>
      </div>
    </div>
  );
};

export default ControlPanel;
