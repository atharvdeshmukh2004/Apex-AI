// // SharedComponents.jsx
// import { useState, useEffect } from "react";

// function Pill({ children, color = "#22d3ee" }) {
//   return (
//     <span
//       style={{
//         display: "inline-block",
//         padding: "3px 10px",
//         borderRadius: 999,
//         border: `1px solid ${color}55`,
//         color,
//         fontSize: 11,
//         fontFamily: "monospace",
//       }}
//     >
//       {children}
//     </span>
//   );
// }

// function AnimBar({ label, value, color, delay = 0 }) {
//   const [w, setW] = useState(0);
//   useEffect(() => {
//     const t = setTimeout(() => setW(value), 150 + delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return (
//     <div style={{ marginBottom: 10 }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: 4,
//         }}
//       >
//         <span
//           style={{
//             fontSize: 11,
//             color: "#94a3b8",
//             textTransform: "capitalize",
//           }}
//         >
//           {label.replace(/_/g, " ")}
//         </span>
//         <span style={{ fontSize: 11, color, fontFamily: "monospace" }}>
//           {value}%
//         </span>
//       </div>
//       <div
//         style={{
//           height: 5,
//           borderRadius: 99,
//           background: "rgba(255,255,255,.07)",
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             width: `${w}%`,
//             borderRadius: 99,
//             background: color,
//             transition: "width 1s ease",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export function Pill({ children, color = "#22d3ee" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        border: `1px solid ${color}55`,
        color,
        fontSize: 11,
        fontFamily: "monospace",
      }}
    >
      {children}
    </span>
  );
}

export function AnimBar({ label, value, color, delay = 0 }) {
  const [w, setW] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setW(value), 150 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#94a3b8",
            textTransform: "capitalize",
          }}
        >
          {label.replace(/_/g, " ")}
        </span>

        <span style={{ fontSize: 11, color, fontFamily: "monospace" }}>
          {value}%
        </span>
      </div>

      <div
        style={{
          height: 5,
          borderRadius: 99,
          background: "rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${w}%`,
            borderRadius: 99,
            background: color,
            transition: "width 1s ease",
          }}
        />
      </div>
    </div>
  );
}