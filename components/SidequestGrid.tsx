"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Sidequest } from "@/lib/types";

type SidequestGridProps = {
  items: Sidequest[];
};

const allKindsLabel = "전체";

const cardPalettes = [
  { surface: "#ddbdea", accent: "#000000" },
  { surface: "#a9553c", accent: "#ffffff" },
  { surface: "#e8d9a7", accent: "#000000" },
  { surface: "#b9d8ce", accent: "#000000" },
  { surface: "#1e242c", accent: "#ffffff" },
  { surface: "#d9c7bd", accent: "#000000" }
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={diagonal ? "M5 19 19 5M9 5h10v10" : "M4 12h16M14 6l6 6-6 6"} />
    </svg>
  );
}

export default function SidequestGrid({ items }: SidequestGridProps) {
  const [activeKind, setActiveKind] = useState(allKindsLabel);

  const kinds = useMemo(
    () => [
      allKindsLabel,
      ...Array.from(new Set(items.map((item) => item.kind).filter(Boolean)))
    ],
    [items]
  );

  const filteredItems = useMemo(
    () =>
      activeKind === allKindsLabel
        ? items
        : items.filter((item) => item.kind === activeKind),
    [activeKind, items]
  );

  return (
    <div className="siteShell">
      <header className="topbar">
        <a className="wordmark" href="#" aria-label="Tangent Lab 홈">
          <span className="mark" aria-hidden="true">T·</span>
          <span>Tangent Lab</span>
        </a>
        <p>Classroom ideas, beautifully off-course.</p>
        <a className="exploreLink" href="#projects">
          작업 둘러보기 <Arrow diagonal />
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="heroCopy">
          <span className="eyebrow">CURIOUS THINGS / 2026</span>
          <h1 id="hero-title">
            수학이
            <br />
            <span>옆길로 새면,</span>
            <br />
            작품이 된다.
          </h1>
          <p>
            교실에서 시작해 게임과 도구가 된 아이디어들.
            <br />
            Tangent Lab의 작은 실험을 만나보세요.
          </p>
        </div>
        <div className="heroArt" aria-hidden="true">
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="orbit orbitThree" />
          <span className="formula">∂</span>
          <span className="artLabel">FOLLOW<br />THE TANGENT</span>
        </div>
      </section>

      <section className="projectSection" id="projects">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">THE ARCHIVE</span>
            <h2>실험 보관함</h2>
          </div>
          <p>
            정답보다 재미있는 샛길들
            <span>{String(filteredItems.length).padStart(2, "0")} PROJECTS</span>
          </p>
        </div>

        <nav className="filters" aria-label="프로젝트 종류 필터">
          {kinds.map((kind) => {
            const count =
              kind === allKindsLabel
                ? items.length
                : items.filter((item) => item.kind === kind).length;
            return (
              <button
                className="filterButton"
                data-active={activeKind === kind}
                key={kind}
                onClick={() => setActiveKind(kind)}
                type="button"
              >
                {kind} <span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </nav>

        <div className="cardGrid">
          {filteredItems.map((item, index) => {
            const palette = cardPalettes[index % cardPalettes.length];
            const style = {
              "--card-surface": palette.surface,
              "--card-ink": palette.accent
            } as CSSProperties;

            return (
              <article className="projectCard" key={item.id} style={style}>
                <div className="cardTop">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="kindPill">{item.kind}</span>
                </div>
                <div className="cardBody">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="cardFooter">
                  <a href={item.link} rel="noreferrer" target="_blank">
                    시작하기 <Arrow diagonal />
                  </a>
                  {item.reviewLink ? (
                    <a href={item.reviewLink} rel="noreferrer" target="_blank">
                      후기
                    </a>
                  ) : (
                    <span>OPEN PROJECT</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer>
        <div className="footerPrompt">어디로 샐지 몰라서<br />더 재미있는 실험.</div>
        <div className="footerMeta">
          <span>TANGENT LAB © 2026</span>
          <a href="#">맨 위로 ↑</a>
        </div>
      </footer>
    </div>
  );
}

