import React, { useEffect, useState } from 'react'
import './App.css'
import { getApi } from './services/hello'

const App = () => {

  const [message, setMessage] = useState('')

  useEffect(() => {
    getApi().then(message => {
      console.log(message)
      setMessage(message)
    })

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
          </p>
      </header>
    </div>
  )
}

export default App;
