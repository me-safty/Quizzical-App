import { useState, useEffect } from "react";
import yello from "./assets/blob 5.png";
import blue from "./assets/blob 5 (1).png";
import Start from "./components/start";
import Qustion from "./components/qustions";
import { nanoid } from "nanoid";

export default function App() {
  const [show, setShow] = useState(false);
  const [qustions, setQustions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=31&difficulty=hard&type=multiple"
      // "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQustions(
          data.results.map((q) => ({ ...q, correct: false, id: nanoid() }))
        )
      );
  }, [show]);

  const data = qustions.map((q) => (
    <Qustion
      key={q.id}
      i={q}
      setQustions={setQustions}
      showResult={showResult}
    />
  ));

  function cheak() {
    if (document.querySelectorAll(".selected").length === qustions.length) {
      setShowResult((p) => !p);
    }
  }

  useEffect(() => {
    if (showResult) {
      qustions.forEach((e) => {
        if (e.correct) {
          setResult((p) => p + 1);
        }
      });
    } else {
      setShow((p) => !p);
      setResult(0);
    }
  }, [showResult]);

  return (
    <div className="App">
      {!show && <Start setShow={setShow} show={show} />}
      {show && (
        <div className="qustions">
          {data}
          <div className="result">
            {showResult && (
              <h2>
                You scored {result}/{qustions.length} correct answers
              </h2>
            )}
            <button onClick={cheak} className="finsh">
              {!showResult ? "Check answers" : "Play again"}
            </button>
          </div>
        </div>
      )}
      <img
        style={{ transform: show ? "scale(.9)" : "scale(1.5)" }}
        className="yello"
        src={yello}
        alt="svg"
      />
      <img
        style={{ transform: show ? "scale(.9)" : "scale(1.5)" }}
        className="blue"
        src={blue}
        alt="svg"
      />
    </div>
  );
}
