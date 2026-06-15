// import React from "react";
// import Navbar from "../components/Navbar";
// import Features from "../components/Features";
// import { LuArrowRight } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import home from "../assets/home.png";

// function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br  from-blue-100 to-purple-100 p-4">
//       <Navbar />
//       <div className="text-center">
//         <h1
//           className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl max-w-8xl mt-5
//                bg-gradient-to-b from-blue-600 to-purple-600 text-transparent bg-clip-text mx-auto
//                "
//         >
//           Find Your Ideal Career With AI
//           <span className="text-black">✨</span>
//         </h1>

//         <p className="text-3xl mt-4 md:text-base font-bold text-gray-800 mb-8 max-w-8xl">
//           Advance your career with personalized guidance, roadmap generator and
//           AI tools for Professional success.
//         </p>

//         <button
//           onClick={() => navigate("/Login")}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
//         >
//           Get Started <LuArrowRight className="inline-block ml-2" />
//         </button>

//         <Features />
//       </div>
//     </div>
//   );
// }

// export default Home;















// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Features from "../components/Features";
// import { LuArrowRight } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import home from "../assets/Home-page.png";

// function Home() {
//   const navigate = useNavigate();

//   // 🧠 Parallax state
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX - window.innerWidth / 2) / 40,
//         y: (e.clientY - window.innerHeight / 2) / 40,
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-white">

//       {/* CONTENT */}
//       <div className="relative z-10">
//         <Navbar />
//         <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 ">

//           {/* LEFT */}
//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="lg:w-1/2 text-center lg:text-left"
//           >
//             <h1
//               className="text-4xl md:text-6xl font-medium leading-tight
//         bg-black bg-clip-text"
//             >
//               Discover Your Perfect Career Path
//             </h1>

//             <p className="mt-4 text-gray-700 text-lg max-w-xl">
//               AI-powered career guidance, roadmap generation, and skill gap
//               analysis.
//             </p>

//             <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button
//                 onClick={() => navigate("/Login")}
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition"
//               >
//                 Get Started <LuArrowRight className="inline ml-2" />
//               </button>

//               {/* <button className="backdrop-blur-md bg-white/30 border border-white/40 px-6 py-3 rounded-xl hover:bg-white/50 transition">
//                 Try Demo
//               </button> */}
//             </div>
//           </motion.div>

//           {/* RIGHT */}
//           <div className="lg:w-1/2 relative flex justify-center items-center h-[400px] lg:h-[600px]">
//             {/* 🔥 GLOW FOLLOW */}
//             <motion.div
//               animate={{ x: mousePosition.x, y: mousePosition.y }}
//               transition={{ type: "spring", stiffness: 50 }}
//               className="absolute w-[350px] h-[350px] bg-purple-500 opacity-40 blur-[100px] rounded-full"
//             />

//             <div className="relative w-full h-[500px] flex items-center justify-center">
//               {/* CARD 1 */}
//               <motion.div
//                 animate={{ y: [0, -15, 0] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute top-10 left-10 bg-white p-6 rounded-xl shadow-xl w-60"
//               >
//                 <h3 className="font-bold text-lg">AI Career Match</h3>
//                 <p className="text-sm text-gray-600">
//                   Based on your skills & interests
//                 </p>
//               </motion.div>

//               {/* CARD 2 */}
//               <motion.div
//                 animate={{ y: [0, 15, 0] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute bottom-10 right-10 bg-white p-6 rounded-xl shadow-xl w-60"
//               >
//                 <h3 className="font-bold text-lg">Skill Gap Analysis</h3>
//                 <p className="text-sm text-gray-600">Find what to improve</p>
//               </motion.div>

//               {/* CENTER TEXT */}
//               <div className="text-center text-2xl font-bold text-gray-700">
//                 <img src={home} alt="" />
//               </div>
//             </div>

//             {/* 💎 GLASS CARD LEFT */}
//             <motion.div
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 3, repeat: Infinity }}
//               className="absolute left-0 top-10 backdrop-blur-lg bg-white/30 border border-white/40 p-4 rounded-xl shadow-xl"
//             >
//               <h3 className="text-xl font-bold">93%</h3>
//               <p className="text-sm text-gray-700">Career Match Accuracy</p>
//             </motion.div>

