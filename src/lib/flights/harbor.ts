import { step, type Flight } from "../flight-types";

const ctaf = "122.9  North Harbor CTAF";

const whichField = step(
  ctaf,
  [["Instructor", "Two airports are on this sheet. You are landing at North Harbor. Nobody is going to clear you in."]],
  "Which symbol is your airport?",
  [
    ["magenta", "The magenta HARBOR symbol. No tower. CTAF 122.9, elevation 23."],
    ["blue", "The blue NORTH symbol. It has a tower, so it must be the bigger runway I want."],
    ["either", "Whichever circle I see first out the window."],
  ],
  "magenta",
  "Blue is a towered airport. North Harbor is the magenta one. The color is the tower, not the size.",
);

const privateField = step(
  ctaf,
  [["Instructor", "PVT is two miles off your left, and it has pavement. Harbor is still ahead."]],
  "PVT is on the chart. What is it?",
  [
    ["ignore", "A private field. It is a landmark. I continue to the public magenta airport."],
    ["land", "Closer pavement. I land there and sort out the permission after."],
    ["tower", "The R means a tower is up. I call them for a landing clearance."],
  ],
  "ignore",
  "The R is private use. It is not a tower and it is not your destination.",
);

const callUp = step(
  ctaf,
  [["Instructor", "You are five miles out. The frequency under the name is 122.9."]],
  "Make the call.",
  [
    ["ctaf", "“North Harbor traffic, Cessna 123AB, five miles south, inbound for landing, North Harbor.”"],
    ["tower", "“North Harbor Tower, Cessna 123AB, request landing clearance.”"],
    ["silent", "Stay quiet until short final so you do not block the frequency."],
  ],
  "ctaf",
  "There is no tower. CTAF is how the other airplanes know you are there. The airport name goes at both ends of the call.",
);

const wind = step(
  ctaf,
  [
    ["Instructor", "The wind cone is standing out toward the southeast. Runway 33 is the into-wind end."],
  ],
  "Which way do you point the airplane?",
  [
    ["33", "Into the wind on runway 33. Left traffic. The segmented circle is not showing RP."],
    ["15", "Runway 15, so I can land downhill toward the hangars."],
    ["cone", "Land whatever direction the cone is pointing. The cone is the runway."],
  ],
  "33",
  "The cone shows where the wind is going. You land into it. The circle tells you the pattern; it is not a second runway.",
);

const number = step(
  ctaf,
  [["Instructor", "You are on a one-mile final. The paint at the threshold reads 33."]],
  "The paint and the plan disagree in your head. What do you do?",
  [
    ["match", "The painted 33 matches the runway I announced. I continue."],
    ["15", "33 is the departure end. I should be looking for 15."],
    ["ignore", "The digits are a formality. The pavement is what matters."],
  ],
  "match",
  "The runway number is the magnetic heading with the last digit dropped. 33 is about 310°. If the paint is not the runway you briefed, you go around.",
);

const golf = step(
  ctaf,
  [["Instructor", "You are still outside the dashed magenta ring, 800 feet AGL, in the daytime."]],
  "What airspace is the airplane in?",
  [
    ["g", "Class G. No clearance. One mile and clear of clouds would be legal down low. I still do not wander into the ring."],
    ["e", "Dashed or not, everything on a sectional is Class E."],
    ["d", "I can see an airport, so this is Class D."],
  ],
  "g",
  "Class G is the airspace that is left when no other class is drawn to the surface. The dashed ring ahead is where that stops.",
);

const echo = step(
  ctaf,
  [["Instructor", "The dashed magenta line is a mile ahead. You are about to cross it at 1,200 feet MSL."]],
  "What changes at the line?",
  [
    ["e", "Class E to the surface. Weather becomes 3 miles and 500/1,000/2,000. No clearance required."],
    ["clearance", "I need a Bravo clearance before I cross any dashed line."],
    ["tower", "I switch to tower. Dashed magenta means the tower owns it."],
  ],
  "e",
  "Dashed magenta is Class E to the surface, not Class D and not Class B. The radio call stays on CTAF.",
);

const flag = step(
  ctaf,
  [["Instructor", "Harbor Point is the bend you briefed. You can see it off the left nose."]],
  "The magenta flag means what, right now?",
  [
    ["see", "It is a VFR checkpoint. I am where I planned to be. I do not transmit just because of the flag."],
    ["report", "Every flag is a mandatory report. I make a position call to Approach."],
    ["turn", "The flag is a holding fix. I circle it until I am called."],
  ],
  "see",
  "A VFR checkpoint is a landmark. A mandatory radio report is a different symbol, and this field does not have one.",
);

const mef = step(
  ctaf,
  [["Instructor", "The grid square you are crossing is labeled 16. A ridge sits under it."]],
  "What is 16?",
  [
    ["mef", "The maximum elevation figure. 1,600 feet MSL in this square, rounded up. It is not a clearance."],
    ["assigned", "Approach wants me at 1,600. I level there."],
    ["agl", "1,600 feet above the ground. I add the field elevation to it."],
  ],
  "mef",
  "An MEF is the highest terrain or obstacle in the square, in hundreds of feet MSL. Nobody assigned it.",
);

