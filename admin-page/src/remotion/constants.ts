import { MatchingAppVideoProps } from '../types/video';

export const DEFAULT_VIDEO_PROPS: MatchingAppVideoProps = {
  userProfile: {
    age: 25,
    hobbies: ['カフェ', 'ピラティス'],
    occupation: '看護師',
  },
  targetProfile: {
    bloodType: 'B型',
    style: 'ジャケットコーデ',
    features: ['パーマ', 'やや細め'],
  },
  dialogue: [
    {
      speaker: 'user',
      text: '占い当たって嬉しいです！',
      durationInFrames: 60,
    },
    {
      speaker: 'fortune_teller',
      text: 'ミディアムボブのカフェとピラティスが大好きな25歳、看護師って言ってたから間違いないですね。',
      durationInFrames: 120,
    },
    {
      speaker: 'user',
      text: 'その特徴は完全に私ですね！',
      durationInFrames: 60,
    },
    {
      speaker: 'fortune_teller',
      text: 'ラッキー相手はパーマでジャケットコーデのB型、やや細め、お酒は時々。',
      durationInFrames: 120,
    },
    {
      speaker: 'user',
      text: '今もしかして私ラッキー相手とお話ししていますか？',
      durationInFrames: 90,
    },
  ],
};
