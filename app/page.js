import Image from 'next/image'
import SloganSec from '@/components/Containers/SloganSec';
import AboutUs from '@/components/Static/Crew';
import About from '@/components/Static/About';
import Oscillations from '@/components/Advanced CGs/Oscillations';
import logo from "@assets/STAR.png";


export default function Home() {

  return (
    <div className="flex flex-col gap-8">
      
      <SloganSec>
        <Image className="hover:drop-shadow-logoGlow absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hover:w-[150px] cursor-pointer transition-all" src={logo} width={110}/>
        <Oscillations/>
      </SloganSec>
      <About/>
      <AboutUs/>
    </div>
  )
}
