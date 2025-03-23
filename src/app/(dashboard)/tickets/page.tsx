"use client";

import {
  answerQuestion,
  deleteQuestion,
  fetchAnsweredQuestions,
  fetchUnansweredQuestions,
} from "@/app/action";
import { Heart, Trash2, User } from "lucide-react";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {  useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    const getAnsweredQuestions = async () => {
      const data = await fetchAnsweredQuestions();
      setAnsweredQuestions(data);
    };
    getAnsweredQuestions();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetchUnansweredQuestions();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (questionId: string) => {
    const result = await deleteQuestion(questionId);
       toast({
         title: "Question deleted successfully",
       });
    if (result?.error) {
      toast({
        title: `Question deleted failed ${result.error}`,
      });
    
    } else {
      setAnsweredQuestions((prev) => prev.filter((q) => q._id !== questionId));
    }
  };

 const handleAnswer = async (questionId: string) => {
   const answer = answers[questionId]?.trim();
   if (!answer) {
     toast({
       variant: "destructive",
       title: "Error",
       description: "Please enter an answer before submitting.",
     });
     return;
   }

   const result = await answerQuestion(questionId, answer);
   if (result?.error) {
     toast({
       variant: "destructive",
       title: "Failed to submit answer",
       description: result.error,
     });
   } else {
     toast({
       variant: "default",
       title: "Success",
       description: "Answer submitted successfully!",
     });
    window.location.reload()
    //  setQuestions((prev) => prev.filter((q) => q._id !== questionId));
    //  setAnsweredQuestions((prev) => [...prev, { ...result, answer }]);
    //  setAnswers((prev) => ({ ...prev, [questionId]: "" }));

    
   }
 };


  return (
    <div className="p-4 space-y-6 mx-auto container">
      {/* Unanswered Questions */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-purple-700 ">
          Unanswered Questions
        </h2>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="p-4 border rounded-lg shadow space-y-2"
            >
              <p>
                <strong>Question:</strong> {question.question}
              </p>
              <p>
                <strong>Description:</strong> {question.description}
              </p>
              <Textarea
                className="border p-2 rounded w-full my-2"
                value={answers[question._id] || ""}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question._id]: e.target.value,
                  }))
                }
                placeholder="Write your answer here"
              />
              <button
                className=" text-white px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500"
                onClick={() => handleAnswer(question._id)}
              >
                Answer
              </button>
            </div>
          ))
        ) : (
          <p>No unanswered questions available.</p>
        )}
      </section>

      {/* Answered Questions */}
      <section>
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Answered Questions
        </h2>
        {answeredQuestions.length > 0 ? (
          answeredQuestions.map((q) => (
            <>
              <div
                key={q._id}
                className="p-4  bg-white shadow-md rounded-lg border space-y-6"
              >
                {/* Render question */}
                <h3 className="text-lg font-bold text-blue-700 hover:underline cursor-pointer">
                  {q.question}
                </h3>

                {/* Render description */}
                <p className="text-gray-600 text-sm">{q.description}</p>

                {/* Render answer */}
                <p className="text-gray-800 text-sm">
                  <strong>Answer:</strong> {q.answer || "No answer provided"}
                </p>

                {/* Render user */}
                <div className="flex items-center gap-1">
                  <User size={16} /> {q.userId ? q.userId.lastName : "Unknown"}
                </div>

                {/* Render votes */}
                <div className="flex items-center gap-1">
                  <Heart size={16} /> {q.votes ? q.votes.length : 0}
                </div>

                {/* Render time */}
                <span>
                  {new Date(q.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  ago
                </span>

                {/* Render tags */}
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(q.tags) && q.tags.length > 0 ? (
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

                {/* Delete Confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="mt-3 flex items-center text-red-500 hover:text-red-700">
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this question?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(q._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <br />
            </>
          ))
        ) : (
          <p>No answered questions available.</p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
