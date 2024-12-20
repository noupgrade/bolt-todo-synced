import React from 'react';
import { ClipboardList, Sparkles } from 'lucide-react';

interface TodoHeaderProps {
  onGenerateRandom: () => void;
  isGenerating: boolean;
}

export function TodoHeader({ onGenerateRandom, isGenerating }: TodoHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <ClipboardList className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
      </div>
      <button
        onClick={onGenerateRandom}
        disabled={isGenerating}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
        {isGenerating ? 'Generating...' : 'Generate Task'}
      </button>
    </div>
  );
}