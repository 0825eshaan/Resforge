import { useState, useRef, useEffect } from "react"

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: ""
  })

  const [template, setTemplate] = useState("modern")
  const resumeRef = useRef()

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Error parsing saved resume data", e)
      }
    }
  }, [])

  const handleChange = e => {
    const newData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newData)
    localStorage.setItem("resumeData", JSON.stringify(newData))
  }

  const handleTemplateChange = e => setTemplate(e.target.value)

  const downloadPDF = () => {
    if (!resumeRef.current) return
    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    }
    // html2pdf is available globally if script tag was added to index.html
    window.html2pdf().set(opt).from(resumeRef.current).save()
  }
  

  // Function to clear all data
  const clearData = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      education: "",
      experience: "",
      skills: ""
    })
    localStorage.removeItem("resumeData")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Resume Builder</h1>
        <input 
          className="w-full border p-2 rounded" 
          name="name" 
          placeholder="Name" 
          value={formData.name}
          onChange={handleChange} 
        />
        <input 
          className="w-full border p-2 rounded" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange} 
        />
        <input 
          className="w-full border p-2 rounded" 
          name="phone" 
          placeholder="Phone" 
          value={formData.phone}
          onChange={handleChange} 
        />
        <textarea 
          className="w-full border p-2 rounded" 
          name="education" 
          placeholder="Education" 
          rows={3} 
          value={formData.education}
          onChange={handleChange} 
        />
        <textarea 
          className="w-full border p-2 rounded" 
          name="experience" 
          placeholder="Experience" 
          rows={3} 
          value={formData.experience}
          onChange={handleChange} 
        />
        <textarea 
          className="w-full border p-2 rounded" 
          name="skills" 
          placeholder="Skills" 
          rows={2} 
          value={formData.skills}
          onChange={handleChange} 
        />
        <select 
          className="w-full border p-2 rounded" 
          value={template} 
          onChange={handleTemplateChange}
        >
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
          <option value="creative">Creative</option>
        </select>
        <div className="flex space-x-2">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={clearData}
          >
            Clear Data
          </button>
        </div>
      </div>

      <div className="border p-4 rounded shadow bg-white" ref={resumeRef}>
        {template === "modern" && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold">{formData.name}</h2>
            <p>{formData.email} | {formData.phone}</p>
            <hr />
            <p><strong>Education:</strong> {formData.education}</p>
            <p><strong>Experience:</strong> {formData.experience}</p>
            <p><strong>Skills:</strong> {formData.skills}</p>
          </div>
        )}
        {template === "minimal" && (
          <div className="space-y-1 text-sm">
            <div className="font-semibold">{formData.name}</div>
            <div>{formData.email} • {formData.phone}</div>
            <div><strong>Education:</strong> {formData.education}</div>
            <div><strong>Experience:</strong> {formData.experience}</div>
            <div><strong>Skills:</strong> {formData.skills}</div>
          </div>
        )}
        {template === "creative" && (
          <div className="bg-blue-100 p-2 rounded">
            <h2 className="text-2xl font-bold text-blue-800">{formData.name}</h2>
            <p className="italic">{formData.email} | {formData.phone}</p>
            <div className="mt-2">
              <h3 className="font-semibold">Education</h3>
              <p>{formData.education}</p>
              <h3 className="font-semibold mt-1">Experience</h3>
              <p>{formData.experience}</p>
              <h3 className="font-semibold mt-1">Skills</h3>
              <p>{formData.skills}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}