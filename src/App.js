import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import questions from "./data/questions.json";
import "./styles/App.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>IPL Quiz Platform</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>
      <Quiz questions={questions} />
    </div>
  );
}

export default App;