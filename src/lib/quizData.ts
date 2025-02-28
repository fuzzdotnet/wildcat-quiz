import { Question, WildcatResult } from '@/types/quiz';

export type WildcatType = 'manul' | 'iberian-lynx' | 'clouded-leopard' | 'flat-headed-cat' | 'andean-mountain-cat' | 'fishing-cat';

export const questions: Question[] = [
  {
    id: 0,
    text: "It's the weekend! What's your ideal way to spend it?",
    answers: [
      {
        text: "Parkour! I love climbing and jumping between high places",
        emoji: "🧗‍♂️",
        scores: {
          'clouded-leopard': 5,
          'fishing-cat': 2,
          'manul': 0,
          'iberian-lynx': 3,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 3
        }
      },
      {
        text: "Chilling in my cozy spot, watching the world go by",
        emoji: "🛋️",
        scores: {
          'manul': 5,
          'iberian-lynx': 2,
          'andean-mountain-cat': 2,
          'clouded-leopard': 1,
          'flat-headed-cat': 3,
          'fishing-cat': 2
        }
      },
      {
        text: "Swimming or water activities - I love being near water!",
        emoji: "🌊",
        scores: {
          'fishing-cat': 5,
          'flat-headed-cat': 5,
          'manul': 0,
          'iberian-lynx': 1,
          'clouded-leopard': 2,
          'andean-mountain-cat': 1
        }
      },
      {
        text: "Going on a solo adventure in nature",
        emoji: "🏞️",
        scores: {
          'andean-mountain-cat': 5,
          'iberian-lynx': 4,
          'manul': 2,
          'clouded-leopard': 3,
          'flat-headed-cat': 1,
          'fishing-cat': 3
        }
      }
    ]
  },
  {
    id: 1,
    text: "What's your approach to solving problems?",
    answers: [
      {
        text: "I'm patient and strategic - I wait for the perfect moment",
        emoji: "🎯",
        scores: {
          'manul': 5,
          'iberian-lynx': 5,
          'andean-mountain-cat': 3,
          'clouded-leopard': 2,
          'flat-headed-cat': 5,
          'fishing-cat': 4
        }
      },
      {
        text: "I dive right in and figure it out as I go",
        emoji: "🏊‍♂️",
        scores: {
          'fishing-cat': 4,
          'flat-headed-cat': 2,
          'clouded-leopard': 3,
          'manul': 0,
          'iberian-lynx': 2,
          'andean-mountain-cat': 2
        }
      },
      {
        text: "I use my agility and quick thinking to overcome obstacles",
        emoji: "🤸‍♂️",
        scores: {
          'clouded-leopard': 5,
          'iberian-lynx': 4,
          'fishing-cat': 4,
          'manul': 1,
          'flat-headed-cat': 3,
          'andean-mountain-cat': 3
        }
      }
    ]
  },
  {
    id: 2,
    text: "How do you handle challenging situations?",
    answers: [
      {
        text: "I'm tough and resilient - bring on the challenge!",
        emoji: "💪",
        scores: {
          'manul': 2,
          'andean-mountain-cat': 3,
          'iberian-lynx': 3,
          'clouded-leopard': 1,
          'flat-headed-cat': 1,
          'fishing-cat': 2
        }
      },
      {
        text: "I'm adaptable and can handle whatever comes my way",
        emoji: "🔄",
        scores: {
          'clouded-leopard': 3,
          'fishing-cat': 3,
          'flat-headed-cat': 3,
          'manul': 1,
          'iberian-lynx': 3,
          'andean-mountain-cat': 3
        }
      },
      {
        text: "I prefer to stick to what I know I'm good at",
        emoji: "⭐",
        scores: {
          'flat-headed-cat': 3,
          'iberian-lynx': 1,
          'manul': 3,
          'clouded-leopard': 1,
          'andean-mountain-cat': 1,
          'fishing-cat': 2
        }
      }
    ]
  },
  {
    id: 3,
    text: "What's your approach to food?",
    answers: [
      {
        text: "I know what I like and stick to it - why change perfection?",
        emoji: "🍽️",
        scores: {
          'iberian-lynx': 5,
          'flat-headed-cat': 5,
          'manul': 4,
          'clouded-leopard': 2,
          'andean-mountain-cat': 4,
          'fishing-cat': 2
        }
      },
      {
        text: "I'll try anything once - variety is the spice of life!",
        emoji: "🌶️",
        scores: {
          'fishing-cat': 4,
          'clouded-leopard': 3,
          'flat-headed-cat': 0,
          'manul': 0,
          'iberian-lynx': 1,
          'andean-mountain-cat': 2
        }
      },
      {
        text: "I'm resourceful - I can make a meal out of anything",
        emoji: "🧠",
        scores: {
          'andean-mountain-cat': 5,
          'manul': 4,
          'fishing-cat': 4,
          'iberian-lynx': 2,
          'clouded-leopard': 3,
          'flat-headed-cat': 2
        }
      }
    ]
  },
  {
    id: 4,
    text: "What's your superpower?",
    answers: [
      {
        text: "My incredible agility and balance",
        emoji: "🎪",
        scores: {
          'clouded-leopard': 5,
          'iberian-lynx': 4,
          'fishing-cat': 3,
          'manul': 1,
          'flat-headed-cat': 2,
          'andean-mountain-cat': 4
        }
      },
      {
        text: "My ability to thrive where others can't",
        emoji: "🏔️",
        scores: {
          'manul': 5,
          'andean-mountain-cat': 5,
          'flat-headed-cat': 4,
          'iberian-lynx': 3,
          'clouded-leopard': 2,
          'fishing-cat': 3
        }
      },
      {
        text: "My focus and determination",
        emoji: "🎯",
        scores: {
          'iberian-lynx': 5,
          'flat-headed-cat': 5,
          'fishing-cat': 4,
          'manul': 4,
          'clouded-leopard': 3,
          'andean-mountain-cat': 4
        }
      },
      {
        text: "My versatility and adaptability",
        emoji: "🔄",
        scores: {
          'fishing-cat': 3,
          'clouded-leopard': 5,
          'flat-headed-cat': 1,
          'manul': 1,
          'iberian-lynx': 2,
          'andean-mountain-cat': 3
        }
      }
    ]
  },
  {
    id: 5,
    text: "When are you at your best?",
    answers: [
      {
        text: "Late at night when everything is quiet",
        emoji: "🌙",
        scores: {
          'flat-headed-cat': 5,
          'clouded-leopard': 5,
          'fishing-cat': 4,
          'manul': 3,
          'iberian-lynx': 2,
          'andean-mountain-cat': 2
        }
      },
      {
        text: "Early morning or evening - the transition times",
        emoji: "🌅",
        scores: {
          'manul': 5,
          'iberian-lynx': 5,
          'andean-mountain-cat': 4,
          'clouded-leopard': 3,
          'flat-headed-cat': 3,
          'fishing-cat': 3
        }
      },
      {
        text: "Whenever opportunity strikes - I'm always ready!",
        emoji: "⚡",
        scores: {
          'fishing-cat': 2,
          'clouded-leopard': 3,
          'flat-headed-cat': 2,
          'manul': 1,
          'iberian-lynx': 2,
          'andean-mountain-cat': 3
        }
      }
    ]
  },
  {
    id: 6,
    text: "What's your approach to mastering a skill?",
    answers: [
      {
        text: "I focus intensely on one specific technique until I perfect it",
        emoji: "🎯",
        scores: {
          'flat-headed-cat': 5,
          'iberian-lynx': 4,
          'manul': 4,
          'fishing-cat': 2,
          'clouded-leopard': 1,
          'andean-mountain-cat': 3
        }
      },
      {
        text: "I learn the basics and then experiment with different variations",
        emoji: "🔬",
        scores: {
          'fishing-cat': 5,
          'clouded-leopard': 4,
          'andean-mountain-cat': 3,
          'manul': 2,
          'flat-headed-cat': 1,
          'iberian-lynx': 2
        }
      },
      {
        text: "I prefer to be versatile rather than specialized",
        emoji: "🎭",
        scores: {
          'clouded-leopard': 5,
          'fishing-cat': 4,
          'andean-mountain-cat': 3,
          'manul': 1,
          'flat-headed-cat': 0,
          'iberian-lynx': 2
        }
      },
      {
        text: "I master traditional methods before innovating",
        emoji: "📚",
        scores: {
          'iberian-lynx': 5,
          'manul': 5,
          'andean-mountain-cat': 4,
          'flat-headed-cat': 3,
          'fishing-cat': 3,
          'clouded-leopard': 2
        }
      }
    ]
  }
];

