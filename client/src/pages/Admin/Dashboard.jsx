import React from "react";
import Cards from "./AI Tools/Card";

function Dashboard() {
  return (
    <div>
      <div className="bg-gradient-to-r from-pink-600 to-orange-400  w-225 h-40 border rounded-xl">
        <h1 className="font-bold text-2xl text-white px-4 py-4">
          AI Career Coach Agent
        </h1>
        <p className="px-4 py-2 text-white">
          Apex AI is a smart, user-friendly web application that provides
          AI-powered tools and personalized career guidance, helping users
          explore insights, track their progress, and make informed decisions
          through an intuitive dashboard experience.
        </p>
      </div>
      <main>
        <Cards />
      </main>
    </div>
  );
}

export default Dashboard;
