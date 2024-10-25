import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <Home />
   </Fragment>
  )
}

export default App
