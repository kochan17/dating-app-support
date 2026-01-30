import { Composition } from 'remotion';
import { MatchingAppVideo } from './MatchingAppVideo';
import { DEFAULT_VIDEO_PROPS } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MatchingAppVideo"
        component={MatchingAppVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={DEFAULT_VIDEO_PROPS}
      />
    </>
  );
};
