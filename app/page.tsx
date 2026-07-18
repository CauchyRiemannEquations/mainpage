import SidequestGrid from "@/components/SidequestGrid";
import { getSidequests } from "@/lib/notion";

export const revalidate = 300;

export default async function Home() {
  const { items } = await getSidequests();

  return (
    <main>
      <SidequestGrid items={items} />
    </main>
  );
}
