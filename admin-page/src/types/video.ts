export interface DialogueItem {
  speaker: 'fortune_teller' | 'user';
  text: string;
  durationInFrames: number;
}

export interface MatchingAppVideoProps {
  backgroundImage?: string;
  bgm?: string;
  dialogue: DialogueItem[];
  userProfile: {
    age: number;
    hobbies: string[];
    occupation: string;
    image?: string;
  };
  targetProfile: {
    bloodType: string;
    style: string;
    features: string[];
  };
}
