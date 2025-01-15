import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'
// import Education from './components/Education'
// import Skills from './components/Skills'
import About from './components/About'
// import Projects from './components/Projects'
import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
