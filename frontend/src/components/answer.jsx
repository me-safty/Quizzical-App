import { useState, useEffect } from "react";

export default function Answer({ ans, select, correct, showResult }) {
  const [ansClass, setAnsClass] = useState("");
  useEffect(() => {
    setAnsClass(
      (p) =>
        (p =
          ans.selected && !showResult
            ? "selected"
            : ans.selected && correct && showResult
            ? "selected true"
            : ans.selected && !correct && showResult
            ? "selected false"
            : !correct && showResult && ans.ToF
            ? "true"
            : showResult
            ? "pointerNone"
            : "")
    );
  });
  return (
    <button
      className={ansClass}
      onClick={(_) => select(ans.answer)}
      dangerouslySetInnerHTML={{ __html: ans.answer }}
    />
  );
}