export const wildcatResults: Record<string, WildcatResult> = {
  'manul': {
    type: 'manul',
    name: 'Manul (Pallas\'s Cat)',
    headline: 'You Are the Manul (Pallas\'s Cat)!',
    personalityMatch: "",
    conservationStatus: 'Near Threatened',
    funFact: "The mysterious Manul is a master of survival in the harsh steppes and mountains of Central Asia. With their distinctive round face, flat ears, and incredibly dense fur, these small but sturdy cats are perfectly adapted to extreme environments. Despite their cute appearance, they are fierce hunters and skilled observers, patiently waiting for the perfect moment to strike.",
    conservationOrg: {
      name: 'Manul Working Group',
      description: 'This international team of scientists maintains camera trap networks across Central Asia to monitor these elusive cats and develop protection strategies.',
      link: 'http://savemanul.org'
    },
    imageDescription: 'Close-up of a manul with its distinctive round face, flat ears, and intense stare against a rocky, mountainous background.'
  },
  'iberian-lynx': {
    type: 'iberian-lynx',
    name: 'Iberian Lynx',
    headline: 'You Are the Iberian Lynx!',
    personalityMatch: "",
    conservationStatus: 'Endangered',
    funFact: "The elegant Iberian lynx is one of the world's most endangered and distinctive wild cats. Known for their striking spotted coat, distinctive beard-like ruffs, and tufted ears, they move through Mediterranean scrubland with unmatched grace and precision. These skilled hunters are incredibly selective, specializing in hunting rabbits and demonstrating remarkable intelligence in adapting to their changing environment.",
    conservationOrg: {
      name: 'Iberian Lynx Conservation Programme',
      description: 'This collaborative effort between Spain, Portugal, and conservation organizations has brought the Iberian lynx back from the brink of extinction through breeding programs, habitat protection, and wildlife corridors.',
      link: 'https://www.lynxexsitu.es/index.php?id=ing'
    },
    imageDescription: 'Side profile of an Iberian lynx showing its distinctive spotted coat, tufted ears, and beard-like facial ruffs in a Mediterranean scrubland setting.'
  },
  'clouded-leopard': {
    type: 'clouded-leopard',
    name: 'Clouded Leopard',
    headline: 'You Are the Clouded Leopard!',
    personalityMatch: "",
    conservationStatus: 'Vulnerable',
    funFact: "The enigmatic clouded leopard is a marvel of evolution, with the longest canine teeth relative to skull size of any modern cat. Their incredible agility and unique ankle joints allow them to climb down trees headfirst and even hang upside down from branches by their hind feet. These remarkable cats are masters of adaptation, equally comfortable in dense forests, misty mountains, and mangrove swamps.",
    conservationOrg: {
      name: 'Borneo Nature Foundation',
      description: 'A wildlife and biodiversity conservation and research organization that protects and safeguards tropical rainforests and the environment in Borneo.',
      link: 'https://www.borneonaturefoundation.org'
    },
    imageDescription: 'Full-body image of a clouded leopard displaying its distinctive cloud-like coat pattern and long tail, ideally in a tree or forest setting.'
  },
  'flat-headed-cat': {
    type: 'flat-headed-cat',
    name: 'Flat-headed Cat',
    headline: 'You Are the Flat-headed Cat!',
    personalityMatch: "",
    conservationStatus: 'Endangered',
    funFact: "The specialized flat-headed cat is a remarkable aquatic hunter with unique adaptations for fishing. Their streamlined head, partially webbed feet, and sharp, backward-facing teeth are perfectly designed for catching slippery prey in wetland environments. These methodical hunters are so specialized that they spend much of their time near water, demonstrating incredible focus and precision in their hunting techniques.",
    conservationOrg: {
      name: 'Small Wild Cat Conservation Foundation',
      description: 'This foundation supports critical research and protection efforts for the flat-headed cat and other small, lesser-known wild felines that often receive less attention than their larger cousins.',
      link: 'https://smallcats.org'
    },
    imageDescription: 'Close-up of a flat-headed cat showing its distinctive small, flattened head, enlarged eyes, and streamlined appearance near water.'
  },
  'andean-mountain-cat': {
    type: 'andean-mountain-cat',
    name: 'Andean Mountain Cat',
    headline: 'You Are the Andean Mountain Cat!',
    personalityMatch: "",
    conservationStatus: 'Endangered',
    funFact: "The elusive Andean mountain cat is a high-altitude specialist that thrives in one of Earth's most challenging environments. These small but mighty cats navigate rocky slopes and hunt in thin mountain air at elevations up to 15,000 feet, where few other predators dare to venture. Revered as sacred by indigenous Andean communities, they embody the wild spirit of the mountains with their thick ash-gray fur and distinctive ringed tail.",
    conservationOrg: {
      name: 'Andean Cat Alliance',
      description: 'This collaborative network of organizations works across Argentina, Bolivia, Chile, and Peru to study and protect Andean mountain cats through research, education, and community-based conservation initiatives.',
      link: 'https://gatoandino.org/en/home/'
    },
    imageDescription: 'Full-body image of an Andean mountain cat showing its thick fur, distinctive striped tail, and gray/ash coloration against a rocky, high-altitude background.'
  },
  'fishing-cat': {
    type: 'fishing-cat',
    name: 'Fishing Cat',
    headline: 'You Are the Fishing Cat!',
    personalityMatch: "",
    conservationStatus: 'Vulnerable',
    funFact: "The adventurous fishing cat defies typical feline behavior by diving headfirst into water to catch their prey. These skilled swimmers have been known to plunge completely underwater, using their partially webbed paws and strong muscles to chase fish and crustaceans. Their resourceful nature extends beyond hunting, as they've been observed creating fish caches underwater, displaying remarkable planning abilities.",
    conservationOrg: {
      name: 'Fishing Cat Conservation Alliance',
      description: 'This alliance brings together researchers, conservationists, and communities to protect wetland habitats and develop sustainable solutions for human-fishing cat conflict across Asia.',
      link: 'https://fishingcat.org'
    },
    imageDescription: 'Image of a fishing cat near water, showing its stocky build, spotted coat, and partially webbed paws, ideally in a wetland setting.'
  }
};

