import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Students from './components/Students'
import Classrooms from './components/Classrooms'
import Assignments from './components/Assignments'
import Marking from './components/Marking'
import { Routes, Route } from 'react-router-dom'

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto py-6 px-4">{children}</main>
    </div>
  )
}

function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/classrooms" element={<Classrooms />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/marking" element={<Marking />} />
      </Routes>
    </Shell>
  )
}

export default App
