import React from "react";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-4 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800">
        {scholarship.name}
      </h2>
      <p className="text-gray-600 mt-1">
        <strong>Education Level:</strong> {scholarship.educationLevel}
      </p>
      <p className="text-gray-600">
        <strong>Min %:</strong> {scholarship.minPercentage}% |{" "}
        <strong>Max Income:</strong> ₹{scholarship.maxIncome.toLocaleString()}
      </p>
      <p className="text-gray-600">
        <strong>Category:</strong> {scholarship.category}
      </p>
      <a
        href={scholarship.link}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-blue-600 font-medium hover:underline"
      >
        Apply Now →
      </a>
    </div>
  );
};

export default ScholarshipCard;
