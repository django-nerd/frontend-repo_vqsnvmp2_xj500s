import { useEffect, useState } from 'react'

export default function Marking() {
  const [students, setStudents] = useState([])
  const [assignments, setAssignments] = useState([])
  const [form, setForm] = useState({ student_id: '', assignment_id: '', score: '', max_score: '', remarks: '' })
  const [grades, setGrades] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const s = await fetch(`${baseUrl}/students`).then(r=>r.json()).catch(()=>[])
    const a = await fetch(`${baseUrl}/assignments`).then(r=>r.json()).catch(()=>[])
    const g = await fetch(`${baseUrl}/grades`).then(r=>r.json()).catch(()=>[])
    setStudents(s); setAssignments(a); setGrades(g)
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, score: Number(form.score), max_score: form.max_score ? Number(form.max_score) : undefined }
    await fetch(`${baseUrl}/grades`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setForm({ student_id: '', assignment_id: '', score: '', max_score: '', remarks: '' })
    load()
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Marking</h2>
      <form onSubmit={submit} className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">
        <select value={form.student_id} onChange={(e)=>setForm({...form, student_id: e.target.value})} className="border rounded px-3 py-2">
          <option value="">Select student</option>
          {students.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
        </select>
        <select value={form.assignment_id} onChange={(e)=>setForm({...form, assignment_id: e.target.value})} className="border rounded px-3 py-2">
          <option value="">Select assignment</option>
          {assignments.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
        </select>
        <input type="number" value={form.score} onChange={(e)=>setForm({...form, score:e.target.value})} placeholder="score" className="border rounded px-3 py-2" />
        <input type="number" value={form.max_score} onChange={(e)=>setForm({...form, max_score:e.target.value})} placeholder="max score (optional)" className="border rounded px-3 py-2" />
        <input value={form.remarks} onChange={(e)=>setForm({...form, remarks:e.target.value})} placeholder="remarks" className="border rounded px-3 py-2 md:col-span-2" />
        <button className="md:col-span-6 bg-blue-600 text-white rounded px-4 py-2">Save Grade</button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Student','Assignment','Score','Max','Remarks'].map(h => <th key={h} className="text-left px-4 py-2 text-gray-600">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {grades.map(g => (
              <tr key={g.id} className="border-t">
                <td className="px-4 py-2">{students.find(s=>s.id===g.student_id)?.first_name} {students.find(s=>s.id===g.student_id)?.last_name}</td>
                <td className="px-4 py-2">{assignments.find(a=>a.id===g.assignment_id)?.title}</td>
                <td className="px-4 py-2">{g.score}</td>
                <td className="px-4 py-2">{g.max_score || assignments.find(a=>a.id===g.assignment_id)?.max_score}</td>
                <td className="px-4 py-2">{g.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
