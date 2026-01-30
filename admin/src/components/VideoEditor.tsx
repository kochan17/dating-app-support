import { Player } from '@remotion/player';
import { useState, useEffect } from 'react';
import { MatchingAppVideo } from '../remotion/MatchingAppVideo';
import { DEFAULT_VIDEO_PROPS } from '../remotion/constants';
import type { MatchingAppVideoProps, DialogueItem } from '../types/video';
import { Settings, Download, Trash2, Plus, Clock, FileText, ChevronRight } from 'lucide-react';

export default function VideoEditor() {
  const [props, setProps] = useState<MatchingAppVideoProps>(DEFAULT_VIDEO_PROPS);
  const [presets, setPresets] = useState<{ id: string; name: string; content: string }[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'dialogue'>('dialogue');

  // Load presets on mount using Vite's glob import
  useEffect(() => {
    const transcriptFiles = import.meta.glob('../../references/transcripts/*.md', { query: '?raw', import: 'default', eager: true });

    const loadedPresets = Object.entries(transcriptFiles).map(([path, content]) => {
      const fileName = path.split('/').pop() || '';
      return {
        id: fileName.replace('.md', ''),
        name: fileName.replace('.md', '').replace(/^\d+-/, '').replace(/-/g, ' '),
        content: content as string
      };
    });

    setPresets(loadedPresets);
  }, []);

  const handleDialogueChange = (index: number, updates: Partial<DialogueItem>) => {
    const newDialogue = [...props.dialogue];
    newDialogue[index] = { ...newDialogue[index], ...updates };
    setProps({ ...props, dialogue: newDialogue });
  };

  const addMessage = () => {
    const newDialogue = [...props.dialogue, { speaker: 'user' as const, text: '', durationInFrames: 60 }];
    setProps({ ...props, dialogue: newDialogue });
  };

  const removeMessage = (index: number) => {
    const newDialogue = props.dialogue.filter((_, i) => i !== index);
    setProps({ ...props, dialogue: newDialogue });
  };

  const loadPreset = (presetContent: string) => {
    const lines = presetContent
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#')); // Skip headers

    const newDialogue: DialogueItem[] = lines.map((text, i) => ({
      speaker: i % 2 === 0 ? 'user' : 'target',
      text,
      durationInFrames: 90, // Default 3 seconds at 30fps
    }));

    setProps({ ...props, dialogue: newDialogue });
  };

  const totalFrames = props.dialogue.reduce((acc, curr) => acc + curr.durationInFrames, 0);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-zinc-50">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-[450px] bg-white border-r border-zinc-200 flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-zinc-100 bg-white sticky top-0 z-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
              <span className="bg-pink-500 text-white p-1 rounded-lg">
                <Settings size={20} />
              </span>
              REEL EDITOR
            </h1>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-500">
                <Download size={20} />
              </button>
            </div>
          </div>

          <div className="flex bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'dialogue' ? 'bg-white shadow-sm text-pink-600' : 'text-zinc-400 hover:text-zinc-600'
                }`}
            >
              台本エディタ
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm text-pink-600' : 'text-zinc-400 hover:text-zinc-600'
                }`}
            >
              プロフィール
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {activeTab === 'dialogue' && (
            <div className="space-y-6">
              {/* Presets Grid */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                  <FileText size={12} /> 台本プリセット
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => loadPreset(preset.content)}
                      className="px-3 py-2 text-[10px] font-bold border border-zinc-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all text-left truncate"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">メッセージシーケンス</label>
                  <span className="text-[10px] font-bold text-zinc-400">Total: {Math.round(totalFrames / 30)}s</span>
                </div>

                {props.dialogue.map((item, index) => (
                  <div key={index} className="group relative bg-zinc-50 hover:bg-white border border-transparent hover:border-zinc-200 rounded-2xl p-4 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <select
                        value={item.speaker}
                        onChange={(e) => handleDialogueChange(index, { speaker: e.target.value as any })}
                        className={`text-[10px] font-black px-2 py-1 rounded-md border-0 focus:ring-0 ${item.speaker === 'user' ? 'bg-pink-100 text-pink-600' : 'bg-zinc-200 text-zinc-600'
                          }`}
                      >
                        <option value="user">ユーザー (自分)</option>
                        <option value="target">相手</option>
                      </select>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Clock size={12} />
                          <input
                            type="number"
                            value={item.durationInFrames / 30}
                            onChange={(e) => handleDialogueChange(index, { durationInFrames: parseFloat(e.target.value) * 30 })}
                            className="w-8 bg-transparent text-[10px] font-bold text-zinc-600 outline-none"
                          />
                          <span className="text-[10px] font-bold">s</span>
                        </div>
                        <button onClick={() => removeMessage(index)} className="text-zinc-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={item.text}
                      onChange={(e) => handleDialogueChange(index, { text: e.target.value })}
                      className="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm font-medium text-zinc-700 resize-none min-h-[40px]"
                      placeholder="メッセージを入力..."
                    />
                  </div>
                ))}

                <button
                  onClick={addMessage}
                  className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-zinc-400 hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50 transition-all flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <Plus size={16} /> メッセージを追加
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <section className="space-y-4">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">プロフィール基本情報</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400">職業</span>
                    <input
                      type="text"
                      value={props.userProfile.occupation}
                      onChange={(e) => setProps({ ...props, userProfile: { ...props.userProfile, occupation: e.target.value } })}
                      className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400">年齢</span>
                    <input
                      type="number"
                      value={props.userProfile.age}
                      onChange={(e) => setProps({ ...props, userProfile: { ...props.userProfile, age: parseInt(e.target.value) } })}
                      className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">動画設定</label>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400">タイトル</span>
                  <input
                    type="text"
                    value={props.title}
                    onChange={(e) => setProps({ ...props, title: e.target.value })}
                    className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400">サブタイトル</span>
                  <input
                    type="text"
                    value={props.subtitle}
                    onChange={(e) => setProps({ ...props, subtitle: e.target.value })}
                    className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </section>
            </div>
          )}
        </div>

        <div className="p-6 border-top border-zinc-100 bg-white">
          <button className="w-full py-4 bg-zinc-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 tracking-widest text-xs">
            RENDER MP4 <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-200/50 backdrop-blur-3xl z-0" />

        <div className="relative z-10 w-full max-w-[400px] aspect-[9/16] shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[3rem] overflow-hidden border-[12px] border-zinc-900 bg-black">
          <Player
            component={MatchingAppVideo as any}
            durationInFrames={Math.max(300, totalFrames)}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            style={{
              width: '100%',
              height: '100%',
            }}
            controls
            loop
            inputProps={props as any}
          />
        </div>

        {/* Floating Quick Controls */}
        <div className="mt-8 flex gap-4 z-10">
          <div className="px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 flex items-center gap-4">
            <span className="text-[10px] font-black text-zinc-400 uppercase">Preview Mode</span>
            <div className="h-4 w-[1px] bg-zinc-200" />
            <span className="text-xs font-bold text-zinc-800 tracking-tight">縦型 9:16 (1080x1920)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
