import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Teacher from './components/Teacher'
import { Contact } from './components/Contact'
import Course from './components/Course'
import Introduction from './components/Introduction'

function App() {
  return (
    <>
      <Introduction />
      <Course />
      <Teacher />
      <Contact />
    </>
  )
}

export default App
