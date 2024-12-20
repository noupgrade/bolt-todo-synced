// Follow Supabase Edge Function format
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

Deno.serve(async (req) => {
  // Enable CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    });
  }

  const randomIndex = Math.floor(Math.random() * tasks.length);
  const task = tasks[randomIndex];
  
  return new Response(
    JSON.stringify({ task }),
    { 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      } 
    },
  );
});