export const calculateResult = (answers: Record<number, number>): WildcatResult => {
  const scores: Record<WildcatType, number> = {
    'manul': 0,
    'iberian-lynx': 0,
    'clouded-leopard': 0,
    'flat-headed-cat': 0,
    'andean-mountain-cat': 0,
    'fishing-cat': 0
  };

  // Calculate actual scores based on answers
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    const question = questions.find(q => q.id === qId);
    if (question) {
      const answer = question.answers[answerIndex];
      console.log(`Question ${qId}:`, {
        questionText: question.text,
        selectedAnswer: answer.text,
        scores: answer.scores
      });
      Object.entries(answer.scores).forEach(([wildcat, score]) => {
        scores[wildcat as WildcatType] += score;
      });
    }
  });

  console.log('Raw scores after all answers:', scores);

  // Calculate maximum possible scores for each wildcat
  const maxPossibleScores: Record<WildcatType, number> = {
    'manul': 0,
    'iberian-lynx': 0,
    'clouded-leopard': 0,
    'flat-headed-cat': 0,
    'andean-mountain-cat': 0,
    'fishing-cat': 0
  };

  // For each question, add the highest possible score for each wildcat
  questions.forEach(question => {
    Object.keys(maxPossibleScores).forEach(wildcat => {
      const maxScoreForQuestion = Math.max(
        ...question.answers.map(answer => answer.scores[wildcat as WildcatType])
      );
      maxPossibleScores[wildcat as WildcatType] += maxScoreForQuestion;
      console.log(`Max score for ${wildcat} in question "${question.text}":`, maxScoreForQuestion);
    });
  });

  console.log('Maximum possible scores:', maxPossibleScores);

  // Calculate percentages and sort
  const scorePercentages = Object.entries(scores).map(([wildcat, score]) => {
    const maxPossible = maxPossibleScores[wildcat as WildcatType];
    const percentage = Math.round((score / maxPossible) * 100);
    console.log(`${wildcat} calculation:`, {
      score,
      maxPossible,
      percentage: `${percentage}%`
    });
    
    return {
      wildcat,
      score,
      maxPossible,
      percentage
    };
  });

  // Sort by percentage descending
  scorePercentages.sort((a, b) => b.percentage - a.percentage);

  // Log final results
  console.log('Final results:', scorePercentages.map(sp => ({
    wildcat: sp.wildcat,
    percentage: `${sp.percentage}%`,
    score: `${sp.score}/${sp.maxPossible}`
  })));

  // Return the wildcat with the highest percentage
  return wildcatResults[scorePercentages[0].wildcat as WildcatType];
};

