import React from 'react'

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
    if (answer === null) {
        return <div></div>
    }

    if (index < numQuestions - 1) return (
        <div>
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>
                Next
            </button>
        </div>
    )

    if (index === numQuestions - 1) return (
        <div>
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'finished' })}>
                Finish
            </button>
        </div>
    )
}

export default NextButton
