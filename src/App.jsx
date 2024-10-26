import { Fragment, useState } from 'react'

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
