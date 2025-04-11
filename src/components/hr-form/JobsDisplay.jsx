import React, { useEffect, useState } from 'react';

const JobsDisplay = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch('https://job-opening-backend-production-7112.up.railway.app/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    fetch(`https://job-opening-backend-production-7112.up.railway.app/jobs/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        }
      })
      .catch((err) => console.error('Delete failed:', err));
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    fetch(`https://job-opening-backend-production-7112.up.railway.app/jobs/${editingJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingJob),
    })
      .then((res) => res.json())
      .then(() => {
        fetchJobs(); // refresh list
        setEditingJob(null);
      })
      .catch((err) => console.error('Update failed:', err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingJob((prev) => ({
      ...prev,
      [name]: name === 'skills' ? value.split(',').map(s => s.trim()) : value,
    }));
  };

return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Current Job Openings</h2>
        <div className="space-y-4">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className="border rounded-xl p-4 shadow-sm bg-white flex justify-between items-start"
                >
                    <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.location}</p>
                        <p className="mt-2">{job.description}</p>
                        <p className="mt-2">
                            <strong>Skills:</strong> {job.skills.join(', ')}
                        </p>
                        <p>
                            <strong>Salary:</strong> {job.salary}
                        </p>
                        <p>
                            <strong>Open Positions:</strong> {job.openPositions}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => handleEditClick(job)}
                            className="bg-blue-500 hover:bg-blue-600 cursor-pointer focus:outline-2 active:outline-2 text-white px-3 py-1 rounded transition-transform transform hover:scale-105 active:scale-95"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(job.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-transform transform hover:scale-105 active:scale-95"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {editingJob && (
            <div className="mt-6 border p-4 rounded-lg bg-gray-50">
                <h3 className="text-xl font-bold mb-4">Edit Job</h3>
                <form onSubmit={handleEditSubmit} className="grid gap-4 pr-10">
                    <div className="flex items-center gap-4">
                        <label htmlFor="title" className="w-32 font-bold">
                            Job Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={editingJob.title}
                            onChange={handleInputChange}
                            placeholder="Job Title"
                            className="border p-2 rounded flex-1"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="location" className="w-32 font-bold">
                            Location:
                        </label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            value={editingJob.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            className="border p-2 rounded flex-1"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="description" className="w-32 font-bold">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={editingJob.description}
                            onChange={handleInputChange}
                            placeholder="Job Description"
                            className="border p-2 rounded flex-1 min-h-[100px]"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="skills" className="w-32 font-bold">
                            Skills (Comma Separated):
                        </label>
                        <textarea
                            id="skills"
                            type="text"
                            name="skills"
                            value={editingJob.skills.join(', ')}
                            onChange={handleInputChange}
                            placeholder="Skills (comma separated)"
                            className="border p-2 rounded flex-1 min-h-[100px]"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="salary" className="w-32 font-bold">
                            Salary:
                        </label>
                        <input
                            id="salary"
                            type="text"
                            name="salary"
                            value={editingJob.salary}
                            onChange={handleInputChange}
                            placeholder="Salary"
                            className="border p-2 rounded flex-1"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="openPositions" className="w-32 font-bold">
                            Open Positions:
                        </label>
                        <input
                            id="openPositions"
                            type="number"
                            name="openPositions"
                            value={editingJob.openPositions}
                            onChange={handleInputChange}
                            placeholder="Open Positions"
                            className="border p-2 rounded flex-1"
                            required
                        />
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingJob(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )}
    </div>
);
};

export default JobsDisplay;
