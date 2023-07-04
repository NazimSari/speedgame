import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWordAsync } from "../redux/gameSlice";

function Word() {
  const dispatch = useDispatch();
  const words = useSelector((state) => state.game.words);
  const correctIndices = useSelector((state) => state.game.correctIndices);
  const incorrectIndices = useSelector((state) => state.game.incorrectIndices);
  const currWordIndex = useSelector((state) => state.game.currWordIndex);
  useEffect(() => {
    dispatch(getWordAsync());
  }, [dispatch]);

  return (
    <div className="container">
      {words.map((word, i) => {
        let className = "word";
        if (correctIndices.includes(i)) {
          className += " word--correct";
        } else if (incorrectIndices.includes(i)) {
          className += " word--incorrect";
        }
        return (
          <span
            key={i}
            className={className}
            style={
              i === currWordIndex
                ? { backgroundColor: "#99b4bf", color: "black" }
                : null
            }
          >
            {word}{" "}
          </span>
        );
      })}
    </div>
  );
}

export default Word;
