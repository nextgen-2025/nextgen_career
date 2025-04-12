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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Current Job Openings
        </h2>
        
        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                    <p className="text-slate-600 flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {job.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(job)}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-4 line-clamp-2">{job.description}</p>
                
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-green-700 font-medium">
                      {job.salary}
                    </span>
                    <span className="text-slate-600">
                      {job.openPositions} position{job.openPositions !== 1 ? 's' : ''} open
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingJob && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Edit Job Opening</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editingJob.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editingJob.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={editingJob.description}
                        onChange={handleInputChange}
                        className="w-full min-h-[120px] px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Skills (Comma Separated)</label>
                      <textarea
                        type="text"
                        name="skills"
                        value={editingJob.skills.join(', ')}
                        onChange={handleInputChange}
                        className="w-full min-h-[80px] px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Salary</label>
                      <input
                        type="text"
                        name="salary"
                        value={editingJob.salary}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Open Positions</label>
                      <input
                        type="number"
                        name="openPositions"
                        value={editingJob.openPositions}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setEditingJob(null)}
                        className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsDisplay;
