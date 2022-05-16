import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

const Test = () => {
  return (
    <div className='testContainer'>
      <div className='input'>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
        </InputGroup>
      </div>
      <div className='middleBoxCotainer'>
        <div className='middle'>11</div>
        <div className='middle'>22</div>
        <div className='middle'>33</div>
      </div>
      <div className='boxContainer'>
        <div className='box1'>
            box1
        </div>
        <div className='box2'>
            box2
        </div>
      </div>
    </div>
  )
}

export default Test