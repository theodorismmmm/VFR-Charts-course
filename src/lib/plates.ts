import type { HitShape, Point } from "./plate-hit";

export type Side = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

export type Mark = {
  id: string;
  label: string;
  detail: string;
  /** Spoken when the click landed on this mark but another was asked for. */
  miss: string;
  x: number;
  y: number;
  side: Side;
  shape: HitShape;
};

export type LocateQuestion = {
  id: string;
  prompt: string;
  markId: string;
  hint: string;
};

export type Plate = {
  lessonId: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  caption: string;
  /** "all" shows every label; "active" shows only the selected one. */
  labels: "all" | "active";
  start: "study" | "quiz";
  marks: Mark[];
  questions: LocateQuestion[];
};

const point = (r: number): HitShape => ({ type: "point", r });

function seg(x1: number, y1: number, x2: number, y2: number, r: number): {
  x: number;
  y: number;
  shape: HitShape;
} {
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
    shape: { type: "segment", a: { x: x1, y: y1 }, b: { x: x2, y: y2 }, r },
  };
}

function mark(
  id: string,
  label: string,
  detail: string,
  miss: string,
  x: number,
  y: number,
  side: Side,
  shape: HitShape,
): Mark {
  return { id, label, detail, miss, x, y, side, shape };
}

const CHART = {
  src: "/charts/north-harbor-sectional.svg",
  alt: "North Harbor training sectional with airports, a VOR, terrain, an obstruction, a restricted area, and Class B and Class C lines",
  width: 1200,
  height: 760,
  credit: "Aviation North training sectional — not a real chart and not for navigation",
};

const CHART_ASPECT = CHART.height / CHART.width;

/** A point on a ring. 0° is north; positive degrees run clockwise. */
function ringPoint(c: Point, rPct: number, degFromNorth: number): Point {
  const rad = (degFromNorth * Math.PI) / 180;
  return {
    x: c.x + Math.sin(rad) * rPct,
    y: c.y - (Math.cos(rad) * rPct) / CHART_ASPECT,
  };
}

const classCCenter: Point = { x: (760 / 1200) * 100, y: (280 / 760) * 100 };
const classCR = (118 / 1200) * 100;
/** Northwest of the ring, clear of the "40" altitude label at the top. */
const classCNorth = ringPoint(classCCenter, classCR, -55);

const classBCenter: Point = { x: (1460 / 1200) * 100, y: (430 / 760) * 100 };
const classBOuter = (400 / 1200) * 100;
const classBInner = (275 / 1200) * 100;
const classBPin: Point = { x: classBCenter.x - classBOuter, y: classBCenter.y };

