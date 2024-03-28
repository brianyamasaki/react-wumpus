import triviaquestions from './data/trivia.json'

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

  constructor(minSuccess:number, maxQuestions: number) {
    this.minSuccess = minSuccess;
    this.maxQuestions = maxQuestions;
    this.currentQuestion = 0;
    this.questions = triviaquestions;
  }

  getQuestion():TriviaQuestion {
    return this.questions[this.currentQuestion];
  }

  randomQuestion(): TriviaQuestion {
    const iq = this.currentQuestion = Math.trunc(Math.random() * this.questions.length);
    return this.questions[iq];
  }
}