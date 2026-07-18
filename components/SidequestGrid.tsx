"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Sidequest } from "@/lib/types";

type SidequestGridProps = {
  items: Sidequest[];
};

const allKindsLabel = "전체";

// Bright, calm palette. Each unique kind maps to one entry (stable by order).
const cardPalettes = [
  { accent: "#12b5a5", soft: "#f1fcfa", border: "#d3f2ec" },
  { accent: "#3f7dff", soft: "#f2f6ff", border: "#dbe6ff" },
  { accent: "#e0a323", soft: "#fff9ec", border: "#f6e7bf" },
  { accent: "#e5533d", soft: "#fff2ef", border: "#fbd9d1" },
  { accent: "#8b5cf6", soft: "#f6f1ff", border: "#e6dbff" },
  { accent: "#0ea5a0", soft: "#effbfa", border: "#cdeeec" }
];

export default function SidequestGrid({ items }: SidequestGridProps) {
  const [activeKind, setActiveKind] = useState(allKindsLabel);

  const kinds = useMemo(() => {
    return [
      allKindsLabel,
      ...Array.from(new Set(items.map((item) => item.kind).filter(Boolean)))
    ];
  }, [items]);

  // Assign a stable palette to each kind by its order of appearance.
  const paletteByKind = useMemo(() => {
    const map = new Map<string, (typeof cardPalettes)[number]>();
    let i = 0;
    for (const item of items) {
      if (item.kind && !map.has(item.kind)) {
        map.set(item.kind, cardPalettes[i % cardPalettes.length]);
        i += 1;
      }
    }
    return map;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeKind === allKindsLabel) {
      return items;
    }
    return items.filter((item) => item.kind === activeKind);
  }, [activeKind, items]);

  const now = new Date();
  const stamp = `updated ${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;

  return (
    <div className="labShell">
      <aside className="labSidebar">
        <div>
          <div className="brand">
            Tangent
            <br />
            Lab
          </div>
          <div className="brandCopy">
            교실 아이디어가
            <br />
            옆길로 새는 작업실
          </div>
        </div>

        <div>
          <div className="filterHead">FILTER</div>
          <div className="filters" aria-label="종류 필터">
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
                  <span>{kind}</span>
                  <span className="count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="labMain">
        <div className="mainHead">
          <span className="title">
            {activeKind === allKindsLabel ? "전체 작업" : activeKind}{" "}
            <span>{filteredItems.length}</span>
          </span>
          <span className="stamp">{stamp}</span>
        </div>

        <div className="cardGrid">
          {filteredItems.map((item) => {
            const palette =
              paletteByKind.get(item.kind) ?? cardPalettes[0];
            const style = {
              "--card-accent": palette.accent,
              "--card-soft": palette.soft,
              "--card-border": palette.border
            } as CSSProperties;

            return (
              <article className="sidequestCard" key={item.id} style={style}>
                <div className="cardMeta">
                  <span className="dot" aria-hidden="true" />
                  <span className="kind">{item.kind}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="cardActions">
                  <a
                    className="primaryAction"
                    href={item.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    실행하기 →
                  </a>
                  {item.reviewLink ? (
                    <a
                      className="secondaryAction"
                      href={item.reviewLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      후기 보기
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
