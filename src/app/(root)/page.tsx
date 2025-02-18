// "use client";
// import { Eye, Heart, MessageSquare, User } from "lucide-react";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;

// export const fetchAnsweredQuestions = async () => {
//   try {
//     const url = `${backendurl}/api/users/answered`;
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "GET",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch questions");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     return [];
//   }
// };

// const Home = () => {
//   const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     const data = await fetchAnsweredQuestions();
  //     setQuestions(data);
  //     console.log(data)
  //   };
  //   getQuestions();
  // }, []);

//   return (
//     <>
//       {/* Search Bar */}
//       <div className="container pb-5 pt-3 max-w-2xl mx-auto">
//         <form className="flex items-center gap-2" role="search">
//           <input
//             className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"
//           />
//           <button
//             className="bg-yellow-400 text-black rounded-full px-4 py-2 font-medium hover:bg-yellow-500 transition"
//             type="submit"
//           >
//             Search
//           </button>
//         </form>
//       </div>
//       {/* Search Bar End */}

//       {/* Main Content */}
//       <main className="container mx-auto max-w-4xl">
//         {/* Answered Questions */}
//         <section className="my-6">
//           <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
//             Answered Questions
//           </h2>
//           <div className="space-y-4">
//             {questions.length > 0 ? (
//               questions.map((q, index) => (
//                 <div
//                   key={index}
//                   className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
//                 >
//                   {/* Question Title */}
//                   <h3 className="text-lg font-bold text-blue-700 hover:underline cursor-pointer">
//                     {q.question}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-gray-600 text-sm mt-1">{q.description}</p>

//                   {/* Metadata */}
//                   <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
//                     <div className="flex items-center gap-1">
//                       <User size={16} /> {q.userId.lastName}
//                     </div>
                    
//                     <div className="flex items-center gap-1">
//                       <Heart size={16} /> 0
//                     </div>
//                     <span>
//                       {new Date(q.createdAt).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}{" "}
//                       ago
//                     </span>
//                   </div>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {q.tags.length > 0 ? (
//                       q.tags.map((tag, i) => (
//                         <span
//                           key={i}
//                           className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
//                         General
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600 text-center">
//                 No answered questions available.
//               </p>
//             )}
//           </div>
//         </section>
//         {/* Answered Questions End */}

//         {/* Contact Us */}
//         <section className="my-10">
//           <div
//             className="relative p-10 rounded-lg shadow-lg text-white text-center max-w-3xl mx-auto"
//             style={{
//               backgroundImage:
//                 "url('https://res.cloudinary.com/dhkzpt9aw/image/upload/v1739154489/dslkxq5rgnn7kcqqycrv.jpg')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           >
//             <div className="p-5  bg-gradient-to-r from-purple-600 to-yellow-400 rounded-lg opacity-90">
//               <h1 className="text-yellow-300 text-2xl font-bold">Need Help?</h1>
//               <p className="mt-2 text-sm">
//                 The AskTech team can help you find what you’re after.
//               </p>
//               <Link href="/contact">
//                 <button
//                   type="button"
//                   className="mt-3 bg-yellow-400 text-black rounded-full px-4 py-2 font-medium hover:bg-yellow-500 transition"
//                 >
//                   Contact AskTech
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </section>
//         {/* Contact Us End */}
//       </main>
//       {/* Main End */}
//     </>
//   );
// };

// export default Home;


"use client";
import { Eye, Heart, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { likeQuestion } from "../action";

const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAnsweredQuestions = async () => {
  try {
    const url = `${backendurl}/api/users/answered`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchAnsweredQuestions();
      setQuestions(data);
      const initialLikes = {};
      data.forEach((q) => {
        initialLikes[q._id] = q.votes.length;
      });
      setLikes(initialLikes);
    };
    getQuestions();
  }, []);

 const handleLike = async (questionId) => {
   try {
     const updatedQuestion = await likeQuestion(questionId); // Call the action function

     setLikes((prev) => ({
       ...prev,
       [questionId]: updatedQuestion.votes.length,
     }));
   } catch (error) {
     console.error("Error liking question:", error);
   }
 };

  return (
    <>
      <div className="container pb-5 pt-3 max-w-2xl mx-auto">
        <form className="flex items-center gap-2" role="search">
          <input
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="bg-yellow-400 text-black rounded-full px-4 py-2 font-medium hover:bg-yellow-500 transition"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <main className="container mx-auto max-w-4xl">
        <section className="my-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
            Answered Questions
          </h2>
          <div className="space-y-4">
            {questions.length > 0 ? (
              questions.map((q) => (
                <div
                  key={q._id}
                  className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-blue-700 hover:underline cursor-pointer">
                    {q.question}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{q.description}</p>
                  <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
                    <div className="flex items-center gap-1">
                      <User size={16} /> {q.userId.lastName}
                    </div>
                    <button
                      className="flex items-center gap-1 text-red-500"
                      onClick={() => handleLike(q._id)}
                    >
                      <Heart size={16} /> {likes[q._id] || 0}
                    </button>
                    <span>
                      {new Date(q.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      ago
                    </span>
                  </div>
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

        <section className="my-10">
          <div
            className="relative p-10 rounded-lg shadow-lg text-white text-center max-w-3xl mx-auto"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dhkzpt9aw/image/upload/v1739154489/dslkxq5rgnn7kcqqycrv.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="p-5  bg-gradient-to-r from-purple-600 to-yellow-400 rounded-lg opacity-90">
              <h1 className="text-yellow-300 text-2xl font-bold">Need Help?</h1>
              <p className="mt-2 text-sm">
                The AskTech team can help you find what you’re after.
              </p>
              <Link href="/contact">
                <button
                  type="button"
                  className="mt-3 bg-yellow-400 text-black rounded-full px-4 py-2 font-medium hover:bg-yellow-500 transition"
                >
                  Contact AskTech
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
