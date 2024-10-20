"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';  // Add axios for HTTP requests

export default function Test() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send input to the backend API to run the C++ program
      const response = await axios.post('/api/runCpp', { input });
      setOutput(response.data.output);  // Set the C++ output
    } catch (error) {
      console.error('Error running C++ program:', error);
      setOutput('Error running C++ program');
    }
    setInput('');  // Clear the input field
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Back to Terminal
      </Link>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 'run'..."
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-300"
          >
            Submit
          </button>
        </form>
        <div>
          <label className="font-bold text-gray-300">Output:</label>
          <p className="mt-2 p-2 bg-gray-700 rounded">{output}</p>
        </div>
      </div>
    </div>
  );
}
