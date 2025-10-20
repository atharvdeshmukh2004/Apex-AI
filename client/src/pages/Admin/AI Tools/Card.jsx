import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import roadmap from "../../../assets/roadmap.png";
import { Link, Navigate } from "react-router-dom";
import RoadmapGeneratorDialog from "../../../components/RoadmapGeneratorDialog";

const AiToolLits = [
  {
    name: "Career Roadmap Generator",
    description: "Build Your Roadmap",
    icon: roadmap,
    button: "Generate Roadmap",
  },
];

function Cards() {
  return (
    <div className="mt-6 p-5 bg-white border rounded-xl w-225  ">
      <h2 className="font-bold text-xl">Available AI Tools</h2>
      <p className="text-gray-500 ">
        Start Building And Shape Your Career With AI Tools
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 gap-4 ">
        {AiToolLits.map((tool, index) => {
          return (
            <Card
              key={tool.id ?? index}
              className="border border-gray-200 rounded-lg text-center transition-shadow duration-300"
            >
              <CardContent>
                <div className="flex flex-col items-center">
                  <img src={tool.icon ?? "react.svg"} className="w-10 h-10 " />
                  <h2 className="text-xl">{tool.name}</h2>
                  <h3 className="text-muted-foreground mt-1">
                    {tool.description ?? "Card Description"}
                  </h3>

                  <RoadmapGeneratorDialog
                    tool={{ button: "Generate Roadmap" }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
