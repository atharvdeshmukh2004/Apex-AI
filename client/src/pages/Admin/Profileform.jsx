// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useStudent } from "../../../context/StudentContext";

// const ProfileForm = () => {
//   const { updateStudent } = useStudent();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     educationLevel: "",
//     percentage: "",
//     income: "",
//     category: "",
//   });

//   // handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateStudent(formData); // ✅ save student data in context
//     navigate("/admin/scholarships"); // ✅ redirect to scholarships page
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-semibold mb-5 text-blue-700 text-center">
//           🎓 Scholarship Profile
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <select
//             name="educationLevel"
//             value={formData.educationLevel}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           >
//             <option value="">Select Education Level</option>
//             <option value="10th">10th</option>
//             <option value="12th">12th</option>
//             <option value="Diploma">Diploma</option>
//             <option value="Engineering">Engineering</option>
//             <option value="Graduation">Graduation</option>
//             <option value="Postgraduate">Postgraduate</option>
//           </select>

//           <input
//             name="percentage"
//             type="number"
//             placeholder="Percentage"
//             value={formData.percentage}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />

//           <input
//             name="income"
//             type="number"
//             placeholder="Annual Family Income (₹)"
//             value={formData.income}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />

//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="General">General</option>
//             <option value="OBC">OBC</option>
//             <option value="SC">SC</option>
//             <option value="ST">ST</option>
//             <option value="Girls">Girls</option>
//             <option value="Minority">Minority</option>
//             <option value="PWD">PWD</option>
//           </select>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Find Scholarships
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileForm;

// src/pages/ProfileForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    educationLevel: "10th",
    percentage: "",
    familyIncome: "",
    category: "Any",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    navigate("/admin/scholarships");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <select
        className="border p-2 w-full mb-3"
        value={form.educationLevel}
        onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}
      >
        <option>10th</option>
        <option>12th</option>
        <option>Engineering</option>
        <option>Graduation</option>
      </select>
      <input
        className="border p-2 w-full mb-3"
        type="number"
        placeholder="Percentage"
        value={form.percentage}
        onChange={(e) => setForm({ ...form, percentage: +e.target.value })}
        required
      />
      <input
        className="border p-2 w-full mb-3"
        type="number"
        placeholder="Family Income (₹)"
        value={form.familyIncome}
        onChange={(e) => setForm({ ...form, familyIncome: +e.target.value })}
        required
      />
      <select
        className="border p-2 w-full mb-4"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option>Any</option>
        <option>SC</option>
        <option>ST</option>
        <option>OBC</option>
        <option>EWS</option>
        <option>Girls</option>
        <option>PWD</option>
      </select>
      <button className="bg-blue-600 text-white py-2 px-4 rounded">Find Scholarships</button>
    </form>
  );
};

export default ProfileForm;
