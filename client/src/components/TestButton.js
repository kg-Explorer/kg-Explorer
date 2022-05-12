import React from 'react'

const TestButton = ( {click} ) => {
  return (
    <div>
        <button onClick={ () => click()}>버튼</button>
    </div>
  )
}

export default TestButton