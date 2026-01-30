'use client';

import { Player } from '@remotion/player';
import { useState } from 'react';
import { MatchingAppVideo } from '../remotion/MatchingAppVideo';
import { DEFAULT_VIDEO_PROPS } from '../remotion/constants';
import { MatchingAppVideoProps } from '../types/video';

export default function VideoEditor() {
  const [props, setProps] = useState<MatchingAppVideoProps>(DEFAULT_VIDEO_PROPS);

  const handleDialogueChange = (index: number, text: string) => {
    const newDialogue = [...props.dialogue];
    newDialogue[index] = { ...newDialogue[index], text };
    setProps({ ...props, dialogue: newDialogue });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto h-screen">
      {/* Player Section */}
      <div className="flex-1 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4">
        <Player
          component={MatchingAppVideo}
          durationInFrames={450}
          compositionWidth={1080}
          compositionHeight={1920}
          fps={30}
          style={{
            width: '100%',
            aspectRatio: '9/16',
            maxHeight: '80vh',
          }}
          controls
          inputProps={props}
        />
      </div>

      {/* Editor Controls Section */}
      <div className="w-full lg:w-96 bg-white overflow-y-auto rounded-3xl p-6 shadow-xl border border-zinc-100">
        <h1 className="text-2xl font-bold mb-6 text-zinc-800">動画エディタ</h1>

        <div className="space-y-6">
          {/* User Profile Section */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-zinc-700">プロフィール設定</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 uppercase font-bold">職業</label>
                <input
                  type="text"
                  value={props.userProfile.occupation}
                  onChange={(e) => setProps({
                    ...props,
                    userProfile: { ...props.userProfile, occupation: e.target.value }
                  })}
                  className="w-full p-2 border rounded-lg text-sm bg-zinc-50 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase font-bold">年齢</label>
                <input
                  type="number"
                  value={props.userProfile.age}
                  onChange={(e) => setProps({
                    ...props,
                    userProfile: { ...props.userProfile, age: parseInt(e.target.value) }
                  })}
                  className="w-full p-2 border rounded-lg text-sm bg-zinc-50 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Dialogue Section */}
          <section>
            <h2 className="text-lg font-semibold mb-3 text-zinc-700">対話テキスト</h2>
            <div className="space-y-4">
              {props.dialogue.map((item, index) => (
                <div key={index}>
                  <label className="text-xs text-zinc-400 font-bold">
                    {item.speaker === 'user' ? 'ユーザー' : '占い師'}
                  </label>
                  <textarea
                    value={item.text}
                    onChange={(e) => handleDialogueChange(index, e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm bg-zinc-50 focus:ring-2 focus:ring-pink-500 outline-none min-h-[60px]"
                  />
                </div>
              ))}
            </div>
          </section>

          <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all uppercase tracking-wider">
            動画を書き出す (MP4)
          </button>
        </div>
      </div>
    </div>
  );
}
