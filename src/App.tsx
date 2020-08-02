import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fecthQuizQuestions, QuestionState, Difficulty } from './API';
import { GlobalStyle, Wrapper } from './App.styles';



export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
// podemos usar função normal ou arrow function para criar um componente
const App = () => {

  const TOTAL_QUESTIONS = 10;

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fecthQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answer
      const answer = e.currentTarget.value;

      // check answer against the corrent answer
      const correct = questions[number].correct_answer === answer;

      // add score if is correct
      if (correct) setScore(prev => prev + 1);

      // save answer in the array for user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);

    }
  };

  const nextQuestion = () => {
    // next question if not the last
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* <span>Photo by <a href="https://unsplash.com/@jsa_photos?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jorge Sá Pinheiro</a> on <a href="https://unsplash.com/s/photos/angola?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */}
        <h1>ML Angola</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
          (<button className="start"
            onClick={startTrivia}>Start Game</button>
          ) : null
        }
        {!gameOver ? (<p className="score">
          Score: {score}
        </p>) : null}
        {loading ? (<p className="loading">Loading Questions...</p>) : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />)}

        {!loading && !gameOver
          && userAnswers.length === number + 1
          && number !== TOTAL_QUESTIONS - 1 ? (<button className="next" onClick={nextQuestion}>
            Next Question</button>) : null}
      </Wrapper>
    </>
  );
}

export default App;
