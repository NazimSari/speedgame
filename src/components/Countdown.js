import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseCountdown, setResult } from "../redux/gameSlice";
import Result from "./Result";
function Countdown() {
  const dispatch = useDispatch();
  const countdown = useSelector((state) => state.game.countdown);
  const result = useSelector((state) => state.game.result);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decreaseCountdown());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    if (countdown === 0) {
      dispatch(setResult(true)); // Redux durumunu güncelle
    }
  }, [dispatch, countdown]); // countdown bağımlılığını ekleyin

  return (
    <div>
      <div className="countdown">{countdown}</div>

      <div>{result && <Result />}</div>
    </div>
  );
}

export default Countdown;
