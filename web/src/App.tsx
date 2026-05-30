import { useState, useEffect } from "react";
import { Shell } from "./components/Shell";
import { ChecklistView } from "./components/ChecklistView";
import { buildDefaultLists } from "./data/defaultLists";
import type { TripList } from "./data/defaultLists";

const STORAGE_KEY = "packgo_lists_v1";

const NAV_ITEMS = [
  { id: "beach", label: "Beach", icon: "🏖️" },
  { id: "camping", label: "Camping", icon: "🏕️" },
  { id: "overseas", label: "Overseas", icon: "✈️" },
  { id: "business", label: "Business", icon: "💼" },
];

function loadLists(): TripList[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TripList[];
  } catch {
    // ignore
  }
  return buildDefaultLists();
}

function saveLists(lists: TripList[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

export default function App() {
  const [lists, setLists] = useState<TripList[]>(loadLists);
  const [activeId, setActiveId] = useState<string>("beach");

  useEffect(() => {
    saveLists(lists);
  }, [lists]);

  const activeList = lists.find((l) => l.id === activeId) ?? lists[0];

  function handleChange(updated: TripList) {
    setLists((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }

  return (
    <Shell navItems={NAV_ITEMS} activeNav={activeId} onNavChange={setActiveId}>
      <ChecklistView list={activeList} onChange={handleChange} />
    </Shell>
  );
}
