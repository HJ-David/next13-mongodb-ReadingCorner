"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import SinglePost from "@components/SinglePost";


const SingleBlog = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const [post, setPost] = useState({ title: "", content: "", tag: "", creator: "", createdAt: "" });
  

  useEffect(() => {
    const getBlogDetails = async () => {
      const response = await fetch(`/api/blog/${blogId}`);
      const data = await response.json();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setPost({
        title: data.title,
        content: data.content,
        tag: data.tag,
        creator: data.creator.username,
        createdAt:
          new Date(data.createdAt).toLocaleDateString("en-US", options) +
          " " +
          "[" + " " +
          new Date(data.createdAt).toLocaleTimeString() +
          " " +
          "]",
      });
    };
    if (blogId) getBlogDetails();
  }, [blogId]);


  return (
    <SinglePost
      title={post.title}
      content={post.content}
      tag={post.tag}
      creator={post.creator}
      createdAt={post.createdAt}
    />
  );
};

export default SingleBlog;
