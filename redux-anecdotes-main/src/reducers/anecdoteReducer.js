import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";
import {
  removeAllNotifications,
  sendNotification,
  setNotification,
} from "./notificationReducer";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice(
  {
    name: "anecdotes",
    initialState: [],
    reducers: {
      vote: (anecdotes, action) => {
        const id = action.payload;
        const anecdote = anecdotes.find((a) => a.id === id);
        anecdote.votes += 1;
        return anecdotes.sort((a, b) => b.votes - a.votes);
      },
      create: (anecdotes, action) => {
        return anecdotes.concat(action.payload);
      },
      set: (anecdotes, action) => action.payload,
    },
  },
  {}
);

export const initializeAnecdotes = () => {
  return (dispatch) => {
    anecdoteService
      .getAll()
      .then((response) => {
        dispatch(removeAllNotifications());
        dispatch(set(response));
      })
      .catch((error) => {
        dispatch(removeAllNotifications());
        dispatch(
          sendNotification(
            "Error getting anecdotes: " + error.message,
            "error",
            true
          )
        );
      });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const anecdote = await anecdoteService.create({
        content,
        votes: 0,
        id: getId(),
      });
      dispatch(create(anecdote));
      dispatch(
        sendNotification(
          `You created a new anecdote: '${anecdote.content}'`,
          "success"
        )
      );
    } catch (error) {
      dispatch(
        sendNotification(
          "Error creating anecdote: " + error.message,
          "error",
          true
        )
      );
    }
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdoteService.addVote(anecdote);
      dispatch(vote(newAnecdote.id));
      dispatch(removeAllNotifications());
      dispatch(
        sendNotification(`You voted for '${newAnecdote.content}'`, "success")
      );
    } catch (error) {
      dispatch(sendNotification("Error voting for anecdote", "error"));
    }
  };
};

export const { vote, create, set } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