//             {/* 💎 GLASS CARD RIGHT */}
//             {/* <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 3, repeat: Infinity }}
//               className="absolute right-0 bottom-10 backdrop-blur-lg bg-white/30 border border-white/40 p-4 rounded-xl shadow-xl"
//             >
//               <h3 className="text-xl font-bold">10K+</h3>
//               <p className="text-sm text-gray-700">Students Guided</p>
//             </motion.div> */}
//           </div>
//         </div>
//         {/* FEATURES */}
//         <div className="px-6 lg:px-16">
//           <Features />
//         </div>
//         <section className="px-4 py-16">
//           <div
//             className="max-w-4xl mx-auto rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden"
//             style={{
//               background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
//             }}
//           >
//             {/* Decorative circles */}
//             <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
//             <div className="absolute -bottom-12 -left-8 w-56 h-56 rounded-full bg-white/5" />

//             <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
//               Ready to Unlock Your Career Potential?
//             </h2>
//             <p className="text-indigo-200 text-sm mb-8 max-w-md mx-auto relative z-10">
//               Join 50,000+ students who have already found their ideal career
//               path with Apex AI.
//             </p>
//             <button
//               onClick={() => navigate("/Login")}
//               className="group inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 relative z-10"
//             >
//               Start for Free
//               <LuArrowRight
//                 size={16}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </button>
//           </div>
//         </section>
//         <section className="px-4 py-20">
//           <div className="max-w-3xl mx-auto text-center">
//             <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
//               Simple 3-step process
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-12">
//               How Apex AI Works
//             </h2>
//             <div className="flex flex-col md:flex-row items-start gap-8">
//               {[
//                 {
//                   step: "01",
//                   title: "Create your profile",
//                   desc: "Tell us about your skills, interests, and educational background.",
//                 },
//                 {
//                   step: "02",
//                   title: "AI analysis",
//                   desc: "Our AI maps your profile to real-time market demand and career paths.",
//                 },
//                 {
//                   step: "03",
//                   title: "Get your roadmap",
//                   desc: "Receive a personalized action plan with milestones and resources.",
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={item.step}
//                   className="flex-1 flex flex-col items-center text-center relative"
//                 >
//                   {/* Connector line */}
//                   {i < 2 && (
//                     <div
//                       className="hidden md:block absolute top-6 left-1/2 w-full h-px"
//                       style={{
//                         background:
//                           "linear-gradient(90deg, #6366f1, transparent)",
//                       }}
//                     />
//                   )}
//                   <div
//                     className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 z-10 shadow-lg"
//                     style={{
//                       background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
//                     }}
//                   >
//                     {item.step}
//                   </div>
//                   <h3 className="text-gray-800 font-semibold text-sm mb-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-500 text-xs leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//             </section>
//             </div>
//         </div>

//   );
// }

// export default Home;




















































import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import home from "../assets/home.png";
import { ArrowRight } from "lucide-react";
import { LuArrowRight } from "react-icons/lu";

// ─── Inline SVG Icons (no react-icons needed) ────────────────────────────────
const IconGradCap = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const IconBuilding = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
    <line x1="9" y1="16" x2="15" y2="16" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M8 10h.01" />
    <path d="M16 10h.01" />
  </svg>
);

const IconCheck = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconBrain = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const IconRoute = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

