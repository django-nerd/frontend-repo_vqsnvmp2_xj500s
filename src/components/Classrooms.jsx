import { useEffect, useState } from 'react'

export default function Classrooms() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', section: '', subject: '', teacher_name: '', academic_year: '' })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const res = await fetch(`${baseUrl}/classrooms`)
    setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/classrooms`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ name: '', section: '', subject: '', teacher_name: '', academic_year: '' })
    load()
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Classes</h2>
      <form onSubmit={submit} className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {['name','section','subject','teacher_name','academic_year'].map((k) => (
          <input key={k} value={form[k]} onChange={(e)=>setForm({...form,[k]:e.target.value})} placeholder={k.replace('_',' ')} className="border rounded px-3 py-2" />
        ))}
        <button className="md:col-span-5 bg-blue-600 text-white rounded px-4 py-2">Add Class</button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Name','Section','Subject','Teacher','Year'].map(h => <th key={h} className="text-left px-4 py-2 text-gray-600">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.section || '-'}</td>
                <td className="px-4 py-2">{c.subject || '-'}</td>
                <td className="px-4 py-2">{c.teacher_name || '-'}</td>
                <td className="px-4 py-2">{c.academic_year || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
