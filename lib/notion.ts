import { sampleSidequests } from "./sampleSidequests";
import type { Sidequest, SidequestSource } from "./types";

type NotionText = {
  href?: string | null;
  plain_text?: string;
};

type NotionProperty = {
  type?: string;
  title?: NotionText[];
  rich_text?: NotionText[];
  select?: { name?: string } | null;
  multi_select?: Array<{ name?: string }>;
  url?: string | null;
};

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};

type NotionQueryResponse = {
  results?: NotionPage[];
};

const currentNotionVersion = "2026-03-11";
const legacyNotionVersion = "2022-06-28";

const propertyNames = {
  title: process.env.NOTION_TITLE_PROPERTY ?? "제목",
  kind: process.env.NOTION_KIND_PROPERTY ?? "유형",
  link: process.env.NOTION_LINK_PROPERTY ?? "링크",
  review: process.env.NOTION_REVIEW_PROPERTY ?? "후기",
  description: process.env.NOTION_DESCRIPTION_PROPERTY ?? "설명"
};

export async function getSidequests(): Promise<{
  items: Sidequest[];
  source: SidequestSource;
}> {
  const token = process.env.NOTION_TOKEN ?? process.env.NOTION_SECRET;
  const dataSourceId = normalizeNotionId(process.env.NOTION_DATA_SOURCE_ID);
  const databaseId = normalizeNotionId(process.env.NOTION_DATABASE_ID);

  if (!token || (!dataSourceId && !databaseId)) {
    return { items: sampleSidequests, source: "sample" };
  }

  try {
    const queryUrl = dataSourceId
      ? `https://api.notion.com/v1/data_sources/${dataSourceId}/query`
      : `https://api.notion.com/v1/databases/${databaseId}/query`;
    const notionVersion = dataSourceId ? currentNotionVersion : legacyNotionVersion;
    const response = await fetch(
      queryUrl,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Notion-Version": notionVersion
        },
        body: JSON.stringify({
          page_size: 100,
          sorts: [{ timestamp: "created_time", direction: "descending" }]
        }),
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      throw new Error(`Notion request failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as NotionQueryResponse;
    const items = (data.results ?? [])
      .map(toSidequest)
      .filter((item): item is Sidequest => Boolean(item));

    return {
      items: items.length > 0 ? items : sampleSidequests,
      source: items.length > 0 ? "notion" : "sample"
    };
  } catch (error) {
    console.error(error);
    return { items: sampleSidequests, source: "sample" };
  }
}

function toSidequest(page: NotionPage): Sidequest | null {
  const properties = page.properties;
  const title = readText(properties, [propertyNames.title, "제목", "Title", "Name"]);
  const kind = readSelect(properties, [
    propertyNames.kind,
    "유형",
    "종류",
    "Kind",
    "Type"
  ]);
  const link = readUrl(properties, [propertyNames.link, "링크", "Link", "URL"]);
  const reviewLink = readUrl(properties, [
    propertyNames.review,
    "후기",
    "Review",
    "Review Link"
  ]);
  const description = readText(properties, [
    propertyNames.description,
    "설명",
    "Description",
    "Summary"
  ]);

  if (!title || !link) {
    return null;
  }

  return {
    id: page.id,
    title,
    kind: kind || "기타",
    link,
    reviewLink: reviewLink || undefined,
    description
  };
}

function pickProperty(
  properties: Record<string, NotionProperty>,
  names: string[]
): NotionProperty | undefined {
  return names.map((name) => properties[name]).find(Boolean);
}

function readText(properties: Record<string, NotionProperty>, names: string[]) {
  const property = pickProperty(properties, names);

  if (!property) {
    return "";
  }

  if (property.type === "title") {
    return joinPlainText(property.title);
  }

  if (property.type === "rich_text") {
    return joinPlainText(property.rich_text);
  }

  if (property.type === "url") {
    return property.url ?? "";
  }

  return "";
}

function readSelect(properties: Record<string, NotionProperty>, names: string[]) {
  const property = pickProperty(properties, names);

  if (!property) {
    return "";
  }

  if (property.type === "select") {
    return property.select?.name ?? "";
  }

  if (property.type === "multi_select") {
    return property.multi_select?.map((item) => item.name).filter(Boolean).join(", ") ?? "";
  }

  return readText(properties, names);
}

function readUrl(properties: Record<string, NotionProperty>, names: string[]) {
  const property = pickProperty(properties, names);

  if (!property) {
    return "";
  }

  if (property.type === "url") {
    return property.url ?? "";
  }

  if (property.type === "rich_text") {
    const href = property.rich_text?.find((item) => item.href)?.href?.trim();

    if (href) {
      return href;
    }
  }

  return readText(properties, names);
}

function joinPlainText(text?: NotionText[]) {
  return text?.map((item) => item.plain_text ?? "").join("").trim() ?? "";
}

function normalizeNotionId(value?: string) {
  return value?.replace(/^collection:\/\//, "").trim();
}
