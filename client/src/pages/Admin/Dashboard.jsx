import React from "react";
import Cards from "./AI Tools/Card";

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-pink-600 to-orange-400 mt-4  border rounded-xl">
        <h1 className="font-bold text-2xl text-white px-4 py-2">
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
