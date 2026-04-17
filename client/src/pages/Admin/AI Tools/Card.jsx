// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";
// import roadmap from "../../../assets/roadmap.png";
// import DialogBox from "@/components/DialogBox";
// // import { Link } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const AiToolLits = [
//   {
//     name: "Career Roadmap Generator",
//     description: "Build Your Roadmap",
//     icon: roadmap,
//     button: "Generate Roadmap",
//   },
//   {
//     name: "QnA Chat Bot",
//     description: "Get Your Questions Answered",
//     icon: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
//     button: "Open Chat Bot",
//   },

// ];

// function Cards() {
//   return (
//     <div className="mt-6 p-4 bg-white border rounded-xl shadow-sm max-w-4xl mx-auto">
//       <h2 className="font-bold text-xl">Available AI Tools</h2>
//       <p className="text-gray-500 ">
//         Start Building And Shape Your Career With AI Tools
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 gap-4 ">
//         {AiToolLits.map((tool, index) => {
//           return (
//             <Card
//               key={tool.id ?? index}
//               className="border border-gray-200 rounded-lg text-center transition-shadow duration-300"
//             >
//               <CardContent>
//                 <div className="flex flex-col items-center">
//                   <img src={tool.icon ?? "react.svg"} className="w-10 h-10 " />
//                   <h2 className="text-xl">{tool.name}</h2>
//                   <h3 className="text-muted-foreground mt-1">
//                     {tool.description ?? "Card Description"}
//                   </h3>

//                   <Link to="/admin/qna-chatbot">
//                     <Button className="bg-gradient-to-r from-green-600 to-blue-500 text-white hover:opacity-90 transition">
//                       {tool.button ?? "Action"}
//                     </Button>
//                   </Link>

//                   {/* <DialogBox tool={{ button: tool.button }} /> */}
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Cards;

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import roadmap from "../../../assets/roadmap.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// 🔥 Add path for each tool
const AiToolLits = [
  // {
  //   id: 1,
  //   name: "Career Roadmap Generator",
  //   description: "Build Your Roadmap",
  //   icon: roadmap,
  //   button: "Generate Roadmap",
  //   path: "/admin/roadmap",
  // },
  {
    id: 1,
    name: "QnA Chat Bot",
    description: "Get Your Questions Answered",
    icon: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
    button: "Open Chat Bot",
    path: "/admin/qna-chatbot",
  },
  {
    id: 2,
    name: "Skill Gap Analysis",
    description: "Identify missing skills for your target career",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    button: "Analyze Skills",
    path: "/admin/skill-gap",
  },
  {
    id: 3,
    name: "Industry Insights",
    description: "Explore trends, salary, and demand in industries",
    icon: "https://cdn-icons-png.flaticon.com/512/2721/2721297.png",
    button: "View Insights",
    path: "/admin/industry-insights",
  },
];

function Cards() {
  return (
    <div className="mt-6 p-4 bg-white border rounded-xl shadow-sm max-w-4xl mx-auto">
      <h2 className="font-bold text-xl">Available AI Tools</h2>
      <p className="text-gray-500">
        Start Building And Shape Your Career With AI Tools
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 gap-4">
        {AiToolLits.map((tool) => (
          <Card
            key={tool.id}
            className="border border-gray-200 rounded-lg text-center hover:shadow-md transition duration-300"
          >
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <img src={tool.icon} alt={tool.name} className="w-10 h-10" />

                <h2 className="text-lg font-semibold">{tool.name}</h2>

                <p className="text-sm text-gray-500">{tool.description}</p>

                {/* 🔥 Dynamic Navigation */}
                <Link to={tool.path}>
                  <Button className="mt-2 bg-gradient-to-r from-pink-600 to-orange-500 text-white hover:opacity-90 transition">
                    {tool.button}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Cards;