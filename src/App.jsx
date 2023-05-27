import { useEffect, useState } from "react";
import "./App.css";
import MediaCard from "./components/blogCard";
import axios from "axios";

function App() {
  const [blogs, setBlogs] = useState([]);

  const options = {
    method: "GET",
    url: "https://blogsapi.p.rapidapi.com/",
    params: {
      ordering: "-date_published",
    },
    headers: {
      "X-RapidAPI-Key": "c975bf37b4msh1f233832d20478bp12b97bjsn747e557d11d9",
      "X-RapidAPI-Host": "blogsapi.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios.request(options).then((res) => {
      setBlogs(res.data.results);
    });
  }, []);
  return (
    <main>
      <div className="blogs">
        {blogs.map((e) => {
          return <MediaCard key={e.id} blog={e} />;
        })}
      </div>
    </main>
  );
}

export default App;
