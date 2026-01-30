import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { MatchingAppVideoProps } from '../types/video';

export const MatchingAppVideo: React.FC<MatchingAppVideoProps> = ({
  backgroundImage,
  dialogue,
  userProfile,
  title = "トーク画面",
  subtitle = "マッチング中",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-zinc-950 text-white font-sans overflow-hidden">
      {/* Background with darker overlay for better readability */}
      <AbsoluteFill>
        {backgroundImage ? (
          <img src={backgroundImage} className="w-full h-full object-cover opacity-40 scale-110" />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />
        )}
      </AbsoluteFill>

      {/* Main Container */}
      <AbsoluteFill className="flex flex-col p-8 pt-16 pb-20">
        {/* Header UI (App Style) */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-2xl mb-10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/20">
            {userProfile.occupation[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm opacity-60 font-medium">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Active</div>
          </div>
        </div>

        {/* Sequential Conversation Area */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex flex-col gap-6">
            {dialogue.map((item, index) => {
              // Calculate cumulative start time
              const startFrame = dialogue
                .slice(0, index)
                .reduce((acc, curr) => acc + curr.durationInFrames, 0);

              // Don't render until the start frame
              if (frame < startFrame) return null;

              // Animation progress for the entry
              const entryProgress = spring({
                frame: frame - startFrame,
                fps,
                config: {
                  damping: 15,
                  stiffness: 120,
                },
              });

              const opacity = entryProgress;
              const translateY = interpolate(entryProgress, [0, 1], [30, 0]);

              return (
                <div
                  key={index}
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                  }}
                  className={`flex w-full ${item.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-4 rounded-3xl shadow-xl ${item.speaker === 'user'
                        ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-tr-sm'
                        : 'bg-white/15 backdrop-blur-lg border border-white/10 text-white rounded-tl-sm'
                      }`}
                  >
                    <p className="text-xl font-medium leading-normal tracking-wide">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Stats/Profile (Matching App Style) */}
        <div className="mt-10 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 backdrop-blur-2xl rounded-3xl p-6 border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-black">{userProfile.occupation}</span>
                <span className="text-xl font-bold opacity-50">{userProfile.age}歳</span>
              </div>
              <div className="flex gap-2">
                {userProfile.hobbies.map((hobby) => (
                  <span key={hobby} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-bold border border-pink-500/20">
                    #{hobby}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <div className="text-rose-500 text-3xl">❤️</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
