import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContentCard from './Components/Layout/ContentCard'
import Header from './Components/Layout/Header'
import Calculator from './Components/Calculator/Calculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <div> 
    <ContentCard>
      <Calculator />
    </ContentCard>
    </div>
    </>
  )
}

export default App
