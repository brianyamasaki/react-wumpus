import triviaquestions from './data/trivia.json'

type TriviaQuestion = {
  question: string;
  choices: string[];
  answer: number;
}

export default class Trivia {
  private currentQuestion:number;
  private questions:TriviaQuestion[];

  constructor() {
    this.currentQuestion = 0;
    this.questions = triviaquestions;
  }

  getQuestion():TriviaQuestion {
    return this.questions[this.currentQuestion];
  }
}