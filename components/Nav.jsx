"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        {/* <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        /> */}
        <p className='max-sm:hidden font-satoshi font-bold text-xl tracking-wide bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center'>
          Reading Corner
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link
              href='/create-blog'
              className='rounded-full border border-black bg-black py-1 px-3 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center'
            >
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className='rounded-full border border-black bg-transparent py-1 px-3 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='rounded-full border border-black bg-black py-1 px-3 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='absolute right-0 top-full mt-3 w-full p-3 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end'>
                <Link
                  href='/profile'
                  className='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-blog'
                  className='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full rounded-full border border-black bg-black py-1 px-3 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='rounded-full border border-black bg-black py-1 px-3 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
