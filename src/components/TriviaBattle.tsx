import { useState, useEffect } from 'react';
import Controller from "../logic/controller";
import { emptyTriviaQuestion } from '../logic/trivia';

type Props = {
  controller: Controller;
}

const TriviaBattle = ({controller}:Props) => {
  const [ triviaQuestion, setTriviaQuestion ] = useState(emptyTriviaQuestion);

  useEffect(() => {
    setTriviaQuestion(controller.getTriviaQuestion());
  }, [])

  const renderTriviaQuestion = () => {
    return (
      <>
        <h4>{triviaQuestion.question}</h4>
        <ol type='a'>
          {triviaQuestion.choices.map(choice => (<li key={choice}>{choice}</li>))}
        </ol>
      </>
    )
  }
  
  return (
    <>
      <h3>Trivia Battle Goes Here</h3>
      {renderTriviaQuestion()}
    </>
  )
}

export default TriviaBattle;