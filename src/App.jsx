import { useEffect, useState } from "react";
import "./App.css";
import MediaCard from "./components/blogCard";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  function fetchAllBlogs() {
    const options = {
      method: "GET",
      url: "https://blogsapi.p.rapidapi.com/",
      params: {
        ordering: "-date_published",
      },
      headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY",
        "X-RapidAPI-Host": "blogsapi.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        setBlogs(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getAllCategories() {
    const options = {
      method: "GET",
      url: "https://blogsapi.p.rapidapi.com/categories/",
      headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY",
        "X-RapidAPI-Host": "blogsapi.p.rapidapi.com",
      },
    };
    axios.request(options).then((res) => {
      let cats = res.data.map((e) => {
        return {
          title: e.title,
          id: e.id,
        };
      });
      setCategories(cats);
    });
  }
  function handleChange(event) {
    setLoading(true);
    setError("");
    if (event.target.value == "all") {
      fetchAllBlogs();
    } else {
      const options = {
        method: "GET",
        url: "https://blogsapi.p.rapidapi.com/",
        params: { category: event.target.value },
        headers: {
          "X-RapidAPI-Key": "YOUR_API_KEY",
          "X-RapidAPI-Host": "blogsapi.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((res) => {
          if (res.data.results.length === 0) {
            setError("No blogs found in this category");
          } else {
            setBlogs(res.data.results);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  useEffect(() => {
    fetchAllBlogs();
    getAllCategories();
  }, []);
  return (
    <main>
      <select onChange={handleChange}>
        <option value="all">All</option>
        {categories.map((e) => {
          return (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          );
        })}
      </select>
      {loading ? (
        <CircularProgress />
      ) : error !== "" ? (
        <h2>{error}</h2>
      ) : (
        <div className="blogs">
          {blogs.map((e) => {
            return <MediaCard key={e.id} blog={e} />;
          })}
        </div>
      )}
    </main>
  );
}

export default App;
