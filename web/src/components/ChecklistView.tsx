import { useState, useRef } from "react";
import type { TripList, CheckItem } from "../data/defaultLists";

interface ChecklistViewProps {
  list: TripList;
  onChange: (updated: TripList) => void;
}

export function ChecklistView({ list, onChange }: ChecklistViewProps) {
  const [newItemText, setNewItemText] = useState<Record<string, string>>({});
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(list.categories.map((c) => [c.id, true]))
  );
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalItems = list.categories.flatMap((c) => c.items).length;
  const checkedItems = list.categories.flatMap((c) => c.items).filter((i) => i.checked).length;
  const progress = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  function toggleItem(catId: string, itemId: string) {
    onChange({
      ...list,
      categories: list.categories.map((cat) =>
        cat.id !== catId
          ? cat
          : {
              ...cat,
              items: cat.items.map((item) =>
                item.id !== itemId ? item : { ...item, checked: !item.checked }
              ),
            }
      ),
    });
  }

  function toggleCategory(catId: string) {
    setExpandedCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
  }

  function checkAllInCategory(catId: string, checked: boolean) {
    onChange({
      ...list,
      categories: list.categories.map((cat) =>
        cat.id !== catId
          ? cat
          : { ...cat, items: cat.items.map((item) => ({ ...item, checked })) }
      ),
    });
  }

  function addItem(catId: string) {
    const text = (newItemText[catId] || "").trim();
    if (!text) return;
    const newItem: CheckItem = { id: crypto.randomUUID(), label: text, checked: false, custom: true };
    onChange({
      ...list,
      categories: list.categories.map((cat) =>
        cat.id !== catId ? cat : { ...cat, items: [...cat.items, newItem] }
      ),
    });
    setNewItemText((prev) => ({ ...prev, [catId]: "" }));
    setAddingTo(null);
  }

  function deleteItem(catId: string, itemId: string) {
    onChange({
      ...list,
      categories: list.categories.map((cat) =>
        cat.id !== catId
          ? cat
          : { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
      ),
    });
  }

  function resetAll() {
    if (!confirm("Reset all checkboxes in this list?")) return;
    onChange({
      ...list,
      categories: list.categories.map((cat) => ({
        ...cat,
        items: cat.items.map((item) => ({ ...item, checked: false })),
      })),
    });
  }

  const allDone = checkedItems === totalItems && totalItems > 0;

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1
            className="text-3xl font-bold flex items-center gap-3"
            style={{ fontFamily: "Fraunces, serif", color: "var(--ink)" }}
          >
            <span>{list.icon}</span>
            {list.name} Trip
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {list.description}
          </p>
        </div>
        <button
          onClick={resetAll}
          className="shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80"
          style={{ borderColor: "var(--line)", color: "var(--muted)" }}
        >
          Reset
        </button>
      </div>

      {/* Progress */}
      <div
        className="rounded-2xl p-4 mb-6 flex items-center gap-4"
        style={{ background: "var(--panel)" }}
      >
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1.5">
            <span style={{ color: "var(--ink)" }} className="font-medium">
              {allDone ? "All packed!" : "Packing progress"}
            </span>
            <span style={{ color: "var(--muted)" }}>
              {checkedItems} / {totalItems}
            </span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: "var(--line)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: allDone ? "var(--success)" : list.color,
              }}
            />
          </div>
        </div>
        <div
          className="text-2xl font-bold shrink-0"
          style={{ color: allDone ? "var(--success)" : list.color, fontFamily: "Fraunces, serif" }}
        >
          {progress}%
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {list.categories.map((cat) => {
          const catChecked = cat.items.filter((i) => i.checked).length;
          const catTotal = cat.items.length;
          const catDone = catChecked === catTotal && catTotal > 0;
          const isExpanded = expandedCats[cat.id] ?? true;
          const isAdding = addingTo === cat.id;

          return (
            <div
              key={cat.id}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            >
              {/* Category header */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
                style={{ background: "var(--panel)" }}
                onClick={() => toggleCategory(cat.id)}
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
                    {cat.name}
                  </span>
                  <span className="ml-2 text-xs" style={{ color: "var(--muted)" }}>
                    {catChecked}/{catTotal}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {catDone && (
                    <span className="text-xs" style={{ color: "var(--success)" }}>
                      Done
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      checkAllInCategory(cat.id, !catDone);
                    }}
                    className="text-xs px-2 py-1 rounded-lg border transition-colors hover:opacity-80"
                    style={{ borderColor: "var(--line)", color: "var(--muted)" }}
                  >
                    {catDone ? "Uncheck all" : "Check all"}
                  </button>
                  <span
                    className="text-sm transition-transform duration-200"
                    style={{
                      color: "var(--muted)",
                      display: "inline-block",
                      transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                    }}
                  >
                    ▾
                  </span>
                </div>
              </div>

              {/* Items */}
              {isExpanded && (
                <div className="divide-y" style={{ borderColor: "var(--line)" }}>
                  {cat.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-2.5 group"
                      style={{ background: item.checked ? "var(--panel)" : "var(--paper)" }}
                    >
                      <button
                        onClick={() => toggleItem(cat.id, item.id)}
                        className="shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors"
                        style={{
                          borderColor: item.checked ? list.color : "var(--line-strong)",
                          background: item.checked ? list.color : "transparent",
                        }}
                        aria-label={`Toggle ${item.label}`}
                      >
                        {item.checked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                      <span
                        className="flex-1 text-sm transition-colors"
                        style={{
                          color: item.checked ? "var(--muted)" : "var(--ink)",
                          textDecoration: item.checked ? "line-through" : "none",
                        }}
                      >
                        {item.label}
                        {item.custom && (
                          <span
                            className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                            style={{ background: "var(--line)", color: "var(--muted)" }}
                          >
                            custom
                          </span>
                        )}
                      </span>
                      {item.custom && (
                        <button
                          onClick={() => deleteItem(cat.id, item.id)}
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs px-1.5 py-0.5 rounded transition-opacity"
                          style={{ color: "var(--error)" }}
                          aria-label="Delete item"
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add item row */}
                  {isAdding ? (
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Item name..."
                        value={newItemText[cat.id] || ""}
                        onChange={(e) =>
                          setNewItemText((prev) => ({ ...prev, [cat.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addItem(cat.id);
                          if (e.key === "Escape") setAddingTo(null);
                        }}
                        autoFocus
                        className="flex-1 text-sm px-3 py-1.5 rounded-lg border outline-none"
                        style={{
                          borderColor: "var(--line-strong)",
                          background: "var(--paper)",
                          color: "var(--ink)",
                        }}
                      />
                      <button
                        onClick={() => addItem(cat.id)}
                        className="text-sm px-3 py-1.5 rounded-lg font-medium transition-colors"
                        style={{ background: list.color, color: "#fff" }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAddingTo(null)}
                        className="text-sm px-2 py-1.5 rounded-lg"
                        style={{ color: "var(--muted)" }}
                      >
                        x
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAddingTo(cat.id);
                        setTimeout(() => inputRef.current?.focus(), 50);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--muted)" }}
                    >
                      + Add item
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs" style={{ color: "var(--muted)" }}>
        Your list is saved automatically in your browser.
      </p>
    </div>
  );
}
