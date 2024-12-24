
import "./globals.scss";


export const metadata = {
  title: "imusic",
  description: "desktop web application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='bg-[#DC8D45]'
      >
        {children}
      </body>
    </html>
  );
}
