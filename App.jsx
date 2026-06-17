import { useState } from "react";

// ─── THEME ───────────────────────────────────────────────
const ACCENT = "#C8873A";

const T = {
  tanzania: { accent: "#C8873A", bg: "#0C1A0A", card: "#132010", muted: "#8BA688" },
  colombia: { accent: "#E8A020", bg: "#0C0F1C", card: "#131628", muted: "#8888BB" },
};

// ─── SPA DATA ────────────────────────────────────────────
const spaData = {
  tanzania: [
    {
      name: "Hammam Zanzibar",
      type: "🧖 Traditional Arab Hammam",
      location: "Stone Town (near St. Joseph's Cathedral)",
      price: "$40–80/person",
      duration: "90–120 min",
      desc: "Steam room opens pores, followed by kese mitt exfoliation, then a clove & coconut oil massage. Ends with herbal tea in the lounge. Rooted in the Arab bathing culture that built Stone Town — this is deeply local.",
      highlight: "Do this on your Stone Town day (Day 7). The most culturally authentic wellness experience on the island.",
      url: "https://hammamzanzibar.com",
      withinBudget: true,
    },
    {
      name: "Zanzi-Spice Journey at Kilindi Spa",
      type: "🌿 Spice Island Body Ritual",
      location: "Nungwi (north coast)",
      price: "$150/person",
      duration: "90 min",
      desc: "Coffee, cinnamon, cloves and orange oils in a vigorous dry body brush, detoxing spice scrub, and full body massage. Uses the very spices Zanzibar was built on. Absolutely unique to this island.",
      highlight: "Do this on your Nungwi rest day (Day 9 or 12). Pairs perfectly with the afternoon at Nanasi beach club.",
      url: "https://www.kilindizanzibar.com/spa-wellness",
      withinBudget: true,
    },
    {
      name: "Zanzibar Cocoa & Seaweed Couple's Treatment",
      type: "💆 Couples Spa",
      location: "Paje / East Coast resorts",
      price: "$80–160/couple",
      duration: "75–90 min",
      desc: "A clove body scrub followed by a seaweed and essential oil massage — done side by side. Uses local ocean seaweed farmed by women's cooperatives on the east coast. One of the most memorable couple experiences on the island.",
      highlight: "Book through your hotel in Paje or directly at Xanadu Kiota Spa. Perfect on your Paje beach day (Day 8).",
      url: "https://xanadu-villas.com/spa.html",
      withinBudget: true,
    },
    {
      name: "Henna & Spice Tea at a Stone Town Riad",
      type: "🎨 Cultural Ritual",
      location: "Stone Town",
      price: "$20–40/person",
      duration: "60–90 min",
      desc: "Henna hand painting by a local artist while drinking the island's spiced chai. A decades-long Stone Town tradition. Relaxing, meditative, and you leave with a beautiful natural tattoo that lasts 2–3 weeks.",
      highlight: "Walk-in at local beauty parlours in Stone Town. No booking needed. Ask your riad host for their favourite spot.",
      url: "https://www.tripadvisor.com/Attractions-g8055401-Activities-c40-Zanzibar_City",
      withinBudget: true,
    },
  ],
  colombia: [
    {
      name: "Wellcomm Spa — Hydrotherapy Circuit + Massage",
      type: "💧 Thermal Water Circuit",
      location: "El Poblado, Medellín",
      price: "$50–100/person",
      duration: "2–3 hrs",
      desc: "Thermal baths (warm/cold/hot), Finnish sauna, Turkish hammam, mud mask, and a full body massage in a beautifully designed day spa. Loved by locals. Not touristy. One of the best-value spa days in South America.",
      highlight: "Do this on your Medellín free day (Day 7) — perfect recovery after the nightlife on Day 5.",
      url: "https://dannybooboo.com/spas-medellin-best-cold-plunge-poblado-parque-lleras-sauna-turco-day-pass-massage/",
      withinBudget: true,
    },
    {
      name: "Cenote Thematic Spa — Hydrotherapy + Dinner",
      type: "🌊 Immersive Full Day Spa",
      location: "El Poblado, Medellín",
      price: "$80–140/person",
      duration: "4–6 hrs",
      desc: "Modeled on a Mexican cenote. Water circuit: footbath, bubble beds, flotarium, thermal shock pools, Finnish sauna, hammam, mud mask. Then a deep relaxation massage in a themed cabin (Crystal Cave, Rainforest, Herbal). Ends with a teppanyaki dinner show. Wild and totally worth it.",
      highlight: "The most immersive spa experience in Colombia. Book 2+ days ahead. Pairs with Medellín's nightlife day.",
      url: "https://www.viator.com/tours/Medellin/Spa-Sensorial-Hydric-Experience-and-Thematic-Relaxing-Massage-in-Medellin/d4563-150607P35",
      withinBudget: true,
    },
    {
      name: "Aurum Spa — Moroccan Hammam + Colombian Coffee Ritual",
      type: "🫧 Hammam & Cultural Treatment",
      location: "Walled City, Cartagena",
      price: "$80–150/person",
      duration: "90–120 min",
      desc: "Cartagena's only authentic Moroccan hammam inside a colonial house García Márquez once frequented. Coffee scrub, volcanic mud, and tobacco rituals using 100% Colombian ingredients. Multisensory and deeply cultural.",
      highlight: "Do this on your Cartagena free afternoon (Day 9 or 10). Book through the hotel Casa Santa Augustin.",
      url: "https://theculturetrip.com/south-america/colombia/articles/the-best-spas-in-cartagena-colombia",
      withinBudget: true,
    },
    {
      name: "Totumo Volcanic Mud Bath",
      type: "🌋 Natural Mud Ritual",
      location: "45 min from Cartagena",
      price: "$25–40/person (incl. transport)",
      duration: "Half day",
      desc: "Climb a small volcano and float in warm magnesium-rich mud — the mud holds you up like water. Locals call it 'the volcano of youth'. Women wash you off in a lagoon afterward. Nothing else on earth feels like this. Completely unique to this coast of Colombia.",
      highlight: "The most unconventional relaxing experience in Colombia. 100% within budget. Spontaneous and unforgettable.",
      url: "https://www.viator.com/Cartagena-tours/Day-Spas/d4498-g5335-c5336",
      withinBudget: true,
    },
  ],
};

// ─── SAFARI TIERS ────────────────────────────────────────
const safariTiers = [
  {
    id: "budget", icon: "🏕️", label: "Budget", sub: "Camping",
    color: "#6BAE5E", total: "$1,200–$1,800", perDay: "~$240–360/day",
    tagline: "Same wildlife. No walls. Campfire under 10,000 stars.",
    vehicle: "Shared Land Cruiser (6–8 people)", beds: "Dome tent, foam mattress", shower: "Bucket shower (shared)", food: "Chef-cooked meals at camp", drinks: "Water & tea included, alcohol extra", guide: "Licensed driver-guide (shared)",
    included: ["All park & conservation fees","Full board meals","Camping equipment & bedding","Game drives twice daily","Airport transfers Arusha","Drinking water & coffee/tea"],
    notIncluded: ["International flights","Visa ($50)","Tips (~$15–20/day guide)","Balloon safari ($550)","Alcohol","Single tent supplement"],
    route: "Arusha → Tarangire → Serengeti (Seronera) → Ngorongoro → Arusha",
    tip: "Book through a Tanzania-based TATO operator directly — international agents add 25–35% for the same product.",
    links: [{ label: "African Budget Safaris", url: "https://www.africanbudgetsafaris.com" }, { label: "SafariBookings.com", url: "https://www.safaribookings.com/serengeti" }],
  },
  {
    id: "midrange", icon: "⛺", label: "Mid-Range", sub: "Tented Lodge",
    color: "#C8873A", total: "$2,000–$3,500", perDay: "~$400–700/day",
    tagline: "Private vehicle. Real bed. Your guide, your pace. The Migration, your way.",
    vehicle: "Private Land Cruiser (just your group)", beds: "En-suite tented camp, real bed", shower: "Hot bucket or plumbed shower", food: "Full board + snacks on drives", drinks: "Soft drinks included, alcohol extra", guide: "Dedicated senior guide (yours only)",
    included: ["Private 4×4 exclusively yours","All park & conservation fees","Full board meals + soft drinks","En-suite tented camp with hot shower","Game drives on your schedule","Migration-tracking route flexibility","Airport transfers"],
    notIncluded: ["International flights","Visa ($50)","Tips (~$20–25/day)","Balloon safari ($550)","Alcohol (~$3–8/drink)","Internal flights (optional: +$300–400)"],
    route: "Arusha → Tarangire → Serengeti (request Kogatende/north for July crossings) → Ngorongoro → Arusha or Zanzibar",
    tip: "Specifically request a northern Serengeti camp (Kogatende area) for July — most packages default to central Seronera which misses the Mara River crossings.",
    links: [{ label: "Duma Explorer (top-rated)", url: "https://www.dumaexplorer.com" }, { label: "Westway Safaris (Arusha-based)", url: "https://www.westwaysafaris.com" }, { label: "Acacia Collections", url: "https://acaciacollections.com" }],
  },
  {
    id: "luxury", icon: "🏆", label: "Premium", sub: "Fly-In Camp",
    color: "#D4AF37", total: "$5,000–$10,000+", perDay: "~$1,000–2,000+/day",
    tagline: "Charter between parks. Private concession. Night drives. Africa with no compromises.",
    vehicle: "Private 4×4 (1–4 people only) + charter flights", beds: "King bed, private butler, plunge pool", shower: "Rainfall shower en-suite", food: "Gourmet multi-course + bush breakfasts", drinks: "Premium wines, cocktails, spirits all included", guide: "Expert senior naturalist (1:1 attention)",
    included: ["All internal charter flights between parks","Private vehicle + exclusive naturalist guide","All park, concession & conservation fees","Full board + ALL drinks incl. premium wine & spirits","Off-road tracking (private concession)","Night drives & walking safaris","Bush breakfasts, sundowner setups","Laundry service","Airport transfers in private vehicle"],
    notIncluded: ["International flights","Visa ($50)","Travel insurance (mandatory for evacuation coverage)","Balloon safari ($550–600)","Tips (~$25–35/day)"],
    route: "Charter: Arusha → Tarangire → Northern Serengeti (Kogatende/Grumeti) → Ngorongoro → Zanzibar beach extension",
    tip: "Book 9–12 months ahead for July. Sayari Camp, Singita, &Beyond Under Canvas fill completely. These are the camps that give private concession access — impossible to replicate in the national park itself.",
    links: [{ label: "Singita (Grumeti)", url: "https://singita.com/region/serengeti" }, { label: "&Beyond Under Canvas", url: "https://www.andbeyond.com/our-lodges/africa/tanzania/serengeti/andbeyond-serengeti-under-canvas" }, { label: "Four Seasons Serengeti", url: "https://www.fourseasons.com/serengeti" }, { label: "Sayari Camp (Asilia)", url: "https://www.asiliaafrica.com/camps-and-lodges/sayari-camp" }],
  },
];

