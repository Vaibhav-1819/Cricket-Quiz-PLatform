import React, { useEffect, useState } from "react";
import Result from "./Result";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import "../styles/App.css";

const Quiz = ({ questions }) => {
  const [category, setCategory] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const saved = sessionStorage.getItem("quiz-answers");
    if (saved) {
      const data = JSON.parse(saved);
      setAnswers(data.answers);
      setCategory(data.category);
      setFilteredQuestions(questions.filter((q) => q.category === data.category));
    }
  }, [questions]);

  useEffect(() => {
    if (category) {
      const filtered = questions.filter((q) => q.category === category);
      setFilteredQuestions(filtered);
      setAnswers({});
      setCurrent(0);
      setShowResult(false);
    }
  }, [category, questions]);

  const handleOptionClick = (option) => {
    const updated = { ...answers, [current]: option };
    setAnswers(updated);
    sessionStorage.setItem("quiz-answers", JSON.stringify({ answers: updated, category }));
  };

  const next = () => {
    if (current < filteredQuestions.length - 1) setCurrent((c) => c + 1);
    else setShowResult(true);
  };

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const resetQuiz = () => {
    setCategory("");
    setFilteredQuestions([]);
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
    sessionStorage.removeItem("quiz-answers");
    setTimeLeft(300);
  };

  if (!category) {
    const categories = [...new Set(questions.map((q) => q.category))];
    return (
      <div className="category-select">
        <h2>Select Category</h2>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button key={cat} className="category-btn" onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    return <Result questions={filteredQuestions} answers={answers} onRestart={resetQuiz} />;
  }

  const currentQuestion = filteredQuestions[current] || null;
  const selected = answers[current];

  return (
    <div className="quiz-container">
      <ProgressBar current={current} total={filteredQuestions.length} />
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={() => setShowResult(true)} />
      {currentQuestion ? (
        <div className="question-box">
          <h3>Q{current + 1}: {currentQuestion.question}</h3>
          <ul className="options">
            {currentQuestion.options.map((opt, i) => (
              <li key={i} className={`option ${selected === opt ? "selected" : ""}`} onClick={() => handleOptionClick(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
      <div className="quiz-nav">
        <button onClick={prev} className="nav-btn" disabled={current === 0}>Prev</button>
        <button onClick={next} className="nav-btn next-btn" disabled={!selected}>
          {current === filteredQuestions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;