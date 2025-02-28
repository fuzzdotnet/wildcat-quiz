export type WildcatType = 'manul' | 'iberian-lynx' | 'clouded-leopard' | 'flat-headed-cat' | 'andean-mountain-cat' | 'fishing-cat';

export interface Answer {
  text: string;
  emoji: string;
  scores: Record<WildcatType, number>;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface WildcatResult {
  type: WildcatType;
  name: string;
  headline: string;
  personalityMatch: string;
  conservationStatus: string;
  funFact: string;
  conservationOrg: {
    name: string;
    description: string;
    link: string;
  };
  imageDescription: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>;
  result?: WildcatResult;
  email?: string;
  newsletterOptIn: boolean;
}

export interface UserData {
  email: string;
  result: WildcatResult;
  newsletterOptIn: boolean;
  quizCompletedAt: string;
} 