// ─── HOTELS ──────────────────────────────────────────────
const hotels = {
  tanzania: [
    { name: "Amka Guest House", area: "Jambiani (East Coast)", stars: "⭐⭐", rating: "8.6", tag: "Beachfront budget", desc: "Right on the sand in Jambiani. Swahili architecture, great vibes, modest rooms. Best for the chill east coast days.", url: "https://www.booking.com/hotel/tz/amka-guest-house.html" },
    { name: "Zanzibar Tropical Sunset – Adults Only", area: "Kiwengwa", stars: "⭐⭐⭐⭐", rating: "8.9", tag: "Adults-only boutique", desc: "Private beach, pool, adults-only. Stylish Swahili design meets modern comfort. Perfect base for the north coast days.", url: "https://www.booking.com/hotel/tz/zanzibar-tropical-sunset-adults-only-boutique.html" },
    { name: "Kimulimuli Wellness Spa Hotel", area: "Bwejuu", stars: "⭐⭐⭐", rating: "9.4", tag: "Wellness & spa", desc: "Steps from Bwejuu Beach. Pool, spa, garden. The most relaxing budget-to-mid option on the east coast. Perfect with the Zanzi-Spice treatment.", url: "https://www.booking.com/hotel/tz/kimulimuli-ayurveda-spa-retreat.html" },
  ],
  colombia: [
    { name: "Hotel Boutique Casamía", area: "Medellín", stars: "⭐⭐⭐", rating: "9.7", tag: "Exceptional boutique", desc: "Colonial tiled floors, arched ceilings, exceptional breakfast. Highest-rated hotel on the search. A beautiful, characterful base.", url: "https://www.booking.com/hotel/co/boutique-casami.html" },
    { name: "Heiss Hotel by Jalo", area: "El Poblado, Medellín", stars: "⭐⭐⭐⭐", rating: "8.5", tag: "Rooftop pool", desc: "Great rooftop pool overlooking the city. Modern, central in El Poblado. 1,697 reviews. Walk to everything.", url: "https://www.booking.com/hotel/co/heiss-hotel-by-jalo.html" },
    { name: "Nomada Hotel Origen", area: "El Poblado, Medellín", stars: "⭐⭐⭐⭐", rating: "8.2", tag: "Boutique design", desc: "Exposed brick arches, warm lighting, beautiful rooms. Very good breakfast. Design-forward boutique in the heart of Poblado.", url: "https://www.booking.com/hotel/co/nomada-origen.html" },
  ],
};

// ─── TRAVEL WARNINGS ─────────────────────────────────────
const travelInfo = {
  tanzania: [
    { icon: "💉", title: "Vaccines & Health", type: "health", points: ["Malaria is real — take antimalarials (start 1–2 weeks before travel). Use DEET repellent every evening.", "Recommended: Hepatitis A, Typhoid, updated MMR, Polio booster.", "Yellow fever NOT required coming from Tunisia (no yellow fever risk). Only required if transiting through a risk country for 12+ hours.", "Zanzibar has $44 mandatory travel insurance (new since Oct 2024) — buy at arrival or online before.", "Carry US dollars after 2006 print date only — older bills often refused.", "Drink bottled water only. Even in good hotels."] },
    { icon: "🕌", title: "Zanzibar Culture & Dress Code", type: "culture", points: ["Zanzibar is a predominantly Muslim island. Dress modestly in Stone Town and local villages — cover shoulders and knees. Swimwear is fine at the beach and resort.", "Always ask permission before photographing local people.", "Ramadan: if your trip overlaps, many local restaurants close during daylight. Alcohol is harder to find.", "Never eat, drink or smoke in public during Ramadan daytime hours out of respect.", "Avoid public displays of affection in Stone Town — not culturally acceptable.", "Buy a kanga (local wrap cloth) at the market — lightweight, culturally respectful, and incredibly useful."] },
    { icon: "🦁", title: "Safari Safety & Etiquette", type: "safety", points: ["Never stand up through the roof hatch during a game drive without guide permission.", "Never get out of the vehicle unless your guide explicitly says it's safe.", "Do not use flash photography near wildlife — especially big cats.", "Park fees are paid by your operator but carry your own receipt — rangers check.", "Tipping: $15–25/day for your guide, $10–15/day for camp staff. Cash USD preferred.", "Wildlife can enter camps at night — always zip your tent and follow camp rules."] },
    { icon: "💳", title: "Money & Practical", type: "practical", points: ["Visa: Tanzania e-Visa online ($50 most nationalities) at immigration.go.tz — apply 2+ weeks ahead.", "Carry USD cash — US dollars (post-2006) widely accepted. ATMs in Stone Town have limits.", "Tipping is the backbone of the tourism economy here — budget it in.", "Mobile SIM: buy Airtel or Vodacom at the airport for cheap data.", "Safety: Zanzibar is generally very safe for tourists. Use common sense in Stone Town at night."] },
  ],
  colombia: [
    { icon: "💉", title: "Vaccines & Health", type: "health", points: ["No mandatory vaccines for Colombia from Tunisia for the cities on your route (Bogotá, Medellín, Cartagena, Santa Marta).", "Recommended: Hepatitis A, Typhoid, updated routine vaccines (MMR, Tdap).", "Yellow fever vaccine required ONLY if going to the Amazon or jungle regions — your route doesn't include these.", "Dengue, Zika and Chikungunya present — no vaccine, so use DEET mosquito repellent especially on the coast and in Tayrona.", "Altitude sickness is real in Bogotá (2,600m) — rest Day 1, drink coca tea, avoid alcohol first 24hrs.", "Tap water safe in Bogotá and Medellín, NOT safe on the coast (Cartagena, Santa Marta) — use bottled water."] },
    { icon: "🎭", title: "Culture & Customs", type: "culture", points: ["Colombians dress well and take pride in appearance — avoid scruffy clothes in cities. Flip-flops are for the beach.", "Greeting: a kiss on one cheek is standard between acquaintances. 'Buenos días' is expected, even with strangers.", "Tipping: 10% in restaurants is customary. Check the bill — some add it automatically as 'propina'.", "Never photograph people without asking — especially in communities like Palenque or indigenous areas.", "Political involvement by foreigners is illegal in Colombia. Don't attend demonstrations.", "Taking pre-Columbian artifacts out of Colombia is illegal and customs enforce this strictly."] },
    { icon: "⚠️", title: "Safety by City", type: "safety", points: ["Bogotá: safe in Chapinero, Zona Rosa, La Candelaria. Avoid South Bogotá at night.", "Medellín: El Poblado and Laureles are very safe. Avoid venturing into comunas alone at night.", "Cartagena: Walled City and Getsemaní are safe. Avoid beaches at night alone.", "Santa Marta/Tayrona: safe for tourists. Use official park entrances only — no unmarked paths.", "Phone theft: keep phones out of sight in crowded areas. Use Uber or DiDi instead of street taxis.", "Dating apps: Canadian government warns of targeted scams via dating apps — use common sense.", "Drugs: Colombia has severe penalties. Don't carry even small amounts."] },
    { icon: "💳", title: "Money & Practical", type: "practical", points: ["Tunisians do not need a visa for Colombia (180 days tourist entry).", "Fill out the Check-Mig form online before arrival at check-mig.migracioncolombia.gov.co.", "Currency: Colombian Peso (COP). ~3,700 COP = $1 USD. ATMs widely available.", "Uber and DiDi work well and are cheaper than taxis. Apps also work in Spanish — download offline Google Translate.", "Colombia's July presidential election runoff (June 21, 2026): expect possible alcohol restrictions and heightened security around that date — your July trip should be post-election but stay aware.", "Pack reef-safe sunscreen for Tayrona — regular sunscreen is banned in the park."] },
  ],
};

