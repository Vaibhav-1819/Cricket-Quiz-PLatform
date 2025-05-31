import React, { useEffect } from "react";
import "../styles/App.css";

const Timer = ({ timeLeft, setTimeLeft, onTimeUp }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;