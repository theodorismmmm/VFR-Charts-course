export type Difficulty = "easy" | "medium" | "hard";

export type LessonImage = {
  src: string;
  alt: string;
  credit: string;
  caption: string;
};

export type MapLegendItem = {
  symbol: string;
  meaning: string;
};

export type Lesson = {
  id: string;
  order: number;
  title: string;
  summary: string;
  difficulty: Difficulty;
  airport: {
    name: string;
    code: string;
    note: string;
  };
  /** Primary visual (airport photo or main chart cutout) */
  image: LessonImage;
  /** Extra chart / diagram images shown under the hero */
  gallery: LessonImage[];
  mapLegend: MapLegendItem[];
  readingMinutes: number;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  takeaways: string[];
};

export type Course = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  lessons: Lesson[];
};

export const VFR_BASICS_COURSE_ID = "vfr-basics";

export const courses: Course[] = [
  {
    id: VFR_BASICS_COURSE_ID,
    title: "VFR Basics",
    tagline: "See the sky the way a chart describes it.",
    description:
      "Learn Visual Flight Rules from the ground up—airport shapes, runway logic, chart symbols, and airspace—using real airport photos and real VFR charts that get more complex as you go.",
    coverImage: "/airports/13-anchorage-sectional.jpg",
    lessons: [
      {
        id: "what-is-vfr",
        order: 1,
        title: "What is VFR?",
        summary:
          "Visual Flight Rules mean you navigate and separate primarily by looking outside—then confirm what you see with a chart before you ever start the engine.",
        difficulty: "easy",
        airport: {
          name: "Augsburg Airport",
          code: "EDMA",
          note: "A calm GA field—perfect for learning what “see and avoid” looks like in real life.",
        },
        image: {
          src: "/airports/00-hero-augsburg.jpg",
          alt: "Light aircraft landing at Augsburg Airport",
          credit: "Wikimedia Commons — Light aircraft landing at Augsburg Airport (2019)",
          caption: "Outside the window: runway, grass, and traffic you can actually see.",
        },
        gallery: [
          {
            src: "/airports/15-kodiak-vfr.jpg",
            alt: "VFR Kodiak Sectional Aeronautical Chart excerpt",
            credit: "FAA / Wikimedia Commons — VFR Kodiak Sectional (2024)",
            caption:
              "Same idea on paper: airports, coastline, and terrain tinting so your eyes know what to expect.",
          },
        ],
        mapLegend: [
          {
            symbol: "Open airport circle / runway ticks",
            meaning:
              "A place you can land. On U.S. sectionals, magenta often means no tower; blue usually means a control tower is available.",
          },
          {
            symbol: "Blue / brown terrain shading",
            meaning:
              "Elevation of the ground. Darker or higher-tint areas mean higher terrain—plan altitude with room to spare.",
          },
          {
            symbol: "Coastline / blue water",
            meaning:
              "A visual checkpoint. Match the bend of a bay or river on the chart to what you see outside.",
          },
          {
            symbol: "Obstruction symbols (towers)",
            meaning:
              "Tall man-made obstacles. Numbers nearby are heights—never assume the sky is empty because the airport looks quiet.",
          },
        ],
        readingMinutes: 14,
        sections: [
          {
            heading: "What “visual” really means",
            body: [
              "VFR (Visual Flight Rules) is the rule set most private pilots start with. You keep the airplane clear of clouds, keep the ground (or enough visual references) in sight, and separate from other traffic primarily by looking outside—called “see and avoid.”",
              "That does not mean charts are optional. Charts are how you prepare your eyes. Before takeoff you already know which coastline bend, town, or airport shape you should see at each stage of the flight.",
              "Look at the Augsburg photo: a light aircraft on short final over open terrain. That is the VFR picture—runway in sight, traffic in sight, weather that lets you keep both.",
            ],
          },
          {
            heading: "How a VFR chart supports what you see",
            body: [
              "A sectional chart is a top-down map drawn for visual navigation (U.S. sectionals are typically 1:500,000—about 1 inch ≈ 7 nautical miles). It packs airports, airspace, obstacles, and terrain into color and line language.",
              "On the Kodiak VFR chart excerpt, notice how water, shoreline, and airport marks sit together. When you fly near a coast, you are not guessing—you are matching the chart’s shoreline shape to the window.",
              "Later lessons decode each symbol family. For now, learn the habit: photo → mental picture → chart confirmation → then fly.",
            ],
          },
          {
            heading: "Weather minima in plain words",
            body: [
              "Basic VFR needs enough ceiling and visibility to stay clear of clouds and see other aircraft. Exact numbers change with airspace class (we cover that in the airspace lessons).",
              "If haze, snow, or night removes the visual world, you are leaving the VFR environment this course teaches. Charts do not create visibility—they only help you use it wisely.",
              "Practical rule: if you cannot build a clear mental picture of the next 10–15 minutes of the flight from the chart and the weather, do not go VFR yet.",
            ],
          },
          {
            heading: "Your first chart briefing habit",
            body: [
              "1) Find your departure and destination airport symbols. 2) Trace a simple route with 2–3 big visual checkpoints (coast, town, highway bend). 3) Note any airspace rings you might touch. 4) Check terrain tinting / maximum elevation figures. 5) Write frequencies and an alternate.",
              "That five-step brief is the spine of every later lesson. Easy airports teach the eye; hard charts teach discipline.",
            ],
          },
        ],
        takeaways: [
          "VFR = navigate and separate primarily by sight, with charts as the plan.",
          "Sectionals turn terrain, water, and airports into a shared language.",
          "Weather must support staying visual for the whole flight.",
          "Brief every flight: airports → checkpoints → airspace → terrain → frequencies.",
        ],
      },
      {
        id: "airport-anatomy",
        order: 2,
        title: "Airport anatomy",
        summary:
          "Name the pieces of a small airport so a tiny chart symbol expands into a place you can taxi, park, and take off.",
        difficulty: "easy",
        airport: {
          name: "Cambridge Airport",
          code: "EGSC",
          note: "GA parking, tower, and open pavement—easy to read from the ground.",
        },
        image: {
          src: "/airports/10-cambridge-ga.jpg",
          alt: "Cambridge Airport general aviation parking and control tower",
          credit: "Wikimedia Commons / geograph.org.uk — Cambridge Airport GA area",
          caption: "Ramp, hangars, and tower—the building blocks behind every airport tick mark.",
        },
        gallery: [
          {
            src: "/airports/27-airport-taxiway.png",
            alt: "Airport taxiway diagram illustration",
            credit: "Wikimedia Commons — Airport Taxiway diagram",
            caption: "Taxiways connect the ramp to the runway—never confuse the two.",
          },
        ],
        mapLegend: [
          {
            symbol: "Airport tick / circle on a sectional",
            meaning:
              "The whole place: ramp + taxiways + runway(s) + services. The chart does not draw every hangar.",
          },
          {
            symbol: "Hard-surface runway tick",
            meaning:
              "A paved runway. Soft-field or turf airports often use different tick styles—check the legend for your chart edition.",
          },
          {
            symbol: "Fuel / services tick marks (when shown)",
            meaning:
              "Hints that services exist. Confirm with the Chart Supplement / AIP—not the sectional alone—before you plan a fuel stop.",
          },
          {
            symbol: "Tower frequency near a blue airport",
            meaning:
              "Talk to the tower before entering their airspace / pattern. Magenta (non-towered) airports use CTAF / UNICOM instead.",
          },
        ],
        readingMinutes: 15,
        sections: [
          {
            heading: "The parts you will always meet",
            body: [
              "Every usable airport shares building blocks: runway(s) for takeoff and landing, taxiways that connect pavement, an apron/ramp for parking and loading, and often hangars, a fuel pump, and a tower or advisory frequency.",
              "Cambridge’s photo shows the human-scale version: aircraft parked on the apron, a control tower watching the field, and open space that is not the runway. On a sectional, all of that collapses into a small symbol.",
              "Learning the real layout first makes the chart mark feel less abstract. When you see a tick mark later, your brain should unpack: “ramp here, taxi there, runway beyond.”",
            ],
          },
          {
            heading: "Ramp vs taxiway vs runway",
            body: [
              "The ramp is where people walk and aircraft park. Taxiways are the connectors—usually marked with yellow centerlines on the ground. The runway is the protected strip used only for takeoff and landing.",
              "Mixing them up is how runway incursions start. Mentally label every paved surface before you move the airplane. On diagrams, taxiways are lettered (A, B, C); runways are numbered by heading.",
              "The taxiway diagram in this lesson’s gallery is the abstract version of what Cambridge shows in real life: clear paths that lead to a runway threshold—not shortcuts across protected pavement.",
            ],
          },
          {
            heading: "What the chart shows—and what it hides",
            body: [
              "Sectionals hide most taxiway detail. They show that an airport exists, often its longest runway orientation, lighting/services clues, and elevation/frequency notes.",
              "For complex fields you step up to an airport diagram (in the Chart Supplement / airport publications). VFR planning often uses both: sectional for the route, diagram for the last five miles and the taxi in.",
              "Habit: after you pick an airport on the chart, ask “do I need a diagram?” If there is more than one runway, a tower, or confusing geometry—yes.",
            ],
          },
          {
            heading: "Reading Cambridge as a training lab",
            body: [
              "Stand (mentally) on the ramp in the photo. Point to: (1) parked aircraft = apron, (2) the building with the glass cabin = tower/ops, (3) the open paved strip beyond = the runway environment.",
              "Now imagine shrinking that scene into a magenta or blue airport symbol. That compression is why chart literacy matters—you are expanding symbols back into places.",
            ],
          },
        ],
        takeaways: [
          "Ramp, taxiway, runway, and tower/FBO are the core airport pieces.",
          "Chart airport symbols compress an entire field into a mark.",
          "Protect the runway mentally—it is never a parking area.",
          "Use airport diagrams when taxi geometry is more than a simple strip.",
        ],
      },
      {
        id: "simple-runway-picture",
        order: 3,
        title: "A simple runway picture",
        summary:
          "Coastal single-runway airports teach orientation: water, land, and one clear strip you can match to a chart tick.",
        difficulty: "easy",
        airport: {
          name: "Sumburgh Airport",
          code: "EGPB",
          note: "A clean coastal runway—easy to spot how terrain frames the approach.",
        },
        image: {
          src: "/airports/01-sumburgh.jpg",
          alt: "Aerial view of Sumburgh Airport",
          credit: "Wikimedia Commons — Sumburgh Airport aerial",
          caption: "One dominant runway framed by coastline—ideal for learning orientation.",
        },
        gallery: [
          {
            src: "/airports/13-anchorage-sectional.jpg",
            alt: "Anchorage Sectional chart cutout with coastal features",
            credit: "FAA / Wikimedia Commons — Anchorage Sectional cutout 2024",
            caption: "Coastlines and airport ticks on a real FAA sectional—match water bends to the window.",
          },
        ],
        mapLegend: [
          {
            symbol: "Single runway tick through an airport symbol",
            meaning:
              "Usually the primary runway orientation. The line’s angle roughly matches the runway’s magnetic alignment.",
          },
          {
            symbol: "Blue water / shoreline detail",
            meaning:
              "Primary visual checkpoint. A wrong turn inland vs along the coast is obvious if you briefed the chart.",
          },
          {
            symbol: "Elevation number near the airport",
            meaning:
              "Field elevation in feet MSL. Pattern altitude is typically about 1,000 ft above this unless published otherwise.",
          },
          {
            symbol: "MEF (Maximum Elevation Figure) in a grid square",
            meaning:
              "The highest known obstacle/terrain in that chart quadrant, rounded up. Stay above MEFs with a safety margin when crossing the square.",
          },
        ],
        readingMinutes: 14,
        sections: [
          {
            heading: "Read the scene, then the chart",
            body: [
              "Before you memorize magenta symbols, practice reading the airport as a photograph: Where is the runway? Which way does it point? What water or hills frame it?",
              "Sumburgh’s aerial makes this easy—the strip sits against a coastal landscape with few competing shapes. That is the training value of simple fields.",
              "Sectionals encode the same story with shoreline drawing and an airport mark. If the photo shows water on one side, the chart’s blue should too.",
            ],
          },
          {
            heading: "One runway, one story",
            body: [
              "Single-runway fields are the easiest VFR labs. There is usually one primary takeoff direction into the wind and a reciprocal landing direction 180° opposite.",
              "On the chart that appears as a short line or airport symbol with a frequency and elevation nearby—not a dense spiderweb of taxiways yet.",
              "Wind decides which end you use. The chart does not change with the wind; your runway selection does. Always pair METAR/ATIS wind with the runway number you plan to fly.",
            ],
          },
          {
            heading: "Checkpoints along a coastal route",
            body: [
              "Pilotage means matching visual features to the chart. Coastline bends, harbors, and peninsulas are gold—pick two or three unmistakable ones, not a dozen vague towns.",
              "On the Anchorage sectional cutout, practice tracing a short coastal path between airport marks. Ask: what will I see at the halfway point that proves I am still on course?",
              "If you cannot name the next checkpoint before takeoff, the brief is incomplete.",
            ],
          },
          {
            heading: "Altitude awareness even at easy fields",
            body: [
              "Simple airports can sit near rising terrain or water approaches with few forced-landing options. Chart elevation numbers and MEFs still matter.",
              "Build the habit now on easy photos so it is automatic when charts get crowded.",
            ],
          },
        ],
        takeaways: [
          "Start by spotting runway orientation against terrain and water.",
          "Simple fields map cleanly to basic chart airport marks.",
          "Wind decides which end of a single runway you use.",
          "Brief 2–3 unmistakable visual checkpoints—not vague ones.",
        ],
      },
      {
        id: "runway-numbers",
        order: 4,
        title: "Runway numbers & markings",
        summary:
          "Runway numbers are magnetic headings rounded to the nearest 10°—painted large so you can read them on short final and match them to charts and clearances.",
        difficulty: "easy",
        airport: {
          name: "Salzburg Airport",
          code: "LOWS",
          note: "Runway 33 markings are bold and readable—ideal for learning the numbering system.",
        },
        image: {
          src: "/airports/02-salzburg-rwy.jpg",
          alt: "Salzburg Airport runway 33 markings",
          credit: "Wikimedia Commons — Salzburg Airport Runway LOWS RWY33",
          caption: "Big painted numbers: 33 means roughly a 330° magnetic heading.",
        },
        gallery: [
          {
            src: "/airports/17-taxiway-markings.png",
            alt: "Airport lighting and surface markings key",
            credit: "Wikimedia Commons — Surface Movement Guidance Control System markings key",
            caption: "Markings and lights turn the runway into a readable system—not just asphalt.",
          },
        ],
        mapLegend: [
          {
            symbol: "Runway number (e.g., 33)",
            meaning:
              "Magnetic heading ÷ 10, rounded. Opposite end differs by 18 (33 ↔ 15).",
          },
          {
            symbol: "L / R / C suffixes (27L, 27R)",
            meaning:
              "Parallel runways. Left/Right/Center from the pilot’s view when facing that number.",
          },
          {
            symbol: "Threshold / aiming-point markings",
            meaning:
              "Where the usable runway begins and where you aim on final. Displaced thresholds mean pavement before the marks is not for landing.",
          },
          {
            symbol: "Centerline stripe",
            meaning:
              "Stay aligned. At night, lights reinforce the same path the paint shows by day.",
          },
        ],
        readingMinutes: 16,
        sections: [
          {
            heading: "How numbering works",
            body: [
              "A runway numbered 33 means roughly a 330° magnetic heading when you take off or land in that direction. The opposite end is 15 (150°).",
              "Always drop the last digit of the magnetic heading and round: 334° → 33, 148° → 15. Magnetic variation changes slowly over years—charts and airport data are updated for a reason.",
              "Salzburg’s painted 33 is the ground truth of that system. If ATC says “cleared to land runway 33,” you should already see those digits (or the reciprocal) in your mind from the brief.",
            ],
          },
          {
            heading: "What the paint tells you",
            body: [
              "Threshold bars, centerline, and aiming points help you land in the correct place. Touching down short of a displaced threshold can put you on unusable pavement.",
              "Sectionals will not show every painted stripe. Airport diagrams and the Chart Supplement fill that gap. Use the photo and markings key in this lesson to learn the language, then find the same ideas on diagrams for your home field.",
              "When a chart or ATIS mentions parallel runways, left/right suffixes (27L / 27R) keep them distinct—the same idea as two painted numbers side by side.",
            ],
          },
          {
            heading: "Connecting numbers to the wind",
            body: [
              "You usually want a headwind component. If the wind is from 310°, runway 33 is a better match than 15.",
              "Practice: given a METAR wind, pick the runway end whose number is closest to the wind direction. That skill matters more than memorizing paint patterns.",
              "At uncontrolled fields you announce the runway you are using. At controlled fields you fly the runway ATC assigns—even if another end feels “more convenient.”",
            ],
          },
          {
            heading: "Night and low-contrast reminders",
            body: [
              "When contrast drops, lights replace paint as your primary cues. The markings key shows how edge lights, centerline lights, and approach lights extend the same geometry into darkness.",
              "If you cannot identify the runway number and the aiming area, you are not ready to land VFR—go around or divert.",
            ],
          },
        ],
        takeaways: [
          "Runway number ≈ magnetic heading ÷ 10.",
          "Opposite ends differ by 18 (e.g., 33 and 15).",
          "Charts summarize runways; markings teach precision on final.",
          "Match runway choice to wind—and to ATC clearances.",
        ],
      },
      {
        id: "taxiways-and-layout",
        order: 5,
        title: "Taxiways & clear layouts",
        summary:
          "High-contrast airports make taxiway geometry obvious—practice tracing the path from ramp to runway before denser fields confuse you.",
        difficulty: "easy",
        airport: {
          name: "Palm Springs International",
          code: "KPSP",
          note: "Desert contrast makes pavement easy to follow from above.",
        },
        image: {
          src: "/airports/03-palm-springs.jpg",
          alt: "Palm Springs International Airport aerial view",
          credit: "Wikimedia Commons — Palm Springs International Airport (Don Ramey Logan)",
          caption: "Clear pavement geometry: ramp → taxiways → runways.",
        },
        gallery: [
          {
            src: "/airports/17-taxiway-markings.png",
            alt: "Taxiway and runway marking key",
            credit: "Wikimedia Commons — airport lighting and markings key",
            caption: "Yellow = taxi guidance. White = runway. Know which language you are reading.",
          },
        ],
        mapLegend: [
          {
            symbol: "Yellow taxiway centerline",
            meaning: "Follow this path while taxiing. Hold short where signs/markings say so.",
          },
          {
            symbol: "Hold-short markings (two solid + two dashed yellow)",
            meaning:
              "Do not cross onto the runway side without clearance (towered) or without being sure the runway is clear (untowered).",
          },
          {
            symbol: "Taxiway letter signs (A, B, C…)",
            meaning:
              "Match what ATC says: “taxi via Alpha.” Diagram letters = spoken letters.",
          },
          {
            symbol: "Hot spot notes on diagrams",
            meaning:
              "Published confusion points—extra caution intersections where wrong turns or runway crossings are common.",
          },
        ],
        readingMinutes: 15,
        sections: [
          {
            heading: "Follow the yellow lines",
            body: [
              "Taxiways connect ramps to runways. On the ground they use yellow markings; runways use white. If you are reading yellow, you should not be taking off yet.",
              "Palm Springs from above shows why training here (visually) helps: pavement contrasts with desert, so the graph of taxiways is obvious. Build the habit of tracing your route with a finger on the diagram before you move.",
              "Sectionals rarely show every taxiway. For anything beyond a simple strip, open the airport diagram during planning.",
            ],
          },
          {
            heading: "Hold short means hold short",
            body: [
              "Hold-short markings are a hard stop until you are cleared (or, at untowered fields, until you have visually ensured the runway is clear and you have announced appropriately).",
              "Never let “I’m almost there” push you across. Most runway incursions happen during taxi, not in the air.",
              "Use the markings key image: identify hold-short bars, edge lights, and centerline cues until they feel automatic.",
            ],
          },
          {
            heading: "Hot spots and progressive taxi",
            body: [
              "Where taxiways cross runways or create confusing geometry, diagrams may flag hot spots. Treat them like yellow traffic signs in a city.",
              "If you are unsure, ask ATC for progressive taxi. Pride is cheaper than a runway incursion report.",
              "Clear layouts like Palm Springs train your eye so denser airports later feel manageable instead of overwhelming.",
            ],
          },
          {
            heading: "Brief the taxi before engine start",
            body: [
              "Write: parking → taxiways → hold short point → runway. Say it out loud. Then fly the plan unless ATC changes it.",
              "After landing, the brief runs in reverse: exit → taxiways → parking. Fatigue after landing is when mistakes spike—slow down.",
            ],
          },
        ],
        takeaways: [
          "Taxiways are connectors; runways are protected strips.",
          "Yellow paint = taxi language; white = runway language.",
          "Hot spots = published caution intersections.",
          "Brief the taxi path before you move the airplane.",
        ],
      },
      {
        id: "controlled-fields",
        order: 6,
        title: "Controlled fields & the pattern",
        summary:
          "Towered airports add radio structure. The traffic pattern is still a visual rectangle—and charts tip you off with blue airport symbols and pattern notes.",
        difficulty: "medium",
        airport: {
          name: "Daytona Beach International",
          code: "KDAB",
          note: "A busy training airport—runway 7R shows controlled-field pattern flying.",
        },
        image: {
          src: "/airports/04-daytona.jpg",
          alt: "Aerial view of runway 7R at Daytona Beach International Airport",
          credit: "Wikimedia Commons — Daytona Beach International Airport runway 7R",
          caption: "Controlled runway environment—tower talks, eyes still fly the pattern.",
        },
        gallery: [
          {
            src: "/airports/16-traffic-pattern.jpg",
            alt: "Airport traffic pattern diagram from the AIM",
            credit: "FAA AIM / Wikimedia Commons — Airport Traffic Pattern diagram",
            caption: "Upwind, crosswind, downwind, base, final—the visual rectangle.",
          },
        ],
        mapLegend: [
          {
            symbol: "Blue airport symbol (U.S. sectional)",
            meaning:
              "Control tower operates at least part-time. Expect to talk to ATC in the airspace/pattern when the tower is open.",
          },
          {
            symbol: "Magenta airport symbol",
            meaning:
              "No control tower (or tower not depicted as controlling). Use CTAF procedures.",
          },
          {
            symbol: "RP / pattern notes (when charted)",
            meaning:
              "Non-standard right traffic. Otherwise left traffic is the default assumption—always verify.",
          },
          {
            symbol: "Tower / ATIS frequencies printed nearby",
            meaning:
              "Listen to ATIS first, then contact approach/tower as required. Write them on your brief.",
          },
        ],
        readingMinutes: 17,
        sections: [
          {
            heading: "Tower does not replace looking",
            body: [
              "At a controlled airport you talk to the tower, but you still fly a visual pattern: upwind, crosswind, downwind, base, and final.",
              "Daytona’s runway photo is the real-world stage for the AIM pattern diagram in the gallery. ATC sequences you; your eyes keep you from hitting someone on downwind.",
              "Chart tip: U.S. sectionals often use blue airport symbols for towered fields and magenta for non-towered—an early airspace-reading skill.",
            ],
          },
          {
            heading: "Walk the pattern legs",
            body: [
              "Upwind: climb straight ahead after takeoff. Crosswind: turn to leave the runway axis. Downwind: parallel the runway, opposite the landing direction. Base: turn toward final. Final: aligned with the numbers.",
              "Standard pattern altitude is often ~1,000 ft AGL unless published otherwise. Left traffic is standard; right traffic is charted or listed when required.",
              "Knowing the runway in use (here, 7R) tells you which rectangular path around the field keeps you sequenced with other aircraft.",
            ],
          },
          {
            heading: "Radio flow for a towered arrival",
            body: [
              "Typical flow: ATIS → approach (if needed) → tower. Say who you are, where you are, and what you want. Read back hold-short and runway assignments carefully.",
              "If you lose sight of the airport or traffic, say so. Controllers would rather help than guess.",
              "Practice the pattern diagram until you can sketch it from memory with runway 7 or 25 as the long side of the rectangle.",
            ],
          },
          {
            heading: "How charts hint at pattern complexity",
            body: [
              "Multiple runway ticks, parallel runways, and nearby Class C/B shelves mean denser traffic and less room for improvisation.",
              "Daytona is a training hub—expect many light aircraft. Your scan rate should go up, not down, when the tower is talking.",
            ],
          },
        ],
        takeaways: [
          "Blue vs magenta airport symbols hint at tower status on U.S. charts.",
          "The traffic pattern is a visual rectangle, even with a tower.",
          "Confirm pattern direction and altitude before joining.",
          "ATIS → approach/tower; read back runway and hold-short instructions.",
        ],
      },
      {
        id: "chart-symbols",
        order: 7,
        title: "Reading VFR chart symbols",
        summary:
          "Sectional charts pack airports, navaids, obstacles, and airspace into color and line language—learn the legend before the route.",
        difficulty: "medium",
        airport: {
          name: "Anchorage Sectional (FAA)",
          code: "SEC",
          note: "A real FAA sectional cutout—public-domain chart language for VFR planning.",
        },
        image: {
          src: "/airports/13-anchorage-sectional.jpg",
          alt: "Anchorage Sectional Aeronautical Chart cutout from the FAA",
          credit: "FAA / Wikimedia Commons — Anchorage Sectional cutout 2024",
          caption: "Real sectional ink: airports, terrain, and water in one frame.",
        },
        gallery: [
          {
            src: "/airports/23-vor-sectional.gif",
            alt: "VOR symbol on a sectional chart",
            credit: "Wikimedia Commons — VOR on sectional",
            caption: "Navaid compass roses help with radials—even when you navigate mostly by pilotage.",
          },
          {
            src: "/airports/25-wildlife-sectional.png",
            alt: "Wildlife refuge depiction on a sectional chart",
            credit: "Wikimedia Commons — Arrowwood NWR on sectional charts",
            caption: "Special-use and sensitive areas appear as lines and labels—read them before you cut across.",
          },
        ],
        mapLegend: [
          {
            symbol: "Airport symbols (open/filled, ticks)",
            meaning:
              "Airport type, runway hints, and often tower vs non-tower color coding on U.S. charts.",
          },
          {
            symbol: "VOR compass rose",
            meaning:
              "Radio navigation aid. Radials are magnetic. Useful for cross-checks even on VFR flights.",
          },
          {
            symbol: "Obstruction tower with elevation",
            meaning:
              "Man-made hazard. Numbers show height—stay clear laterally and vertically.",
          },
          {
            symbol: "Special-use / wildlife / restricted outlines",
            meaning:
              "Airspace or areas with limits. Some are advisory (noise/wildlife); some are regulatory (R-, P-, MOA). Know which before entry.",
          },
          {
            symbol: "Isogonic lines / variation notes",
            meaning:
              "Magnetic variation context for heading planning (details vary by chart).",
          },
        ],
        readingMinutes: 18,
        sections: [
          {
            heading: "What a sectional is for",
            body: [
              "A VFR sectional chart is a navigation map for visual flying—not decoration. Scale on U.S. sectionals is typically 1:500,000.",
              "You use it to plan routes that stay clear of restricted airspace, find airports and checkpoints, and estimate terrain elevation.",
              "The Anchorage cutout is your practice board: pick any two airports and narrate the terrain and water between them out loud.",
            ],
          },
          {
            heading: "Symbols to memorize first",
            body: [
              "Priority one: airport symbols, obstruction towers, VORs, and airways/airspace lines. These appear constantly.",
              "The VOR gallery image shows how a navaid is drawn—recognize it even if you primarily use pilotage and GPS.",
              "Priority two: special-use areas and wildlife/park notes. The Arrowwood example shows how refuges are embedded in chart clutter—easy to miss if you only stare at airports.",
            ],
          },
          {
            heading: "Color is information",
            body: [
              "Blue and magenta tinting around airports often marks controlled airspace boundaries on U.S. charts. Terrain hypsometric tinting shows elevation bands.",
              "Do not invent meanings—match the legend for your chart edition. Legends differ slightly over time and between producers.",
              "Exercise: on the Anchorage image, find (1) water, (2) an airport mark, (3) a higher-terrain tint. Say what each means in one sentence.",
            ],
          },
          {
            heading: "How to study a chart without drowning",
            body: [
              "Filter by altitude and route. Ignore distant clutter until you need it. Zoom with your eyes: first airports, then airspace rings that touch your path, then obstacles near the route.",
              "Update discipline: discarded charts are not “close enough.” Frequencies and airspace change.",
            ],
          },
        ],
        takeaways: [
          "Sectionals are VFR navigation maps—learn the legend first.",
          "Memorize airport, obstacle, and navaid symbols early.",
          "Special-use and sensitive areas hide in plain sight—look for outlines.",
          "Filter chart clutter by your route and altitude.",
        ],
      },
      {
        id: "coastal-complexity",
        order: 8,
        title: "Coastal airports & visual checkpoints",
        summary:
          "Shorelines, channels, and city edges become the checkpoints you tick off against a dense sectional.",
        difficulty: "medium",
        airport: {
          name: "Daniel K. Inouye International",
          code: "PHNL",
          note: "Honolulu’s runway against ocean and city teaches landmark navigation.",
        },
        image: {
          src: "/airports/05-honolulu.jpg",
          alt: "Honolulu Airport runway with surrounding terrain",
          credit: "Wikimedia Commons — Honolulu Airport Runway",
          caption: "Ocean + city + runway: checkpoint-rich, airspace-dense.",
        },
        gallery: [
          {
            src: "/airports/14-sf-sectional.jpg",
            alt: "San Francisco sectional chart with bay and airports",
            credit: "FAA / Wikimedia Commons — San Francisco Sectional (2008)",
            caption: "Bay shorelines on a sectional—perfect pilotage practice.",
          },
        ],
        mapLegend: [
          {
            symbol: "Detailed shoreline / bay drawing",
            meaning:
              "High-value visual checkpoint. Match bridges, points, and harbor shapes carefully.",
          },
          {
            symbol: "Urban tint / city patterns",
            meaning:
              "City-edge landmarks. Useful, but easy to misidentify—pair with a unique shoreline or hill.",
          },
          {
            symbol: "Class B/C shelves over coastal metros",
            meaning:
              "Stacked controlled airspace. Floor/ceiling numbers matter more than the pretty coastline.",
          },
          {
            symbol: "Obstructions along approaches",
            meaning:
              "Cranes, towers, and masts near ports—common on coastal charts.",
          },
        ],
        readingMinutes: 16,
        sections: [
          {
            heading: "Pilotage with real features",
            body: [
              "VFR navigation often uses pilotage: matching what you see (coastline bends, bridges, ridgelines) to charted features.",
              "Honolulu’s runway photo shows why coastal hubs are great teachers and poor places to “wing it”: the visual world is rich, and so is the airspace.",
              "On the San Francisco sectional gallery image, practice picking three checkpoints a student could not confuse—e.g., a bridge, a distinct bay shape, and an airport.",
            ],
          },
          {
            heading: "Altitude and water",
            body: [
              "Over water or flat coastal plains, altitude cues change. Charts still show obstruction heights and MEF values—use them.",
              "Never assume a long runway means simple airspace. Coastal hubs often sit under layered Class B/C shelves you must read carefully.",
              "If your route goes offshore, brief glide and alternate options before takeoff—not after the engine note changes.",
            ],
          },
          {
            heading: "Avoid checkpoint overload",
            body: [
              "Busy charts tempt you to list twenty tiny features. That creates confusion in the air. Prefer few, large, unique landmarks.",
              "Say the checkpoint name, the chart feature, and the clock position you expect. Example: “Bay bridge at 12 o’clock by 15 minutes.”",
            ],
          },
          {
            heading: "Coastal weather traps",
            body: [
              "Marine layers, haze, and glare can erase the shoreline picture you briefed. Have a divert field and a fuel plan.",
              "If the visual coastline disappears, your pilotage plan is degraded—climb/divert/IFR options beat hopeful wandering.",
            ],
          },
        ],
        takeaways: [
          "Coastlines and cities are prime visual checkpoints.",
          "Pick few, obvious landmarks—not dozens of vague ones.",
          "Big coastal airports usually mean complex airspace overlays.",
          "Brief offshore alternates before you need them.",
        ],
      },
      {
        id: "airspace-layers",
        order: 9,
        title: "Airspace layers around big fields",
        summary:
          "Large airports sit inside stacked controlled airspace—charts show the shelves; photos show why those shelves exist.",
        difficulty: "medium",
        airport: {
          name: "Brussels Airport",
          code: "EBBR",
          note: "A major runway environment—imagine protective shelves around jet approaches.",
        },
        image: {
          src: "/airports/06-brussels.jpg",
          alt: "Brussels Airport runway 25R",
          credit: "Wikimedia Commons — Brussels Airport Runway 25 R",
          caption: "Long jet runway—this is why airspace rings exist on charts.",
        },
        gallery: [
          {
            src: "/airports/22-washington-sec.jpg",
            alt: "Washington sectional chart with dense airspace",
            credit: "FAA / Wikimedia Commons — Washington Sectional",
            caption: "Dense eastern U.S. sectional: rings, frequencies, and packed airports.",
          },
          {
            src: "/airports/24-prohibited-p40.png",
            alt: "Prohibited Area P-40 Camp David on a chart",
            credit: "Wikimedia Commons — Prohibited Area P-40",
            caption: "P- areas are hard no-entry zones—charts draw them for a reason.",
          },
        ],
        mapLegend: [
          {
            symbol: "Solid blue lines (U.S. Class B)",
            meaning:
              "Busiest terminal airspace. Need clearance to enter. Numbers show floor/ceiling of each shelf.",
          },
          {
            symbol: "Solid magenta lines (U.S. Class C)",
            meaning:
              "Towered airport with radar approach control. Two-way radio and usually a Mode C transponder as required—know the rules before entry.",
          },
          {
            symbol: "Dashed / shaded Mode C veil (where depicted)",
            meaning:
              "Transponder equipment requirements around some Class B areas even outside the shelves.",
          },
          {
            symbol: "P- / R- / MOA outlines",
            meaning:
              "Prohibited, Restricted, or Military Operating Areas. Entry rules differ—P- is essentially never; R-/MOA need planning and sometimes ATC coordination.",
          },
        ],
        readingMinutes: 18,
        sections: [
          {
            heading: "Why airspace looks like an upside-down wedding cake",
            body: [
              "Around busy airports, controlled airspace often steps outward with altitude so arriving jets are protected while VFR aircraft can sometimes fly under outer shelves when legal.",
              "The Brussels photo is the “why”: fast traffic on a long runway needs protected corridors. Charts are the contract that keeps you clear.",
              "On U.S. sectionals, Class B is solid blue; Class C is solid magenta. Floor/ceiling numbers are printed on the rings—read every one that touches your route.",
            ],
          },
          {
            heading: "How to brief shelves",
            body: [
              "Trace every ring within 10–15 NM of your path. Write floor/ceiling pairs. Ask: Do I need clearance? Radio? Transponder?",
              "The Washington sectional gallery image is intentionally busy—practice filtering only the rings that matter to a sample route.",
              "If you cannot explain a line, you are not ready to fly near it.",
            ],
          },
          {
            heading: "Prohibited and restricted areas",
            body: [
              "P-40 (Camp David) in the gallery is a classic prohibited depiction—do not treat chart lines as suggestions.",
              "Restricted areas and MOAs may be active only at times. Check NOTAMs and the chart legend/tabulations. “It looked empty” is not a defense.",
              "Special-use airspace literacy is part of VFR basics, not an advanced elective.",
            ],
          },
          {
            heading: "VFR through the shelves",
            body: [
              "Legal paths often exist underneath outer shelves or via VFR corridors/transitions where published. Those paths are charted or described in the Chart Supplement—not improvised on frequency at the last minute.",
              "When in doubt, remain clear and ask ATC early. Hope is not a clearance.",
            ],
          },
        ],
        takeaways: [
          "Busy airports = stacked airspace, not just a runway icon.",
          "Read floor/ceiling numbers on every ring you might touch.",
          "Know radio/clearance/transponder requirements before entry.",
          "P-/R-/MOA lines are mandatory reading—not decoration.",
        ],
      },
      {
        id: "busy-terminals",
        order: 10,
        title: "Busy terminals & multiple runways",
        summary:
          "Parallel runways, ports, and city edges create dense visual scenes—and dense chart clutter you must filter.",
        difficulty: "hard",
        airport: {
          name: "Sydney Airport",
          code: "YSSY",
          note: "Runways beside Botany Bay and port infrastructure—hard mode for visual orientation.",
        },
        image: {
          src: "/airports/07-sydney.jpg",
          alt: "Sydney airport runway and Botany Port from the air",
          credit: "Wikimedia Commons — Sydney airport runway and Botany Port",
          caption: "Parallels, port, and city—diagram study is mandatory.",
        },
        gallery: [
          {
            src: "/airports/20-chicago-sec.png",
            alt: "Chicago sectional chart excerpt",
            credit: "FAA / Wikimedia Commons — Chicago Sectional",
            caption: "A packed sectional near a major metro—filter by route.",
          },
        ],
        mapLegend: [
          {
            symbol: "Multiple runway ticks / parallel runways",
            meaning:
              "Expect complex patterns, LAHSO possibilities, and easy runway confusion—verify the number.",
          },
          {
            symbol: "Port / industrial clutter on charts & photos",
            meaning:
              "Crane obstacles and look-alike channels. Confirm with obstruction symbols and ATIS notes.",
          },
          {
            symbol: "Dense frequency / airspace print",
            meaning:
              "Information density rises near metros. Slow down and extract only what your route needs.",
          },
          {
            symbol: "Airport diagram (supplement)",
            meaning:
              "Required study item for parallels and complex taxi networks—sectional alone is not enough.",
          },
        ],
        readingMinutes: 17,
        sections: [
          {
            heading: "Many runways, one plan",
            body: [
              "Hard VFR chart reading means knowing which runway is active, which way traffic flows, and which visual landmarks keep you outside arrival corridors.",
              "Sydney’s aerial shows parallels beside port geometry—easy to mis-orient if you did not study the diagram.",
              "Airport diagrams become mandatory—not optional—once parallel runways and complex taxi networks appear.",
            ],
          },
          {
            heading: "Clutter is information",
            body: [
              "A busy chart near a metro airport is not “too much ink”—it is telling you about obstacles, routes, airspace, and noise/park areas.",
              "The Chicago sectional gallery is a workout: cover half the chart with paper and only reveal your route corridor. Practice extracting airports, rings, and obstacles in that strip alone.",
              "Slow down: filter for your altitude, your route, and your destination first.",
            ],
          },
          {
            heading: "Runway confusion defenses",
            body: [
              "Confirm runway number on the AI / ATIS / tower clearance, then match the painted numbers and the heading on the DG/HSI.",
              "Parallel runways cause wrong-surface events worldwide. If anything feels off—go around.",
              "Brief expected exit taxiways before landing so you are not improvising at 60 knots on the ground.",
            ],
          },
          {
            heading: "Visual landmarks vs arrival streams",
            body: [
              "Ports and bays make great checkpoints, but they also sit under jet paths. Brief where the airliners will be and stay out unless cleared.",
              "Your job is not to thread needle-thin gaps visually—it is to fly a planned, legal path.",
            ],
          },
        ],
        takeaways: [
          "Complex airports demand diagram study before flight.",
          "Filter chart clutter by altitude and route.",
          "Parallel runways change patterns, taxi plans, and risk.",
          "Wrong-surface defense: clearance + paint + heading agree.",
        ],
      },
      {
        id: "precision-environments",
        order: 11,
        title: "Precision environments",
        summary:
          "Long precision runways and jet traffic raise the stakes—VFR pilots must treat charted airspace lines as fences with gates.",
        difficulty: "hard",
        airport: {
          name: "Tokyo Haneda",
          code: "RJTT",
          note: "Wide precision runway B—built for heavy jets and exact paths.",
        },
        image: {
          src: "/airports/08-tokyo-haneda.jpg",
          alt: "Tokyo International Airport (Haneda) Runway B",
          credit: "Wikimedia Commons — Tokyo International Airport Runway-B",
          caption: "Precision runway scale—stay out of protected paths unless cleared.",
        },
        gallery: [
          {
            src: "/airports/26-detroit-sec.jpg",
            alt: "Detroit sectional chart excerpt",
            credit: "FAA / Wikimedia Commons — Detroit Sectional",
            caption: "Another dense terminal chart—practice explaining every nearby line.",
          },
        ],
        mapLegend: [
          {
            symbol: "Tight Class B/C shelves + arrival routes",
            meaning:
              "Jet corridors. Crossing without clearance is how busts and TCAS events happen.",
          },
          {
            symbol: "Obstruction clusters near approach paths",
            meaning:
              "Respect published altitudes; do not “duck under” to stay visual.",
          },
          {
            symbol: "TRSA / radar service areas (where charted)",
            meaning:
              "Radar services may be available—use them, but know what is mandatory vs optional.",
          },
          {
            symbol: "Border / FIR / special notes",
            meaning:
              "Near international hubs, documentation and procedures change—read country-specific VFR rules.",
          },
        ],
        readingMinutes: 16,
        sections: [
          {
            heading: "When VFR meets airline corridors",
            body: [
              "Near major hubs, even VFR flight is choreographed by airspace and ATC. Charts show prohibited/restricted areas, arrival routes, and Class B/C equivalents.",
              "Haneda’s runway photo is the scale reminder: this pavement is sized for heavy jets on long finals. Your light aircraft does not get to share that corridor casually.",
              "Your job is not to squeeze through visually—it is to plan a legal path that never surprises a jet crew on a 10-mile final.",
            ],
          },
          {
            heading: "Use the chart as a fence",
            body: [
              "Treat solid airspace lines as fences with gates (clearance/radio). Visual beauty of a long runway does not grant entry.",
              "Hard-mode proficiency: explain every line within 10 NM of your route before engine start. Use the Detroit sectional gallery as a drill.",
              "If you cannot get a clearance or a safe under-shelf route, reroute. Diverting early is professionalism.",
            ],
          },
          {
            heading: "Equipment and communications",
            body: [
              "Busy terminal environments often require specific transponder/ADS-B capability and crisp radio work.",
              "Write frequencies in order. Expect rapid instructions. If you miss one, say “say again”—do not guess a heading toward a Class B shelf.",
            ],
          },
          {
            heading: "Go/no-go near hubs",
            body: [
              "Student-level VFR into the core of a major hub is often a bad plan even if legal on paper. Choose training routes that teach shelves without requiring perfect radio performance on day one.",
              "Graduation skill from this lesson: knowing when not to go.",
            ],
          },
        ],
        takeaways: [
          "Hub airports protect long, fast finals—stay out unless cleared.",
          "Explain every nearby chart line before you fly.",
          "VFR skill includes knowing when not to go.",
          "Never invent a clearance; ask or remain clear.",
        ],
      },
      {
        id: "weather-and-hard-ops",
        order: 12,
        title: "Weather, seasons & hard ops",
        summary:
          "Snow, low contrast, and complex markings push VFR limits—charts stay the same; your go/no-go decision must change.",
        difficulty: "hard",
        airport: {
          name: "Amsterdam Schiphol",
          code: "EHAM",
          note: "Snow-covered runway operations—visual cues shrink when contrast disappears.",
        },
        image: {
          src: "/airports/09-schiphol.jpg",
          alt: "Snow covered runway at Schiphol Airport",
          credit: "Wikimedia Commons — Snow covered Schiphol airport runway",
          caption: "When paint and edges vanish, VFR cues vanish with them.",
        },
        gallery: [
          {
            src: "/airports/19-twin-cities.jpg",
            alt: "Twin Cities sectional chart",
            credit: "FAA / Wikimedia Commons — Twin Cities Sectional",
            caption: "Winter country on the chart—terrain and airports remain; visibility may not.",
          },
        ],
        mapLegend: [
          {
            symbol: "Same airport symbol, different weather",
            meaning:
              "Charts do not fade with snow. Your ability to use them visually does—pair with METARs/TAFs.",
          },
          {
            symbol: "Lighting notes on airport data",
            meaning:
              "When contrast dies, lighting plans matter. Know what is pilot-controlled vs full-time.",
          },
          {
            symbol: "Alternate airports on your route brief",
            meaning:
              "Hard ops demand planned outs—fuel and weather minimums for the alternate, not just the destination.",
          },
          {
            symbol: "Terrain/MEF in low visibility",
            meaning:
              "If you cannot see, MEFs and published altitudes become critical. VFR may simply be unavailable.",
          },
        ],
        readingMinutes: 15,
        sections: [
          {
            heading: "VFR needs a visual world",
            body: [
              "Snow, haze, and dusk can erase the runway picture you practiced in earlier lessons. If you cannot maintain cloud clearance and visibility, divert or wait.",
              "Schiphol under snow shows a hard truth: complex airports plus lost contrast is not a place to “try VFR.”",
              "Charts do not change with the weather—your decision does. Pair METARs/TAFs with the same sectional you used for routing.",
            ],
          },
          {
            heading: "Hard airport + hard weather",
            body: [
              "A complex hub in poor visual conditions is how airspace busts and runway mix-ups happen.",
              "Use the Twin Cities sectional as a planning surface for winter routes: identify alternates, terrain, and airspace before the ceiling drops.",
              "Graduation mindset: you can read easy fields and hard charts—and you know when the picture outside no longer supports VFR.",
            ],
          },
          {
            heading: "Operational mitigations",
            body: [
              "More fuel, earlier divert decisions, daylight-only limits for new pilots, and higher personal minimums than the legal minimums.",
              "If runway markings are not identifiable, do not land from that approach—go around or divert to a clearer field.",
            ],
          },
          {
            heading: "Debrief questions after a marginal flight",
            body: [
              "Did the visual world match the brief? Did I use an alternate decision point? Would I take a passenger next time in the same weather?",
              "Honest debriefs build judgment faster than more hours in marginal conditions.",
            ],
          },
        ],
        takeaways: [
          "Low contrast weather can remove VFR cues entirely.",
          "Hard airports plus poor weather = wait or alternate plan.",
          "Chart literacy includes knowing your personal VFR limits.",
          "Legal minimums are not always personal minimums.",
        ],
      },
      {
        id: "put-it-together",
        order: 13,
        title: "Put it together on a real chart",
        summary:
          "Capstone: read a dense sectional, connect symbols to airport photos from the course, and brief like a VFR pilot.",
        difficulty: "hard",
        airport: {
          name: "San Francisco Sectional",
          code: "SEC",
          note: "A classic dense VFR chart—airports, bay, and layered airspace in one view.",
        },
        image: {
          src: "/airports/14-sf-sectional.jpg",
          alt: "San Francisco sectional aeronautical chart",
          credit: "FAA / Wikimedia Commons — San Francisco Sectional Aeronautical Chart (2008)",
          caption: "Capstone chart: extract a full VFR brief from this density.",
        },
        gallery: [
          {
            src: "/airports/18-ny-sectional.png",
            alt: "New York area sectional chart portion",
            credit: "Wikimedia Commons — New York Sectional portion",
            caption: "Second dense example—transfer the same briefing method.",
          },
          {
            src: "/airports/21-lan-sectional.jpg",
            alt: "Capital Region International Airport on a sectional",
            credit: "Wikimedia Commons — LAN sectional chart excerpt",
            caption: "Zoomed airport-centric cutout—practice symbol identification.",
          },
        ],
        mapLegend: [
          {
            symbol: "Full legend checklist",
            meaning:
              "Airports, airspace rings, obstacles, navaids, special-use areas, terrain/MEF—confirm each family on the sheet.",
          },
          {
            symbol: "Route line you draw",
            meaning:
              "Your plan. Checkpoints every ~10–15 minutes, plus fuel and alternates.",
          },
          {
            symbol: "Frequencies boxed on your kneeboard",
            meaning:
              "ATIS, approach, tower, CTAF, Flight Service—in the order you will need them.",
          },
          {
            symbol: "Personal minimums note",
            meaning:
              "Ceiling/visibility/wind limits you will honor even if the legal minima are lower.",
          },
        ],
        readingMinutes: 20,
        sections: [
          {
            heading: "A 10-minute chart brief",
            body: [
              "1) Find departure and destination airport symbols. 2) Trace a route with visual checkpoints. 3) Note airspace rings and floors. 4) Check MEF/terrain. 5) List frequencies and alternates.",
              "Compare the chart’s airport ticks to the photo lessons you finished—from Cambridge’s simple ramp to Sydney’s parallels. Same language, different density.",
              "Do this brief on the San Francisco sectional image first, then repeat on the New York portion without looking at your notes.",
            ],
          },
          {
            heading: "Symbol hunt (capstone drill)",
            body: [
              "On the SF chart, find and name: a towered airport cue, a non-towered cue, an obstruction, a shoreline checkpoint, and one airspace ring with floor/ceiling.",
              "On the LAN cutout, practice zoomed identification: what does each tick and frequency block tell you before you look anything up online?",
              "If a symbol is unfamiliar, go to the legend—do not invent a meaning.",
            ],
          },
          {
            heading: "Connect photos to ink",
            body: [
              "Mentally place Salzburg’s runway numbers, Daytona’s pattern, Palm Springs’ taxiways, and Schiphol’s lost contrast onto this chart world.",
              "That transfer is the point of the course: photos trained your eye; charts become readable because the real world already makes sense.",
            ],
          },
          {
            heading: "What “ready” looks like",
            body: [
              "You can explain runway numbers, pattern direction, airspace entry rules, and three checkpoints without zooming the legend every time.",
              "You know when weather or complexity says no. You know when you need an airport diagram in addition to the sectional.",
              "That is VFR Basics complete: charts are no longer mysterious wallpaper—they are a flying tool. Keep practicing with current chart editions for the area you actually fly.",
            ],
          },
        ],
        takeaways: [
          "Brief every VFR flight with the same five chart steps.",
          "Easy photos trained your eye; hard charts test it.",
          "Hunt symbols deliberately—legend beats guessing.",
          "Stay current: use up-to-date charts for real flights.",
        ],
      },
    ],
  },
];

export function getCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export function getLesson(
  courseId: string,
  lessonId: string,
): { course: Course; lesson: Lesson; index: number } | undefined {
  const course = getCourse(courseId);
  if (!course) return undefined;
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  if (index < 0) return undefined;
  return { course, lesson: course.lessons[index], index };
}
