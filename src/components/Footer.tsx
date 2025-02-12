export default function Footer() {
    return (
      <footer>
        <div className="bg-purple-700 text-white py-6 mt-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* About Us */}
              <div>
                <h5 className="font-bold text-lg mb-2">About Us</h5>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Mollitia voluptas repellendus minus.
                </p>
              </div>
              {/* Contact Us */}
              <div>
                <h5 className="font-bold text-lg mb-2">Contact Us</h5>
                <p className="text-sm">
                  1234 Street Name
                  <br />
                  City, State, ZIP
                  <br />
                  Phone: (123) 456-7890
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:info@example.com"
                    className="text-white underline hover:text-gray-300"
                  >
                    info@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  