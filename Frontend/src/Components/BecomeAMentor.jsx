import React from 'react';
import { Link } from 'react-router-dom';

const BecomeMentorPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <h1 className="text-4xl font-bold mb-4">Become a Mentor</h1>
      <p className="text-lg mb-6">
        Share your knowledge and experience by becoming a mentor in our program. Help guide and inspire others on their personal and professional journeys.
      </p>

      <h2 className="text-2xl font-bold mb-4">Eligibility Criteria</h2>
      <ul className="list-disc list-inside mb-6">
        <li>At least 5 years of industry experience</li>
        <li>Strong communication and interpersonal skills</li>
        <li>Passion for personal and professional development</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Roles and Responsibilities</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Commit to monthly one-on-one meetings with your mentee</li>
        <li>Provide guidance, feedback, and support to your mentee</li>
        <li>Share your knowledge, experiences, and best practices</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Benefits for Mentors</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Develop leadership and coaching skills</li>
        <li>Expand your professional network</li>
        <li>Gain a sense of personal fulfillment and satisfaction</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Application Process</h2>
      <p className="mb-4">To apply as a mentor, please complete the following steps:</p>
      <ol className="list-decimal list-inside mb-6">
        <li>Fill out the mentor application form</li>
        <li>Submit your resume and references</li>
        <li>Participate in a brief screening interview</li>
      </ol>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to={"/applicationFormMentor"}>Apply Now</Link></button>

      <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
      <p>
        If you have any questions or need further assistance, please contact us at{' '}
        <a href="mailto:mentorship@example.com" className="text-blue-500 hover:text-blue-800">
          mentorship@example.com
        </a>
        .
      </p>
    </div>
  );
};

export default BecomeMentorPage;