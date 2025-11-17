import { useEffect, useState } from 'react'

export default function Assignments() {
  const [items, setItems] = useState([])
  const [classes, setClasses] = useState([])
  const [form, setForm] = useState({ class_id: '', title: '', description: '', due_date: '', max_score: 100 })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const res = await fetch(`${baseUrl}/assignments`)
    setItems(await res.json())
    const cls = await fetch(`${baseUrl}/classrooms`).then(r=>r.json()).catch(()=>[])
    setClasses(cls)
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    const payload = { ...form, max_score: Number(form.max_score) || 100 }
    await fetch(`${baseUrl}/assignments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setForm({ class_id: '', title: '', description: '', due_date: '', max_score: 100 })
    load()
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assignments</h2>
      <form onSubmit={submit} className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <select value={form.class_id} onChange={(e)=>setForm({...form, class_id:e.target.value})} className="border rounded px-3 py-2">
          <option value="">Select class</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}{c.section?`-${c.section}`:''}</option>)}
        </select>
        <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="title" className="border rounded px-3 py-2" />
        <input value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="description" className="border rounded px-3 py-2" />
        <input type="date" value={form.due_date} onChange={(e)=>setForm({...form,due_date:e.target.value})} className="border rounded px-3 py-2" />
        <input type="number" value={form.max_score} onChange={(e)=>setForm({...form,max_score:e.target.value})} className="border rounded px-3 py-2" />
        <button className="md:col-span-5 bg-blue-600 text-white rounded px-4 py-2">Add Assignment</button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Title','Class','Due','Max Score'].map(h => <th key={h} className="text-left px-4 py-2 text-gray-600">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map(a => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2">{a.title}</td>
                <td className="px-4 py-2">{a.class_id}</td>
                <td className="px-4 py-2">{a.due_date || '-'}</td>
                <td className="px-4 py-2">{a.max_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
