import React, { useState, useEffect } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const {
    todos,
    isLoading,
    error,
    setError,
    addTodo,
    toggleTodo,
    deleteTodo,
    generateRandomTodo
  } = useTodos();

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRandom = async () => {
    setIsGenerating(true);
    try {
      await generateRandomTodo();
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <TodoHeader onGenerateRandom={handleGenerateRandom} isGenerating={isGenerating} />
          
          {error && <ErrorMessage error={error} onDismiss={() => setError(null)} />}

          <TodoInput onAdd={addTodo} />
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
      </div>
    </div>
  );
}