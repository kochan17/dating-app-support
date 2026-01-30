import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { MatchingAppVideoProps } from '../types/video';

export const MatchingAppVideo: React.FC<MatchingAppVideoProps> = ({
  backgroundImage,
  dialogue,
  userProfile,
  targetProfile,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-black text-white font-sans">
      {/* Background Image/Video */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="background"
        />
      )}

      {/* Main UI Layer */}
      <AbsoluteFill className="flex flex-col justify-between p-10">
        {/* Header UI */}
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-pink-500 overflow-hidden">
              {/* Avatar Placeholder */}
            </div>
            <div>
              <p className="font-bold text-lg">占い結果</p>
              <p className="text-xs opacity-70">運命の相手とマッチ中</p>
            </div>
          </div>
        </div>

        {/* Dialogue View - Dynamic sequences */}
        {dialogue.map((item, index) => {
          const startFrame = dialogue
            .slice(0, index)
            .reduce((acc, curr) => acc + curr.durationInFrames, 0);

          return (
            <Sequence
              key={index}
              from={startFrame}
              durationInFrames={item.durationInFrames}
            >
              <div className={`flex w-full ${item.speaker === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${item.speaker === 'user'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-400'
                    : 'bg-white/20 backdrop-blur-lg'
                  }`}>
                  <p className="text-xl font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </Sequence>
          );
        })}

        {/* Profile Card UI (Matching App Style) */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {userProfile.occupation} ({userProfile.age})
              </h2>
              <div className="flex gap-2 flex-wrap">
                {userProfile.hobbies.map((hobby) => (
                  <span key={hobby} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    #{hobby}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-rose-500/20">
              心
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
