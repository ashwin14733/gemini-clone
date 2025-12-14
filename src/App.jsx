import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { assets } from './assets/assets'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
function App() {

  return (
    <>

      <Sidebar></Sidebar>
      <Main></Main>
    </>
  )
}

export default App
