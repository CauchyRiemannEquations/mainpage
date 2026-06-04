import Image from "next/image";
import SidequestGrid from "@/components/SidequestGrid";
import { getSidequests } from "@/lib/notion";

export const revalidate = 300;

export default async function Home() {
  const { items } = await getSidequests();

  return (
    <main>
      <section className="hero" aria-labelledby="site-title">
        <Image
          alt=""
          className="heroImage"
          fill
          priority
          sizes="100vw"
          src="/images/teacher-j-hero.png"
        />
        <div className="heroShade" />
        <div className="heroContent">
          <h1 id="site-title">
            <span>Teacher J's</span>
            <span>Sidequest</span>
          </h1>
          <p className="heroCopy">
            <span>Things I made because they didn't exist.</span>
            <span>Games, tools, and ideas from the classroom.</span>
          </p>
        </div>
      </section>

      <section className="catalog" aria-label="Sidequest catalog">
        <SidequestGrid items={items} />
      </section>
    </main>
  );
}
