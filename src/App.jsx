import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() =>{
   navigate("/login")
  }, [])

  return (
    <>
      Loading
    </>
  )
}

export default App
