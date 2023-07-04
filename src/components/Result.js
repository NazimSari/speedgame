import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";

function Result() {
  const correct = useSelector((state) => state.game.correct);
  const inCorrect = useSelector((state) => state.game.inCorrect);
  return (
    <div className="result">
      <p className="correct">Correct: {correct}</p>
      <p className="incorrect">Incorrect: {inCorrect}</p>
      <p className="accuracy">
        Accuracy: {Math.round((correct / (correct + inCorrect)) * 100)}%
      </p>
      <Button />
    </div>
  );
}

export default Result;
