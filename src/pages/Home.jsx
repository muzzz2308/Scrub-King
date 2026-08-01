import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import PackShot from "../sections/PackShot";
import Perks from "../sections/Perks";
import Products from "../sections/Products";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Marquee />
      <Products />
      <Perks />
      <PackShot />
    </div>
  );
}
