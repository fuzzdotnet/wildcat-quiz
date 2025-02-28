'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { WildcatResult, Question, WildcatType } from '@/types/quiz';
import { ShareIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { wildcatResults, questions } from '@/lib/quizData';

const wildcatImages = {
  'manul': '/images/wildcats/manul.jpg',
  'iberian-lynx': '/images/wildcats/iberian-lynx.jpg',
  'clouded-leopard': '/images/wildcats/clouded-leopard.jpg',
  'flat-headed-cat': '/images/wildcats/flat-headed-cat.jpg',
  'andean-mountain-cat': '/images/wildcats/andean-mountain-cat.jpg',
  'fishing-cat': '/images/wildcats/fishing-cat.jpg'
};

const wildcatTraits = {
  'manul': ['Self-reliant', 'Patient', 'Resilient', 'Independent', 'Observant'],
  'iberian-lynx': ['Selective', 'Precise', 'Dignified', 'Strategic', 'Confident'],
  'clouded-leopard': ['Adaptable', 'Creative', 'Versatile', 'Mysterious', 'Agile'],
  'flat-headed-cat': ['Specialized', 'Focused', 'Methodical', 'Resourceful', 'Detail-oriented'],
  'andean-mountain-cat': ['Independent', 'Determined', 'Resilient', 'Adaptable', 'Trailblazing'],
  'fishing-cat': ['Resourceful', 'Adventurous', 'Patient', 'Persistent', 'Opportunistic']
};

const wildcatTraitDescriptions = {
  'manul': {
    'Self-reliant': { questionIds: [1], answers: [2, 3] },
    'Patient': { questionIds: [2, 5], answers: [3, 1] },
    'Resilient': { questionIds: [4, 6], answers: [2, 4] },
    'Independent': { questionIds: [7], answers: [4] },
    'Observant': { questionIds: [3], answers: [1, 2] }
  },
  'iberian-lynx': {
    'Selective': { questionIds: [1, 5], answers: [1, 2] },
    'Precise': { questionIds: [2, 4], answers: [1, 2] },
    'Strategic': { questionIds: [7, 6], answers: [3, 3] },
    'Confident': { questionIds: [3], answers: [1] },
    'Dignified': { questionIds: [5], answers: [1] }
  },
  'clouded-leopard': {
    'Adaptable': { questionIds: [4, 7], answers: [1, 1] },
    'Creative': { questionIds: [2, 5], answers: [2, 0] },
    'Versatile': { questionIds: [1, 6], answers: [2, 2] },
    'Mysterious': { questionIds: [3], answers: [2] },
    'Agile': { questionIds: [4], answers: [1] }
  },
  'flat-headed-cat': {
    'Specialized': { questionIds: [5, 6], answers: [2, 1] },
    'Focused': { questionIds: [2, 7], answers: [1, 2] },
    'Methodical': { questionIds: [4], answers: [2] },
    'Resourceful': { questionIds: [1], answers: [2] },
    'Detail-oriented': { questionIds: [3], answers: [1] }
  },
  'andean-mountain-cat': {
    'Independent': { questionIds: [1], answers: [3] },
    'Determined': { questionIds: [4, 7], answers: [2, 3] },
    'Resilient': { questionIds: [2], answers: [1] },
    'Adaptable': { questionIds: [3, 6], answers: [2, 0] },
    'Trailblazing': { questionIds: [4], answers: [1] }
  },
  'fishing-cat': {
    'Resourceful': { questionIds: [2, 5], answers: [2, 0] },
    'Adventurous': { questionIds: [1, 4], answers: [2, 1] },
    'Patient': { questionIds: [3], answers: [1] },
    'Persistent': { questionIds: [7], answers: [3] },
    'Opportunistic': { questionIds: [5, 6], answers: [2, 5] }
  }
};

// Trait intensity scores for each wildcat (1-10 scale)
const wildcatTraitIntensities: Record<string, Record<string, number>> = {
  'manul': {
    'Self-reliant': 9,     // Extremely independent due to solitary nature
    'Patient': 8,          // Excellent ambush hunters, wait for perfect moment
    'Resilient': 10,       // Survive extreme environments and temperatures
    'Independent': 9,      // Very solitary, even for wildcats
    'Observant': 8         // Increased from 7 - survival depends on observation
  },
  'iberian-lynx': {
    'Selective': 9,        // Extremely specialized in prey selection
    'Precise': 8,          // Excellent hunters with high success rate
    'Strategic': 8,        // Increased from 7 - hunting in open requires more strategy
    'Confident': 7,        // Increased from 6 - confidence key in open terrain
    'Dignified': 8         // Carries themselves with notable poise
  },
  'clouded-leopard': {
    'Adaptable': 8,        // Can thrive in various forest types
    'Creative': 9,         // Unique hunting and climbing abilities
    'Versatile': 10,       // Most acrobatic of all wildcats
    'Mysterious': 8,       // Rarely seen, enigmatic behavior
    'Agile': 10           // Exceptional climbing and maneuvering abilities
  },
  'flat-headed-cat': {
    'Specialized': 10,     // Extremely adapted for fishing
    'Focused': 9,         // Intense concentration when hunting
    'Methodical': 8,      // Systematic in hunting approach
    'Resourceful': 8,     // Increased from 7 - finding food in specific habitats
    'Detail-oriented': 9  // Precise in fishing technique
  },
  'andean-mountain-cat': {
    'Independent': 8,      // Solitary but may have some social flexibility
    'Determined': 9,       // Persists in harsh mountain conditions
    'Resilient': 10,       // Survives in extreme high-altitude environments
    'Adaptable': 7,        // Increased from 6 - mountain life requires more adaptation
    'Trailblazing': 8     // Pioneers in high-altitude living
  },
  'fishing-cat': {
    'Resourceful': 9,      // Excellent at finding food in wetlands
    'Adventurous': 7,      // Bold but calculated in approach
    'Patient': 8,          // Good at waiting for fish
    'Persistent': 9,       // Keeps trying different spots until successful
    'Opportunistic': 9     // Increased from 8 - thrives in various environments
  }
};

interface TraitMatch {
  name: string;
  strength: number; // 0-1
  matchedAnswers: number[];
  totalPossibleAnswers: number;
  wildcatTraitIntensity: number; // 1-10
  overallMatchScore: number; // Combined score
}

interface WildcatMatch {
  type: string;
  name: string;
  matchScore: number;
  topTraits: Array<{
    name: string;
    score: number;
  }>;
}

interface ResultsProps {
  result: WildcatResult;
  answers: Record<number, number>;
  onRetakeQuiz: () => void;
  onShare: () => void;
}

export default function Results({ result, answers, onRetakeQuiz, onShare }: ResultsProps) {
  // Calculate match scores for all wildcats using the same logic as calculateResult
  const scores: Record<WildcatType, number> = {
    'manul': 0,
    'iberian-lynx': 0,
    'clouded-leopard': 0,
    'flat-headed-cat': 0,
    'andean-mountain-cat': 0,
    'fishing-cat': 0
  };

  // Calculate scores using the same logic as calculateResult
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    const question = questions.find((q: Question) => q.id === qId);
    if (question) {
      const answer = question.answers[answerIndex];
      Object.entries(answer.scores).forEach(([wildcat, score]) => {
        let adjustedScore = score as number;
        
        // Adjust scores based on question type - same as calculateResult
        if (qId <= 5) {
          // Earlier questions: only count primary matches
          adjustedScore = score === 2 ? 2 : 0;
        } else if (qId === 6) {
          // Environment question: stronger primary match
          adjustedScore = score === 2 ? 3 : 0;
        } else if (qId === 7) {
          // Personality question: much stronger primary match
          adjustedScore = score === 3 ? 4 : (score === 2 ? 1 : 0);
        }
        
        scores[wildcat as WildcatType] += adjustedScore;
      });
    }
  });

  // Convert scores to percentages and create matches array
  const totalPossibleScore = 20; // Maximum possible score
  const allWildcatMatches = Object.entries(scores)
    .map(([type, score]) => ({
      type,
      name: wildcatResults[type as WildcatType].name,
      matchScore: Math.round((score / totalPossibleScore) * 100),
      // Get top traits based on the questions that contributed most to the score
      topTraits: wildcatTraits[type as WildcatType].slice(0, 2).map(trait => ({
        name: trait,
        score: 1
      }))
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  // Get primary match and next two closest matches
  const [primaryMatch, ...otherMatches] = allWildcatMatches;
  // Filter out matches with the same type as primary match
  const runnerUps = otherMatches
    .filter(match => match.type !== result.type)
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative w-full aspect-video">
          <Image
            src={wildcatImages[result.type]}
            alt={result.imageDescription}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-serif text-primary-800 mb-4 text-center">
            {result.headline}
          </h2>

          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <div className={`
                inline-block px-4 py-2 rounded-full text-sm font-medium
                ${result.conservationStatus === 'Critically Endangered' && 'bg-red-200 text-red-900'}
                ${result.conservationStatus === 'Endangered' && 'bg-red-100 text-red-800'}
                ${result.conservationStatus === 'Vulnerable' && 'bg-orange-100 text-orange-800'}
                ${result.conservationStatus === 'Near Threatened' && 'bg-yellow-100 text-yellow-800'}
              `}>
                Conservation Status: {result.conservationStatus}
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-6 mb-6">
              <h3 className="font-serif text-xl text-primary-800 mb-4">
                Did You Know?
              </h3>
              <p className="text-primary-700">
                {result.funFact}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-primary-100 p-6 mb-6">
              <h3 className="font-serif text-xl text-primary-800 mb-4 flex items-center">
                <StarIcon className="w-6 h-6 mr-2 text-primary-600" />
                Your Match Analysis
              </h3>
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary-700 font-medium">Match with {result.name}</span>
                  <span className="text-primary-600 font-bold">{primaryMatch.matchScore}%</span>
                </div>
                <div className="w-full bg-primary-100 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full" 
                    style={{ width: `${primaryMatch.matchScore}%` }}
                  />
                </div>
                <p className="text-primary-600 mt-2 text-sm">
                  Your strongest matching traits: {primaryMatch.topTraits.map(t => t.name).join(' & ')}
                </p>
              </div>

              <h4 className="font-medium text-primary-700 mb-4">Other Close Matches</h4>
              <div className="space-y-6">
                {runnerUps.map((match, index) => (
                  <div key={match.type} className="border-t border-primary-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary-700">{match.name}</span>
                      <span className="text-primary-600 font-medium">{match.matchScore}%</span>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-1.5">
                      <div 
                        className="bg-primary-400 h-1.5 rounded-full" 
                        style={{ width: `${match.matchScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-serif text-xl text-primary-800 mb-4">
                Help Protect the {result.name}
              </h3>
              <div className="bg-primary-50 rounded-lg p-6">
                <h4 className="font-medium text-primary-800 mb-2">
                  {result.conservationOrg.name}
                </h4>
                <p className="text-primary-700 mb-4">
                  {result.conservationOrg.description}
                </p>
                <a
                  href={result.conservationOrg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Support Conservation Efforts
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onShare}
              className="btn-secondary flex-1 inline-flex items-center justify-center"
            >
              <ShareIcon className="w-5 h-5 mr-2" />
              Share Results
            </button>
            <button
              onClick={onRetakeQuiz}
              className="btn-primary flex-1"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 