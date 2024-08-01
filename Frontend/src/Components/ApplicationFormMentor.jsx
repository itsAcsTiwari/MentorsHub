import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ApplicationFormMentor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    bio: '',
    resume: null,
    expertise: '',
    skills: [],
    qualifications: '',
    availability: '',
    preferredSubjects: '',
  });

  const [newSkill, setNewSkill] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'resume' ? files[0] : value,
    }));
  };

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setFormData((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-4 w-full">
      <h2 className="text-2xl font-bold mb-6">Mentor Application Form</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (previous form fields) */}

        <div className="mb-4">
          <label htmlFor="qualifications" className="block font-bold mb-2">
            Qualifications
          </label>
          <textarea
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Enter your qualifications"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="availability" className="block font-bold mb-2">
            Availability
          </label>
          <input
            type="text"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your availability (e.g., weekdays, weekends, evenings)"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="preferredSubjects" className="block font-bold mb-2">
            Preferred Subjects
          </label>
          <input
            type="text"
            id="preferredSubjects"
            name="preferredSubjects"
            value={formData.preferredSubjects}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your preferred subjects (e.g., Math, Science, English)"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expertise" className="block font-bold mb-2">
            Expertise
          </label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block font-bold mb-2">
            Skills
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              id="newSkill"
              value={newSkill}
              onChange={handleSkillChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              placeholder="Enter a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 font-semibold py-1 px-2 rounded mr-2 mb-2 flex items-center"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-500 hover:text-blue-800"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <Link to={"/"}>Submit Application</Link>
        </button>
      </form>
    </div>
  );
};

export default ApplicationFormMentor;