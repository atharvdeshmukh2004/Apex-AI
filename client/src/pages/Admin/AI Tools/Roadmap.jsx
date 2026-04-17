
import React, { useState } from "react";
import axios from "axios";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export default function RoadmapGenerator() {
  const [topic, setTopic] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/roadmap/generate",
        { field: topic }
      );

      if (data?.success) {
        const roadmap = data.roadmap || [];

      
        const nodes = roadmap.map((step, index) => ({
          id: String(step.id ?? index),
          type: "customNode",
          data: {
            title: step.title,
            description: step.description,
            step: index + 1,
          },
          position: { x: 100, y: 200 * index },
          style: {
            border: "2px solid #6366f1",
            padding: 16,
            borderRadius: 16,
            background: "#eef2ff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            minWidth: 220,
          },
          selectable: false,
        }));

        const edges = roadmap
          .filter((step) => step.next)
          .map((step, index) => ({
            id: `e${step.id ?? index}-${step.next}`,
            source: String(step.id ?? index),
            target: String(step.next),
            animated: true,
            style: { stroke: "#6366f1", strokeWidth: 2 },
            selectable: false,
          }));

        setNodes(nodes);
        setEdges(edges);
        toast.success("Roadmap generated successfully!");
      } else {
        toast.error(data?.message || "Failed to generate roadmap");
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error generating roadmap"
      );
    } finally {
      setLoading(false);
    }
  };

  const CustomNode = ({ data }) => (
    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-blue-50 border-2 border-purple-300 shadow-md w-48">
      <div className="flex items-center mb-2">
        <div className="text-white bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2">
          {data.step}
        </div>
        <div className="font-semibold text-gray-800 text-lg">{data.title}</div>
      </div>
      <div className="text-gray-600 text-sm">{data.description}</div>
    </div>
  );

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800 ">
        AI-Powered Roadmap Generator
      </h1>

      <div className="flex justify-center gap-3 mb-4">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a field (e.g., Frontend Developer)"
          className="w-96 border-gray-200"
        />
        <Button
          onClick={generateRoadmap}
          disabled={loading}
          className="bg-black text-white hover:bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 transition"
        >
          {loading ? "Generating..." : "Generate ✨"}
        </Button>
      </div>

      <div style={{ height: 450, borderRadius: 16, border: "1px solid #ccc" }}>
        <ReactFlow
          nodes={nodes.map((node) => ({ ...node, selectable: false }))}
          edges={edges}
          nodeTypes={{ customNode: CustomNode }}
          fitView
          zoomOnScroll={false} 
          panOnDrag={true}
          nodesDraggable={false} 
          nodesConnectable={false} 
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background color="#ccc" gap={20} />
        </ReactFlow>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import ReactFlow, { Background, Controls } from "reactflow";
// import "reactflow/dist/style.css";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "react-toastify";

// // Custom Node Component
// const CustomNode = ({ data }) => (
//   <div className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-blue-50 border-2 border-purple-300 shadow-md w-64">
//     <div className="flex items-center mb-2">
//       <div className="text-white bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
//         {data.step}
//       </div>
//       <div className="font-semibold text-gray-800 text-lg">{data.title}</div>
//     </div>
//     <p className="text-gray-600 text-sm">{data.description}</p>
//   </div>
// );

// export default function RoadmapGenerator() {
//   const [topic, setTopic] = useState("");
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const generateRoadmap = async () => {
//     if (!topic.trim()) {
//       toast.error("Please enter a topic!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/api/roadmap/generate",
//         { field: topic }
//       );

//       if (data?.success) {
//         const roadmap = data.roadmap || [];

//         // Correct XYFlow node format
//         const nodes = roadmap.map((step, index) => ({
//           id: String(step.id ?? index),
//           type: "custom", // must match type in XYNode
//           data: {
//             title: step.title,
//             description: step.description,
//             step: index + 1,
//           },
//           x: 300, // center horizontally
//           y: index * 180, // vertical spacing
//           width: 256,
//           height: 120,
//         }));

//         const edges = roadmap
//           .filter((step) => step.next)
//           .map((step) => ({
//             id: `e${step.id}-${step.next}`,
//             source: String(step.id),
//             target: String(step.next),
//           }));

//         setNodes(nodes);
//         setEdges(edges);
//         toast.success("Roadmap generated successfully!");
//       } else {
//         toast.error(data?.message || "Failed to generate roadmap");
//       }
//     } catch (error) {
//       console.error("Error generating roadmap:", error);
//       toast.error(
//         error?.response?.data?.message ||
//           error.message ||
//           "Error generating roadmap"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         AI-Powered Roadmap Generator
//       </h1>

//       <div className="flex justify-center gap-3 mb-8">
//         <Input
//           value={topic}
//           onChange={(e) => setTopic(e.target.value)}
//           placeholder="Enter a field (e.g., Frontend Developer, DevOps)"
//           className="w-96"
//         />
//         <Button onClick={generateRoadmap} disabled={loading}>
//           {loading ? "Generating..." : "Generate"}
//         </Button>
//       </div>

//       <div style={{ height: 800, borderRadius: 16, border: "1px solid #ccc" }}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           nodeTypes={{ custom: CustomNode }}
//           fitView
//           nodesDraggable={false}
//           nodesConnectable={false}
//         >
//           <Controls />
//           <Background color="#ccc" gap={20} />
//         </ReactFlow>
//       </div>
//     </div>
//   );
// }