// ─── ITINERARY DATA ───────────────────────────────────────
const tripDays = {
  tanzania: [
    { day:1, title:"Arrive Arusha", vibe:"Settle in", mood:"🌙", desc:"Land at Kilimanjaro International (JRO). Transfer to Arusha. Evening market walk, nyama choma dinner at a local spot. Early night — big safari days ahead.", tip:"Stay near the Clock Tower area for easy access to safari gear and operators.", prices:[] },
    { day:2, title:"Ngorongoro Crater", vibe:"Game drive", mood:"🔭", desc:"Drive into the world's largest intact volcanic caldera — lions, elephants, hippos, and the last black rhinos in Tanzania, all in one bowl. Packed picnic lunch on the crater floor.", tip:"Afternoon fog rolls in fast — arrive at the rim by 7am for clear views.", prices:[] },
    { day:3, title:"Enter the Serengeti", vibe:"Safari begins", mood:"🌅", desc:"Cross into Serengeti National Park via Naabi Hill Gate. Afternoon game drive through Seronera Valley — the Big Cat Capital. Leopards in acacia trees, lion prides in the shade. Sundowner on a kopje.", tip:"Check in at a tented camp — the sounds at night (hyenas, distant lions) are unforgettable.", prices:[] },
    { day:4, title:"Great Migration River Crossings", vibe:"Once in a lifetime", mood:"🌊", desc:"Full day tracking the wildebeest migration toward Kogatende and the Mara River. Over 1.5 million animals, Nile crocodiles, absolute primal chaos. July is the peak crossing month — this is why you came.", tip:"Ask your guide to position downwind, arrive at the river early. Crossings are unpredictable but extraordinary.", prices:[] },
    { day:5, title:"Hot Air Balloon + Maasai Village", vibe:"Magic morning", mood:"🎈", desc:"Pre-dawn pickup for a sunrise balloon over the Serengeti plains. Champagne bush breakfast after landing. Afternoon: guided walking safari with a Maasai ranger, then evening visit to a community-run Maasai boma.", tip:"Book the balloon months in advance — July fills fast. ~$500–600/person.", prices:[{label:"Hot air balloon safari",price:"~$500–600/person"}] },
    { day:6, title:"Fly to Zanzibar — Stone Town Arrival", vibe:"Island transition", mood:"✈️", desc:"Morning charter flight from the Serengeti airstrip to Zanzibar (ZNZ). Check into your Stone Town riad. Evening wander through the UNESCO alleys. Dinner at Forodhani Gardens night market — fresh octopus, Zanzibar pizza, sugarcane juice.", tip:"Forodhani Gardens market opens at sunset — arrive early to grab fresh octopus before it sells out.", prices:[{label:"Forodhani market dinner",price:"~$5–10"}] },
    { day:7, title:"Stone Town + Hammam Spa + Dhow Snorkeling", vibe:"History + culture + water", mood:"🛁", desc:"Morning: Stone Town walking tour — Sultan's Palace, Arab Fort, and the sobering Slave Market memorial. Midday: Hammam Zanzibar in Stone Town — steam, exfoliation, spiced oil massage, herbal tea. Afternoon: private dhow snorkeling trip in crystal-clear water.", tip:"The hammam is near St. Joseph's Cathedral — book ahead, sessions fill in peak season.", prices:[{label:"Hammam Zanzibar spa",price:"~$40–80/person"},{label:"Private dhow snorkeling",price:"~$40–70/person"}] },
    { day:8, title:"Sallaam Cave Turtles + Kuza Cave + The Rock Restaurant", vibe:"Caves & iconic dinner", mood:"🐢", desc:"Morning: swim with sea turtles at Sallaam Cave — they come right to you for food. Then Kuza Cave — a freshwater cave pool. Afternoon relaxing at Paje Beach. Evening: The Rock Restaurant — built on a coral rock in the Indian Ocean, boat access at high tide.", tip:"The Rock must be booked at least a week ahead. Go for sunset timing if possible.", prices:[{label:"Sallaam Cave",price:"~$10–20"},{label:"Kuza Cave",price:"~$5–10"},{label:"The Rock Restaurant dinner",price:"~$30–60/person"}] },
    { day:9, title:"Transfer to Nungwi + Zanzi-Spice Spa", vibe:"North coast + total relaxation", mood:"🌴", desc:"2-hour transfer to Nungwi. Check into your hotel. Afternoon: Zanzi-Spice Journey at Kilindi Spa — coffee, cinnamon, clove scrub and full body massage using the island's own spices. Evening: explore Nungwi village and dhow builder beach.", tip:"Book the spa same day you arrive — Kilindi is on the north coast and easy to reach from Nungwi.", prices:[{label:"Zanzi-Spice spa treatment",price:"~$150/person"},{label:"Taxi to Nungwi",price:"~$15–25"}] },
    { day:10, title:"Mnemba Island — Dolphins + Snorkeling + Bill Gates Sandbank", vibe:"Full ocean day", mood:"🐬", desc:"Early boat to Mnemba Atoll. Swim with wild dolphins in open water. Snorkel the conservation reef — sea turtles, reef sharks, tropical fish. Sandbank stop near Mnemba Island (aka Bill Gates Island). Tropical fruit on the boat.", tip:"Go at 7–8am — dolphins most active early, fewer boats.", prices:[{label:"Mnemba dolphins + snorkeling",price:"~$37–55/person"}] },
    { day:11, title:"Kitesurfing at Paje + Le Saint Tropez Sunset", vibe:"Adrenaline + luxury", mood:"🪁", desc:"Morning at Paje Beach — July is peak kite season (Kusi winds, 15–25 knots). Beginner lesson in the shallow lagoon or rent gear. Late afternoon: Le Saint Tropez Beach Club in Kidoti — pool, DJ, floating sunbeds, cocktails. Adults-only. The most photogenic sunset on the island.", tip:"Le Saint Tropez is adults-only — contact via WhatsApp before arrival (no online reservations).", prices:[{label:"Kite lesson (2hrs)",price:"~$50–100"},{label:"Gear rental",price:"~$30–50/day"},{label:"Le Saint Tropez cocktails",price:"~$10–20 each"}] },
    { day:12, title:"Nanasi Beach Club + Dhow Sunset Cruise", vibe:"Perfect last day", mood:"🌅", desc:"No alarm. Morning at your pace — last Zanzibar coffee, beach hammock. Afternoon at Nanasi Beach Club — art vendors on the sand, local vibes. Early evening: traditional dhow sunset cruise. Dinner in Nungwi. Fly home next morning.", tip:"Buy cloves, vanilla pods, and Zanzibar coffee at the local market before you leave.", prices:[{label:"Nanasi Beach Club",price:"~$15–30"},{label:"Dhow sunset cruise",price:"~$25–40/person"}] },
  ],
  colombia: [
    { day:1, title:"Bogotá — Monserrate + La Candelaria", vibe:"Altitude arrival", mood:"🏔️", desc:"Land at El Dorado (BOG) at 2,600m. Rest first — altitude hits hard. Head to La Candelaria: cobblestoned historic heart, colonial murals, small plazas. Late afternoon: cable car up Cerro Monserrate for panoramic city views. Evening: empanadas and hot chocolate with cheese.", tip:"Drink coca tea, avoid alcohol the first 24hrs. Book Monserrate tickets online to skip the queue.", prices:[{label:"Monserrate cable car (roundtrip)",price:"~$9 USD"},{label:"La Candelaria",price:"Free"}] },
    { day:2, title:"Bogotá — Museo del Oro + Zona G Dining", vibe:"Culture + food", mood:"🏛️", desc:"Morning: Museo del Oro — 55,000 pre-Columbian gold pieces (free Sundays). Afternoon: Paloquemao flower and food market (before 8am for the full spectacle). Evening: Zona G — Bogotá's gourmet restaurant district.", tip:"Paloquemao is best before 8am — a full sensory overload of tropical fruits and orchids.", prices:[{label:"Museo del Oro",price:"Free Sundays / ~$3 other days"},{label:"Zona G dinner",price:"~$20–40/person"}] },
    { day:3, title:"Fly Medellín — Comuna 13 + Botero Plaza", vibe:"Urban transformation", mood:"🎨", desc:"45-min domestic flight to Medellín. Check into El Poblado. Straight to Comuna 13 with a local guide who grew up there — art, music, and transformation. Outdoor escalators, murals, hip-hop. Afternoon: Botero Plaza — Fernando Botero's bronze sculptures, completely free.", tip:"Book a guide who's actually from the community — it completely changes the experience.", prices:[{label:"BOG–MDE flight",price:"~$40–80"},{label:"Community guide",price:"~$15–25/person"},{label:"Botero Plaza",price:"Free"}] },
    { day:4, title:"Guatapé + El Peñol Rock", vibe:"Adventure day trip", mood:"🪨", desc:"Early bus from Terminal del Norte (2hrs). Climb 650 steps of El Peñol — views over the turquoise reservoir are absurd. Wander colourful Guatapé streets. Afternoon boat tour through the flooded valley (submerged church spires). Bus back by evening.", tip:"If budget allows, stay overnight in Guatapé — quieter and more beautiful after day-trippers leave.", prices:[{label:"Bus return",price:"~$5–8"},{label:"El Peñol Rock entry",price:"~$3"},{label:"Boat tour",price:"~$10–15"}] },
    { day:5, title:"Metrocable to Parque Arví + El Poblado Nightlife", vibe:"Nature + rumba", mood:"🌿", desc:"Morning: Metrocable Line K through hillside comunas, then Line L up to Parque Arví — 1,700ha of cloud forest, trails, artisan market. Rest in the afternoon. Evening: El Poblado bars → find a local salsa spot. Medellín goes until 4am.", tip:"Ask your hostel about free afternoon salsa classes — best prep for the night.", prices:[{label:"Metrocable Line K",price:"~$0.95"},{label:"Line L to Parque Arví",price:"~$3.33 extra"},{label:"Parque Arví",price:"Free"}] },
    { day:6, title:"Spa Day in Medellín — Then Rest", vibe:"Total recovery + relaxation", mood:"🛁", desc:"Today is fully yours. Morning: Cenote Thematic Spa or Wellcomm Spa — hydrotherapy circuit, sauna, hammam, mud mask, deep massage. 3–4 hours of total bliss. After: rest at the hotel pool. Light dinner in Laureles (less touristy than El Poblado).", tip:"The Cenote Spa is the most immersive experience in Colombia. Book 2+ days ahead. Bring your swimsuit.", prices:[{label:"Cenote Thematic Spa (4–6hrs)",price:"~$80–140/person"},{label:"Wellcomm Spa (3hrs)",price:"~$50–100/person"}] },
    { day:7, title:"Fly Cartagena — Walled City + Café del Mar Sunset", vibe:"Caribbean arrival", mood:"🌅", desc:"Morning flight to Cartagena. Heat immediately hits — 35°C and humid. Check into Getsemaní. Afternoon: walled city colonial streets, cathedral, Museo del Oro Zenú. Late afternoon: sunset drinks at Café del Mar on the city walls. Caribbean in view, cocktail in hand.", tip:"Getsemaní is the most interesting neighbourhood in Cartagena now. Don't stay in the walled city.", prices:[{label:"MDE–CTG flight",price:"~$40–80"},{label:"Café del Mar cocktails",price:"~$8–15 each"},{label:"Museo del Oro Zenú",price:"Free"}] },
    { day:8, title:"Rosario Islands + Getsemaní Night", vibe:"Islands + street art", mood:"🏝️", desc:"Morning boat to the Rosario Islands — crystal Caribbean water, snorkelling, beach. Back by late afternoon. Evening: walk through Getsemaní at night — street art under the lights, local bars far cheaper than the walled city.", tip:"Book the Rosario boat the evening before — leaves 8–9am from Muelle de la Bodeguita.", prices:[{label:"Rosario Islands day trip",price:"~$25–50/person"}] },
    { day:9, title:"Totumo Mud Volcano + Castillo San Felipe", vibe:"Nature ritual + history", mood:"🌋", desc:"Morning half-day trip to Totumo Volcano — float in warm magnesium-rich mud, get washed off in the lagoon. Pure Colombian magic. Afternoon: Castillo San Felipe de Barajas — roam the 17th-century fortress tunnels and ramparts overlooking the Caribbean. Evening: Alquimico for one extraordinary cocktail.", tip:"Totumo is 45min from Cartagena — any tour desk can arrange it. Bring nothing valuable (you'll be covered in mud).", prices:[{label:"Totumo Mud Volcano",price:"~$25–40 incl. transport"},{label:"Castillo San Felipe",price:"~$8"},{label:"Alquimico cocktail",price:"~$12–18"}] },
    { day:10, title:"Aurum Hammam Spa + Street Food Tour", vibe:"Cartagena wellness + taste", mood:"🫧", desc:"Morning: Aurum Spa — Cartagena's only authentic Moroccan hammam, inside a García Márquez colonial house. Coffee scrub, volcanic mud, Colombian tobacco ritual. Midday: street food tour in Corralito de Piedra — 10+ dishes with a local guide. Afternoon: rest.", tip:"Aurum is inside Casa Santa Augustin. Book directly with the hotel spa. Worth every peso.", prices:[{label:"Aurum Hammam spa",price:"~$80–150/person"},{label:"Street food tour",price:"~$25–40/person"}] },
    { day:11, title:"Santa Marta — Tayrona Park + Minca", vibe:"Jungle beach + waterfall", mood:"🌿", desc:"Bus to Santa Marta (5hrs) or fly (1hr). Tayrona National Park: hike to Cabo San Juan — two perfect crescent beaches where jungle meets Caribbean. Day 2: Minca village in the mountains — Marinka waterfalls + coffee farm. Back to Santa Marta.", tip:"Bring cash only in Tayrona (no ATMs). July is fully open (park closes June 1–15).", prices:[{label:"Tayrona Park entry",price:"~$18–22"},{label:"Minca coffee farm",price:"~$10–20/person"}] },
    { day:12, title:"Taganga + Quinta de San Pedro + Fly Home", vibe:"Last coast morning", mood:"🐠", desc:"Morning: Taganga fishing village — Caribbean-coloured boats and budget snorkelling right off the beach. Afternoon: Quinta de San Pedro Alejandrino — the hacienda where Simón Bolívar spent his final days. Then flight back to Bogotá and home.", tip:"Taganga is walkable from Santa Marta. Local boats leave from the beach — no booking needed.", prices:[{label:"Taganga snorkelling",price:"~$15–25/person"},{label:"Quinta de San Pedro",price:"~$5"},{label:"Return flight",price:"~$60–100"}] },
  ],
};

