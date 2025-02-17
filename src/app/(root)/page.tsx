"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchAnsweredQuestions();
      setQuestions(data);
    };
    getQuestions();
  }, []);

  return (
    <>
      {/* Search Bar */}
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
      {/* Search Bar End */}

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl">
        {/* Answered Questions */}
        <section className="my-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
            Answered Questions
          </h2>
          <div className="grid grid-cols-1  gap-6">
            {questions.length > 0 ? (
              questions.map((q, index) => (
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
        {/* Answered Questions End */}

        {/* Contact Us */}
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
        {/* Contact Us End */}
      </main>
      {/* Main End */}
    </>
  );
};

export default Home;
