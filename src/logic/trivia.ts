import triviaquestions from './data/trivia.json'
import { GameMode } from './events';

export type TriviaQuestion = {
  question: string;
  choices: string[];
  answer: number;
}

export const emptyTriviaQuestion: TriviaQuestion = {
  question: '',
  choices: [],
  answer: 0
}

export default class Trivia {
  private minSuccess: number;
  private maxQuestions: number;
  private currentQuestion:number;
  private questions:TriviaQuestion[];
  private correctAnswers: number = 0;
  private incorrectAnswers: number = 0;

  constructor(minSuccess:number, maxQuestions: number) {
    this.minSuccess = minSuccess;
    this.maxQuestions = maxQuestions;
    this.currentQuestion = 0;
    this.questions = triviaquestions;
  }

  correctAnswerCount() {
    return this.correctAnswers;
  }

  incorrectAnswerCount() {
    return this.incorrectAnswers;
  }

  getQuestion():TriviaQuestion {
    return this.questions[this.currentQuestion];
  }

  randomQuestion(): TriviaQuestion {
    const iq = this.currentQuestion = Math.trunc(Math.random() * this.questions.length);
    return this.questions[iq];
  }

  triviaAnswer(ichoice:number): GameMode {
    if (ichoice === this.questions[this.currentQuestion].answer) {
      this.correctAnswers += 1;
      if (this.correctAnswers === this.minSuccess) {
        return GameMode.triviaBattleWon;
      }
    } else {
      this.incorrectAnswers += 1;
      if (this.incorrectAnswers > this.maxQuestions - this.minSuccess) {
        return GameMode.triviaBattleLost;
      }
    }
    return GameMode.normal;
  }
}