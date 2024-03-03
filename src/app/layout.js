import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "SplitEasy",
  description: "SplitEasy app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col justify-center items-center min-h-screen w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className='flex flex-col justify-center items-center min-h-screen w-full'>
            {children}
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
