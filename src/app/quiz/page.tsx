'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useQuiz } from '@/context/QuizContext';
import { questions, calculateResult } from '@/lib/quizData';
import ProgressBar from '@/components/ProgressBar';
import Question from '@/components/Question';
import EmailForm from '@/components/EmailForm';
import Results from '@/components/Results';

export default function QuizPage() {
  const router = useRouter();
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    // Load progress from localStorage if it exists
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const { answers, currentQuestionIndex } = JSON.parse(savedProgress);
      Object.entries(answers).forEach(([questionId, answerIndex]) => {
        dispatch({
          type: 'SET_ANSWER',
          questionId: parseInt(questionId),
          answerIndex: answerIndex as number,
        });
      });
      dispatch({ type: 'SET_CURRENT_QUESTION', currentQuestionIndex });
    }
  }, [dispatch]);

  useEffect(() => {
    // Save progress to localStorage
    if (Object.keys(state.answers).length > 0) {
      localStorage.setItem(
        'quizProgress',
        JSON.stringify({
          answers: state.answers,
          currentQuestionIndex: state.currentQuestionIndex,
        })
      );
    }
  }, [state.answers, state.currentQuestionIndex]);

  const currentQuestion = questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
  const showEmailForm = isLastQuestion && state.answers[currentQuestion.id] !== undefined;
  const showResults = state.result !== undefined;

  const handleAnswerSelect = (answerIndex: number) => {
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

    const shareData = {
      title: `I'm a ${state.result.name}! Which endangered wildcat are you?`,
      text: `Take the FUZZ wildcat personality quiz to discover your wildcat match and learn how to help save these amazing animals.`,
      url: window.location.href,
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
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 py-12">
        <Results
          result={state.result}
          answers={state.answers}
          onRetakeQuiz={handleRetakeQuiz}
          onShare={handleShare}
        />
      </div>
    );
  }

  return (
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
            <EmailForm onSubmit={handleEmailSubmit} onSkip={handleSkip} />
          ) : (
            <Question
              question={currentQuestion}
              selectedAnswer={state.answers[currentQuestion.id]}
              onAnswerSelect={handleAnswerSelect}
            />
          )}
        </AnimatePresence>

        {!showEmailForm && (
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
  );
} 