const chartMarks: Mark[] = [
  mark(
    "point",
    "Harbor Point",
    "A shoreline with a name is a checkpoint. Match this bend to the coast you see outside before you turn inland.",
    "That's Harbor Point — the named bend in the coast.",
    (348 / 1200) * 100,
    (585 / 760) * 100,
    "w",
    point(4.6),
  ),
  mark(
    "untowered",
    "Non-towered airport",
    "Magenta circle and runway ticks: HARBOR has no control tower. The tick shows the runway’s rough alignment. 122.9 is the frequency, 23 is the field elevation.",
    "That's the non-towered airport — the magenta symbol.",
    (450 / 1200) * 100,
    (415 / 760) * 100,
    "n",
    point(3.4),
  ),
  mark(
    "vor",
    "VOR",
    "The compass rose is the NOR VOR on 115.4. Radials are magnetic. Even on a VFR flight it is a radio cross-check, not just decoration.",
    "That's the VOR — the compass rose.",
    (600 / 1200) * 100,
    (535 / 760) * 100,
    "e",
    point(4.2),
  ),
  mark(
    "towered",
    "Towered airport",
    "Blue symbol: NORTH has a control tower (CT 118.3). Two runway ticks mean more than one runway. 210 is the field elevation in feet.",
    "That's the towered airport — the blue symbol in the middle of the ring.",
    classCCenter.x,
    classCCenter.y,
    "s",
    point(3.3),
  ),
  mark(
    "class-c",
    "Class C ring",
    "Solid magenta circle around the towered airport. 40 means the top is 4,000 feet MSL. SFC means the floor is the surface. You need two-way radio before you enter.",
    "That's the Class C ring — the magenta circle, not the airport symbol inside it.",
    classCNorth.x,
    classCNorth.y,
    "w",
    { type: "ring", c: classCCenter, r: classCR, thickness: 3.2 },
  ),
  mark(
    "mef",
    "MEF 41",
    "41 in the high-terrain square means the highest obstacle there is treated as 4,100 feet, rounded up. The 02 over the water and the 16 over lower ground are smaller figures — location matters, not just “a big number.”",
    "That's an MEF, but not the one in the high terrain.",
    (990 / 1200) * 100,
    (146 / 760) * 100,
    "s",
    point(3.3),
  ),
  mark(
    "obstruction",
    "Obstruction",
    "2049 is the top of the tower in feet above sea level. (549) is how tall the tower itself is. Stay clear of it sideways and vertically — the airport looking quiet does not make this go away.",
    "That's the obstruction tower.",
    (1020 / 1200) * 100,
    (300 / 760) * 100,
    "w",
    point(3.8),
  ),
  mark(
    "terrain",
    "Higher terrain",
    "Darker tan and brown is higher ground. The ridges sit under the 41 MEF. Color is elevation, not just decoration.",
    "That's the higher terrain tint.",
    (1135 / 1200) * 100,
    (72 / 760) * 100,
    "sw",
    point(4.8),
  ),
  mark(
    "restricted",
    "Restricted area",
    "R-4802 is special-use airspace. Do not treat the box as optional. Check when it is active before you plan across it.",
    "That's the restricted area, R-4802.",
    ((850 + 100) / 1200) * 100,
    ((575 + 62.5) / 760) * 100,
    "n",
    { type: "rect", x: (850 / 1200) * 100, y: (575 / 760) * 100, w: (200 / 1200) * 100, h: (125 / 760) * 100 },
  ),
  mark(
    "class-b",
    "Class B shelves",
    "Solid blue arcs are Class B, drawn from an airport off this sheet. 100 and 80 are hundreds of feet. You need a clearance to enter — the line is a fence with a gate.",
    "That's a Class B shelf — the solid blue arc.",
    classBPin.x,
    classBPin.y,
    "w",
    {
      type: "union",
      shapes: [
        { type: "ring", c: classBCenter, r: classBOuter, thickness: 3.4 },
        { type: "ring", c: classBCenter, r: classBInner, thickness: 3.4 },
      ],
    },
  ),
];

function q(id: string, prompt: string, markId: string, hint: string): LocateQuestion {
  return { id, prompt, markId, hint };
}