const towerHit = step(
  ctaf,
  [["Instructor", "The obstruction is charted 2049 (549), just right of your course."]],
  "How do you treat it?",
  [
    ["offset", "The top is 2,049 feet MSL. I offset and I stay above it. I do not assume the airport picture means the sky is empty."],
    ["agl", "549 is the top. 2,049 is the height of the tower itself."],
    ["ignore", "Obstructions inside five miles of an airport are lit and irrelevant in the daytime."],
  ],
  "offset",
  "The upper number is feet MSL. The number in parentheses is the height of the object. You miss it by a margin, not by a guess.",
);

const rightPattern = step(
  ctaf,
  [["Instructor", "NORTH, the blue field, is labeled RP 22. Your destination is HARBOR, and HARBOR has no RP note."]],
  "Which pattern do you fly at Harbor?",
  [
    ["left", "Left traffic for runway 33. RP at the other airport does not transfer."],
    ["right", "RP is on the sheet, so every runway on the sheet is right traffic."],
    ["straight", "I fly a straight-in. Pattern direction is only for students."],
  ],
  "left",
  "RP applies to the runway it is printed on. Silence on the chart means standard left traffic.",
);

const restrictedEarly = step(
  ctaf,
  [["CTAF", "North Harbor traffic, Cessna 123AB is on short final runway 33, going around, North Harbor."]],
  "The go-around points you at R-4802. What do you fly?",
  [
    ["avoid", "I climb on the briefed path and I stay out of the restricted area. A go-around is not a clearance through it."],
    ["cut", "I cut the corner. Restricted areas are cold unless a NOTAM says otherwise."],
    ["into", "I land in the box. It is paved on the near side."],
  ],
  "avoid",
  "You do not enter a restricted area unless you know it is cold or ATC has authorized it. This go-around was never that authorization.",
);

const restrictedLate = step(
  ctaf,
  [["Traffic", "North Harbor traffic, the jump plane is up. R-4802 is hot. Stay west."]],
  "Last call. Where do you put the airplane?",
  [
    ["west", "“North Harbor traffic, Cessna 123AB, going around, staying west of R-4802, North Harbor.”"],
    ["through", "The box is the shortest way back to downwind. I cross it at pattern altitude."],
    ["query", "I land anyway. The radio call was advisory and I am already low."],
  ],
  "west",
  "Hot means stay out. The last transmission is the one you fly, and it did not clear you through the area.",
);

const restrictedLast = step(
  ctaf,
  [["Traffic", "Cessna 123AB, that west path is toward the tower. Offset further left, now."]],
  "Hard correction. Your move.",
  [
    ["left", "I offset left of the tower and I still do not re-enter R-4802. I call the new position."],
    ["old", "I hold the first go-around heading. The first plan was already announced."],
    ["box", "Left of the tower is the box. I duck through R-4802 below the top of the tower."],
  ],
  "left",
  "Two hazards do not cancel. The last call moved you off the tower and still left the restricted area closed.",
);

