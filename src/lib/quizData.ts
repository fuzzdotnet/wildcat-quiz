import { Question, WildcatResult } from '@/types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    text: "How would your friends describe your social style?",
    answers: [
      {
        text: "I'm the life of the party and love being surrounded by people",
        scores: {
          'fishing-cat': 2,
          'clouded-leopard': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      },
      {
        text: "I have a small, tight-knit circle of close friends",
        scores: {
          'iberian-lynx': 2,
          'andean-mountain-cat': 1,
          'manul': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "I'm selective about who I spend time with",
        scores: {
          'manul': 2,
          'flat-headed-cat': 1,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "I prefer my own company and need lots of alone time",
        scores: {
          'manul': 2,
          'andean-mountain-cat': 1,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      }
    ]
  },
  {
    id: 2,
    text: "When facing a challenge, you typically:",
    answers: [
      {
        text: "Tackle it head-on with speed and strength",
        scores: {
          'fishing-cat': 2,
          'iberian-lynx': 1,
          'manul': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      },
      {
        text: "Analyze the situation carefully before acting",
        scores: {
          'flat-headed-cat': 2,
          'clouded-leopard': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Find a creative workaround",
        scores: {
          'clouded-leopard': 2,
          'fishing-cat': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      },
      {
        text: "Patiently wait for the right moment",
        scores: {
          'manul': 2,
          'andean-mountain-cat': 1,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      }
    ]
  },
  {
    id: 3,
    text: "Your ideal home would be:",
    answers: [
      {
        text: "A bustling city apartment with plenty of action nearby",
        scores: {
          'fishing-cat': 2,
          'clouded-leopard': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      },
      {
        text: "A comfortable house in a quiet suburb with a garden",
        scores: {
          'iberian-lynx': 2,
          'flat-headed-cat': 1,
          'manul': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "A remote cabin surrounded by wilderness",
        scores: {
          'andean-mountain-cat': 2,
          'iberian-lynx': 1,
          'manul': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "A cozy den hidden away from the world",
        scores: {
          'manul': 2,
          'flat-headed-cat': 1,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      }
    ]
  },
  {
    id: 4,
    text: "In difficult weather conditions, you:",
    answers: [
      {
        text: "Retreat indoors until it passes",
        scores: {
          'flat-headed-cat': 2,
          'fishing-cat': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'andean-mountain-cat': 0,
          'clouded-leopard': 0
        }
      },
      {
        text: "Adapt and continue your routine with minor adjustments",
        scores: {
          'clouded-leopard': 2,
          'iberian-lynx': 1,
          'manul': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Embrace it - harsh conditions bring out your resilience",
        scores: {
          'manul': 2,
          'andean-mountain-cat': 2,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Use it to your advantage somehow",
        scores: {
          'fishing-cat': 2,
          'clouded-leopard': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      }
    ]
  },
  {
    id: 5,
    text: "When it comes to trying new foods, you are:",
    answers: [
      {
        text: "Adventurous - I'll try anything once",
        scores: {
          'clouded-leopard': 2,
          'fishing-cat': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      },
      {
        text: "Particular about what I like, but occasionally try new things",
        scores: {
          'iberian-lynx': 2,
          'andean-mountain-cat': 1,
          'manul': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Cautious - I need to know what's in it first",
        scores: {
          'flat-headed-cat': 2,
          'iberian-lynx': 1,
          'manul': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "A creature of habit with my favorite meals",
        scores: {
          'manul': 2,
          'flat-headed-cat': 1,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      }
    ]
  },
  {
    id: 6,
    text: "What's your ideal environment for getting things done?",
    answers: [
      {
        text: "High up with a great view of everything below",
        scores: {
          'clouded-leopard': 2,
          'andean-mountain-cat': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Near water or in a humid environment",
        scores: {
          'fishing-cat': 2,
          'flat-headed-cat': 2,
          'manul': 0,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0
        }
      },
      {
        text: "Wide open spaces with room to roam",
        scores: {
          'iberian-lynx': 2,
          'andean-mountain-cat': 1,
          'manul': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "A protected, cozy space away from distractions",
        scores: {
          'manul': 2,
          'flat-headed-cat': 1,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Anywhere as long as there are resources nearby",
        scores: {
          'fishing-cat': 2,
          'clouded-leopard': 1,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      }
    ]
  },
  {
    id: 7,
    text: "Your most dominant personality trait is:",
    answers: [
      {
        text: "Resilience - I can weather any storm",
        scores: {
          'manul': 3,
          'andean-mountain-cat': 2,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Adaptability - I thrive in changing circumstances",
        scores: {
          'clouded-leopard': 3,
          'fishing-cat': 2,
          'manul': 0,
          'iberian-lynx': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0
        }
      },
      {
        text: "Mystery - People find me intriguing and hard to read",
        scores: {
          'flat-headed-cat': 3,
          'manul': 2,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Intelligence - I rely on my wits to navigate challenges",
        scores: {
          'iberian-lynx': 3,
          'clouded-leopard': 2,
          'manul': 0,
          'flat-headed-cat': 0,
          'andean-mountain-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Independence - I forge my own path",
        scores: {
          'andean-mountain-cat': 3,
          'manul': 2,
          'iberian-lynx': 0,
          'clouded-leopard': 0,
          'flat-headed-cat': 0,
          'fishing-cat': 0
        }
      },
      {
        text: "Patience - Good things come to those who wait",
        scores: {
          'fishing-cat': 3,
          'flat-headed-cat': 2,
          'manul': 0,
          'iberian-lynx': 0,
          'andean-mountain-cat': 0,
          'clouded-leopard': 0
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
      link: 'https://www.lynxexsitu.es'
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
      name: 'Clouded Leopard Project',
      description: 'This organization conducts crucial research, supports anti-poaching efforts, and works with local communities across Southeast Asia to protect clouded leopards and their forest habitat.',
      link: 'https://www.cloudedleopard.org'
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
      link: 'https://andescatalliance.org'
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
  const scores: Record<string, number> = {
    'manul': 0,
    'iberian-lynx': 0,
    'clouded-leopard': 0,
    'flat-headed-cat': 0,
    'andean-mountain-cat': 0,
    'fishing-cat': 0
  };

  // Calculate scores for each wildcat based on answers
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    const question = questions.find(q => q.id === qId);
    if (question) {
      const answer = question.answers[answerIndex];
      Object.entries(answer.scores).forEach(([wildcat, score]) => {
        let adjustedScore = score;
        
        // Adjust scores based on question type
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
        
        scores[wildcat] += adjustedScore;
      });
    }
  });

  // Find the wildcat with the highest score
  const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  return wildcatResults[winner];
};

// Simulation function to compare scoring systems
function simulateScoring(testAnswers: Record<number, number>) {
  // Current scoring
  const currentScores = calculateResult(testAnswers);
  
  // Calculate detailed scores for all cats
  const detailedScores: Record<string, { total: number, breakdown: Record<number, number> }> = {
    'manul': { total: 0, breakdown: {} },
    'iberian-lynx': { total: 0, breakdown: {} },
    'clouded-leopard': { total: 0, breakdown: {} },
    'flat-headed-cat': { total: 0, breakdown: {} },
    'andean-mountain-cat': { total: 0, breakdown: {} },
    'fishing-cat': { total: 0, breakdown: {} }
  };

  Object.entries(testAnswers).forEach(([questionId, answerIndex]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question) {
      const answer = question.answers[answerIndex];
      Object.entries(answer.scores).forEach(([wildcat, score]) => {
        detailedScores[wildcat].total += score;
        detailedScores[wildcat].breakdown[question.id] = score;
      });
    }
  });

  return {
    winner: currentScores,
    allScores: detailedScores
  };
}

function simulateProposedScoring(testAnswers: Record<number, number>) {
  const proposedScores: Record<string, { total: number, breakdown: Record<number, number> }> = {
    'manul': { total: 0, breakdown: {} },
    'iberian-lynx': { total: 0, breakdown: {} },
    'clouded-leopard': { total: 0, breakdown: {} },
    'flat-headed-cat': { total: 0, breakdown: {} },
    'andean-mountain-cat': { total: 0, breakdown: {} },
    'fishing-cat': { total: 0, breakdown: {} }
  };

  // Proposed scoring rules:
  // Q1-5: Primary match = 2, Secondary match = 0 (no partial points)
  // Q6 (Environment): Primary match = 3, Secondary match = 0
  // Q7 (Personality): Primary match = 4, Secondary match = 1

  Object.entries(testAnswers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    const question = questions.find(q => q.id === qId);
    if (question) {
      const answer = question.answers[answerIndex];
      Object.entries(answer.scores).forEach(([wildcat, score]) => {
        let adjustedScore = score;
        
        // Adjust scores based on question
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
        
        proposedScores[wildcat].total += adjustedScore;
        proposedScores[wildcat].breakdown[qId] = adjustedScore;
      });
    }
  });

  // Find winner
  const winner = Object.entries(proposedScores)
    .reduce((a, b) => a[1].total > b[1].total ? a : b)[0];

  return {
    winner: wildcatResults[winner],
    allScores: proposedScores
  };
}

// Test cases
const testCases = [
  {
    name: "Strong Manul Traits",
    answers: {
      1: 3, // Prefers alone time
      2: 3, // Patient
      3: 3, // Cozy den
      4: 2, // Embraces harsh conditions
      5: 3, // Creature of habit
      6: 3, // Protected space
      7: 0  // Resilient
    }
  },
  {
    name: "Mixed Fishing/Clouded Traits",
    answers: {
      1: 0, // Social
      2: 2, // Creative
      3: 0, // City
      4: 1, // Adapt
      5: 0, // Adventurous
      6: 1, // Water
      7: 1  // Adaptable
    }
  },
  {
    name: "Balanced Traits",
    answers: {
      1: 1, // Small circle
      2: 1, // Analytical
      3: 1, // Suburbs
      4: 1, // Adapt
      5: 1, // Particular
      6: 2, // Open spaces
      7: 3  // Mystery
    }
  }
];

console.log("=== Current Scoring System Simulation ===");
testCases.forEach(test => {
  console.log(`\nTest Case: ${test.name}`);
  const result = simulateScoring(test.answers);
  console.log("Winner:", result.winner.name);
  console.log("All Scores:", Object.entries(result.allScores)
    .map(([cat, data]) => `${cat}: ${data.total} (${Object.entries(data.breakdown)
      .map(([q, s]) => `Q${q}:${s}`).join(", ")})`).join("\n"));
});

console.log("\n=== Proposed Scoring System Simulation ===");
testCases.forEach(test => {
  console.log(`\nTest Case: ${test.name}`);
  const result = simulateProposedScoring(test.answers);
  console.log("Winner:", result.winner.name);
  console.log("All Scores:", Object.entries(result.allScores)
    .map(([cat, data]) => `${cat}: ${data.total} (${Object.entries(data.breakdown)
      .map(([q, s]) => `Q${q}:${s}`).join(", ")})`).join("\n"));
}); 