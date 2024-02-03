import React from 'react'
import Options from './Options'

const Questions = ({question, answer, dispatch}) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Questions
