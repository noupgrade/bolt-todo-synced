import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { supabase } from '../lib/supabase';
import { fetchTodos, addTodo as apiAddTodo, updateTodo as apiUpdateTodo, deleteTodo as apiDeleteTodo } from '../lib/api';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const addTodo = async (text: string) => {
    try {
      const newTodo = await apiAddTodo(text);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const generateRandomTodo = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-todo');
      if (error) throw error;
      if (data?.task) {
        await addTodo(data.task);
      }
    } catch (error) {
      console.error('Error generating todo:', error);
      setError('Failed to generate todo');
      throw error;
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await apiUpdateTodo(id, { completed: !todo.completed });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updatedTodo : t))
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await apiDeleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  return {
    todos,
    isLoading,
    error,
    setError,
    addTodo,
    toggleTodo,
    deleteTodo,
    generateRandomTodo
  };
}