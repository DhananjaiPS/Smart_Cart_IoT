import Image from "next/image";
import SmartRetailStore from "./component/SmartRetailStore";
import ProductFetcher from "./component/ProductFetcher";
import HeroCarousel from "./component/HeroCarousel";
import FooterComponent from "./component/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <SmartRetailStore/>
     {/* <ProductFetcher/> */}
<FooterComponent/>
     
    </div>
  );
}
