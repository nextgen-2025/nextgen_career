import React, { useState } from "react";

const HrForm = () => {
  const [job, setJob] = useState({
    title: "",
    location: "",
    description: "",
    skills: "",
    salary: "",
    openPositions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedJob = {
      ...job,
      skills: job.skills.split(",").map((skill) => skill.trim()), // Convert skills to an array
    };

    console.log("Job Profile:", formattedJob);
    alert("Job profile saved successfully!");

    fetch("https://job-opening-backend-production-7112.up.railway.app/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedJob),
    })
    
      .then((res) => res.json())
      .then((data) => {
        alert("Job submitted successfully!");
        console.log(data);
      })

      .catch((error) => {
        alert('Error submitting job');
        console.error(error);
      });

      setJob({
        title: "",
        location: "",
        description: "",
        skills: "",
        salary: "",
        openPositions: "",
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-teal-800 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Create Job Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid for Job Title and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Job Title:
            </label>
            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Location:
            </label>
            <input
              type="text"
              name="location"
              value={job.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white">
            Description:
          </label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-white">
            Skills (comma-separated):
          </label>
          <input
            type="text"
            name="skills"
            value={job.skills}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>

        {/* Grid for Open Positions and Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Open Positions:
            </label>
            <input
              type="number"
              name="openPositions"
              value={job.openPositions}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Salary:
            </label>
            <input
              type="text"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-500/80 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Job Profile
        </button>
      </form>
    </div>
  );
};

export default HrForm;
