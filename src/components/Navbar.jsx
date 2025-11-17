import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ to, label }) => {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
      }`}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold">S</div>
            <span className="text-xl font-semibold text-gray-800">Student Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <NavItem to="/" label="Dashboard" />
            <NavItem to="/students" label="Students" />
            <NavItem to="/classrooms" label="Classes" />
            <NavItem to="/assignments" label="Assignments" />
            <NavItem to="/marking" label="Marking" />
          </div>
        </div>
      </div>
    </nav>
  )
}
