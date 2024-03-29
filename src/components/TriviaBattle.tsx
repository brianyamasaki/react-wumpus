import { useState, useEffect } from 'react';
import Controller from "../logic/controller";
import { emptyTriviaQuestion } from '../logic/trivia';
import { GameMode } from '../logic/events';

import './TriviaBattle.css';

type Props = {
  title: string;
  controller: Controller;
  mdBattle: GameMode;
}

enum TriviaState {
  normal,
  won,
  lost
};

const TriviaBattle = ({title, controller, mdBattle}:Props) => {
  const [ triviaQuestion, setTriviaQuestion ] = useState(emptyTriviaQuestion);
  const [ triviaState, setTriviaState ] = useState(TriviaState.normal);
  const [ correctAnswers, setCorrectAnswers ] = useState(0);
  const [ incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    setTriviaQuestion(controller.getTriviaQuestion());
  }, [])

  const onClickAnswer = (ichoice: number) => {
    const md = controller.triviaAnswer(ichoice);
    const display = controller.getDisplay();
    setCorrectAnswers(display.triviaQuestionsCorrect);
    setIncorrectAnswers(display.triviaQuestionsIncorrect);
    switch (md) {
      default:
      case GameMode.normal:
        setTriviaQuestion(controller.getTriviaQuestion());
        break;
      case GameMode.triviaBattleWon:
        setTriviaState(TriviaState.won);
        // make wumpus run away
        controller.changeGameMode(GameMode.normal);
        break;
      case GameMode.triviaBattleLost:
        setTriviaState(TriviaState.lost);
        controller.changeGameMode(mdBattle)
        break;
    }
  }

  const renderChoices = () => {
    return (
      triviaQuestion.choices.map((choice, i) => {
        return (
          <li key={choice+i}>
            <button onClick={() => onClickAnswer(i)}>{choice}</button>
          </li>
        )
      }
    )
    );
  }

  const winString = 'You have won the battle';
  const loseString = 'You have lost the battle';

  const renderFinalMessage = () => {
    if (triviaState === TriviaState.normal) return;

    const message = triviaState === TriviaState.won ? winString : loseString;
    return (
      <div>
        <h3>{message}</h3>
        <button>Return to Game</button>
      </div>
    )
  }

  const renderScore = () => (
    <div className="flexy">
      <div>
        <h4>Correct Answers</h4>
        <p>{correctAnswers}</p>
      </div>
      <div>
        <h4>Incorrect Answers</h4>
        <p>{incorrectAnswers}</p>
      </div>
    </div>
  )

  const renderTriviaQuestion = () => {
    return (
      <>
        <h4>{triviaQuestion.question}</h4>
        <ol type='a'>
          {renderChoices()}
        </ol>
        {renderFinalMessage()}
        {renderScore()}
      </>
    )
  }
  
  return (
    <div className='trivia-battle'>
      <h3>{title}</h3>
      {renderTriviaQuestion()}
    </div>
  )
}

export default TriviaBattle;