import { useEffect, useState } from 'react'

export default function Students() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', roll_number: '', class_id: '' })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const res = await fetch(`${baseUrl}/students`)
    setStudents(await res.json())
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${baseUrl}/students`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ first_name: '', last_name: '', email: '', roll_number: '', class_id: '' })
    load()
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Students</h2>
      <form onSubmit={submit} className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {['first_name','last_name','email','roll_number','class_id'].map((k) => (
          <input key={k} required={k!== 'class_id'} value={form[k]} onChange={(e)=>setForm({...form,[k]:e.target.value})} placeholder={k.replace('_',' ')} className="border rounded px-3 py-2" />
        ))}
        <button className="md:col-span-5 bg-blue-600 text-white rounded px-4 py-2">Add Student</button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Name','Email','Roll','Class'].map(h => <th key={h} className="text-left px-4 py-2 text-gray-600">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-2">{s.first_name} {s.last_name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.roll_number}</td>
                <td className="px-4 py-2">{s.class_id || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
