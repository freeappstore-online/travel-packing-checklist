export interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
  custom?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  items: CheckItem[];
}

export interface TripList {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  categories: Category[];
}

function makeItem(label: string): CheckItem {
  return { id: crypto.randomUUID(), label, checked: false };
}

function makeCategory(name: string, icon: string, labels: string[]): Category {
  return {
    id: crypto.randomUUID(),
    name,
    icon,
    items: labels.map(makeItem),
  };
}

export function buildDefaultLists(): TripList[] {
  return [
    {
      id: "beach",
      name: "Beach",
      icon: "🏖️",
      color: "#0ea5e9",
      description: "Sun, sand & sea — everything for a perfect beach trip.",
      categories: [
        makeCategory("Clothing", "👕", [
          "Swimsuit / bikini",
          "Cover-up or sarong",
          "Flip flops / sandals",
          "Casual shorts & tees",
          "Light evening outfit",
          "Underwear (5 pairs)",
          "Socks",
        ]),
        makeCategory("Beach Essentials", "🌊", [
          "Beach towel",
          "Beach bag",
          "Sunscreen SPF 50+",
          "After-sun lotion",
          "Sunglasses (UV protection)",
          "Sun hat / cap",
          "Waterproof phone pouch",
          "Snorkel & mask",
        ]),
        makeCategory("Toiletries", "🧴", [
          "Shampoo & conditioner",
          "Body wash",
          "Deodorant",
          "Razor",
          "Toothbrush & toothpaste",
          "Lip balm with SPF",
          "Insect repellent",
        ]),
        makeCategory("Health & Safety", "🩹", [
          "First aid kit",
          "Antihistamines",
          "Painkillers",
          "Rehydration sachets",
          "Motion sickness tablets",
        ]),
        makeCategory("Tech & Gadgets", "📱", [
          "Phone & charger",
          "Portable power bank",
          "Waterproof camera / GoPro",
          "Bluetooth speaker",
          "E-reader / tablet",
          "Earbuds",
        ]),
        makeCategory("Documents & Money", "📄", [
          "Passport / ID",
          "Travel insurance docs",
          "Accommodation confirmation",
          "Cash & cards",
          "Emergency contact list",
        ]),
      ],
    },
    {
      id: "camping",
      name: "Camping",
      icon: "🏕️",
      color: "#16a34a",
      description: "Into the wild — gear up for nights under the stars.",
      categories: [
        makeCategory("Shelter & Sleep", "⛺", [
          "Tent & poles & pegs",
          "Sleeping bag (season-appropriate)",
          "Sleeping mat / inflatable pad",
          "Pillow",
          "Tarp / groundsheet",
          "Tent repair kit",
        ]),
        makeCategory("Clothing", "🧥", [
          "Moisture-wicking base layers",
          "Insulating mid-layer / fleece",
          "Waterproof jacket",
          "Hiking trousers",
          "Hiking boots",
          "Camp sandals",
          "Warm hat & gloves",
          "Merino wool socks (3 pairs)",
          "Underwear (4 pairs)",
        ]),
        makeCategory("Cooking & Food", "🍳", [
          "Camp stove & fuel",
          "Lighter & matches",
          "Cooking pot & pan",
          "Utensils (fork, spoon, knife)",
          "Plates & cups",
          "Can opener",
          "Food storage bags",
          "Portable water filter / purification tablets",
          "Water bottles (2L)",
          "Cooler bag & ice packs",
        ]),
        makeCategory("Navigation & Safety", "🗺️", [
          "Map & compass",
          "GPS device or offline maps",
          "Headlamp & spare batteries",
          "Whistle",
          "Emergency bivvy bag",
          "First aid kit",
          "Fire starter kit",
          "Multi-tool / Swiss Army knife",
          "Rope / paracord (10m)",
        ]),
        makeCategory("Hygiene", "🧼", [
          "Biodegradable soap",
          "Hand sanitiser",
          "Toothbrush & toothpaste",
          "Toilet paper & trowel",
          "Quick-dry towel",
          "Deodorant",
          "Wet wipes",
          "Sunscreen",
          "Insect repellent",
        ]),
        makeCategory("Pack & Carry", "🎒", [
          "Backpack (50-70L)",
          "Dry bags / waterproof liners",
          "Trekking poles",
          "Gaiters",
          "Carabiners",
        ]),
      ],
    },
    {
      id: "overseas",
      name: "Overseas",
      icon: "✈️",
      color: "#7c3aed",
      description: "International travel — documents, adapters & everything in between.",
      categories: [
        makeCategory("Documents & Money", "📄", [
          "Passport (valid 6+ months)",
          "Visa / entry requirements",
          "Travel insurance policy",
          "Flight tickets (printed/digital)",
          "Hotel / Airbnb confirmations",
          "International driving permit",
          "Vaccination records / health card",
          "Emergency contacts & embassy number",
          "Foreign currency & cards",
          "Copies of all documents (cloud backup)",
        ]),
        makeCategory("Clothing", "👗", [
          "Versatile day outfits (5-7)",
          "Smart/evening outfit",
          "Comfortable walking shoes",
          "Dress shoes",
          "Underwear (7 pairs)",
          "Socks (5 pairs)",
          "Light jacket / cardigan",
          "Rain jacket",
          "Swimwear",
          "Sleepwear",
        ]),
        makeCategory("Tech & Connectivity", "🔌", [
          "Universal travel adapter",
          "Phone & charger",
          "Laptop / tablet & charger",
          "Portable power bank",
          "Noise-cancelling headphones",
          "International SIM / eSIM",
          "Camera & memory cards",
          "Portable Wi-Fi hotspot",
        ]),
        makeCategory("Health & Pharmacy", "💊", [
          "Prescription medications (extra supply)",
          "Painkillers & anti-inflammatories",
          "Antihistamines",
          "Antidiarrhoeal tablets",
          "Motion sickness tablets",
          "Rehydration sachets",
          "First aid kit",
          "Hand sanitiser",
          "Face masks",
          "Insect repellent",
        ]),
        makeCategory("Toiletries", "🧳", [
          "Shampoo & conditioner (travel size)",
          "Body wash",
          "Deodorant",
          "Toothbrush & toothpaste",
          "Razor & shaving cream",
          "Sunscreen SPF 50+",
          "Moisturiser",
          "Lip balm",
        ]),
        makeCategory("Comfort & In-Flight", "💺", [
          "Travel pillow",
          "Eye mask",
          "Earplugs",
          "Compression socks",
          "Refillable water bottle",
          "Snacks",
          "Entertainment downloads (offline)",
        ]),
      ],
    },
    {
      id: "business",
      name: "Business",
      icon: "💼",
      color: "#d97706",
      description: "Professional travel — polished, prepared & productive.",
      categories: [
        makeCategory("Documents & Admin", "📋", [
          "Passport / ID",
          "Business cards",
          "Itinerary & meeting schedule",
          "Flight & hotel confirmations",
          "Expense claim forms",
          "Travel insurance",
          "Company credit card",
          "NDA / contracts (if needed)",
          "Copies of all docs",
        ]),
        makeCategory("Professional Attire", "👔", [
          "Suits / blazers (2)",
          "Dress shirts / blouses (4)",
          "Dress trousers / skirts (2)",
          "Ties / accessories",
          "Dress shoes (polished)",
          "Casual smart outfit (evenings)",
          "Underwear & socks (5 pairs each)",
          "Gym wear (if hotel has gym)",
          "Sleepwear",
        ]),
        makeCategory("Tech & Office", "💻", [
          "Laptop & charger",
          "Universal travel adapter",
          "Phone & charger",
          "Portable power bank",
          "USB hub / dongle",
          "HDMI / presentation cable",
          "Wireless mouse",
          "Noise-cancelling headphones",
          "Portable printer (optional)",
          "Notebook & pens",
        ]),
        makeCategory("Grooming & Toiletries", "🪒", [
          "Toothbrush & toothpaste",
          "Deodorant",
          "Razor & shaving cream",
          "Hair styling products",
          "Cologne / perfume",
          "Moisturiser",
          "Lint roller",
          "Shoe polish kit",
          "Travel-size iron / steamer",
        ]),
        makeCategory("Health & Wellbeing", "🧘", [
          "Prescription medications",
          "Painkillers",
          "Eye drops (dry air)",
          "Hand sanitiser",
          "Vitamins / supplements",
          "Rehydration sachets",
        ]),
        makeCategory("Comfort & Productivity", "🎧", [
          "Travel pillow & eye mask",
          "Earplugs / noise-cancelling headphones",
          "Compression socks",
          "Snacks & refillable water bottle",
          "Reading material / e-reader",
          "Offline work downloaded",
        ]),
      ],
    },
  ];
}
