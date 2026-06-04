export type Sidequest = {
  id: string;
  title: string;
  kind: string;
  link: string;
  reviewLink?: string;
  description: string;
};

export type SidequestSource = "notion" | "sample";
