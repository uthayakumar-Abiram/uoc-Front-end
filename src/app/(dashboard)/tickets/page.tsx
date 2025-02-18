"use client";

import {
  answerQuestion,
  fetchAnsweredQuestions,
  fetchUnansweredQuestions,
} from "@/app/action";
import { Heart, User } from "lucide-react";
// import Link from "next/link";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState<any[]>([]); // Unanswered questions
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]); // Answered questions
  const [answer, setAnswer] = useState("");

  // Fetch answered questions
  useEffect(() => {
    const getAnsweredQuestions = async () => {
      const data = await fetchAnsweredQuestions();
      setAnsweredQuestions(data);
    };
    getAnsweredQuestions();
  }, []);

  // Fetch unanswered questions
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
      // Add the answered question to answered questions
      setAnsweredQuestions((prev) => [
        ...prev,
        { ...result, answer: answer }, // Assuming backend response contains the updated question
      ]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="space-y-4">
        {/* Unanswered Questions */}
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
          <div className="space-y-4">
            {answeredQuestions.length > 0 ? (
              answeredQuestions.map((q) => (
                <div
                  key={q._id}
                  className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                >
                  {/* Question Title */}
                  <h3 className="text-lg font-bold text-blue-700 hover:underline cursor-pointer">
                    {q.question}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-1">{q.description}</p>

                  {/* Answer */}
                  <p className="text-gray-800 text-sm mt-2">
                    <strong>Answer:</strong> {q.answer}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
                    <div className="flex items-center gap-1">
                      <User size={16} /> {q.userId.lastName}
                    </div>

                    <div className="flex items-center gap-1">
                      <Heart size={16} /> {q.votes?.length || 0}
                    </div>
                    <span>
                      {new Date(q.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      ago
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {q.tags.length > 0 ? (
                      q.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                        General
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">
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
