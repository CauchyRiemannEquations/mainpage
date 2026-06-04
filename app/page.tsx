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
        <svg className="heroGraph" viewBox="0 0 1200 520" aria-hidden="true">
          <path
            className="graphGrid"
            d="M0 420H1200M0 320H1200M0 220H1200M0 120H1200M160 0V520M360 0V520M560 0V520M760 0V520M960 0V520"
          />
          <path
            className="graphCurve"
            d="M40 350C160 130 270 120 390 285C520 465 650 445 785 245C910 58 1035 92 1160 230"
          />
          <path className="graphTangent" d="M642 353L880 150" />
          <circle className="graphPoint" cx="758" cy="254" r="7" />
        </svg>
        <div className="heroContent">
          <h1 id="site-title">Tangent Lab</h1>
          <p className="heroCopy">Where classroom ideas go off on tangents.</p>
        </div>
      </section>

      <section className="catalog" aria-label="Tangent Lab catalog">
        <SidequestGrid items={items} />
      </section>
    </main>
  );
}
