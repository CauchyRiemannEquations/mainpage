import type { Sidequest } from "./types";

export const sampleSidequests: Sidequest[] = [
  {
    id: "sequence-pang",
    title: "수열팡",
    kind: "웹게임",
    link: "https://sequencepang.onrender.com/",
    description: "수열 규칙을 찾아 블록을 터뜨리는 수학 퍼즐 게임"
  },
  {
    id: "sequence-war",
    title: "시퀀스 워",
    kind: "웹게임",
    link: "https://sequencewar.vercel.app/",
    description: "수열 규칙으로 적을 물리치는 수학 전략 디펜스 게임"
  },
  {
    id: "trigo-fortress",
    title: "수포자인 내가 삼각함수로 외계인을 물리치는 건에 대하여",
    kind: "웹게임",
    link: "https://trigofortress.vercel.app/",
    reviewLink: "https://m.blog.naver.com/mandumandumandumandu/224297233314",
    description: "삼각함수의 그래프로 즐기는 포트리스게임"
  }
];
