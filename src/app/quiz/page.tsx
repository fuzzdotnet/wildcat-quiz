'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useQuiz } from '@/context/QuizContext';
import { questions, calculateResult, calculateTraitScores } from '@/lib/quizData';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import Question from '@/components/Question';
import EmailForm from '@/components/EmailForm';
import Results from '@/components/Results';

const wildcatImages = {
  'manul': '/images/wildcats/manul.jpg',
  'iberian-lynx': '/images/wildcats/iberian-lynx.jpg',
  'clouded-leopard': '/images/wildcats/clouded-leopard.jpg',
  'flat-headed-cat': '/images/wildcats/flat-headed-cat.jpg',
  'andean-mountain-cat': '/images/wildcats/andean-mountain-cat.jpg',
  'fishing-cat': '/images/wildcats/fishing-cat.jpg'
} as const;

export default function QuizPage() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();

  // Initialize quiz state
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (!savedProgress) {
      console.log('No saved progress found, starting fresh quiz');
      dispatch({ type: 'RESET_QUIZ' });
    } else {
      console.log('Found saved progress:', savedProgress);
      try {
        const { answers, currentQuestionIndex } = JSON.parse(savedProgress);
        Object.entries(answers).forEach(([questionId, answerIndex]) => {
          dispatch({
            type: 'SET_ANSWER',
            questionId: parseInt(questionId),
            answerIndex: answerIndex as number,
          });
        });
        dispatch({ type: 'SET_CURRENT_QUESTION', currentQuestionIndex });
      } catch (error) {
        console.error('Error loading saved progress:', error);
        localStorage.removeItem('quizProgress');
        dispatch({ type: 'RESET_QUIZ' });
      }
    }
  }, []);

  useEffect(() => {
    console.log('Current state:', {
      currentQuestionIndex: state.currentQuestionIndex,
      answers: state.answers,
      questions: questions,
      currentQuestion: questions[state.currentQuestionIndex]
    });
  }, [state]);

  // Save progress when it changes
  useEffect(() => {
    if (Object.keys(state.answers).length > 0) {
      localStorage.setItem(
        'quizProgress',
        JSON.stringify({
          answers: state.answers,
          currentQuestionIndex: state.currentQuestionIndex,
        })
      );

      // Preload result images when user is on the last question
      if (state.currentQuestionIndex === questions.length - 1) {
        Object.values(wildcatImages).forEach(imageSrc => {
          const img = new Image();
          img.src = imageSrc;
        });
      }
    }
  }, [state.answers, state.currentQuestionIndex]);

  const currentQuestion = questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
  const showEmailForm = isLastQuestion && currentQuestion && state.answers[currentQuestion.id] !== undefined;
  const showResults = state.result !== undefined;

  // Show loading state if questions aren't loaded yet
  if (!questions || questions.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
          <div className="container mx-auto px-4 py-12 text-center">
            <div className="animate-pulse">Loading quiz...</div>
          </div>
        </div>
      </>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentQuestion) return;
    dispatch({
      type: 'SET_ANSWER',
      questionId: currentQuestion.id,
      answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      return;
    }
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handlePreviousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const handleEmailSubmit = (email: string, newsletterOptIn: boolean) => {
    dispatch({ type: 'SET_EMAIL', email });
    dispatch({ type: 'SET_NEWSLETTER_OPT_IN', optIn: newsletterOptIn });
    const result = calculateResult(state.answers);
    dispatch({ type: 'SET_RESULT', result });
  };

  const handleSkip = () => {
    const result = calculateResult(state.answers);
    dispatch({ type: 'SET_RESULT', result });
  };

  const handleShare = async () => {
    if (!state.result) return;

    // Get the match percentage from the result
    const result = calculateResult(state.answers);
    const topTraits = calculateTraitScores(result.type, state.answers);
    const traitsText = topTraits.map(t => t.name).join(' & ');

    const shareData = {
      title: `🐱 I'm a ${state.result.name}! My top traits are ${traitsText}!`,
      text: `I took the FUZZ wildcat quiz and discovered I'm a ${state.result.name} with ${traitsText} traits! Take the quiz to discover your secret wildcat twin and learn how to help protect these amazing cats.`,
      url: 'https://catquiz.fuzz.net',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Ignore AbortError when user cancels share dialog
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          // Fallback to clipboard
          await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`);
          alert('Share link copied to clipboard!');
        }
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`);
        alert('Share link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Unable to share or copy link. Please try again.');
      }
    }
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem('quizProgress');
    dispatch({ type: 'RESET_QUIZ' });
    router.push('/');
  };

  if (showResults && state.result) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 py-12">
          <Results
            result={state.result}
            answers={state.answers}
            onRetakeQuiz={handleRetakeQuiz}
            onShare={handleShare}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <ProgressBar
              currentStep={state.currentQuestionIndex + 1}
              totalSteps={questions.length}
            />
          </div>

          <AnimatePresence mode="wait">
            {showEmailForm ? (
              <EmailForm 
                onSubmit={handleEmailSubmit} 
                onSkip={handleSkip}
                result={calculateResult(state.answers)}
              />
            ) : currentQuestion ? (
              <Question
                question={currentQuestion}
                selectedAnswer={state.answers[currentQuestion.id]}
                onAnswerSelect={handleAnswerSelect}
              />
            ) : null}
          </AnimatePresence>

          {!showEmailForm && currentQuestion && (
            <div className="flex justify-between mt-8 max-w-2xl mx-auto">
              <button
                onClick={handlePreviousQuestion}
                disabled={state.currentQuestionIndex === 0}
                className={`btn-secondary inline-flex items-center ${
                  state.currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Previous
              </button>

              {state.answers[currentQuestion.id] !== undefined && !isLastQuestion && (
                <button
                  onClick={handleNextQuestion}
                  className="btn-primary inline-flex items-center"
                >
                  Next
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 