import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInput,
  checkMatch,
  incrementWordIndex,
  setStartCountdown,
} from "../redux/gameSlice";

function Text() {
  const dispatch = useDispatch();
  const countdown = useSelector((state) => state.game.countdown);
  const currInput = useSelector((state) => state.game.currInput);
  const isMatch = useSelector((state) => state.game.isMatch);

  useEffect(() => {
    if (currInput.trim() !== "") {
      dispatch(setStartCountdown(false));
    }
  }, [currInput, dispatch]);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 32) {
      dispatch(checkMatch());
      dispatch(incrementWordIndex());
      dispatch(setInput(""));
      dispatch(setStartCountdown(true));
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          className={isMatch ? "input input--match" : "input input--no-match"}
          onKeyDown={handleKeyDown}
          value={currInput}
          disabled={countdown === 0} // Geri sayım sıfır ise inputu devre dışı bırak
          onChange={(e) => dispatch(setInput(e.target.value))}
        />
      </form>
    </div>
  );
}

export default Text;
