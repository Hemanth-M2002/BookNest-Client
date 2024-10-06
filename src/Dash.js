import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = ({ variant, className, onClick, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md text-sm";
  const variantStyles =
    variant === "outline" ? "border border-gray-300" : "bg-blue-500 text-white";
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      {...props}
    />
  );
};

const Card = ({ className, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white shadow-md rounded-md transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className, children }) => {
  return (
    <div className={`p-4 flex flex-col justify-between h-full ${className}`}>
      {children}
    </div>
  );
};

function Dash() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("book-bug");
        if (!email) {
          navigate("/signup");
          return;
        }

        const response = await axios.get(
          `https://booknest-server-kju1.onrender.com/api/users/${email}`
        );
        if (response.data) {
          setUser(response.data);
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const books = user?.books || [];
  const addedBooks = user?.added || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-500">BookBug Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/add")}>
              Add Book
            </Button>
          </div>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="sm:text-2xl md:text-4xl font-bold">Welcome, {user.name}</h1>
          {books.length > 0 || addedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-9">
              {books.map((book, index) => (
                <Card
                  key={index}
                  onClick={() => navigate(`/details/${book.isbn13}`)}
                  className="overflow-hidden flex flex-col"
                >
                  <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                  <CardContent>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                      {book.title}
                    </h4>
                    <p className="text-gray-600">{book.subtitle}</p>
                    <p className="text-green-600 font-semibold">{book.price}</p>
                  </CardContent>
                </Card>
              ))}
              {addedBooks.map((book, index) => (
                <Card
                  key={index}
                  onClick={() => navigate(`/details/added/${book.isbn13}`)}
                  className="overflow-hidden flex flex-col"
                >
                  <img src={book.url} alt={book.name} className="w-full h-48 object-cover" />
                  <CardContent>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                      {book.name}
                    </h4>
                    <p className="text-gray-600">{book.subtitle}</p>
                    <p className="text-green-600 font-semibold">{book.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No books available.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dash;