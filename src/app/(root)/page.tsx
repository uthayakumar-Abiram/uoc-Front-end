import Link from 'next/link'
import React from 'react'


const Home = () => {
  return (
    <>
       {/* Search Bar */}
      <div className="container pb-5 pt-3">
        <form className="flex items-center gap-2" role="search">
          <input
            className="form-control rounded-full flex-grow border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
      <main>
        {/* Knowledge Base */}
        <div className="container my-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item}>
                <div className="block hover:shadow-lg transition">
                  <div className="card shadow-md border border-gray-200 h-full rounded-lg p-4">
                    <div className="card-body">
                      <h5 className="text-purple-700 font-semibold mb-2">
                        Card title {item}
                      </h5>
                      <p className="text-sm text-gray-600">
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content.
                      </p>
                      <div className="mt-4">
                        <Link
                          href={`/form/${item}`}
                          className="bg-yellow-400 text-black rounded-full text-sm px-4 py-2 hover:bg-yellow-500 transition"
                        >
                          Open Form
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Knowledge Base End */}

        {/* Contact Us */}
        <div className="container">
          <div
            className="relative mt-5 p-10 rounded-lg shadow-lg text-white text-left max-w-4xl mx-auto"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dhkzpt9aw/image/upload/v1739154489/dslkxq5rgnn7kcqqycrv.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="mt-5 p-5 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-lg opacity-90 text-center">
              <h1 className="text-yellow-300 text-2xl font-bold">Need Help?</h1>
              <p className="mt-2 text-sm">
                The AskTech team can help you find what you’re after.
              </p>
              <button
                type="button"
                className="mt-3 bg-yellow-400 text-black rounded-full px-4 py-2 font-medium hover:bg-yellow-500 transition"
              >
                Contact AskTech
              </button>
            </div>
          </div>
        </div>
        {/* Contact Us End */}
      </main>
      {/* Main End */}
        
    </>
  )
}

export default Home