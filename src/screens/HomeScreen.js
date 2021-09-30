import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

const HomeScreen = ({ history }) => {
  const [user, setUser] = useState()

  const submitHandler = (e) => {
    e.preventDefault()
    
    history.push(`/${user}`)
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group
          className='mb-3'
          controlId='exampleForm.ControlInput1'
        >
          <Form.Control
            type='text'
            placeholder='Codeforces User Handle'
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </>
  )
}

export default HomeScreen
