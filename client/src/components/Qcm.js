import { useState, useEffect } from "react";
import axios from "axios";

function Qestion({ question, number }) {
  return (
    <li>
      <labe>
        <b>Ques-N{number}:</b> {question.description}
      </labe>
      <div
        style={{
          flexDirection: "column",
        }}
      >
        <input type="radio" value="1" name="choix 1" /> {question.choix[0]}
        <input type="radio" value="2" name="choix 2" /> {question.choix[1]}
        <input type="radio" value="3" name="choix 3" /> {question.choix[2]}
        <input type="radio" value="4" name="choix 4" /> {question.choix[3]}
      </div>
    </li>
  );
}

function Qcm(props) {
  const [questions, setquestions] = useState([
    {
      description: "first Questions",
      choix: ["ch1", "ch2", "ch3", "ch4"],
      solution: 1,
    },
    {
      description: "second Questions",
      choix: ["ch1", "ch2", "ch3", "ch4"],
      solution: 2,
    },
    {
      description: "second Questions",
      choix: ["ch1", "ch2", "ch3", "ch4"],
      solution: 2,
    },
    {
      description: "second Questions",
      choix: ["ch1", "ch2", "ch3", "ch4"],
      solution: 2,
    },
    {
      description: "second Questions",
      choix: ["ch1", "ch2", "ch3", "ch4"],
      solution: 2,
    },
    {
      description: "second Questions",
      choix: ["ch1", "ch2", "ch3", "ch4"],
      solution: 2,
    },
    {
      description: "second Questions",
      choix: ["ch1", "ch2", "ch3", "ch4"],
      solution: 2,
    },
  ]);

  //   useEffect(async () => {
  //     const data = await axios.get(
  //       "https://random-data-api.com/api/stripe/random_stripe"
  //     );
  //     setquestions(data.data.questions);
  //   }, []);

  return (
    <div>
      {questions.map((question, index) => (
        <Qestion key={index} question={question} number={index}></Qestion>
      ))}
    </div>
  );
}

export default Qcm;
