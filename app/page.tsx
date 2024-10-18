"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [commands, setCommands] = useState<string[]>([
    'ls -l',
    'cd Documents',
    'echo "Hello, Next.js!"'
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [commands]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim() !== '') {
      setCommands([...commands, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4 text-white text-sm font-mono">user@localhost: ~</div>
        </div>
        
        {/* Terminal Content */}
        <div className="p-4 h-96 overflow-y-auto custom-scrollbar">
          <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
            <span className="text-blue-400">user@localhost</span>:<span className="text-purple-400">~</span>$ ls -l
            total 20
            drwxr-xr-x 2 user user 4096 Jul 20 12:34 Documents
            drwxr-xr-x 2 user user 4096 Jul 20 12:34 Downloads
            drwxr-xr-x 2 user user 4096 Jul 20 12:34 Pictures
            drwxr-xr-x 2 user user 4096 Jul 20 12:34 Music
            drwxr-xr-x 2 user user 4096 Jul 20 12:34 Videos

            {commands.slice(1).map((command, index) => (
              <React.Fragment key={index}>
                <span className="text-blue-400">user@localhost</span>:<span className="text-purple-400">{index === 0 ? '~' : '~/Documents'}</span>$ {command}
                {command === 'echo "Hello, Next.js!"' && (
                  <>
                    <br />
                    Hello, Next.js!
                  </>
                )}
                <br />
                <br />
              </React.Fragment>
            ))}
            <div className="flex">
              <span className="text-blue-400">user@localhost</span>:<span className="text-purple-400">~/Documents</span>$&nbsp;
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyPress={handleInputSubmit}
                className="bg-transparent outline-none text-green-400 w-full"
                aria-label="Terminal input"
              />
            </div>
          </pre>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a202c;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #718096;
        }
      `}</style>
    </div>
  );
}