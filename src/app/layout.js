import style from "./globals.css";

export default function RootLayout({children}){
  return(
    <html lang="en">
      <head>
        <style>{style}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