// ─── COMPARISON DATA ──────────────────────────────────────
const compare = {
  rows: [
    { label: "✈️ Flight cost from Tunis", tz: "$500–700", co: "$900–1,200" },
    { label: "🌦️ July weather", tz: "25–30°C, dry & perfect", co: "24–35°C, humid coast" },
    { label: "🏨 Hotels (mid-range/night)", tz: "$80–150", co: "$50–100" },
    { label: "🍽️ Food daily", tz: "$30–60/day", co: "$10–20/day" },
    { label: "🦁 Wildlife", tz: "⭐⭐⭐⭐⭐ unmatched", co: "⭐ mostly birds/monkeys" },
    { label: "🏖️ Beaches", tz: "⭐⭐⭐⭐⭐ Indian Ocean", co: "⭐⭐⭐ Caribbean" },
    { label: "🏙️ City culture", tz: "⭐⭐ Stone Town only", co: "⭐⭐⭐⭐⭐ 3 great cities" },
    { label: "🌃 Nightlife", tz: "⭐⭐ chill beach vibes", co: "⭐⭐⭐⭐⭐ Medellín!" },
    { label: "🧖 Spa & wellness", tz: "Zanzi-Spice, Hammam, Seaweed", co: "Hammam, Hydrotherapy, Mud Volcano" },
    { label: "🔖 Visa?", tz: "Yes — e-Visa $50", co: "No visa needed (Tunisian)" },
    { label: "💬 Language barrier", tz: "None / Swahili basics", co: "Spanish basics help a lot" },
    { label: "😅 Trip difficulty", tz: "Easy (mostly guided)", co: "Medium (self-navigate cities)" },
    { label: "💸 Value for money", tz: "Moderate–Expensive", co: "Excellent" },
    { label: "🎯 Wow moment", tz: "Wildebeest river crossing", co: "El Peñol summit at sunrise" },
  ],
  costs: {
    10: { tz: { low: 3700, high: 6000 }, co: { low: 2100, high: 3800 } },
    12: { tz: { low: 4200, high: 6800 }, co: { low: 2500, high: 4200 } },
    14: { tz: { low: 4700, high: 7600 }, co: { low: 2900, high: 4700 } },
  }
};

