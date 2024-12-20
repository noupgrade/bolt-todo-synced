const tasks = [
  'Read a book chapter',
  'Go for a 30-minute walk',
  'Write in journal',
  'Practice meditation',
  'Clean desk',
  'Review weekly goals',
  'Call a friend',
  'Organize email inbox',
  'Drink water',
  'Stretch for 10 minutes'
];

export function generateRandomTodo(): string {
  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
}