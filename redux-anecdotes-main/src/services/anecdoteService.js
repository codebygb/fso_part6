import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(anecdote) {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
}

async function addVote(anecdote) {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return response.data;
}
const anecdoteService = { getAll, create, addVote };
export default anecdoteService;