// ─── LINKS ────────────────────────────────────────────────
const allLinks = {
  tanzania: [
    { cat: "✈️ Flights", items: [{ label: "Search TUN → ZNZ (Skyscanner)", url: "https://www.skyscanner.com/routes/tun/znz/tunis-to-zanzibar.html" }] },
    { cat: "🛂 Visa & Entry", items: [{ label: "Tanzania e-Visa (official)", url: "https://immigration.go.tz" }, { label: "ZIC Zanzibar travel insurance", url: "https://www.zicinsurance.or.tz" }] },
    { cat: "🏨 Hotels (Hend's picks)", items: [{ label: "Amka Guest House — Jambiani (8.6 ⭐)", url: "https://www.booking.com/hotel/tz/amka-guest-house.html" }, { label: "Zanzibar Tropical Sunset Adults Only — Kiwengwa (8.9 ⭐)", url: "https://www.booking.com/hotel/tz/zanzibar-tropical-sunset-adults-only-boutique.html" }, { label: "Kimulimuli Wellness Spa Hotel — Bwejuu (9.4 ⭐)", url: "https://www.booking.com/hotel/tz/kimulimuli-ayurveda-spa-retreat.html" }] },
    { cat: "🦁 Safari", items: [{ label: "Duma Explorer (top-rated mid-range)", url: "https://www.dumaexplorer.com" }, { label: "SafariBookings.com (compare all operators)", url: "https://www.safaribookings.com/serengeti" }, { label: "African Budget Safaris", url: "https://www.africanbudgetsafaris.com" }, { label: "Singita (luxury)", url: "https://singita.com/region/serengeti" }, { label: "Serengeti Balloon Safaris", url: "https://www.serengetiballoon.com" }] },
    { cat: "🧖 Spa & Wellness", items: [{ label: "Hammam Zanzibar — Stone Town", url: "https://hammamzanzibar.com" }, { label: "Kilindi Spa (Zanzi-Spice) — Nungwi", url: "https://www.kilindizanzibar.com/spa-wellness" }, { label: "Xanadu Kiota Spa (Couples) — Paje", url: "https://xanadu-villas.com/spa.html" }] },
    { cat: "🐬 Activities", items: [{ label: "Mnemba dolphins + snorkeling (Viator)", url: "https://www.viator.com/tours/Mnemba/Mnemba-Island-snorkeling-and-Swimming-with-Dolphin/d51926-365410P1" }, { label: "Kite Centre Zanzibar — Paje", url: "https://kitecentrezanzibar.com" }, { label: "The Rock Restaurant (book ahead!)", url: "https://www.therockrestaurantzanzibar.com" }, { label: "Le Saint Tropez Beach Club", url: "https://lesainttropezanzibar.com" }] },
  ],
  colombia: [
    { cat: "✈️ Flights", items: [{ label: "Search TUN → BOG (Skyscanner)", url: "https://www.skyscanner.com/routes/tun/bog/tunis-to-bogota.html" }, { label: "Check-Mig form (fill before arrival)", url: "https://check-mig.migracioncolombia.gov.co" }] },
    { cat: "🏨 Hotels (Hend's picks)", items: [{ label: "Hotel Boutique Casamía — Medellín (9.7 ⭐)", url: "https://www.booking.com/hotel/co/boutique-casami.html" }, { label: "Heiss Hotel by Jalo — El Poblado (8.5 ⭐)", url: "https://www.booking.com/hotel/co/heiss-hotel-by-jalo.html" }, { label: "Nomada Hotel Origen — El Poblado (8.2 ⭐)", url: "https://www.booking.com/hotel/co/nomada-origen.html" }, { label: "Booking.com — Cartagena", url: "https://www.booking.com/searchresults.html?ss=Cartagena+Colombia" }] },
    { cat: "🧖 Spa & Wellness", items: [{ label: "Cenote Thematic Spa — Medellín (Viator)", url: "https://www.viator.com/tours/Medellin/Spa-Sensorial-Hydric-Experience-and-Thematic-Relaxing-Massage-in-Medellin/d4563-150607P35" }, { label: "Aurum Spa (Moroccan Hammam) — Cartagena", url: "https://theculturetrip.com/south-america/colombia/articles/the-best-spas-in-cartagena-colombia" }, { label: "Totumo Mud Volcano (Viator)", url: "https://www.viator.com/Cartagena-tours/Day-Spas/d4498-g5335-c5336" }] },
    { cat: "🏔️ Activities & Attractions", items: [{ label: "Monserrate tickets (official)", url: "https://www.visitamonserrate.com/en" }, { label: "Museo del Oro Bogotá", url: "https://www.banrepcultural.org/bogota/museo-del-oro" }, { label: "Metrocable Medellín", url: "https://www.metrodemedellin.gov.co" }, { label: "Guatapé travel guide", url: "https://destinationlesstravel.com/things-to-do-in-guatape-colombia/" }, { label: "Tayrona National Park (Viator)", url: "https://www.viator.com/Santa-Marta-attractions/Tayrona-National-Park/d4520-a12828" }, { label: "Castillo San Felipe de Barajas", url: "https://www.tripadvisor.com/Attraction_Review-g297476-d317716-Reviews-Castillo_San_Felipe_de_Barajas.html" }] },
  ],
};