interface TraitQuestion {
  questionId: number;
  answerIndex: number;
  score: number;
}

interface TraitScores {
  [trait: string]: TraitQuestion[];
}

interface WildcatTraitScores {
  [wildcat: string]: TraitScores;
}

const wildcatTraitScores: WildcatTraitScores = {
  'manul': {
    'Patient': [
      { questionId: 1, answerIndex: 0, score: 5 },  // patient and strategic
      { questionId: 3, answerIndex: 0, score: 4 }   // stick to what I like
    ],
    // ... rest of manul traits ...
  },
  // ... rest of wildcats ...
};

// Calculate trait scores based on user's answers
export const calculateTraitScores = (type: WildcatType, userAnswers: Record<number, number>) => {
  const traitScores = new Map<string, number>();
  const traits = wildcatTraitScores[type];
  
  Object.entries(traits).forEach(([trait, questions]) => {
    let traitScore = 0;
    let maxPossibleScore = 0;
    
    questions.forEach((q: TraitQuestion) => {
      maxPossibleScore += q.score;
      if (userAnswers[q.questionId] === q.answerIndex) {
        traitScore += q.score;
      }
    });
    
    const percentage = Math.round((traitScore / maxPossibleScore) * 100);
    traitScores.set(trait, percentage);
  });
  
  return Array.from(traitScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([trait, score]) => ({
      name: trait,
      score
    }));
}; 