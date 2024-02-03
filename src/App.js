import { useEffect, useReducer } from 'react';
import Main from './Components/Main';
import Header from './Header'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './Components/StartScreen';
import Questions from './Components/Questions';
import NextButton from './Components/NextButton';
import Progress from './Components/Progress';
import FinishScreen from './Components/FinishScreen';
import Footer from './Components/Footer';
import Timer from './Components/Timer';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // Loading, 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case "dataFailed":
      return {
        ...state,
        status: 'error',
      }
    case "start":
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,

      }
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        highscore: state.points > state.highscore ? state.points : state.highscore,
      }

    case "finished":
      return {
        ...state,
        status: "finished",
      }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready"
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
    default:
      throw new Error("Action is Unknown")
  }
}

function App() {

  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch(`http://localhost:5000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
        {status === 'active' &&
          <>
            <Progress index={index} answer={answer} maxPossiblePoints={maxPossiblePoints} points={points} numQuestions={numQuestions} />
            <Questions question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        }
        {status === 'finished' && (
          <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