// ─── COMPONENT ────────────────────────────────────────────
// Safari sections data
const safariSections = [
            {
              id: "experience",
              icon: "🦁",
              label: "The Experience",
              color: "#C8873A",
              content: (
                <div>
                  {/* Hero stat */}
                  <div style={{ background:"#C8873A18", border:"1px solid #C8873A44", borderRadius:"14px", padding:"18px 16px", marginBottom:"16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"8px", marginBottom:"12px" }}>
                      <div>
                        <div style={{ fontSize:"11px", color:"#C8873A", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"4px" }}>Recommended by @Elle & Jack 🌍</div>
                        <div style={{ fontSize:"18px", fontWeight:"800", color:"#fff" }}>1-Day Fly-In Fly-Out Safari</div>
                        <div style={{ fontSize:"12px", color:"#8BA688", marginTop:"2px" }}>Nyerere National Park (Selous)</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:"24px", fontWeight:"800", color:"#C8873A" }}>£379</div>
                        <div style={{ fontSize:"10px", color:"#888" }}>per person · all-in</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                      {["✅ Flights included","✅ Guide included","✅ Lunch + drinks","✅ Airport transfers"].map((t,i) => (
                        <span key={i} style={{ fontSize:"10px", background:"#6BAE5E20", color:"#6BAE5E", padding:"3px 9px", borderRadius:"20px", fontFamily:"monospace" }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div style={{ fontSize:"11px", color:"#888", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"12px" }}>How the day went</div>
                  {[
                    { time:"4:30am", icon:"⏰", label:"Pickup from hotel", desc:"They came to collect us. Start early — the animals are most active at dawn." },
                    { time:"~6am", icon:"✈️", label:"Small charter flight to Nyerere", desc:"About 12 passengers total. One person sat in the cockpit — completely normal! Smooth flight, felt like a regular plane. Ferry to the mainland is an alternative if flying makes you nervous." },
                    { time:"Arrival", icon:"🚙", label:"Open-sided safari vehicle", desc:"Classic multi-level open vehicle — not a closed jeep. Drivers use walkie-talkies to communicate with other operators and track animal locations." },
                    { time:"All day", icon:"🦁", label:"Game drives", desc:"Saw lions (guide knew the individual pride members!), elephants, hyenas, buffalo, crocodiles, zebras and more. Off-road the entire time — extremely bumpy on uneven terrain." },
                    { time:"Lunch", icon:"🍽️", label:"Shared lunch area", desc:"Large shared area for all safari groups. Other vehicles will be around you at various points — completely normal for a national park." },
                    { time:"7:30pm", icon:"🌙", label:"Back at the hotel", desc:"\"Overall, it was the most incredible day!\" — Elle & Jack" },
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", gap:"12px", marginBottom:"14px" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                        <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"#C8873A22", border:"1px solid #C8873A44", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px" }}>{item.icon}</div>
                        {i < 5 && <div style={{ width:"1px", height:"14px", background:"#C8873A33", marginTop:"3px" }} />}
                      </div>
                      <div style={{ flex:1, paddingTop:"6px" }}>
                        <div style={{ display:"flex", gap:"8px", alignItems:"baseline", marginBottom:"3px", flexWrap:"wrap" }}>
                          <span style={{ fontSize:"10px", color:"#C8873A", fontFamily:"monospace", fontWeight:"700" }}>{item.time}</span>
                          <span style={{ fontSize:"13px", fontWeight:"700", color:"#F0EAE0" }}>{item.label}</span>
                        </div>
                        <div style={{ fontSize:"12px", color:"#A8A098", lineHeight:"1.65" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            },
            {
              id: "knowbefore",
              icon: "📋",
              label: "What to Know",
              color: "#6BAE5E",
              content: (
                <div>
                  {/* National Park vs Game Reserve */}
                  <div style={{ marginBottom:"20px" }}>
                    <div style={{ fontSize:"11px", color:"#6BAE5E", fontWeight:"700", marginBottom:"12px", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em" }}>🏞️ National Park vs Game Reserve — know the difference</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"10px" }}>
                      <div style={{ background:"#6BAE5E15", border:"1px solid #6BAE5E33", borderRadius:"12px", padding:"14px" }}>
                        <div style={{ fontSize:"12px", fontWeight:"700", color:"#6BAE5E", marginBottom:"8px" }}>🏞️ National Park</div>
                        <div style={{ fontSize:"11px", color:"#A8C0A0", lineHeight:"1.6" }}>Government-protected land. Animals are NOT tracked — seeing them is never guaranteed. But when you do see them, they're genuinely wild. Elle & Jack chose this: "It made it so much more amazing when we did see them!"</div>
                      </div>
                      <div style={{ background:"#D4AF3715", border:"1px solid #D4AF3733", borderRadius:"12px", padding:"14px" }}>
                        <div style={{ fontSize:"12px", fontWeight:"700", color:"#D4AF37", marginBottom:"8px" }}>🎯 Game Reserve</div>
                        <div style={{ fontSize:"11px", color:"#C0B8A0", lineHeight:"1.6" }}>Privately owned land. Animals ARE often tracked — better chance of sightings. Can include controlled hunting (check before booking). Less "wild" feeling.</div>
                      </div>
                    </div>
                    <div style={{ background:"#C8873A15", borderLeft:"3px solid #C8873A", borderRadius:"0 10px 10px 0", padding:"10px 12px" }}>
                      <div style={{ fontSize:"11px", color:"#C8873A", lineHeight:"1.6" }}>💡 Choose a <strong>National Park</strong> (like Nyerere/Serengeti) if you want genuinely wild animals. Choose a <strong>Game Reserve</strong> if guaranteed sightings matter more to you.</div>
                    </div>
                  </div>

                  {/* Before you go */}
                  <div style={{ fontSize:"11px", color:"#6BAE5E", fontWeight:"700", marginBottom:"12px", fontFamily:"monospace", textTransform:"uppercase" }}>✅ What to sort before booking</div>
                  {[
                    ["Open-sided vehicle", "Make sure you book the classic multi-level open-sided vehicle — not a closed jeep. Big difference for photography and spotting."],
                    ["National Park confirmed", "Explicitly ask your operator which park you're going to. Nyerere (Selous), Serengeti, and Tarangire are the main options from Zanzibar."],
                    ["Lunch included?", "Confirm lunch is included. Elle & Jack's package had it covered — don't assume."],
                    ["Private or group?", "Group safaris have other vehicles around you (drivers share animal location info by walkie-talkie). Private means your vehicle only — more flexibility, more cost."],
                    ["Flight or ferry?", "The fly-in from Zanzibar to the mainland takes about 30–40 min by small charter (12 passengers). Ferry also available if you prefer. Both get you there."],
                  ].map(([title, desc], i) => (
                    <div key={i} style={{ background:"#ffffff06", borderRadius:"10px", padding:"12px", marginBottom:"8px" }}>
                      <div style={{ fontSize:"12px", fontWeight:"700", color:"#F0EAE0", marginBottom:"4px" }}>✓ {title}</div>
                      <div style={{ fontSize:"11px", color:"#A0A098", lineHeight:"1.6" }}>{desc}</div>
                    </div>
                  ))}
                </div>
              )
            },
            {
              id: "packingwear",
              icon: "🎒",
              label: "What to Wear & Pack",
              color: "#A0B8FF",
              content: (
                <div>
                  <div style={{ fontSize:"11px", color:"#A0B8FF", fontWeight:"700", marginBottom:"12px", fontFamily:"monospace", textTransform:"uppercase" }}>Straight from Elle & Jack's experience</div>

                  <div style={{ background:"#C87060_1A", borderRadius:"12px", marginBottom:"16px" }}>
                    {[
                      { icon:"👕", title:"Wear neutral colours ONLY", desc:"Bright colours scare animals away and make you more visible to them. Think beige, khaki, olive, tan, grey. No white (dirt), no bright colours." },
                      { icon:"💨", title:"Skip the hat", desc:"\"I wouldn't recommend hats — they would blow off (very windy once driving).\" Sunglasses secured with a strap are much better." },
                      { icon:"👩", title:"Tie your hair up (tightly)", desc:"\"My hair was up and it was still so full of knots at the end of the day.\" The dust and wind are relentless." },
                      { icon:"🏜️", title:"Expect to get COVERED in dust", desc:"\"The dust is insane, we were absolutely covered!\" Wear clothes you don't mind getting filthy. Buff/scarf around your face helps a lot." },
                      { icon:"🦴", title:"Back issues? Think carefully", desc:"\"If you have back issues or any problem where you can't be jolted — safari isn't ideal. It's extremely bumpy ALL day on very uneven terrain.\" Not a smooth ride — at all." },
                      { icon:"🎒", title:"Pack light in a small bag", desc:"Sunscreen, insect repellent (DEET), camera/phone charger, light layers for early morning cold, snacks. The vehicle has limited space." },
                    ].map((item, i) => (
                      <div key={i} style={{ display:"flex", gap:"12px", padding:"12px", borderRadius:"10px", marginBottom:"8px", background:"#ffffff06" }}>
                        <span style={{ fontSize:"20px", flexShrink:0 }}>{item.icon}</span>
                        <div>
                          <div style={{ fontSize:"12px", fontWeight:"700", color:"#F0EAE0", marginBottom:"3px" }}>{item.title}</div>
                          <div style={{ fontSize:"11px", color:"#A0A098", lineHeight:"1.6" }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            },
            {
              id: "guide",
              icon: "🧭",
              label: "About Your Guide",
              color: "#D4AF37",
              content: (
                <div>
                  <div style={{ background:"#D4AF3715", border:"1px solid #D4AF3733", borderRadius:"14px", padding:"18px", marginBottom:"16px" }}>
                    <div style={{ fontSize:"13px", fontStyle:"italic", color:"#E0D8C0", lineHeight:"1.8", marginBottom:"12px" }}>
                      "Our driver was really amazing. He was knowledgeable of the area and knew good places to go with high chances of spotting certain animals. He even recognised the pride of lions we saw and could point out which was which. He really loved his job — and his English was fantastic too."
                    </div>
                    <div style={{ fontSize:"10px", color:"#D4AF37", fontFamily:"monospace" }}>— Elle & Jack 🌍, Zanzibar to Nyerere safari</div>
                  </div>

                  <div style={{ fontSize:"11px", color:"#D4AF37", fontWeight:"700", marginBottom:"12px", fontFamily:"monospace", textTransform:"uppercase" }}>What makes a great safari guide</div>
                  {[
                    ["Local knowledge", "Knows the animals individually — including which lion is which in a pride. Can track based on time of day, season, and animal behaviour patterns."],
                    ["Walkie-talkie network", "Guides communicate with other drivers across the park to share sightings in real time. When one guide spots something, everyone knows."],
                    ["Reads the bush", "Knows where to position the vehicle for light, wind direction, and best angle. A great guide makes sightings possible that a mediocre one misses."],
                    ["English ability", "For the full experience you need to be able to ask questions and get real answers. Confirm English level when booking."],
                  ].map(([title, desc], i) => (
                    <div key={i} style={{ marginBottom:"12px" }}>
                      <div style={{ fontSize:"12px", fontWeight:"700", color:"#F0EAE0", marginBottom:"4px" }}>⭐ {title}</div>
                      <div style={{ fontSize:"11px", color:"#A0A098", lineHeight:"1.6" }}>{desc}</div>
                    </div>
                  ))}
                </div>
              )
            },
            {
              id: "book",
              icon: "🔗",
              label: "How to Book",
              color: "#8888BB",
              content: (
                <div>
                  {/* Elle & Jack's exact operator */}
                  <div style={{ background:"#6BAE5E18", border:"1px solid #6BAE5E44", borderRadius:"14px", padding:"16px", marginBottom:"16px" }}>
                    <div style={{ fontSize:"10px", color:"#6BAE5E", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"6px" }}>⭐ Used by Elle & Jack — rated "fantastic"</div>
                    <div style={{ fontSize:"16px", fontWeight:"800", color:"#fff", marginBottom:"4px" }}>Daily Expeditions</div>
                    <div style={{ fontSize:"12px", color:"#8BA688", marginBottom:"12px" }}>Found via SafariBookings.com · 1-day fly-in to Nyerere</div>
                    <div style={{ fontSize:"12px", color:"#B0C8B0", marginBottom:"12px", lineHeight:"1.6" }}>
                      Included: airport transfers, charter flights, safari driver/guide, unlimited water/soft drinks, and lunch. The full package for £379/person.
                    </div>
                    <a href="https://www.safaribookings.com/operator/daily-expeditions" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#6BAE5E20", border:"1px solid #6BAE5E44", borderRadius:"10px", padding:"12px 14px", textDecoration:"none", color:"#F0EAE0", fontSize:"13px", fontWeight:"600" }}>
                      <span>Book with Daily Expeditions</span><span style={{ color:"#6BAE5E", fontSize:"16px" }}>↗</span>
                    </a>
                  </div>

                  {/* How to find on SafariBookings */}
                  <div style={{ fontSize:"11px", color:"#8888BB", fontWeight:"700", marginBottom:"12px", fontFamily:"monospace", textTransform:"uppercase" }}>How Elle & Jack found them</div>
                  <div style={{ background:"#8888BB15", border:"1px solid #8888BB33", borderRadius:"12px", padding:"14px", marginBottom:"16px" }}>
                    <div style={{ fontSize:"12px", color:"#C0C0D8", lineHeight:"1.7" }}>
                      They used <strong style={{ color:"#fff" }}>SafariBookings.com</strong> — you can filter by location, length, type of park, and price. Compare dozens of operators in one place, read real reviews, and contact directly. Free to use.
                    </div>
                  </div>
                  <a href="https://www.safaribookings.com/zanzibar" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#8888BB15", border:"1px solid #8888BB33", borderRadius:"12px", padding:"13px 15px", textDecoration:"none", color:"#F0EAE0", fontSize:"13px", fontWeight:"500", marginBottom:"8px" }}>
                    <span>SafariBookings.com — Zanzibar safaris</span><span style={{ color:"#8888BB", fontSize:"16px" }}>↗</span>
                  </a>
                  <a href="https://www.safaribookings.com/serengeti" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#8888BB15", border:"1px solid #8888BB33", borderRadius:"12px", padding:"13px 15px", textDecoration:"none", color:"#F0EAE0", fontSize:"13px", fontWeight:"500", marginBottom:"8px" }}>
                    <span>SafariBookings.com — Serengeti safaris</span><span style={{ color:"#8888BB", fontSize:"16px" }}>↗</span>
                  </a>

                  {/* What to confirm before booking */}
                  <div style={{ marginTop:"20px", background:"#ffffff06", borderRadius:"12px", padding:"14px" }}>
                    <div style={{ fontSize:"10px", color:"#C8873A", fontWeight:"700", marginBottom:"10px", fontFamily:"monospace", textTransform:"uppercase" }}>📝 Questions to ask every operator</div>
                    {[
                      "Is this a National Park or Game Reserve?",
                      "What type of vehicle? (Open-sided multi-level?)",
                      "Is lunch included? Drinks?",
                      "What's the guide's English level?",
                      "Private vehicle or shared group?",
                      "Charter flight included or separate?",
                      "What time is pickup? What time back?",
                    ].map((q, i) => (
                      <div key={i} style={{ fontSize:"11px", color:"#B8B0A8", marginBottom:"7px", display:"flex", gap:"8px" }}>
                        <span style={{ color:"#C8873A", flexShrink:0 }}>?</span><span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            },
          ];;

export default function TripPlanner() {
  const [trip, setTrip] = useState("tanzania");
  const [mainTab, setMainTab] = useState("itinerary");
  const [expandedDay, setExpandedDay] = useState(null);
  const [compareDays, setCompareDays] = useState(12);
  const [expandedInfo, setExpandedInfo] = useState(null);
  const [activeSafariSection, setActiveSafariSection] = useState("experience");

  const th = T[trip];
  const days = tripDays[trip];

  const mainTabs = [
    { id: "itinerary", label: "📅 Itinerary" },
    ...(trip === "tanzania" ? [{ id: "safari", label: "🦁 Safari" }] : []),
    { id: "spa", label: "🧖 Spa & Chill" },
    { id: "hotels", label: "🏨 Hotels" },
    { id: "info", label: "ℹ️ Need to Know" },
    { id: "links", label: "🔗 Links" },
    { id: "compare", label: "⚖️ Compare" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: th.bg, minHeight: "100vh", color: "#F0EAE0", transition: "background 0.5s" }}>

      {/* ── HEADER ── */}
      <div style={{ padding: "28px 18px 14px", borderBottom: `1px solid ${th.accent}33` }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: th.accent, textTransform: "uppercase", marginBottom: "5px", fontFamily: "monospace" }}>July 2026 · From Tunisia · 12 Days</p>
        <h1 style={{ fontSize: "clamp(20px,5vw,32px)", fontWeight: "800", margin: "0 0 3px", color: "#fff" }}>
          {trip === "tanzania" ? "🦁 Serengeti + Zanzibar" : "🇨🇴 Colombia Circuit"}
        </h1>
        <p style={{ color: th.muted, margin: "0 0 16px", fontSize: "12px", fontStyle: "italic" }}>
          {trip === "tanzania" ? "Wild plains. Spice islands. Endless sky." : "Color, chaos, coffee, and cumbia."}
        </p>

        {/* Trip switch */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "12px", background: "#ffffff0A", borderRadius: "12px", padding: "4px", width: "fit-content" }}>
          {[{ id:"tanzania", label:"🦁 Tanzania" }, { id:"colombia", label:"🇨🇴 Colombia" }].map(t => (
            <button key={t.id} onClick={() => { setTrip(t.id); setMainTab("itinerary"); setExpandedDay(null); }} style={{ padding:"8px 14px", borderRadius:"9px", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:"12px", fontWeight:"700", transition:"all 0.3s", background: trip===t.id ? T[t.id].accent : "transparent", color: trip===t.id ? "#fff" : "#666" }}>{t.label}</button>
          ))}
        </div>

        {/* Main tabs — scrollable row */}
        <div style={{ display: "flex", gap: "2px", overflowX: "auto", paddingBottom: "2px" }}>
          {mainTabs.map(t => (
            <button key={t.id} onClick={() => { setMainTab(t.id); setExpandedDay(null); }} style={{ padding:"7px 11px", border:"none", background:"transparent", cursor:"pointer", fontFamily:"inherit", fontSize:"11px", fontWeight:"600", color: mainTab===t.id ? "#fff" : "#555", borderBottom: mainTab===t.id ? `2px solid ${th.accent}` : "2px solid transparent", whiteSpace:"nowrap", transition:"all 0.2s" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 14px 40px" }}>

        {/* ══ ITINERARY TAB ══ */}
        {mainTab === "itinerary" && days.map((d, i) => {
          const open = expandedDay === i;
          return (
            <div key={i} onClick={() => setExpandedDay(open ? null : i)} style={{ background: open ? "#1A2A18" : th.card, border: open ? `1px solid ${th.accent}55` : "1px solid #ffffff0A", borderRadius:"14px", marginBottom:"8px", cursor:"pointer", overflow:"hidden", transition:"all 0.3s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"11px", padding:"12px 14px" }}>
                <div style={{ width:"33px", height:"33px", borderRadius:"50%", background: open ? th.accent : "#ffffff10", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:"700", color: open?"#fff":th.muted, flexShrink:0, fontFamily:"monospace", transition:"all 0.3s" }}>{String(d.day).padStart(2,"0")}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:"700", fontSize:"13.5px", color:"#F0EAE0", marginBottom:"2px", lineHeight:1.3 }}>{d.mood} {d.title}</div>
                  <div style={{ fontSize:"10px", color: open?th.accent:th.muted, fontStyle:"italic" }}>{d.vibe}</div>
                </div>
                <div style={{ color:th.muted, fontSize:"14px", transform: open?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.3s", flexShrink:0 }}>▾</div>
              </div>
              {open && (
                <div style={{ padding:"0 14px 16px" }}>
                  <div style={{ height:"1px", background:`${th.accent}33`, marginBottom:"12px" }} />
                  <p style={{ margin:"0 0 12px", lineHeight:"1.75", fontSize:"13px", color:"#D0C8BC" }}>{d.desc}</p>
                  {d.prices.length > 0 && (
                    <div style={{ marginBottom:"10px", display:"flex", flexDirection:"column", gap:"5px" }}>
                      {d.prices.map((p,pi) => (
                        <div key={pi} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"#ffffff08", borderRadius:"8px", padding:"7px 11px" }}>
                          <span style={{ fontSize:"11px", color:"#A8A090" }}>{p.label}</span>
                          <span style={{ fontSize:"11px", fontWeight:"700", color:th.accent, fontFamily:"monospace", marginLeft:"10px", whiteSpace:"nowrap" }}>{p.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ background:`${th.accent}15`, borderLeft:`3px solid ${th.accent}`, borderRadius:"0 8px 8px 0", padding:"9px 12px" }}>
                    <p style={{ margin:0, fontSize:"9px", color:th.accent, fontWeight:"700", marginBottom:"3px", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"monospace" }}>Local tip</p>
                    <p style={{ margin:0, fontSize:"12px", color:"#C0B8A8", lineHeight:"1.55" }}>{d.tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ══ SAFARI TAB ══ */}
        {mainTab === "safari" && (
            <div>
              {/* Intro banner */}
              <div style={{ background:"#C8873A10", border:"1px solid #C8873A30", borderRadius:"12px", padding:"13px 14px", marginBottom:"16px" }}>
                <div style={{ fontSize:"10px", color:"#C8873A", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"4px" }}>Once-in-this-trip experience</div>
                <div style={{ fontSize:"13px", color:"#D0C8BC", lineHeight:"1.65" }}>
                  Based on the real experience of <strong style={{ color:"#fff" }}>@Elle & Jack</strong> — who lost their hair, their hat, and apparently their hearts to a lion somewhere near the Mara River.
                </div>
              </div>

              {/* Section nav — scrollable chips */}
              <div style={{ display:"flex", gap:"6px", overflowX:"auto", paddingBottom:"12px", marginBottom:"14px" }}>
                {safariSections.map(s => (
                  <button key={s.id} onClick={() => setActiveSafariSection(s.id)} style={{ padding:"8px 13px", borderRadius:"20px", border:`1px solid ${activeSafariSection===s.id?s.color:"#ffffff15"}`, cursor:"pointer", fontFamily:"inherit", background: activeSafariSection===s.id?`${s.color}20`:"transparent", color: activeSafariSection===s.id?s.color:"#666", fontSize:"12px", fontWeight:"600", whiteSpace:"nowrap", transition:"all 0.2s" }}>{s.icon} {s.label}</button>
                ))}
              </div>

              {/* Active section content */}
              {activeSection.content}
            </div>
        )}

        {/* ══ SPA TAB ══ */}
        {mainTab === "spa" && (
          <div>
            <div style={{ background:`${th.accent}10`, border:`1px solid ${th.accent}30`, borderRadius:"12px", padding:"14px", marginBottom:"16px" }}>
              <p style={{ margin:0, fontSize:"12px", color:"#D0C8BC", lineHeight:"1.7" }}>
                {trip === "tanzania"
                  ? "🌿 Zanzibar has a rich Arab and Swahili wellness tradition — hammams, spice rituals, seaweed wraps. All options below are under $200/person and rooted in the local culture."
                  : "💧 Colombia has incredible thermal bath culture, volcanic mud rituals, and city spa experiences. All options below are under $200/person and reflect the local tradition."}
              </p>
            </div>
            {spaData[trip].map((s, i) => (
              <div key={i} style={{ background: th.card, border:"1px solid #ffffff0A", borderRadius:"14px", marginBottom:"10px", padding:"16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"10px", marginBottom:"8px", flexWrap:"wrap" }}>
                  <div>
                    <div style={{ fontSize:"14px", fontWeight:"700", color:"#F0EAE0", marginBottom:"2px" }}>{s.name}</div>
                    <div style={{ fontSize:"11px", color:th.accent }}>{s.type} · {s.location}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:"13px", fontWeight:"700", color:th.accent, fontFamily:"monospace" }}>{s.price}</div>
                    <div style={{ fontSize:"10px", color:"#666" }}>{s.duration}</div>
                  </div>
                </div>
                <p style={{ margin:"0 0 10px", fontSize:"12px", color:"#B8B0A8", lineHeight:"1.7" }}>{s.desc}</p>
                <div style={{ background:`${th.accent}15`, borderLeft:`3px solid ${th.accent}`, borderRadius:"0 8px 8px 0", padding:"8px 12px", marginBottom:"10px" }}>
                  <p style={{ margin:0, fontSize:"11px", color:"#C0B8A8", lineHeight:"1.5" }}>📍 {s.highlight}</p>
                </div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:`${th.accent}10`, border:`1px solid ${th.accent}25`, borderRadius:"9px", padding:"9px 12px", textDecoration:"none", color:"#F0EAE0", fontSize:"12px", fontWeight:"500" }}>
                  <span>Book / find out more</span><span style={{ color:th.accent }}>↗</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ══ HOTELS TAB ══ */}
        {mainTab === "hotels" && (
          <div>
            <p style={{ color:th.muted, fontSize:"12px", fontStyle:"italic", marginBottom:"16px" }}>Hend's picks — all from your Booking.com research. Tap to open.</p>
            {hotels[trip].map((h,i) => (
              <a key={i} href={h.url} target="_blank" rel="noopener noreferrer" style={{ display:"block", background:th.card, border:"1px solid #ffffff0A", borderRadius:"14px", marginBottom:"10px", padding:"16px", textDecoration:"none", color:"#F0EAE0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px", marginBottom:"6px", flexWrap:"wrap" }}>
                  <div>
                    <div style={{ fontSize:"14px", fontWeight:"700", color:"#F0EAE0", marginBottom:"2px" }}>{h.name}</div>
                    <div style={{ fontSize:"11px", color:th.accent }}>{h.area} · {h.stars}</div>
                  </div>
                  <div style={{ display:"flex", gap:"6px", alignItems:"center", flexShrink:0 }}>
                    <span style={{ background:`${th.accent}20`, color:th.accent, fontSize:"12px", fontWeight:"700", padding:"4px 10px", borderRadius:"20px", fontFamily:"monospace" }}>{h.rating}</span>
                    <span style={{ color:th.accent, fontSize:"16px" }}>↗</span>
                  </div>
                </div>
                <div style={{ fontSize:"10px", background:`${th.accent}15`, color:th.accent, padding:"3px 9px", borderRadius:"20px", display:"inline-block", marginBottom:"8px", fontFamily:"monospace" }}>{h.tag}</div>
                <p style={{ margin:0, fontSize:"12px", color:"#A8A090", lineHeight:"1.6" }}>{h.desc}</p>
              </a>
            ))}
          </div>
        )}

        {/* ══ INFO TAB ══ */}
        {mainTab === "info" && (
          <div>
            {travelInfo[trip].map((section, i) => {
              const open = expandedInfo === i;
              return (
                <div key={i} style={{ background: open?"#1A2A18":th.card, border: open?`1px solid ${th.accent}55`:"1px solid #ffffff0A", borderRadius:"14px", marginBottom:"8px", overflow:"hidden", transition:"all 0.3s" }}>
                  <div onClick={() => setExpandedInfo(open?null:i)} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"14px", cursor:"pointer" }}>
                    <span style={{ fontSize:"20px" }}>{section.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:"700", fontSize:"13.5px", color:"#F0EAE0" }}>{section.title}</div>
                      <div style={{ fontSize:"10px", color:open?th.accent:th.muted, textTransform:"uppercase", letterSpacing:"0.05em", fontFamily:"monospace" }}>{section.type}</div>
                    </div>
                    <div style={{ color:th.muted, fontSize:"14px", transform:open?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.3s" }}>▾</div>
                  </div>
                  {open && (
                    <div style={{ padding:"0 16px 16px" }}>
                      <div style={{ height:"1px", background:`${th.accent}33`, marginBottom:"12px" }} />
                      {section.points.map((p,pi) => (
                        <div key={pi} style={{ display:"flex", gap:"10px", marginBottom:"10px" }}>
                          <span style={{ color:th.accent, flexShrink:0, fontSize:"14px" }}>•</span>
                          <span style={{ fontSize:"12px", color:"#C0B8A8", lineHeight:"1.65" }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ LINKS TAB ══ */}
        {mainTab === "links" && (
          <div>
            {allLinks[trip].map((cat, ci) => (
              <div key={ci} style={{ marginBottom:"20px" }}>
                <div style={{ fontSize:"11px", color:th.accent, fontWeight:"700", marginBottom:"10px", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.1em" }}>{cat.cat}</div>
                {cat.items.map((l,li) => (
                  <a key={li} href={l.url} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:`${th.accent}10`, border:`1px solid ${th.accent}25`, borderRadius:"12px", padding:"13px 15px", textDecoration:"none", color:"#F0EAE0", fontSize:"13px", fontWeight:"500", marginBottom:"8px" }}>
                    <span>{l.label}</span><span style={{ color:th.accent, fontSize:"16px", flexShrink:0 }}>↗</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ══ COMPARE TAB ══ */}
        {mainTab === "compare" && (
          <div>
            <p style={{ color:"#888", fontSize:"12px", fontStyle:"italic", marginBottom:"16px" }}>Both trips, side by side. All prices per person including international flights.</p>

            {/* Days toggle */}
            <div style={{ marginBottom:"20px" }}>
              <div style={{ fontSize:"10px", color:"#888", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"8px", fontFamily:"monospace" }}>Trip length</div>
              <div style={{ display:"flex", gap:"8px" }}>
                {[10,12,14].map(d => (
                  <button key={d} onClick={() => setCompareDays(d)} style={{ padding:"8px 16px", borderRadius:"20px", border:"none", cursor:"pointer", fontSize:"13px", fontWeight:"700", fontFamily:"inherit", background: compareDays===d?"#fff":"#ffffff12", color: compareDays===d?"#111":"#888", transition:"all 0.2s" }}>{d} days</button>
                ))}
              </div>
            </div>

            {/* Cost cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"20px" }}>
              {[{trip:"tanzania",label:"🦁 Tanzania"},{trip:"colombia",label:"🇨🇴 Colombia"}].map(({trip:t,label}) => {
                const c = compare.costs[compareDays][t];
                const th2 = T[t];
                return (
                  <div key={t} style={{ background:`${th2.accent}18`, border:`1px solid ${th2.accent}44`, borderRadius:"14px", padding:"16px 12px" }}>
                    <div style={{ fontSize:"11px", color:th2.accent, fontFamily:"monospace", textTransform:"uppercase", marginBottom:"6px" }}>{label}</div>
                    <div style={{ fontSize:"22px", fontWeight:"800", color:"#fff" }}>${c.low.toLocaleString()}</div>
                    <div style={{ fontSize:"10px", color:"#666" }}>up to ${c.high.toLocaleString()}</div>
                    <div style={{ fontSize:"9px", color:"#555", marginTop:"4px" }}>per person, incl. flights</div>
                  </div>
                );
              })}
            </div>

            {/* Head to head */}
            <div style={{ marginBottom:"16px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"4px", marginBottom:"6px" }}>
                <div />
                <div style={{ fontSize:"10px", color:"#C8873A", fontWeight:"700", fontFamily:"monospace", textAlign:"center", padding:"4px" }}>🦁 Tanzania</div>
                <div style={{ fontSize:"10px", color:"#E8A020", fontWeight:"700", fontFamily:"monospace", textAlign:"center", padding:"4px" }}>🇨🇴 Colombia</div>
              </div>
              {compare.rows.map((row,i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"4px", marginBottom:"4px", alignItems:"start" }}>
                  <div style={{ fontSize:"10px", color:"#777", padding:"7px 0", lineHeight:"1.4" }}>{row.label}</div>
                  <div style={{ fontSize:"10px", color:"#C8873A", background:"#C8873A12", borderRadius:"7px", padding:"6px 8px", lineHeight:"1.4" }}>{row.tz}</div>
                  <div style={{ fontSize:"10px", color:"#E8A020", background:"#E8A02012", borderRadius:"7px", padding:"6px 8px", lineHeight:"1.4" }}>{row.co}</div>
                </div>
              ))}
            </div>

            {/* Verdict */}
            <div style={{ background:"#ffffff08", borderRadius:"14px", padding:"16px" }}>
              <p style={{ color:"#fff", fontWeight:"700", fontSize:"13px", marginBottom:"10px" }}>🎯 The honest verdict</p>
              <p style={{ color:"#C8873A", fontSize:"12px", marginBottom:"8px", lineHeight:"1.7" }}><strong>Choose Tanzania</strong> if wildlife and nature are your priority. July is literally the best month on Earth to witness the Great Migration. You'll be guided the whole way — no stress, just wonder.</p>
              <p style={{ color:"#E8A020", fontSize:"12px", lineHeight:"1.7", margin:0 }}><strong>Choose Colombia</strong> if you love cities, culture, nightlife, and independence. Far better value, extraordinary food, three very different cities, and the Caribbean coast at the end. No visa needed from Tunisia.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
