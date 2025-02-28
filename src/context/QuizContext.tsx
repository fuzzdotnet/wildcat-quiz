'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { QuizState, WildcatResult } from '@/types/quiz';

type QuizAction =
  | { type: 'SET_ANSWER'; questionId: number; answerIndex: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SET_RESULT'; result: WildcatResult }
  | { type: 'SET_EMAIL'; email: string }
  | { type: 'SET_NEWSLETTER_OPT_IN'; optIn: boolean }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_CURRENT_QUESTION'; currentQuestionIndex: number };

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: {},
  newsletterOptIn: false,
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answerIndex,
        },
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };
    case 'SET_RESULT':
      return {
        ...state,
        result: action.result,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'SET_NEWSLETTER_OPT_IN':
      return {
        ...state,
        newsletterOptIn: action.optIn,
      };
    case 'RESET_QUIZ':
      return initialState;
    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.currentQuestionIndex,
      };
    default:
      return state;
  }
};

interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}; 