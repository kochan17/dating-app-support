export interface DialogueItem {
  speaker: 'user' | 'target' | 'fortune_teller' | 'narrator';
  text: string;
  durationInFrames: number;
}

export interface UserProfile {
  age: number;
  occupation: string;
  hobbies: string[];
}

export interface TargetProfile {
  bloodType?: string;
  style?: string;
  features?: string[];
}

export interface MatchingAppVideoProps {
  backgroundImage?: string;
  userProfile: UserProfile;
  targetProfile: TargetProfile;
  dialogue: DialogueItem[];
  title?: string;
  subtitle?: string;
}
