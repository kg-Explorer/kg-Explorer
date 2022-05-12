import React from 'react'

const TestMain = ( {test, click} ) => {
  return (
    <div>
        <div className='testMain'>
            <h1>메인 페이지</h1>
            <h2>여기다 데이터를 불러옵시다!</h2>
            <h2>{test}</h2>
            <button onClick={ () => click()}>버튼</button>
        </div>
    </div>
  )
}

export default TestMain