export const plates: Plate[] = [
  {
    lessonId: "what-is-vfr",
    src: "/airports/00-hero-augsburg.jpg",
    alt: "Light aircraft on approach to Augsburg, with the runway, an antenna, and airport buildings marked for study",
    width: 1920,
    height: 1281,
    credit: "Wikimedia Commons — Light aircraft landing at Augsburg Airport (2019)",
    caption: "The VFR picture: traffic in sight, a runway in sight, and hazards you brief before you fly.",
    labels: "all",
    start: "study",
    marks: [
      mark(
        "traffic",
        "Traffic",
        "See and avoid starts here. Another aircraft in the picture is traffic, even when the airport looks quiet.",
        "That's the airplane — the traffic.",
        54,
        39,
        "s",
        point(4.5),
      ),
      {
        ...mark(
          "runway",
          "Runway",
          "The paved strip with the white marks is the runway. Everything else — grass, trees, the ramp — is not for landing.",
          "That's the runway.",
          0,
          0,
          "n",
          point(1),
        ),
        ...seg(17, 71, 46, 94, 4.6),
      },
      mark(
        "antenna",
        "Antenna",
        "A thin mast is easy to miss in the window and obvious on a chart. Obstruction symbols exist for things exactly like this.",
        "That's the antenna.",
        72,
        55,
        "w",
        point(3.8),
      ),
      mark(
        "buildings",
        "Airport buildings",
        "Hangars and the ops building sit beside the strip. On a sectional they disappear into the airport symbol.",
        "That's the airport buildings.",
        87,
        73,
        "w",
        point(5),
      ),
    ],
    questions: [
      q("t", "Click the other aircraft — the traffic you have to see and avoid.", "traffic", "Look above the tree line, near the middle of the picture."),
      q("r", "Click the runway.", "runway", "Lower left: the paved strip with the white threshold marks."),
      q("a", "Click the tall antenna.", "antenna", "A thin mast in the right half, in front of the trees."),
      q("b", "Click the airport buildings.", "buildings", "The low building at the right edge of the field."),
    ],
  },
  {
    lessonId: "airport-anatomy",
    src: "/airports/10-cambridge-ga.jpg",
    alt: "Cambridge Airport ramp, control tower, hangars, and grass infield",
    width: 640,
    height: 480,
    credit: "Wikimedia Commons / geograph.org.uk — Cambridge Airport GA area",
    caption: "Ramp, tower, hangars, and grass — the pieces a chart symbol compresses into one mark.",
    labels: "all",
    start: "study",
    marks: [
      {
        ...mark(
          "ramp",
          "Ramp",
          "Parked airplanes mean you are looking at the apron. People and aircraft share this pavement. It is not the takeoff roll.",
          "That's the ramp — where the airplanes are parked.",
          0,
          0,
          "s",
          point(1),
        ),
        ...seg(6, 50, 52, 50, 4),
      },
      mark(
        "tower",
        "Control tower",
        "The cab with the windows watches the field. On a U.S. sectional a towered airport is usually drawn in blue.",
        "That's the control tower.",
        61,
        44.5,
        "n",
        point(3.8),
      ),
      mark(
        "hangars",
        "Hangars",
        "The long roofs on the right are hangars. Charts rarely draw them. The airport diagram might, the sectional will not.",
        "That's the hangars.",
        82,
        47,
        "w",
        point(5),
      ),
      mark(
        "grass",
        "Grass",
        "Foreground grass is not a runway and not a taxiway. If it is not paved and not marked, do not put the airplane there.",
        "That's the grass infield.",
        45,
        78,
        "n",
        point(7),
      ),
    ],
    questions: [
      q("tower", "Click the control tower.", "tower", "The glass cab rising behind the parked airplanes."),
      q("ramp", "Click the ramp — where the airplanes are parked.", "ramp", "The row of light aircraft along the far pavement."),
      q("hangars", "Click the hangars.", "hangars", "The long low roofs on the right."),
      q("grass", "Click the grass — the part that is not for taxiing or landing.", "grass", "The open green in the foreground."),
    ],
  },
  {
    lessonId: "simple-runway-picture",
    src: "/airports/01-sumburgh.jpg",
    alt: "Sumburgh Airport runway between the ocean on the west and the shore on the east",
    width: 427,
    height: 640,
    credit: "Wikimedia Commons — Sumburgh Airport aerial",
    caption: "One runway, water on both sides. The coast is the checkpoint; the pavement is the runway.",
    labels: "all",
    start: "study",
    marks: [
      {
        ...mark(
          "runway",
          "Runway",
          "The single paved strip is the whole runway story. Its angle on the ground is the angle the chart tick will suggest.",
          "That's the runway.",
          0,
          0,
          "e",
          point(1),
        ),
        ...seg(38, 26, 28, 78, 4.2),
      },
      mark(
        "west",
        "West water",
        "Open water west of the field is a checkpoint you cannot confuse with the runway. Brief which side the sea is on before you launch.",
        "That's the water west of the runway.",
        14,
        16,
        "e",
        point(8),
      ),
      mark(
        "east",
        "East shore",
        "The other coastline. If the sea is on the wrong side, you have turned the picture around.",
        "That's the eastern shore.",
        86,
        32,
        "w",
        point(6),
      ),
      mark(
        "apron",
        "Apron",
        "The paved pads and buildings beside the strip are the apron and terminal, not a second runway.",
        "That's the apron.",
        63,
        30,
        "s",
        point(5),
      ),
    ],
    questions: [
      q("r", "Click the runway.", "runway", "The long paved strip running up the peninsula."),
      q("w", "Click the open water west of the runway.", "west", "The sea on the left side of the picture."),
      q("a", "Click the apron — pavement that is not the runway.", "apron", "The pads and buildings just east of the strip."),
      q("e", "Click the eastern shoreline.", "east", "The coast along the right edge."),
    ],
  },
  {
    lessonId: "runway-numbers",
    src: "/airports/02-salzburg-rwy.jpg",
    alt: "Salzburg runway 33 with the painted number, aiming point, taxiway, and tower",
    width: 1920,
    height: 1225,
    credit: "Wikimedia Commons — Salzburg Airport Runway LOWS RWY33",
    caption: "Runway 33: the number, the aiming point, the taxiway, and the tower are four different places.",
    labels: "all",
    start: "study",
    marks: [
      mark(
        "number",
        "Runway 33",
        "The painted 33 means about 330° magnetic. The other end is 15. You should already know which digits you expect before short final.",
        "That's the painted runway number.",
        62.5,
        65.5,
        "e",
        point(5),
      ),
      mark(
        "aiming",
        "Aiming point",
        "The white blocks farther up the runway are the aiming point — where you are trying to put the wheels, not the number you just crossed.",
        "That's the aiming point.",
        57,
        43,
        "w",
        point(4.5),
      ),
      {
        ...mark(
          "taxiway",
          "Taxiway",
          "The curved pavement left of the runway is a taxiway. Yellow guidance lives here. You do not take off from it.",
          "That's the taxiway.",
          0,
          0,
          "w",
          point(1),
        ),
        ...seg(45.2, 57.5, 44.6, 64.2, 3.2),
      },
      mark(
        "tower",
        "Tower",
        "The control tower stands off the left side of the field, not on the centerline. Find it on the ground so you know who you are talking to.",
        "That's the control tower.",
        24,
        41,
        "e",
        point(3.8),
      ),
    ],
    questions: [
      q("n", "Click the painted runway number.", "number", "The big white digits on the near end of the pavement."),
      q("a", "Click the aiming point.", "aiming", "The pair of white rectangular blocks farther up the runway."),
      q("t", "Click the taxiway, not the runway.", "taxiway", "The curved pavement to the left of the strip."),
      q("tw", "Click the control tower.", "tower", "The narrow tower on the left side of the airport."),
    ],
  },
  {
    lessonId: "taxiways-and-layout",
    src: "/airports/03-palm-springs.jpg",
    alt: "Palm Springs runway centerline, taxiway, tower, and mountains",
    width: 1920,
    height: 1280,
    credit: "Wikimedia Commons — Palm Springs International Airport (Don Ramey Logan)",
    caption: "White paint is the runway. Yellow pavement off to the side is the taxiway. The mountains are the terrain.",
    labels: "all",
    start: "study",
    marks: [
      {
        ...mark(
          "centerline",
          "Runway centerline",
          "White arrows and the dashed centerline are runway language. If you are reading white, you are on the protected strip.",
          "That's the runway centerline.",
          0,
          0,
          "w",
          point(1),
        ),
        ...seg(51, 38, 51, 74, 4),
      },
      {
        ...mark(
          "taxiway",
          "Taxiway",
          "The curving pavement to the right, with the yellow edge, is a taxiway. It connects the field. It is not a runway.",
          "That's the taxiway.",
          0,
          0,
          "w",
          point(1),
        ),
        ...seg(70, 48, 86, 68, 4.2),
      },
      mark(
        "tower",
        "Tower",
        "The tower is the slim cab on the right, beyond the taxiway. Find it before you need it on the radio.",
        "That's the tower.",
        78,
        33,
        "s",
        point(3.8),
      ),
      mark(
        "mountains",
        "Mountains",
        "The ridge behind the field is terrain. A chart’s tint and the MEF are how you brief this before it fills the windshield.",
        "That's the mountains.",
        68,
        14,
        "s",
        point(7),
      ),
    ],
    questions: [
      q("c", "Click the white runway centerline.", "centerline", "The dashed white line and arrows down the middle of the main strip."),
      q("t", "Click a taxiway — yellow-edged pavement, not the runway.", "taxiway", "The curving pavement on the right side of the field."),
      q("tw", "Click the control tower.", "tower", "The narrow tower on the right, in front of the mountains."),
      q("m", "Click the mountains.", "mountains", "The ridges filling the top of the picture."),
    ],
  },
  {
    lessonId: "controlled-fields",
    src: "/airports/16-traffic-pattern.jpg",
    alt: "Standard left traffic pattern diagram with entry, downwind, base, runway, final, and the wind cone",
    width: 1920,
    height: 1110,
    credit: "FAA AIM / Wikimedia Commons — Airport Traffic Pattern diagram",
    caption: "Standard left pattern. The tower sequences you; your eyes still have to find each leg.",
    labels: "active",
    start: "study",
    marks: [
      mark(
        "entry",
        "Entry",
        "You join the pattern on the entry, usually at a 45° angle to the downwind, at pattern altitude. You do not dive at the numbers from wherever you are.",
        "That's the pattern entry.",
        57,
        26,
        "s",
        point(3.2),
      ),
      {
        ...mark(
          "downwind",
          "Downwind",
          "Downwind flies parallel to the runway, opposite the landing direction. The runway stays off your left wing in a left pattern.",
          "That's the downwind leg.",
          0,
          0,
          "n",
          point(1),
        ),
        ...seg(26, 38, 52, 38, 3.2),
      },
      mark(
        "base",
        "Base leg",
        "Base is the turn from downwind toward the runway. You are perpendicular to the strip, descending, looking for final.",
        "That's the base leg.",
        15,
        49,
        "e",
        point(4.5),
      ),
      mark(
        "runway",
        "Runway",
        "The runway is the long side the whole rectangle is built on. Know which end is in use before you draw the box.",
        "That's the runway.",
        40,
        62,
        "n",
        point(4.5),
      ),
      mark(
        "final",
        "Final",
        "Final is aligned with the runway, just before landing. If you are not lined up with the pavement, you are not on final yet.",
        "That's final.",
        63,
        63,
        "n",
        point(3.5),
      ),
      mark(
        "cone",
        "Wind cone",
        "The wind cone shows the wind the runway numbers only imply. Check it. The landing direction should agree with what the cone is saying.",
        "That's the wind cone.",
        70,
        85.5,
        "n",
        point(4.2),
      ),
    ],
    questions: [
      q("d", "Click the downwind leg.", "downwind", "The long leg parallel to the runway, across the top of the rectangle."),
      q("b", "Click the base leg.", "base", "The left side, where the pattern turns from downwind toward the runway."),
      q("f", "Click final.", "final", "The short leg lined up with the runway, just before landing."),
      q("r", "Click the runway itself.", "runway", "The labeled strip in the middle of the rectangle."),
      q("w", "Click the wind cone.", "cone", "In the small inset at the lower right — the cone inside the dashed circle, not the words beside it."),
    ],
  },
  {
    lessonId: "chart-symbols",
    ...CHART,
    caption: "Training sectional. Magenta airport, blue airport, VOR, obstruction, terrain, MEF, restricted area, Class C, and Class B. Not for navigation.",
    labels: "active",
    start: "study",
    marks: chartMarks,
    questions: [
      q("u", "Click the airport with no control tower.", "untowered", "Magenta symbol, on the coast side of the sheet. The name is HARBOR."),
      q("v", "Click the VOR.", "vor", "A compass rose with the name NOR, south of the city."),
      q("o", "Click the obstruction tower.", "obstruction", "A tower symbol with a height above it, east of the Class C ring."),
      q("r", "Click the restricted area.", "restricted", "The hatched box labeled R-4802, lower right."),
      q("p", "Click Harbor Point, the shoreline checkpoint.", "point", "The named bend where the coast juts into the bay."),
    ],
  },
  {
    lessonId: "coastal-complexity",
    src: "/airports/05-honolulu.jpg",
    alt: "Honolulu runway with ocean, city shoreline, another aircraft, and mangroves",
    width: 1920,
    height: 1280,
    credit: "Wikimedia Commons — Honolulu Airport Runway",
    caption: "Ocean, city edge, runway, and other traffic. Pick a few big checkpoints — not every inlet.",
    labels: "all",
    start: "study",
    marks: [
      {
        ...mark(
          "runway",
          "Runway",
          "The paved strip in the middle is the runway. The reef and the city are checkpoints around it, not extra pavement.",
          "That's the runway.",
          0,
          0,
          "w",
          point(1),
        ),
        ...seg(41, 46.5, 44, 61.5, 5.5),
      },
      mark(
        "ocean",
        "Ocean",
        "The open water beyond the runway is a checkpoint and a poor place to be unsure of your altitude. Brief it before you need a glide option.",
        "That's the ocean.",
        52,
        28,
        "s",
        point(5.5),
      ),
      mark(
        "city",
        "City edge",
        "The industrial shore and stacks are the city edge. Useful, and easy to mix up with another bay. Pair it with the runway and the water, not by itself.",
        "That's the city shoreline.",
        28,
        26,
        "s",
        point(6),
      ),
      mark(
        "jet",
        "Other traffic",
        "The fighter sitting right of the runway is traffic on the ground. Busy coastal fields hide airplanes in plain sight.",
        "That's the other aircraft.",
        76,
        48,
        "w",
        point(4.5),
      ),
      mark(
        "mangroves",
        "Mangroves",
        "The green band in the foreground is a hard-to-miss checkpoint between you and the pavement. Use a feature this big, not a single building.",
        "That's the mangrove shoreline.",
        55,
        80,
        "n",
        point(6),
      ),
    ],
    questions: [
      q("r", "Click the runway.", "runway", "The paved strip in the center, with the white threshold at the near end."),
      q("o", "Click the open ocean you would use as a checkpoint.", "ocean", "The blue water between the runway and the distant shore."),
      q("c", "Click the city edge.", "city", "Stacks and buildings on the far shore, left of center."),
      q("j", "Click the other aircraft.", "jet", "The light-colored jet parked on the right side of the field."),
    ],
  },
  {
    lessonId: "airspace-layers",
    src: "/airports/24-prohibited-p40.png",
    alt: "Sectional excerpt showing prohibited area P-40, restricted area R-4009, MEF 24, and a private airport",
    width: 1002,
    height: 719,
    credit: "Wikimedia Commons — Prohibited Area P-40",
    caption: "A real chart: P-40 is prohibited. The hatched blue circle is the line, not a suggestion.",
    labels: "all",
    start: "study",
    marks: [
      mark(
        "prohibited",
        "P-40",
        "P-40 is a prohibited area. The blue hatching is the boundary. R-4009 overlies it. You do not cut across because the ridge looks empty.",
        "That's P-40, the prohibited area.",
        46.5,
        49,
        "e",
        point(17.5),
      ),
      mark(
        "mef",
        "MEF 24",
        "The large blue 24 is the maximum elevation figure for that grid square: 2,400 feet, rounded up. It is not an altitude assignment. It is the highest thing the chart wants you to respect there.",
        "That's the MEF.",
        67,
        83,
        "n",
        point(4),
      ),
      mark(
        "private",
        "Private airport",
        "HARP is a private field outside the prohibited circle. The R in a circle means private use. It is not permission to enter P-40.",
        "That's the private airport, outside the prohibited area.",
        27,
        76,
        "e",
        point(4),
      ),
      mark(
        "caution",
        "Caution box",
        "The boxed note tells you to check flight service for restrictions tied to P-40 and R-4009. Read the box. The circle alone is not the whole brief.",
        "That's the caution box.",
        84,
        39,
        "w",
        point(5.5),
      ),
    ],
    questions: [
      q("p", "Click prohibited area P-40.", "prohibited", "The large hatched blue circle in the middle of the chart."),
      q("m", "Click the maximum elevation figure.", "mef", "The big blue number 24 near the bottom."),
      q("a", "Click a private airport that is outside the prohibited area.", "private", "HARP, southwest of the circle — the R in a small circle."),
      q("c", "Click the caution note about P-40.", "caution", "The boxed paragraph on the right side of the chart."),
    ],
  },
  {
    lessonId: "busy-terminals",
    src: "/airports/07-sydney.jpg",
    alt: "Sydney runway on a peninsula, with the port, the city, and a turnaround at the east end",
    width: 1920,
    height: 1163,
    credit: "Wikimedia Commons — Sydney airport runway and Botany Port",
    caption: "One runway on the peninsula, a turnaround at the end, a port full of cranes, and the city behind it.",
    labels: "all",
    start: "study",
    marks: [
      {
        ...mark(
          "runway",
          "Runway",
          "The long straight pavement is the runway. Confirm the number and the heading before you accept a landing clearance. Parallel pavement nearby is how wrong-surface events start.",
          "That's the runway.",
          0,
          0,
          "n",
          point(1),
        ),
        ...seg(6, 80, 50, 74, 4.5),
      },
      mark(
        "turnaround",
        "Turnaround",
        "The curved pavement at the east end is a turnaround, not a second landing surface. Follow it only if that is the taxi plan.",
        "That's the turnaround at the end of the runway.",
        68,
        69,
        "n",
        point(4.5),
      ),
      mark(
        "port",
        "Port",
        "Cranes and containers are a checkpoint and an obstacle farm. Charted obstructions and the ATIS beat guessing the height of a crane.",
        "That's the port.",
        42,
        44,
        "s",
        point(6),
      ),
      mark(
        "city",
        "City",
        "The urban shore is a landmark. It also sits under arrival paths. A pretty city is not a clearance.",
        "That's the city.",
        20,
        34,
        "s",
        point(6),
      ),
      mark(
        "water",
        "Water",
        "The bay between the port and the runway is the visual boundary. If you are over this water, you are not on the pavement yet.",
        "That's the water between the port and the runway.",
        25,
        58,
        "e",
        point(5),
      ),
    ],
    questions: [
      q("r", "Click the runway — the long straight pavement.", "runway", "The strip along the near edge of the peninsula."),
      q("t", "Click the curved turnaround at the east end.", "turnaround", "The loop of pavement at the right end of the runway, not the straight centerline."),
      q("p", "Click the port.", "port", "Cranes and containers on the point of land above the runway."),
      q("c", "Click the city.", "city", "The dense buildings on the left, beyond the port."),
    ],
  },
  {
    lessonId: "precision-environments",
    src: "/airports/08-tokyo-haneda.jpg",
    alt: "Tokyo Haneda runway 22, taxiways, jet ramp, and the city",
    width: 1920,
    height: 1280,
    credit: "Wikimedia Commons — Tokyo International Airport Runway-B",
    caption: "Runway 22’s near end, the taxiway maze, the jet ramp, and the city the airspace is protecting.",
    labels: "all",
    start: "study",
    marks: [
      mark(
        "number",
        "Runway 22",
        "The near threshold shows the runway end — the bars and the painted number. This pavement is built for heavy jets on long finals. You do not wander onto it.",
        "That's the near end of runway 22.",
        90,
        67,
        "w",
        point(4.5),
      ),
      mark(
        "taxiways",
        "Taxiways",
        "The web of dark pavement in the middle is taxiway, not a spare runway. At a field like this you studied the diagram before engine start.",
        "That's the taxiway complex.",
        48,
        38,
        "s",
        point(6),
      ),
      mark(
        "ramp",
        "Jet ramp",
        "Airliners parked on the left are the ramp. That is where jets live between flights — not a shortcut to the runway.",
        "That's the jet ramp.",
        12,
        56,
        "e",
        point(6),
      ),
      mark(
        "city",
        "City",
        "The skyline is why the shelves exist. Fast arrivals are aimed at this pavement. Your VFR path stays outside unless you are cleared.",
        "That's the city.",
        40,
        12,
        "s",
        point(7),
      ),
    ],
    questions: [
      q("n", "Click the near end of the runway — the threshold and the painted number.", "number", "Lower right: white threshold bars on the pavement marked 22."),
      q("t", "Click the taxiway maze, not the runway.", "taxiways", "The tangled dark pavement in the middle of the field."),
      q("r", "Click the ramp where the airliners are parked.", "ramp", "The row of jets along the left edge."),
      q("c", "Click the city the airspace is there to protect.", "city", "The skyline across the top of the picture."),
    ],
  },
  {
    lessonId: "weather-and-hard-ops",
    src: "/airports/09-schiphol.jpg",
    alt: "Snow-covered Schiphol with the dark runway, a white field, a highway, and a low ceiling",
    width: 1920,
    height: 1440,
    credit: "Wikimedia Commons — Snow covered Schiphol airport runway",
    caption: "The dark strip is the runway. The bright field has no contrast. The road at the bottom is a highway.",
    labels: "all",
    start: "study",
    marks: [
      {
        ...mark(
          "runway",
          "Runway",
          "The dark strip is the runway, still visible because the pavement is cleared. If you cannot pick it out, you are not ready to land.",
          "That's the runway.",
          0,
          0,
          "s",
          point(1),
        ),
        ...seg(48, 46, 94, 50, 5),
      },
      mark(
        "whiteout",
        "No contrast",
        "The snow-covered field has no edges, no numbers, and no centerline you can use. This is what “the marks disappeared” looks like.",
        "That's the snow field where the markings have vanished.",
        22,
        58,
        "e",
        point(8),
      ),
      {
        ...mark(
          "highway",
          "Highway",
          "The road with the trucks is not a runway and not a taxiway. Low contrast is exactly when a straight road starts to look usable. It is not.",
          "That's the highway — not a runway.",
          0,
          0,
          "n",
          point(1),
        ),
        ...seg(58, 82, 98, 98, 4.5),
      },
      mark(
        "ceiling",
        "Low ceiling",
        "The gray above the field is the ceiling. Charts do not change in snow. If this picture is the visual world, VFR may simply be unavailable.",
        "That's the low ceiling.",
        50,
        15,
        "s",
        point(7),
      ),
    ],
    questions: [
      q("r", "Click the runway — not the road.", "runway", "The dark cleared strip across the middle, not the traffic at the bottom."),
      q("h", "Click the highway you must not mistake for a runway.", "highway", "The road with trucks along the bottom of the picture."),
      q("w", "Click where the snow has erased the surface contrast.", "whiteout", "The broad white field on the left, with no paint left to read."),
      q("c", "Click the low ceiling.", "ceiling", "The gray sky filling the top of the picture."),
    ],
  },
  {
    lessonId: "put-it-together",
    ...CHART,
    caption: "Same training sheet as the symbol lesson. This time find the airspace, the MEF, and the terrain without the tour.",
    labels: "active",
    start: "quiz",
    marks: chartMarks,
    questions: [
      q("t", "Click the airport that has a control tower.", "towered", "Blue symbol, inside the magenta ring. The name is NORTH."),
      q("c", "Click the Class C line — the ring, not the airport symbol in the middle.", "class-c", "The solid magenta circle around NORTH. The number 40 sits on it."),
      q("b", "Click a Class B shelf.", "class-b", "The solid blue arcs on the right edge. The numbers 80 and 100 sit on them."),
      q("m", "Click the MEF in the higher terrain, not the ones over lower ground or water.", "mef", "The blue 41 on the tan high ground, upper right. Not the 02 over the bay or the 16 over the city side."),
      q("h", "Click the higher terrain tint.", "terrain", "The brown ridges in the top-right corner."),
      q("r", "Click the restricted area.", "restricted", "The hatched box labeled R-4802."),
    ],
  },
];

const byLesson = new Map(plates.map((plate) => [plate.lessonId, plate]));

export function getPlate(lessonId: string): Plate {
  const plate = byLesson.get(lessonId);
  if (!plate) {
    throw new Error(`No marked plate for lesson ${lessonId}`);
  }
  return plate;
}
