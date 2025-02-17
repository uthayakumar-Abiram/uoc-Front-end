"use client";

import { answerQuestion, fetchAnsweredQuestions, fetchUnansweredQuestions } from "@/app/action";
import Link from "next/link";
import { useState, useEffect } from "react";


const AdminDashboard = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answer, setAnswer] = useState("");
   const [Answerdquestions, setAnswerdQuestions] = useState([]);

   useEffect(() => {
     const getQuestions = async () => {
       const data = await fetchAnsweredQuestions();
      setAnswerdQuestions(data);
     };
     getQuestions();
   }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetchUnansweredQuestions();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (questionId: string) => {
    if (!answer.trim()) return alert("Please enter an answer!");

    const result = await answerQuestion(questionId, answer);
    if (result?.error) {
      alert(result.error);
    } else {
      alert("Question answered successfully!");
      setAnswer("");
      setQuestions((prev) => prev.filter((q) => q._id !== questionId));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id} className="p-4 border rounded-lg shadow">
              <p>
                <strong>Question:</strong> {question.question}
              </p>
              <p>
                <strong>Description:</strong> {question.description}
              </p>
              <input
                type="text"
                className="border p-2 rounded w-full my-2"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your answer here"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleAnswer(question._id)}
              >
                Answer
              </button>
            </div>
          ))
        ) : (
          <p>No unanswered questions available.</p>
        )}
      </div>
      <main className="container mx-auto max-w-4xl">
        {/* Answered Questions */}
        <section className="my-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
            Answered Questions
          </h2>
          <div className="grid grid-cols-1  gap-6">
            {Answerdquestions.length > 0 ? (
              Answerdquestions.map((q, index) => (
                <div
                  key={index}
                  className="shadow-md border border-gray-200 rounded-lg p-4 bg-white"
                >
                  <h5 className="text-purple-700 font-semibold mb-2">
                    {q.question}
                  </h5>
                  <p className="text-gray-600">{q.answer}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-2">
                No answered questions available.
              </p>
            )}
          </div>
        </section>
       
      </main>
    </div>
  );
};

export default AdminDashboard;
