
const SinglePost = ({ title, content, tag, creator, createdAt }) => {
  return (
      <div>
        <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
          <span className='bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
            {title}
          </span>
        </h1>
        <div className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left'>
          {content}
        </div>

        <div className='mt-2  sm:columns-2 sm:gap-6 xl:columns-3'>
          {tag}
        </div>
        <div className='mt-2 sm:columns-2 sm:gap-6 xl:columns-3'>
          {creator}
        </div>
        <div className='mt-2 sm:columns-2 sm:gap-6 xl:columns-3'>
          {createdAt}
        </div>
      </div>
  );
};

export default SinglePost;
