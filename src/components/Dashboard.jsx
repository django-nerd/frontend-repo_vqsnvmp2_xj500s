import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, classes: 0, assignments: 0, grades: 0 })

  useEffect(() => {
    const load = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const [students, classes, assignments, grades] = await Promise.all([
        fetch(`${baseUrl}/students`).then(r => r.json()).catch(() => []),
        fetch(`${baseUrl}/classrooms`).then(r => r.json()).catch(() => []),
        fetch(`${baseUrl}/assignments`).then(r => r.json()).catch(() => []),
        fetch(`${baseUrl}/grades`).then(r => r.json()).catch(() => []),
      ])
      setStats({
        students: students.length || 0,
        classes: classes.length || 0,
        assignments: assignments.length || 0,
        grades: grades.length || 0,
      })
    }
    load()
  }, [])

  const cards = [
    { label: 'Students', value: stats.students, color: 'from-blue-500 to-indigo-500' },
    { label: 'Classes', value: stats.classes, color: 'from-emerald-500 to-teal-500' },
    { label: 'Assignments', value: stats.assignments, color: 'from-amber-500 to-orange-500' },
    { label: 'Grades', value: stats.grades, color: 'from-fuchsia-500 to-pink-500' },
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-br ${c.color}`}>
            <div className="text-4xl font-bold">{c.value}</div>
            <div className="opacity-90">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
