import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'>
      Reading Corner
      <br className='max-md:hidden' />
      <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center'>
        {" "}
        English Reading Materials by Level
      </span>
    </h1>
    <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center'>
      You can find short interesting stories that fit your level. Gradually, you
      can move up to a higher level.
    </p>

    <Feed />
  </section>
);

export default Home;