export const harbor: Flight = {
  id: "north-harbor",
  order: 1,
  code: "NHB",
  airport: "North Harbor",
  title: "Non-towered pattern",
  airspace: "Class G and Class E to the surface",
  summary:
    "A public magenta airport, a private strip, and a restricted area off the departure end. You announce, you fly left traffic, and nobody issues you a clearance.",
  chartTitle: "NORTH HARBOR — TRAINING SECTIONAL — NOT FOR NAVIGATION",
  chartCredit: "Aviation North training sectional — not a real chart and not for navigation.",
  track: "M 160 140 L 280 220 L 360 470 L 430 470 L 500 360 L 560 300 L 800 280 L 760 500",
  marks: [
    { kind: "water", d: "M0 0 H230 C300 90 250 170 290 260 C330 360 300 430 360 520 C400 580 320 640 200 640 H0 Z" },
    { kind: "shade", d: "M820 40 C900 80 980 60 1000 40 L1000 180 C920 160 860 140 820 40 Z", fill: "#e7c56a" },
    { kind: "shade", d: "M780 90 C860 120 940 100 980 80 L1000 210 C920 190 840 160 780 90 Z", fill: "#d59a48" },
    { kind: "city", d: "M560 180 H720 V300 H560 Z" },
    { kind: "path", d: "M640 300 C700 280 760 250 820 220", stroke: "#8d8680", sw: 2.4 },
    { id: "class-e", kind: "ring", cx: 430, cy: 360, r: 108, stroke: "#d1006c", dash: "7 5", label: "CLASS E", lx: 430, ly: 242 },
    { id: "class-g", kind: "label", x: 120, y: 78, text: "CLASS G", fill: "#5c5346", size: 15 },
    { id: "magenta-airport", kind: "airport", x: 430, y: 360, tower: false, name: "HARBOR", detail: "122.9 · 23" },
    { id: "runway-numbers", kind: "runway", x: 430, y: 360, len: 70, rot: -20, name: "33" },
    { kind: "airport", x: 700, y: 220, tower: true, name: "NORTH", detail: "CT 118.3 · 210" },
    { id: "rp", kind: "label", x: 700, y: 268, text: "RP 22", fill: "#1d4e89", size: 13 },
    { id: "private-r", kind: "private", x: 250, y: 180, name: "PVT" },
    { id: "vfr-checkpoint", kind: "flag", x: 345, y: 500, name: "HARBOR PT" },
    { id: "segmented-circle", kind: "cone", x: 500, y: 410 },
    { id: "mef", kind: "mef", x: 560, y: 78, text: "16" },
    { kind: "mef", x: 860, y: 120, text: "02" },
    { id: "obstruction", kind: "obstruction", x: 860, y: 300, label: "2049 (549)" },
    { id: "restricted", kind: "box", x: 700, y: 450, w: 180, h: 120, label: "R-4802" },
    { kind: "note", x: 18, y: 16, lines: ["AVIATION NORTH", "NORTH HARBOR", "TRAINING SECTIONAL"] },
  ],
  beats: [
    {
      id: "field",
      phase: "Chart brief",
      zoneId: "magenta-airport",
      symbolId: "magenta-airport",
      x: 430,
      y: 230,
      heading: 180,
      situation: "Five minutes before start. The sheet has two airports.",
      easy: [whichField],
      medium: [whichField],
      hard: [whichField],
    },
    {
      id: "private",
      phase: "Inbound",
      zoneId: "private-r",
      symbolId: "private-r",
      x: 300,
      y: 200,
      heading: 140,
      situation: "PVT is closer than Harbor and it looks landable.",
      easy: [privateField],
      medium: [privateField],
      hard: [privateField],
    },
    {
      id: "ctaf",
      phase: "Five miles",
      zoneId: "magenta-airport",
      symbolId: "ctaf",
      x: 390,
      y: 300,
      heading: 160,
      situation: "You are on the CTAF frequency. Make the inbound call.",
      easy: [callUp],
      medium: [callUp],
      hard: [callUp],
    },
    {
      id: "wind",
      phase: "Pattern",
      zoneId: "segmented-circle",
      symbolId: "segmented-circle",
      x: 470,
      y: 400,
      heading: 330,
      situation: "The cone and the segmented circle are in sight on the field.",
      easy: [wind],
      medium: [wind],
      hard: [wind],
    },
    {
      id: "numbers",
      phase: "Final",
      zoneId: "runway-numbers",
      symbolId: "runway-numbers",
      x: 490,
      y: 470,
      heading: 330,
      situation: "One mile final. The threshold paint is readable.",
      easy: [number],
      medium: [number],
      hard: [number],
    },
    {
      id: "golf",
      phase: "Airspace",
      zoneId: "class-g",
      symbolId: "class-g",
      x: 150,
      y: 120,
      heading: 90,
      situation: "You are outside every drawn ring, low, in the daytime.",
      easy: [golf],
      medium: [golf],
      hard: [golf],
    },
    {
      id: "echo",
      phase: "Airspace",
      zoneId: "class-e",
      symbolId: "class-e",
      x: 540,
      y: 300,
      heading: 250,
      situation: "The dashed magenta line is coming under the nose.",
      easy: [echo],
      medium: [echo],
      hard: [echo],
    },
    {
      id: "point",
      phase: "Checkpoint",
      zoneId: "vfr-checkpoint",
      symbolId: "vfr-checkpoint",
      x: 370,
      y: 480,
      heading: 300,
      situation: "Harbor Point matches the bend you briefed.",
      easy: [flag],
      medium: [flag],
      hard: [flag],
    },
    {
      id: "mef",
      phase: "En route to the field",
      zoneId: "mef",
      symbolId: "mef",
      x: 540,
      y: 130,
      heading: 200,
      situation: "A big 16 sits in the square you are crossing.",
      easy: [mef],
      medium: [mef],
      hard: [mef],
    },
    {
      id: "tower",
      phase: "Obstruction",
      zoneId: "obstruction",
      symbolId: "obstruction",
      x: 790,
      y: 270,
      heading: 90,
      situation: "The tower is charted just right of course.",
      easy: [towerHit],
      medium: [towerHit],
      hard: [towerHit],
    },
    {
      id: "rp",
      phase: "Pattern direction",
      zoneId: "rp",
      symbolId: "rp",
      x: 650,
      y: 250,
      heading: 220,
      situation: "You can read RP 22 on the blue airport. You are landing at Harbor.",
      easy: [rightPattern],
      medium: [rightPattern],
      hard: [rightPattern],
    },
    {
      id: "restricted",
      phase: "Go-around",
      zoneId: "restricted",
      symbolId: "restricted",
      x: 640,
      y: 480,
      heading: 40,
      situation: "You are going around, and the hatched box is off the departure end.",
      easy: [restrictedEarly],
      medium: [restrictedEarly, restrictedLate],
      hard: [restrictedEarly, restrictedLate, restrictedLast],
    },
  ],
};
