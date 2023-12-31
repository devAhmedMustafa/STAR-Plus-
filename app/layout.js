import './globals.css'
import { DM_Sans } from 'next/font/google'
import Navbar from '@components/Navbar';

const dm_sans = DM_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'STAR Plus',
  description: 'STAR Plus - 2D Games Studio',
  icons:{
    icon: {
      url: '/STAR.png',
      type: 'image/png'
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'></link>
      </head>
      <body className={`${dm_sans.className}`}>
          <div className='lg:w-[75%] m-auto flex flex-col gap-6 px-8 lg:p-0'>
            <Navbar/>
            {children}
          </div>
      </body>
    </html>
  )
}
