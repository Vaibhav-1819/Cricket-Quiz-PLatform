import React from "react";
import "../styles/App.css"; // Assuming App.css contains the necessary styles

const Result = ({ questions, answers, onRestart }) => {
  // Calculate the score by comparing user's answers with correct answers
  const score = questions.reduce((acc, q, index) => acc + (answers[index] === q.answer ? 1 : 0), 0);

  return (
    <div className="quiz-container">
      {/* Heading for the result section */}
      <h2>Quiz Completed!</h2>
      {/* Display the user's score */}
      <p className="question-text">Your score: {score} out of {questions.length}</p>
      {/* Button to restart the quiz */}
      <div className="navigation-buttons">
        <button className="nav-btn primary" onClick={onRestart}>Restart Quiz</button>
      </div>
    </div>
  );
};

export default Result;
