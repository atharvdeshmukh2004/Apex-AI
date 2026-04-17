// import React, { useState } from "react";
// import { scholarships } from "../../../data/scholarshipsData";


// const ScholarshipsPage = () => {
//   const [form, setForm] = useState({
//     educationLevel: "",
//     percentage: "",
//     familyIncome: "",
//     category: "",
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   const filtered = scholarships.filter(
//     (s) =>
//       s.educationLevel === form.educationLevel &&
//       Number(form.percentage) >= s.minPercentage &&
//       Number(form.familyIncome) <= s.maxIncome &&
//       (s.category === "Any" || s.category === form.category)
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-100 text-gray-900 flex items-center justify-center rounded-xl">
//       <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-blue-100">
//         <h1 className="text-4xl font-extrabold text-center mb-8">
//           🎓 Smart Scholarship Finder
//         </h1>

//         {/* --- Profile Form --- */}
//         {!submitted && (
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5 bg-gradient-to-b from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md"
//           >
//             <div className="grid md:grid-cols-2 gap-4">
//               <select
//                 className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={form.educationLevel}
//                 onChange={(e) =>
//                   setForm({ ...form, educationLevel: e.target.value })
//                 }
//                 required
//               >
//                 <option value="">Select Education Level</option>
//                 <option value="10th">10th</option>
//                 <option value="12th">12th</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="Graduation">Graduation</option>
//               </select>

//               <input
//                 className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="number"
//                 placeholder="Percentage (%)"
//                 value={form.percentage}
//                 onChange={(e) =>
//                   setForm({ ...form, percentage: e.target.value })
//                 }
//                 required
//               />

//               <input
//                 className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="number"
//                 placeholder="Annual Family Income (₹)"
//                 value={form.familyIncome}
//                 onChange={(e) =>
//                   setForm({ ...form, familyIncome: e.target.value })
//                 }
//                 required
//               />

//               <select
//                 className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={form.category}
//                 onChange={(e) => setForm({ ...form, category: e.target.value })}
//                 required
//               >
//                 <option value="">Select Category</option>
//                 <option value="Any">General</option>
//                 <option value="OBC">OBC</option>
//                 <option value="SC">SC</option>
//                 <option value="ST">ST</option>
//                 <option value="EWS">EWS</option>
//                 <option value="Girls">Girls</option>
//                 <option value="PWD">PWD</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 mt-2 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-400 rounded-xl shadow-md hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]"
//             >
//               🔍 Find Scholarships
//             </button>
//           </form>
//         )}

//         {/* --- Results Section --- */}
//         {submitted && (
//           <div className="mt-8">
//             <button
//               onClick={() => setSubmitted(false)}
//               className="mb-4 bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
//             >
//               ← Edit Profile
//             </button>

//             <h2 className="text-2xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//               Scholarships for {form.educationLevel} Students
//             </h2>

//             {filtered.length > 0 ? (
//               <ul className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
//                 {filtered.slice(0, 50).map((s) => (
//                   <li
//                     key={s.id}
//                     className="p-5 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-[1.01]"
//                   >
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-semibold text-lg text-blue-700">
//                         {s.name}
//                       </h3>
//                       <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
//                         ✅ Eligible
//                       </span>
//                     </div>

//                     <div className="mt-3 text-sm text-gray-700 space-y-1">
//                       <p>
//                         <b>Education:</b> {s.educationLevel}
//                       </p>
//                       <p>
//                         <b>Required Marks:</b> {s.minPercentage}% or above
//                       </p>
//                       <p>
//                         <b>Income Limit:</b> ₹{s.maxIncome.toLocaleString()}
//                       </p>
//                       <p>
//                         <b>Category:</b> {s.category}
//                       </p>
//                     </div>

//                     <a
//                       href={s.link}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="mt-4 inline-block text-blue-600 hover:text-indigo-700 font-medium underline transition"
//                     >
//                       🔗 Apply Now
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-700 text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//                 😕 No scholarships found for your criteria. Try adjusting your
//                 inputs or income level.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScholarshipsPage;

import React, { useState } from "react";
import { scholarships } from "../../../data/scholarshipsData";

const ScholarshipsPage = () => {
  const [form, setForm] = useState({
    educationLevel: "",
    subField: "",
    percentage: "",
    familyIncome: "",
    category: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const filtered = scholarships.filter(
    (s) =>
      s.educationLevel === form.educationLevel &&
      (s.subField ? s.subField === form.subField : true) &&
      Number(form.percentage) >= s.minPercentage &&
      Number(form.familyIncome) <= s.maxIncome &&
      (s.category === "Any" || s.category === form.category)
  );

  const graduationSubFields = [
    "B.Tech / BE",
    "B.Sc",
    "B.Com",
    "B.A",
    "BBA",
    "BCA",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50  text-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-blue-100">
        <h1 className="text-4xl font-extrabold text-center bg-clip-text mb-8">
          🎓 Smart Scholarship Finder
        </h1>

        {/* --- Profile Form --- */}
        {!submitted && (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-gradient-to-b from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <select
                className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.educationLevel}
                onChange={(e) =>
                  setForm({
                    ...form,
                    educationLevel: e.target.value,
                    subField: "",
                  })
                }
                required
              >
                <option value="">Select Education Level</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
              </select>

              {/* Sub-field for Graduation */}
              {form.educationLevel === "Graduation" && (
                <select
                  className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.subField}
                  onChange={(e) =>
                    setForm({ ...form, subField: e.target.value })
                  }
                  required
                >
                  <option value="">Select Graduation Field</option>
                  {graduationSubFields.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              )}

              <input
                className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Percentage (%)"
                value={form.percentage}
                onChange={(e) =>
                  setForm({ ...form, percentage: e.target.value })
                }
                required
              />

              <input
                className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Annual Family Income (₹)"
                value={form.familyIncome}
                onChange={(e) =>
                  setForm({ ...form, familyIncome: e.target.value })
                }
                required
              />

              <select
                className="border border-blue-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="Any">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="Girls">Girls</option>
                <option value="PWD">PWD</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]"
            >
              🔍 Find Scholarships
            </button>
          </form>
        )}

        {/* --- Results Section --- */}
        {submitted && (
          <div className="mt-8">
            <button
              onClick={() => setSubmitted(false)}
              className="mb-4 bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
            >
              ← Edit Profile
            </button>

            <h2 className="text-2xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Scholarships for {form.educationLevel} Students{" "}
              {form.subField && <span>({form.subField})</span>}
            </h2>

            {filtered.length > 0 ? (
              <ul className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
                {filtered.slice(0, 50).map((s) => (
                  <li
                    key={s.id}
                    className="p-5 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-[1.01]"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg text-blue-700">
                        {s.name}
                      </h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
                        ✅ Eligible
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p>
                        <b>Education:</b> {s.educationLevel}
                      </p>
                      {s.subField && (
                        <p>
                          <b>Field:</b> {s.subField}
                        </p>
                      )}
                      <p>
                        <b>Required Marks:</b> {s.minPercentage}% or above
                      </p>
                      <p>
                        <b>Income Limit:</b> ₹{s.maxIncome.toLocaleString()}
                      </p>
                      <p>
                        <b>Category:</b> {s.category}
                      </p>
                    </div>

                    <a
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-blue-600 hover:text-indigo-700 font-medium underline transition"
                    >
                      🔗 Apply Now
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                😕 No scholarships found for your criteria. Try adjusting your
                inputs or income level.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipsPage;