const IconStar = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─── Reusable fade-up wrapper ─────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat block ───────────────────────────────────────────────────────────────
function Stat({ value, suffix, label }) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
        {value}
        <span className="text-indigo-600">{suffix}</span>
      </span>
      <span className="mt-1 text-sm text-slate-500 font-medium">{label}</span>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      icon: <IconGradCap />,
      title: "Complete your profile",
      desc: "Add your academic record, skills, and certifications once. No repeated form-filling.",
    },
    {
      step: "02",
      icon: <IconBrain />,
      title: "AI skill-gap mapping",
      desc: "Our engine compares your profile against live job descriptions at product companies.",
    },
    {
      step: "03",
      icon: <IconRoute />,
      title: "Get your roadmap",
      desc: "Receive a personalised action plan with milestones, resources, and a timeline.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Navbar />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative pt-12 pb-24 lg:pt-20 overflow-hidden">
        {/* Subtle dot-grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            opacity: 0.4,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-16">
          {/* ── Left content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2 z-10"
          >
            <h1 className="text-5xl lg:text-[3.75rem] font-extrabold tracking-tight leading-[1.08] text-slate-900">
              Find the career path{" "}
              <span className="relative whitespace-nowrap text-indigo-600">
                built for you
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9C60 3 120 1 150 1C180 1 240 3 298 9"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-7 text-lg text-slate-600 leading-relaxed max-w-[42ch]">
              Advance your career with personalized guidance, roadmap generator
              and AI tools for Professional success.
            </p>

            {/* Dual CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/Login")}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
              >
                Get Stared
                <ArrowRight />
              </button>
            </div>

            {/* Trust chips */}
            {/* <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium">
              {["Verified Profiles", "Direct Hiring", "Free to Start"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <span className="text-emerald-500 flex-shrink-0">
                      <IconCheck size={14} />
                    </span>
                    {t}
                  </span>
                ),
              )}
            </div> */}

            {/* Stats row */}
            {/* <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
              <Stat value="50" suffix="K+" label="Students guided" />
              <Stat value="93" suffix="%" label="Match accuracy" />
              <Stat value="600" suffix="+" label="Career paths" />
            </div> */}
          </motion.div>

          {/* ── Right — Dashboard mockup ── */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10"
            >
              {/* Browser frame */}
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3 shadow-2xl shadow-slate-200">
                <div className="flex items-center gap-1.5 mb-3 px-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-3 flex-1 h-5 rounded-md bg-slate-200 max-w-[160px]" />
                </div>
                <img
                  src={home}
                  alt="Apex AI Platform Dashboard"
                  className="rounded-2xl w-full object-cover"
                />
              </div>

              {/* Floating pill — bottom-left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-8 z-20 bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-xl hidden md:flex items-center gap-3"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Career Guideance
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    Roadmap Generation
                  </p>
                </div>
              </motion.div>

              {/* Floating pill — top-right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -top-5 -right-6 z-20 bg-indigo-600 text-white rounded-2xl px-4 py-3 shadow-xl hidden md:flex items-center gap-2"
              >
                <IconBrain />
                <p className="text-sm font-semibold">AI Powered</p>
              </motion.div>
            </motion.div>

            {/* Background glow */}
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 w-72 h-72 rounded-full -z-10 blur-3xl opacity-40"
              style={{
                background: "radial-gradient(circle, #818cf8, transparent 70%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. TRUST / LOGO BAR
      ══════════════════════════════════════════
      <div className="border-y border-slate-100 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-7">
            Trusted by top universities &amp; companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["SPPU", "GOOGLE", "AMAZON", "SALESFORCE", "TCS", "INFOSYS"].map(
              (name) => (
                <span
                  key={name}
                  className="font-black text-xl text-slate-300 hover:text-slate-500 transition-colors duration-200 select-none"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </div> */}

      {/* ══════════════════════════════════════════
          3. FEATURES
      ══════════════════════════════════════════ */}
      <div className="bg-white">
        <Features />
      </div>

      {/* ══════════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <FadeUp className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.15em] text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Streamlined workflow
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              How Apex AI works
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Dashed connector (desktop) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-10 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px border-t border-dashed border-indigo-200"
            />

            {steps.map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="group relative bg-white rounded-2xl border border-slate-200 p-8 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300">
                  {/* Ghost number */}
                  <span className="absolute top-4 right-5 text-6xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors select-none leading-none">
                    {item.step}
                  </span>
                  {/* Icon box */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 mb-5">
                    {item.icon}
                  </div>
                  <h3 className="relative z-10 text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="relative z-10 text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-14 px-6">
        <FadeUp>
          <div
            className="max-w-4xl mx-auto rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <h2 className="relative z-10 text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Ready to Accelerate
              <br className="hidden md:block" />
              Your Career
            </h2>
            <p className="relative z-10 text-indigo-200 text-lg mb-10 max-w-md mx-auto">
              Join us today and take the first step towards a brighter
              professional future!
            </p>
            <button
              onClick={() => navigate("/Login")}
              className="relative z-10 group inline-flex items-center gap-2 bg-white text-indigo-700 px-9 py-4 rounded-xl font-bold text-base hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Get started
              <span className="group-hover:translate-x-1 transition-transform inline-flex">
                <IconArrowRight />
              </span>
            </button>
          </div>
        </FadeUp>
      </section>




      {/* <section>
        <div>
          <div className="justify-around items-center px-6 py-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl text-center max-w-4xl mx-auto">
            <h2
              className="text-2xl font-bold md:text-38xl lg:text-4xl xl:text-6xl max-w-8xl mt-5 
               bg-gradient-to-r from-blue-600 to-purple-600  
               bg-clip-text text-transparent"
            >
              Ready to Accelearte Your Career
            </h2>
            <p className=" mt-4 md:text-base font-bold text-black mb-8 max-w-8xl">
              Join us today and take the first step towards a brighter
              professional future!
            </p>
            <button
              onClick={() => navigate("/Login")}
              class="bg-gradient-to-r from-green-500 to-blue-300  text-black font-semibold py-2 px-4 rounded mt-2"
            >
              Get Started <LuArrowRight className="inline-block ml-2" />
            </button>
          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════════════
          7. FOOTER
      ══════════════════════════════════════════ */}
      <footer className="py-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <span className="font-black text-slate-500 text-base">Apex AI</span>
          <span>
            © 2026 Apex AI Platform · Career Guidance &amp; Placement Automation
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;