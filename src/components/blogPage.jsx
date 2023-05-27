import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogPage() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://blogsapi.p.rapidapi.com/",
      params: { id: blogId },
      headers: {
        "X-RapidAPI-Key": "84b7611102msh29f188dad3e2aa6p194b7bjsn0382c9775801",
        "X-RapidAPI-Host": "blogsapi.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        if (res.data.results.length === 0) {
          setError("Blog not found");
        } else {
          setBlog(res.data.results[0]);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      {loading ? (
        <CircularProgress />
      ) : error !== "" ? (
        <h1>{error}</h1>
      ) : (
        <h1>{blog.title}</h1>
      )}
    </main>
  );
}
