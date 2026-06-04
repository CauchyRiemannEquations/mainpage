"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Sidequest } from "@/lib/types";

type SidequestGridProps = {
  items: Sidequest[];
};

const allKindsLabel = "전체";

const cardPalettes = [
  { accent: "#147d75", soft: "#e7f3ef" },
  { accent: "#e65f4f", soft: "#fff0ed" },
  { accent: "#315f9f", soft: "#edf3fb" },
  { accent: "#b7791f", soft: "#fff4d8" },
  { accent: "#7c3aed", soft: "#f1eaff" },
  { accent: "#c2410c", soft: "#fff1e8" },
  { accent: "#0f766e", soft: "#e6f5f3" },
  { accent: "#be123c", soft: "#ffe8ef" }
];

export default function SidequestGrid({ items }: SidequestGridProps) {
  const [activeKind, setActiveKind] = useState(allKindsLabel);

  const kinds = useMemo(() => {
    return [
      allKindsLabel,
      ...Array.from(new Set(items.map((item) => item.kind).filter(Boolean)))
    ];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeKind === allKindsLabel) {
      return items;
    }

    return items.filter((item) => item.kind === activeKind);
  }, [activeKind, items]);

  return (
    <div className="sidequestPanel">
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
              <strong>{count}</strong>
            </button>
          );
        })}
      </div>

      <div className="cardGrid">
        {filteredItems.map((item, index) => {
          const palette = cardPalettes[index % cardPalettes.length];
          const style = {
            "--card-accent": palette.accent,
            "--card-accent-soft": palette.soft
          } as CSSProperties;

          return (
            <article className="sidequestCard" key={item.id} style={style}>
              <div className="cardMeta">
                <span>{item.kind}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="cardActions">
                <a className="primaryAction" href={item.link} rel="noreferrer" target="_blank">
                  실행하기 <span aria-hidden="true">↗</span>
                </a>
                {item.reviewLink ? (
                  <a className="secondaryAction" href={item.reviewLink} rel="noreferrer" target="_blank">
                    후기 보기 <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
