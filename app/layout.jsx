import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "BlogPBA",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='w-[100vw] min-h-[100vh] fixed flex justify-center py-120 px-24 pb-160 pointer-events-none'>
          <div className='gradient' />
        </div>

        <main className='relative z-10 flex justify-center items-center flex-col mx-auto sm:px-16 px-6'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
