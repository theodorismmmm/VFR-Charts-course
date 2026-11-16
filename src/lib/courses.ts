export type Difficulty = "easy" | "medium" | "hard";

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
  image: {
    src: string;
    alt: string;
    credit: string;
  };
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
      "Learn Visual Flight Rules from the ground up—airport shapes, runway logic, chart symbols, and airspace—using real airport photos that get more complex as you go.",
    coverImage: "/airports/13-anchorage-sectional.jpg",
    lessons: [
      {
        id: "what-is-vfr",
        order: 1,
        title: "What is VFR?",
        summary:
          "Visual Flight Rules mean you navigate and separate by looking outside—then confirm what you see with a chart.",
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
        },
        readingMinutes: 5,
        sections: [
          {
            heading: "Fly by looking outside",
            body: [
              "VFR (Visual Flight Rules) is the foundation for most private pilot flying. You keep the airplane clear of clouds, maintain visual contact with the ground, and separate from other traffic primarily by looking outside the cockpit.",
              "Charts still matter. They tell you what the landscape, airports, and airspace mean before you arrive—so the picture outside matches a plan you already understand.",
            ],
          },
          {
            heading: "Weather minima in plain words",
            body: [
              "Basic VFR usually requires enough ceiling and visibility to stay clear of clouds and see other aircraft. Exact numbers depend on airspace class—later lessons cover that.",
              "If you cannot stay visual, you are no longer in the VFR world this course teaches. That boundary is why charts and weather briefings go together.",
            ],
          },
        ],
        takeaways: [
          "VFR = navigate and separate primarily by sight.",
          "Charts translate the ground and airspace into a shared language.",
          "Weather must support staying visual for the whole flight.",
        ],
      },
      {
        id: "airport-anatomy",
        order: 2,
        title: "Airport anatomy",
        summary:
          "Name the pieces of a small airport so a chart symbol turns into a place you can taxi.",
        difficulty: "easy",
        airport: {
          name: "Cambridge Airport",
          code: "EGSC",
          note: "General aviation parking, tower, and open pavement—easy to read from the ground.",
        },
        image: {
          src: "/airports/10-cambridge-ga.jpg",
          alt: "Cambridge Airport general aviation parking and control tower",
          credit: "Wikimedia Commons / geograph.org.uk — Cambridge Airport GA area",
        },
        readingMinutes: 6,
        sections: [
          {
            heading: "The parts you will always meet",
            body: [
              "Most airports share the same building blocks: runway(s), taxiways, apron/ramp, hangars, and often a tower or advisory frequency.",
              "On a VFR chart, a small open circle or runway tick mark stands for an entire place like this. Learning the real layout first makes those tiny symbols feel less abstract.",
            ],
          },
          {
            heading: "Ramp vs runway",
            body: [
              "The ramp is where aircraft park and people walk. The runway is the protected strip used only for takeoff and landing.",
              "Never confuse the two on a chart or on the ground: runway symbols and numbers are the highest-priority pavement on the field.",
            ],
          },
        ],
        takeaways: [
          "Ramp, taxiway, runway, and tower/FBO are the core airport pieces.",
          "Chart airport symbols compress this whole scene into a mark.",
          "Protect the runway mentally—it is not a parking area.",
        ],
      },
      {
        id: "simple-runway-picture",
        order: 3,
        title: "A simple runway picture",
        summary:
          "Coastal single-runway airports teach orientation: water, land, and one clear strip.",
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
        },
        readingMinutes: 5,
        sections: [
          {
            heading: "Read the scene, then the chart",
            body: [
              "Before you decode magenta symbols, practice reading the airport as a photograph: Where is the runway? Which way does it point? What terrain or water surrounds it?",
              "Sectional charts show coastline, elevation tinting, and airport icons so you can build that same mental picture before takeoff.",
            ],
          },
          {
            heading: "One runway, one story",
            body: [
              "Single-runway fields are the easiest VFR learning labs. There is usually one primary takeoff direction into the wind and a reciprocal landing direction.",
              "On the chart, that appears as a short line or airport symbol with a frequency and elevation nearby—not a dense spiderweb of taxiways yet.",
            ],
          },
        ],
        takeaways: [
          "Start by spotting runway orientation against terrain.",
          "Simple fields map cleanly to basic chart airport marks.",
          "Wind decides which end of a single runway you use.",
        ],
      },
      {
        id: "runway-numbers",
        order: 4,
        title: "Runway numbers & markings",
        summary:
          "Runway numbers are magnetic headings rounded to the nearest 10°—painted large so you can read them on short final.",
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
        },
        readingMinutes: 7,
        sections: [
          {
            heading: "How numbering works",
            body: [
              "A runway numbered 33 means roughly a 330° magnetic heading when you take off or land in that direction. The opposite end is 15 (150°).",
              "Always drop the last digit of the magnetic heading and round: 334° → 33, 148° → 15.",
            ],
          },
          {
            heading: "What the paint tells you",
            body: [
              "Threshold markings, centerline, and aiming point help you land in the correct place. On charts you will not see every painted stripe—but airport diagrams and the Airport/Facility Directory fill that gap.",
              "When a chart shows parallel runways, left/right suffixes (27L / 27R) keep them distinct—the same idea as two painted numbers side by side.",
            ],
          },
        ],
        takeaways: [
          "Runway number ≈ magnetic heading ÷ 10.",
          "Opposite ends differ by 18 (e.g., 33 and 15).",
          "Charts summarize runways; markings teach precision on final.",
        ],
      },
      {
        id: "taxiways-and-layout",
        order: 5,
        title: "Taxiways & clear layouts",
        summary:
          "Desert airports make taxiway geometry obvious—practice tracing the path from ramp to runway.",
        difficulty: "easy",
        airport: {
          name: "Palm Springs International",
          code: "KPSP",
          note: "High-contrast pavement against desert makes the airport diagram easy to follow.",
        },
        image: {
          src: "/airports/03-palm-springs.jpg",
          alt: "Palm Springs International Airport aerial view",
          credit: "Wikimedia Commons — Palm Springs International Airport (Don Ramey Logan)",
        },
        readingMinutes: 6,
        sections: [
          {
            heading: "Follow the yellow lines",
            body: [
              "Taxiways connect ramps to runways. On the ground they use yellow markings; on airport diagrams they are usually labeled with letters (Taxiway A, B, C).",
              "VFR sectional charts rarely show every taxiway. For complex fields you step up to an airport diagram—still part of VFR planning.",
            ],
          },
          {
            heading: "Hot spots",
            body: [
              "Where taxiways cross runways or create confusing geometry, charts and diagrams may flag hot spots. Treat those like caution signs in a city.",
              "Clear layouts like Palm Springs train your eye so denser airports later feel manageable.",
            ],
          },
        ],
        takeaways: [
          "Taxiways are the connectors; runways are the protected strips.",
          "Letter labels on diagrams match what ATC says.",
          "Hot spots = extra caution intersections.",
        ],
      },
      {
        id: "controlled-fields",
        order: 6,
        title: "Controlled fields & the pattern",
        summary:
          "Towered airports add radio structure. The traffic pattern still follows a visual rectangle around the runway.",
        difficulty: "medium",
        airport: {
          name: "Daytona Beach International",
          code: "KDAB",
          note: "A busy training airport—runway 7R shows how controlled fields still rely on visual pattern flying.",
        },
        image: {
          src: "/airports/04-daytona.jpg",
          alt: "Aerial view of runway 7R at Daytona Beach International Airport",
          credit: "Wikimedia Commons — Daytona Beach International Airport runway 7R",
        },
        readingMinutes: 8,
        sections: [
          {
            heading: "Tower does not replace looking",
            body: [
              "At a controlled airport you talk to the tower, but you still fly a visual pattern: upwind, crosswind, downwind, base, and final.",
              "Chart symbology for towered airports often uses a blue airport symbol (in U.S. sectionals) versus magenta for non-towered—an early airspace reading skill.",
            ],
          },
          {
            heading: "Pattern altitude & direction",
            body: [
              "Pattern altitude is typically 1,000 ft AGL unless published otherwise. Left traffic is standard; right traffic is charted or listed when required.",
              "Knowing the runway in use (here, 7R) tells you which rectangular path around the field keeps you sequenced with other aircraft.",
            ],
          },
        ],
        takeaways: [
          "Blue vs magenta airport symbols hint at tower status on U.S. charts.",
          "The traffic pattern is a visual rectangle, even with a tower.",
          "Always confirm pattern direction and altitude before joining.",
        ],
      },
      {
        id: "chart-symbols",
        order: 7,
        title: "Reading VFR chart symbols",
        summary:
          "Sectional charts pack airports, airspace, and terrain into color and line language—start with airports and coastline.",
        difficulty: "medium",
        airport: {
          name: "Anchorage Sectional (FAA)",
          code: "SEC",
          note: "A real FAA sectional cutout—public domain chart language you will use for VFR planning.",
        },
        image: {
          src: "/airports/13-anchorage-sectional.jpg",
          alt: "Anchorage Sectional Aeronautical Chart cutout from the FAA",
          credit: "FAA / Wikimedia Commons — Anchorage Sectional Aeronautical Chart cutout 2024",
        },
        readingMinutes: 9,
        sections: [
          {
            heading: "What a sectional is for",
            body: [
              "A VFR sectional chart is a top-down map designed for visual navigation. Scale is typically 1:500,000—about 1 inch ≈ 7 NM.",
              "You use it to plan routes that stay clear of restricted airspace, find airports and checkpoints, and estimate terrain elevation.",
            ],
          },
          {
            heading: "Symbols to memorize first",
            body: [
              "Airport symbols (open circle, runway ticks, filled/open), obstruction towers, VORs, and airways appear again and again.",
              "Blue and magenta tinting around airports often marks controlled airspace boundaries. Match the legend until the colors feel automatic.",
            ],
          },
        ],
        takeaways: [
          "Sectionals are VFR navigation maps, not decoration.",
          "Learn airport, obstacle, and navaid symbols first.",
          "Always cross-check the chart legend for your chart edition.",
        ],
      },
      {
        id: "coastal-complexity",
        order: 8,
        title: "Coastal airports & visual checkpoints",
        summary:
          "Shorelines, channels, and city edges become the checkpoints you tick off against the chart.",
        difficulty: "medium",
        airport: {
          name: "Daniel K. Inouye International",
          code: "PHNL",
          note: "Honolulu’s runway against ocean and city teaches visual landmark navigation.",
        },
        image: {
          src: "/airports/05-honolulu.jpg",
          alt: "Honolulu Airport runway with surrounding terrain",
          credit: "Wikimedia Commons — Honolulu Airport Runway",
        },
        readingMinutes: 7,
        sections: [
          {
            heading: "Pilotage with real features",
            body: [
              "VFR navigation often uses pilotage: matching what you see (coastline bends, bridges, ridgelines) to charted features.",
              "Busy coastal airports sit inside dense chart detail—practice picking 3–4 unmistakable checkpoints along a route.",
            ],
          },
          {
            heading: "Altitude and water",
            body: [
              "Over water or flat coastal plains, altitude cues change. Charts still show obstruction heights and MSA-style awareness via terrain/MEF values.",
              "Never assume a long runway means simple airspace—coastal hubs often sit under layered Class B/C shelves you must read carefully.",
            ],
          },
        ],
        takeaways: [
          "Coastlines and cities are prime visual checkpoints.",
          "Pick few, obvious landmarks—not dozens of vague ones.",
          "Big coastal airports usually mean complex airspace overlays.",
        ],
      },
      {
        id: "airspace-layers",
        order: 9,
        title: "Airspace layers around big fields",
        summary:
          "Large international airports sit inside stacked controlled airspace—charts show the shelves; photos show why they exist.",
        difficulty: "medium",
        airport: {
          name: "Brussels Airport",
          code: "EBBR",
          note: "A major runway environment—imagine Class C/B-style shelves protecting jets on approach.",
        },
        image: {
          src: "/airports/06-brussels.jpg",
          alt: "Brussels Airport runway 25R",
          credit: "Wikimedia Commons — Brussels Airport Runway 25 R",
        },
        readingMinutes: 9,
        sections: [
          {
            heading: "Why airspace looks like an upside-down wedding cake",
            body: [
              "Around busy airports, controlled airspace often widens as altitude increases—or steps down toward the field—so arriving jets are protected while VFR aircraft can still fly underneath outer shelves when legal.",
              "On a U.S. sectional, Class B is solid blue lines; Class C is solid magenta. Numbers show floor/ceiling. Outside the U.S., ICAO charts use similar layer ideas with different symbology.",
            ],
          },
          {
            heading: "VFR through the shelves",
            body: [
              "Before flying near a major field, trace every ring on the chart and write the altitudes. Ask: Do I need clearance? A mode C veil? Two-way radio?",
              "The photo shows why those rings exist—fast traffic on long runways needs protected corridors. Charts are the contract that keeps you clear.",
            ],
          },
        ],
        takeaways: [
          "Busy airports = stacked airspace, not just a runway icon.",
          "Read floor/ceiling numbers on every ring.",
          "Know radio/clearance requirements before you enter.",
        ],
      },
      {
        id: "busy-terminals",
        order: 10,
        title: "Busy terminals & multiple runways",
        summary:
          "Parallel runways, ports, and city edges create dense visual scenes—and dense chart clutter.",
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
        },
        readingMinutes: 8,
        sections: [
          {
            heading: "Many runways, one plan",
            body: [
              "Hard VFR chart reading means knowing which runway is active, which way traffic flows, and which visual landmarks keep you outside arrival corridors.",
              "Airport diagrams become mandatory study items—not optional—once parallel runways and complex taxi networks appear.",
            ],
          },
          {
            heading: "Clutter is information",
            body: [
              "A busy chart near a metro airport is not “too much ink”—it is telling you about obstacles, routes, airspace, and noise/park areas.",
              "Slow down: filter for your altitude, your route, and your destination first. Ignore the rest until needed.",
            ],
          },
        ],
        takeaways: [
          "Complex airports demand diagram study before flight.",
          "Filter chart clutter by altitude and route.",
          "Parallel runways change both patterns and chart notes.",
        ],
      },
      {
        id: "precision-environments",
        order: 11,
        title: "Precision environments",
        summary:
          "Long precision runways and jet traffic raise the stakes—VFR pilots must stay strictly outside protected paths unless cleared.",
        difficulty: "hard",
        airport: {
          name: "Tokyo Haneda",
          code: "RJTT",
          note: "Wide precision runway B—an environment built for heavy jets and exact paths.",
        },
        image: {
          src: "/airports/08-tokyo-haneda.jpg",
          alt: "Tokyo International Airport (Haneda) Runway B",
          credit: "Wikimedia Commons — Tokyo International Airport Runway-B",
        },
        readingMinutes: 8,
        sections: [
          {
            heading: "When VFR meets airline corridors",
            body: [
              "Near major hubs, even VFR flight is choreographed by airspace and ATC. Charts show prohibited/restricted areas, arrival routes, and Class B/C equivalents.",
              "Your job is not to “squeeze through” visually—it is to plan a legal path that never surprises a jet crew on a 10-mile final.",
            ],
          },
          {
            heading: "Use the chart as a fence",
            body: [
              "Treat solid airspace lines as fences with gates (clearance/radio). Visual beauty of a long runway does not grant entry.",
              "Hard-mode proficiency: you can explain every line within 10 NM of your route before engine start.",
            ],
          },
        ],
        takeaways: [
          "Hub airports protect long, fast finals—stay out unless cleared.",
          "Explain every nearby chart line before you fly.",
          "VFR skill includes knowing when not to go.",
        ],
      },
      {
        id: "weather-and-hard-ops",
        order: 12,
        title: "Weather, seasons & hard ops",
        summary:
          "Snow, low contrast, and complex markings push VFR limits—charts and minima keep you honest.",
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
        },
        readingMinutes: 7,
        sections: [
          {
            heading: "VFR needs a visual world",
            body: [
              "Snow, haze, and dusk can erase the runway picture you practiced in earlier lessons. If you cannot maintain VFR cloud clearance and visibility, divert or wait.",
              "Charts do not change with the weather—your go/no-go decision does. Pair METARs/TAFs with the same sectional you used for routing.",
            ],
          },
          {
            heading: "Hard airport + hard weather",
            body: [
              "A complex hub in poor visual conditions is not a place to “try VFR.” That is how airspace busts and runway mix-ups happen.",
              "Graduation mindset from this course: you can read easy fields and hard charts—and you know when the picture outside no longer supports VFR.",
            ],
          },
        ],
        takeaways: [
          "Low contrast weather can remove VFR cues entirely.",
          "Hard airports plus poor weather = wait or IFR/alternate plan.",
          "Chart literacy includes knowing your personal VFR limits.",
        ],
      },
      {
        id: "put-it-together",
        order: 13,
        title: "Put it together on a real chart",
        summary:
          "Capstone: read a dense sectional, connect symbols to real airport photos, and plan like a VFR pilot.",
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
        },
        readingMinutes: 10,
        sections: [
          {
            heading: "A 10-minute chart brief",
            body: [
              "1) Find departure and destination airport symbols. 2) Trace a route with visual checkpoints. 3) Note airspace rings and floors. 4) Check MEF/terrain. 5) List frequencies and alternates.",
              "Compare the chart’s airport ticks to the photo lessons you finished—from Cambridge’s simple ramp to Sydney’s parallels. Same language, different density.",
            ],
          },
          {
            heading: "What “ready” looks like",
            body: [
              "You can explain runway numbers, pattern direction, airspace entry rules, and three checkpoints without zooming the legend every time.",
              "That is VFR Basics complete: charts are no longer mysterious wallpaper—they are a flying tool.",
            ],
          },
        ],
        takeaways: [
          "Brief every VFR flight with the same five chart steps.",
          "Easy photos trained your eye; hard charts test it.",
          "You are ready to keep practicing with current chart editions.",
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
