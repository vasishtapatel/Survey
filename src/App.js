import { useState } from "react";
import "./index.css";

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerText, setAnswer] = useState("");
  const [completed, setCompleted] = useState(false);
  const startThankYou = () => {
    localStorage.setItem("COMPLETED", true);
    setCompleted(true);
    setTimeout(() => {
      setCompleted(false);
      setQuestionIndex(0);
      localStorage.setItem("COMPLETED", false);
    }, 5000);
  };
  const saveAnswer = (answer) => {
    localStorage.setItem(questionIndex, answer);
    console.log(localStorage.getItem(questionIndex));
  };
  const questions = [
    {
      question: "How satisfied are you with our product?",
      options: [1, 2, 3, 4, 5],
      optionType: "number",
    },
    {
      question: "How fair are prices compared to similar retailers?",
      options: [1, 2, 3, 4, 5],
      optionType: "number",
    },
    {
      question: "How satisfied are you with value for money of your purchase?",
      options: [1, 2, 3, 4, 5],
      optionType: "number",
    },
    {
      question: "On a scale of 1-10 how would you reccomend us?",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      optionType: "number",
    },
    {
      question: "What could we do to improve our service?",
      optionType: "text",
    },
  ];
  return (
    <div className="App">
      {completed ? (
        <h1>Thank You</h1>
      ) : (
        <>
          {questionIndex + 1}/5
          <h1>Customer Survey</h1>
          <h2>{questions[questionIndex].question}</h2>
          {questions[questionIndex].optionType === "number" ? (
            questions[questionIndex].options.map((answer, index) => (
              <button onClick={() => saveAnswer(answer)}>{answer}</button>
            ))
          ) : (
            <input
              type="text"
              value={answerText}
              onChange={(e) => {
                setAnswer(e.target.value);
                saveAnswer(e.target.value);
              }}
            />
          )}
          <br />
          <br />
          <button
            disabled={questionIndex === 0 ? true : false}
            onClick={() => {
              setQuestionIndex(questionIndex - 1);
            }}
          >
            prev
          </button>
          <button
            onClick={() => {
              if (questionIndex === questions.length - 1) {
                startThankYou();
              }
              setQuestionIndex(questionIndex + 1);
            }}
          >
            {questionIndex === questions.length - 1 ? "complete" : "next"}
          </button>
        </>
      )}
    </div>
  );
}
