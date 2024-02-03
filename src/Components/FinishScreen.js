import React from 'react'

const FinishScreen = ({ points, maxPossiblePoints, highscore, dispatch }) => {
    const percentage = points / maxPossiblePoints * 100;

    let emoji;
    if (percentage === 100) emoji = '🥇'
    if (percentage >= 80 && percentage < 100) emoji = '🎉'
    if (percentage >= 50 && percentage < 80) emoji = '😊'
    if (percentage >= 0 && percentage < 50) emoji = '☹️'
    if (percentage >= 0 && percentage < 50) emoji = '🤦'

    return (
        <div>
            <p className='result'>You Scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%) </p>
            <p className='highscore'>
                (HighScore: {highscore} points)
            </p>
            <div>
                <button className='btn btn-ui' onClick={() => dispatch({ type: 'restart' })}>
                    Restart Quiz
                </button>
            </div>
        </div>


    )
}

export default FinishScreen
