import "./globals.css";
import {Atma,Zain} from "next/font/google"
import ProvideSession from  "../components/SessionProvider"

const atma=Atma({subsets:["latin"],weight:["400","700"],variable:"--font-atma"})
const zain=Zain({subsets:["latin"],weight:["400","700"],variable:"--font-zain"})

export default function RootLayout({children}){
  return(
    <ProvideSession>
    <html lang="en" className={`${atma.variable} ${zain.variable}`}>
      <body>
        {children}
      </body>
    </html>
    </ProvideSession>
  );
}
