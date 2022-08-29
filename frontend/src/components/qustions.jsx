import { useEffect, useState } from "react";
import Answer from "./answer";
import { nanoid } from "nanoid";

export default function Qustion({ i, setQustions, showResult }) {
  const [data, setData] = useState([]);

  const answers = i.incorrect_answers.map((e) => ({
    qustionId: i.id,
    id: nanoid(),
    answer: e,
    selected: false,
    ToF: false,
  }));
  answers.push({
    qustionId: i.id,
    id: nanoid(),
    answer: i.correct_answer,
    selected: false,
    ToF: true,
  });

  const randomData = [];
  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * answers.length);
    randomData.push(answers[num]);
    const index = answers.indexOf(answers[num]);
    answers.splice(index, 1);
  }

  useEffect(() => setData(randomData), []);

  let select = (answer) => {
    setData((p) =>
      p.map((e) => {
        e.selected = false;
        return e.answer === answer ? { ...e, selected: !e.selected } : e;
      })
    );
  };

  useEffect(() => {
    data.forEach((e) => {
      if (e.selected && e.ToF) {
        setQustions((p) =>
          p.map((res) => {
            return res.id === e.qustionId ? { ...res, correct: true } : res;
          })
        );
      } else if (e.selected && !e.ToF) {
        setQustions((p) =>
          p.map((res) => {
            return res.id === e.qustionId ? { ...res, correct: false } : res;
          })
        );
      }
    });
  }, [data]);

  const ans = data.map((e) => (
    <Answer
      key={e.id}
      showResult={showResult}
      correct={i.correct}
      ans={e}
      select={select}
    />
  ));

  return (
    <div className="qustion">
      <h1 dangerouslySetInnerHTML={{ __html: i.question }} />
      <div className="ans">{ans}</div>
      <div className="line"></div>
    </div>
  );
}
