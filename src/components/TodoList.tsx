import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks yet. Add one above to get started!
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {activeTodos.length > 0 && (
        <TodoSection
          title={`Active Tasks (${activeTodos.length})`}
          todos={activeTodos}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )}

      {completedTodos.length > 0 && (
        <TodoSection
          title={`Completed (${completedTodos.length})`}
          todos={completedTodos}
          onToggle={onToggle}
          onDelete={onDelete}
          className="opacity-75"
        />
      )}
    </div>
  );
}

interface TodoSectionProps extends TodoListProps {
  title: string;
  className?: string;
}

function TodoSection({ title, todos, onToggle, onDelete, className = '' }: TodoSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <div className={`space-y-2 ${className}`}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}