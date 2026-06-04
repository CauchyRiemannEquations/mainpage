import SidequestGrid from "@/components/SidequestGrid";
import { getSidequests } from "@/lib/notion";

export const revalidate = 300;

export default async function Home() {
  const { items } = await getSidequests();

  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Tangent Lab home">
          <span className="brandMark" aria-hidden="true">
            <svg viewBox="0 0 44 28" role="img">
              <path d="M4 22C12 6 24 6 40 18" />
              <path d="M13 17L36 8" />
              <circle cx="25" cy="12.5" r="2.2" />
            </svg>
          </span>
          <span>tangent lab.</span>
        </a>
        <nav className="siteNav" aria-label="주요 메뉴">
          <a href="#resources">수업 자료</a>
          <a href="#resources">수학 실험실</a>
          <a href="#top">소개</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="site-title">
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
          <p className="heroKicker">수학에 닿다, 생각을 넓히다.</p>
          <h1 id="site-title">Tangent Lab</h1>
          <p className="heroCopy">Where classroom ideas go off on tangents.</p>
          <p className="heroNote">
            곡선과 직선이 만나는 단 하나의 점처럼, 수학적 개념이 직관으로
            이어지는 자료를 모읍니다.
          </p>
        </div>
      </section>

      <section className="catalog" id="resources" aria-label="Tangent Lab catalog">
        <SidequestGrid items={items} />
      </section>
    </main>
  );
}
