/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto flex flex-col">
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">
          Go to My Blogs-
        </h1>
        <a
          href="https://jamil-dev-org.vercel.app/"
          className="text-center border rounded-md text-green-800 p-3 hover:opacity-70 bg-blue-400 "
        >
          JamilBlog
        </a>
      </div>
    </div>
  );
};

export default Blogs;
