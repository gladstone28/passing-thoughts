import React, { useState, useEffect } from 'react';
import { AddThoughtForm } from './AddThoughtForm';
import { Thought } from './Thought';
import { generateId, getNewExpirationTime } from './utilities';

export default function App() {
  const [thoughts, setThoughts] = useState([
    {
      id: generateId(),
      text: 'This is a place for your passing thoughts.',
      expiresAt: getNewExpirationTime(),
    },
    {
      id: generateId(),
      text: "They'll be removed after 15 seconds.",
      expiresAt: getNewExpirationTime(),
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      setThoughts((thoughts) => thoughts.filter((thought) => thought.expiresAt > now));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addThought = (thought) => {
    setThoughts((thoughts) => [thought, ...thoughts]);
  };

  const removeThought = (thoughtId) => {
    setThoughts((thoughts) => thoughts.filter((thought) => thought.id !== thoughtId));
  };

  return (
    <div className="App">
      <header>
        <h1>Passing Thoughts</h1>
      </header>
      <main>
        <AddThoughtForm addThought={addThought} />
        <ul className="thoughts">
          {thoughts.map((thought) => (
            <Thought key={thought.id} thought={thought} removeThought={removeThought} />
          ))}
        </ul>
      </main>
    </div>
  );
}
