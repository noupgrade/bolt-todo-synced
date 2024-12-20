import React from 'react';

interface ErrorMessageProps {
  error: string;
  onDismiss: () => void;
}

export function ErrorMessage({ error, onDismiss }: ErrorMessageProps) {
  return (
    <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
      {error}
      <button 
        onClick={onDismiss}
        className="ml-2 text-sm underline hover:no-underline"
      >
        Dismiss
      </button>
    </div>
  );
}