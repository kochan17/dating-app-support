import React, { useState } from 'react';
import WithChatScreen from './components/WithChatScreen';
import ControlPanel from './components/ControlPanel';

function App() {
  const [senderMode, setSenderMode] = useState('me');
  const [partnerName, setPartnerName] = useState('あや');
  const [partnerIcon, setPartnerIcon] = useState("./uploads/user_photo/images/thumb_image_251015084305.jpg");

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
        />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: '700px', height: '100%', backgroundColor: 'white', position: 'relative', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
          <WithChatScreen
            senderMode={senderMode}
            partnerName={partnerName}
            partnerIcon={partnerIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
