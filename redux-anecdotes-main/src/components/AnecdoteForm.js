import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

let AnecdoteForm = ({ create }) => {
  const onSubmit = (content) => {
    create(content);
  };

  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target.content.value);
          e.target.content.value = "";
        }}
      >
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

AnecdoteForm = connect(null, { create: createAnecdote })(AnecdoteForm);
export default AnecdoteForm;
