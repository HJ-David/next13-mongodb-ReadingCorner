"use client";

import { useState, useEffect } from "react";

import BlogCard from "./BlogCard";

const BlogCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
      {data.map((post) => (
        <BlogCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/blog");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterBlogs = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.blog)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterBlogs(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterBlogs(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='mt-16 flex flex-col justify-center items-center'>
      <form className='relative w-[50vw]'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0'
        />
      </form>
      
      <div className='w-full flex justify-center items-center'>
        {/* All Blogs */}
        {searchText ? (
          <BlogCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <BlogCardList data={allPosts} handleTagClick={handleTagClick} />
        )}
      </div>
    </section>
  );
};

export default Feed;
