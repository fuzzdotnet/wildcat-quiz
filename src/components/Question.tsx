'use client';

import { motion } from 'framer-motion';
import { Question as QuestionType } from '@/types/quiz';

interface QuestionProps {
  question: QuestionType;
  selectedAnswer?: number;
  onAnswerSelect: (index: number) => void;
}

export default function Question({ question, selectedAnswer, onAnswerSelect }: QuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-serif text-primary-800 mb-8 text-center">
        {question.text}
      </h2>

      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-4 rounded-lg text-left transition-all ${
              selectedAnswer === index
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-white hover:bg-primary-50 text-primary-700 hover:text-primary-800 shadow'
            }`}
            whileHover={{ scale: selectedAnswer === index ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-lg">{answer.text}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 