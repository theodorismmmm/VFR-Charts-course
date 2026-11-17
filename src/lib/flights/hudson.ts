import { step, type Flight } from "../flight-types";

const ctaf = "123.05  Hudson River CTAF";

const what = step(
  ctaf,
  [
    [
      "Instructor",
      "You are over the Hudson at Alpine, southbound. The blue airspace above 1,300 feet is the New York Class B. The cutout under it is the exclusion.",
    ],
  ],
  "What is this piece of airspace?",
  [
    ["sfra", "The Hudson River exclusion, 14 CFR 93. I can transit it without a Bravo clearance only if I follow the SFRA. It is not a path into LaGuardia."],
    ["bravo", "The whole river is Class B from the surface. I need a clearance before I enter Alpine."],
    ["lga", "The exclusion is the VFR arrival to LaGuardia. I turn east at the GWB."],
  ],
  "sfra",
  "The exclusion is the airspace under the Class B floor, between the banks. LaGuardia sits in the surface Class B to the east. Getting there is a different clearance.",
);

const alt = step(
  ctaf,
  [["Instructor", "You are transiting from Alpine to the Verrazano, not maneuvering. Pick the altitude."]],
  "Where do you level?",
  [
    ["band", "1,100 feet MSL. Transient traffic is at or above 1,000 and below 1,300."],
    ["sky", "1,500 feet. Higher is safer, and the river looks open."],
    ["local", "800 feet. The lower band is for anyone who is just passing through."],
  ],
  "band",
  "Transient is 1,000 up to but not including 1,300. Local operations stay below 1,000. 1,300 and above is Class B.",
);

const altLate = step(
  ctaf,
  [["Instructor", "You have drifted to 1,280 and the nose is still climbing. The floor is 1,300."]],
  "Last second. Fix it.",
  [
    ["down", "I descend back to 1,100 and I stay in the exclusion. I do not nibble the floor."],
    ["call", "I climb to 1,500 and call LaGuardia after I am level. The call makes it legal."],
    ["ok", "1,280 is below 1,300. I hold it. The rule has a margin built in."],
  ],
  "down",
  "“Up to but not including” means 1,299 is the top of the legal transient band, and 1,280 with a climbing nose is how people bust it. You descend while you still have room.",
);

const altBust = step(
  ctaf,
  [["Instructor", "You are at 1,320 and still climbing. That is Class B. You do not have a clearance."]],
  "You are already through the floor. Last second.",
  [
    ["down", "I descend below 1,300 immediately, back to 1,100, and I announce the altitude. I do not stay and “call it in.”"],
    ["stay", "I level at 1,320. I am only 20 feet in. I will call Skyline when I can."],
    ["lga", "I turn toward LaGuardia. I am already in the Bravo, so I might as well land."],
  ],
  "down",
  "Twenty feet through the floor is a Bravo entry without a clearance. You descend back into the exclusion. You do not convert it into an arrival.",
);

const shore = step(
  ctaf,
  [["Instructor", "You are southbound. The chart labels the west bank SOUTHBOUND and the east bank NORTHBOUND."]],
  "Which shore?",
  [
    ["west", "The west shore. Southbound stays west. I do not drift to the middle and I do not cross."],
    ["east", "The east shore, so I am farther from Newark."],
    ["center", "The center of the river. The shores are for helicopters."],
  ],
  "west",
  "14 CFR 93.352: southbound along the west shoreline, northbound along the east shoreline, inside the banks.",
);

const shoreLate = step(
  ctaf,
  [["Traffic", "Helicopter, George Washington Bridge, one thousand one hundred, northbound, on the west shore."]],
  "He is on your side, opposite direction, at your altitude. Last call you heard.",
  [
    ["hold", "I hold the west shore, I offset only within my side, and I announce again. I do not swap to the east bank."],
    ["swap", "I cross to the east shore. He took my side."],
    ["climb", "I climb through 1,300 to pass over him."],
  ],
  "hold",
  "His mistake does not move the rule. Northbound traffic belongs on the east shore. You keep the west shore and you make yourself heard.",
);

const report = step(
  ctaf,
  [["Instructor", "The George Washington Bridge is the flagged mandatory report on this sheet. CTAF is 123.05."]],
  "Make the call.",
  [
    ["full", "“Cessna, George Washington Bridge, one thousand one hundred, southbound.”"],
    ["short", "“Cessna southbound.” They can see the rest."],
    ["tower", "“LaGuardia Tower, Cessna 123AB, at the GWB, request transit.”"],
  ],
  "full",
  "The SFRA call is type, position, direction, and altitude, on 123.05. A checkpoint flag alone would not require it. This one is a mandatory report.",
);

const statue = step(
  ctaf,
  [["Instructor", "The Statue of Liberty is the magenta flag on this sheet. The GWB behind you was the boxed report."]],
  "Do you transmit at the statue?",
  [
    ["no", "Not because of the flag. A VFR checkpoint is a landmark I planned to see. I transmit at the charted mandatory reports."],
    ["yes", "Every named point on the river is a mandatory call. I transmit the same four items."],
    ["approach", "I check in with New York Approach at the statue, even though I am staying in the exclusion."],
  ],
  "no",
  "The flag and the SFRA report are different marks. This training sheet uses Alpine and the GWB as the reports. The statue is the landmark.",
);

const speed = step(
  ctaf,
  [["Instructor", "You are indicating 165 knots as you pass the bridge, still in the exclusion."]],
  "The speed on this chart note is what?",
  [
    ["slow", "Not above 140 KIAS in the exclusion. I slow down now. Lights stay on."],
    ["250", "250 knots below 10,000 is the only limit that applies over the river."],
    ["200", "200 knots, because I am under Class B. 140 is a helicopter number."],
  ],
  "slow",
  "93.351 sets 140 KIAS in the Hudson and East River exclusions. The 200-knot rule under Class B is real, and 140 is tighter while you are in the SFRA.",
);

const east = step(
  ctaf,
  [["Instructor", "The Battery is ahead. The East River is the hatched channel to the east. Your plan was the Hudson to the Verrazano."]],
  "A passenger asks you to turn up the East River for the view.",
  [
    ["no", "I refuse. Fixed-wing aircraft are prohibited in the East River exclusion unless LaGuardia authorizes it. I would have needed 126.05 before Governors Island."],
    ["yes", "The East River is the same SFRA as the Hudson. I turn and announce on 123.05."],
    ["high", "I climb to 1,100 and turn. The ban is only for local flights below 1,000."],
  ],
  "no",
  "The East River is not a duplicate of the Hudson. Fixed-wing traffic needs an authorization from LaGuardia Tower on 126.05, and monitors 123.075.",
);

const sky = step(
  ctaf,
  [["Instructor", "You want the smoother air at 1,500 over the river. That is above the floor."]],
  "How do you get into the Skyline route, southbound?",
  [
    ["before", "I get the Class B clearance from LaGuardia on 126.05 before I climb, and before Alpine if I am entering from the north. I do not climb first."],
    ["after", "I climb, then I call. They can see the target."],
    ["ewr", "Southbound Skyline is Newark Tower on 127.85."],
  ],
  "before",
  "The Skyline route is Class B at 1,300 and above. Southbound the frequency is LaGuardia 126.05. Northbound it is Newark 127.85. The clearance comes before the climb.",
);

const skyLate = step(
  "126.05  LaGuardia Tower",
  [["LaGuardia", "Cessna 123AB, remain in the exclusion at or below 1,200. I do not have a Bravo clearance for you. Skyline is not available."]],
  "You had briefed 1,500. Last instruction.",
  [
    ["stay", "“Remain in the exclusion at or below 1,200, Cessna 123AB.” I stay at 1,100 on the west shore."],
    ["climb", "I climb anyway. “Not available” means try it and call back."],
    ["east", "I turn into the East River where the floor is different."],
  ],
  "stay",
  "No clearance, no climb. The exclusion is still legal. The Skyline is not, until someone clears you into it.",
);

export const hudson: Flight = {
  id: "hudson",
  order: 4,
  code: "NYC",
  airport: "Hudson River",
  title: "Hudson exclusion, Alpine to the Verrazano",
  airspace: "SFRA under the New York Class B",
  summary:
    "A southbound transient under the real exclusion rules: 1,000 to below 1,300, west shore, 140 knots, reports on 123.05. LaGuardia is not this flight. The plate is the FAA New York TAC SFRA panel — training only, not for navigation.",
  chartTitle: "HUDSON RIVER EXCLUSION — FAA NEW YORK TAC SFRA PANEL — NOT FOR NAVIGATION",
  chartSrc: "/charts/ny-hudson-sfra.jpg",
  chartWidth: 653,
  chartHeight: 1100,
  chartCredit: "FAA New York TAC, Special Flight Rules Area panel (public domain). Training excerpt — not for navigation.",
  track: "M 271 88 L 278 220 L 294 330 L 304 380 L 291 495 L 287 605 L 287 715 L 287 814 L 313 935 L 379 1018",
  marks: [
    { id: "sfra", kind: "note", x: 18, y: 470, lines: ["EXCLUSION", "SFC to below 1,300", "CTAF 123.05", "140 KIAS"] },
    { id: "exclusion-altitude", kind: "note", x: 18, y: 580, lines: ["TRANSIENT", "1,000 to below 1,300", "LOCAL", "below 1,000"] },
    { id: "shoreline", kind: "label", x: 168, y: 500, text: "SOUTHBOUND", fill: "#1c3c52", size: 12 },
    { id: "shoreline", kind: "label", x: 360, y: 500, text: "NORTHBOUND", fill: "#1c3c52", size: 12 },
    { id: "reporting-point", kind: "report", x: 284, y: 66, name: "ALPINE" },
    { id: "reporting-point", kind: "report", x: 320, y: 368, name: "GWB" },
    { id: "vfr-checkpoint", kind: "flag", x: 300, y: 814, name: "STATUE" },
    { kind: "label", x: 400, y: 1040, text: "VERRAZANO", fill: "#142033", size: 12 },
    { id: "skyline", kind: "label", x: 470, y: 120, text: "SKYLINE — CLEARANCE", fill: "#1a3f86", size: 12 },
    { id: "skyline", kind: "label", x: 470, y: 142, text: "CLASS B FLOOR 1,300", fill: "#1a3f86", size: 11 },
    { id: "east-river", kind: "box", x: 430, y: 540, w: 150, h: 70, label: "EAST RIVER" },
    { id: "east-river", kind: "label", x: 448, y: 630, text: "FIXED WING — ATC ONLY", fill: "#1d4e89", size: 10 },
    { id: "speed-140", kind: "label", x: 28, y: 980, text: "140 KIAS", fill: "#142033", size: 14 },
  ],
  beats: [
    {
      id: "sfra",
      phase: "Chart brief",
      zoneId: "sfra",
      symbolId: "sfra",
      x: 271,
      y: 88,
      heading: 180,
      situation: "Alpine Tower, southbound, before you descend into the flow.",
      easy: [what],
      medium: [what],
      hard: [what],
    },
    {
      id: "altitude",
      phase: "Altitude",
      zoneId: "exclusion-altitude",
      symbolId: "exclusion-altitude",
      x: 278,
      y: 220,
      heading: 180,
      situation: "You are entering the flow as a transient, Alpine to the Verrazano.",
      easy: [alt],
      medium: [alt, altLate],
      hard: [alt, altLate, altBust],
    },
    {
      id: "shore",
      phase: "Shoreline",
      zoneId: "shoreline",
      symbolId: "shoreline",
      x: 294,
      y: 330,
      heading: 180,
      situation: "The bridge is ahead. Pick a bank and stay on it.",
      easy: [shore],
      medium: [shore, shoreLate],
      hard: [shore, shoreLate],
    },
    {
      id: "report",
      phase: "GWB",
      zoneId: "reporting-point",
      symbolId: "reporting-point",
      x: 304,
      y: 380,
      heading: 180,
      situation: "The George Washington Bridge is the mandatory report.",
      easy: [report],
      medium: [report],
      hard: [report],
    },
    {
      id: "statue",
      phase: "Checkpoint",
      zoneId: "vfr-checkpoint",
      symbolId: "vfr-checkpoint",
      x: 287,
      y: 814,
      heading: 180,
      situation: "The statue is off the left, where the flag said it would be.",
      easy: [statue],
      medium: [statue],
      hard: [statue],
    },
    {
      id: "speed",
      phase: "Speed",
      zoneId: "speed-140",
      symbolId: "speed-140",
      x: 287,
      y: 605,
      heading: 180,
      situation: "165 knots on the indicator, still between the banks.",
      easy: [speed],
      medium: [speed],
      hard: [speed],
    },
    {
      id: "east",
      phase: "The Battery",
      zoneId: "east-river",
      symbolId: "east-river",
      x: 287,
      y: 715,
      heading: 180,
      situation: "The East River opens on your left. The Verrazano is still ahead.",
      easy: [east],
      medium: [east],
      hard: [east],
    },
    {
      id: "skyline",
      phase: "Above the floor",
      zoneId: "skyline",
      symbolId: "skyline",
      x: 278,
      y: 160,
      heading: 180,
      situation: "You are still north of the bridge, thinking about 1,500 feet.",
      easy: [sky],
      medium: [sky, skyLate],
      hard: [sky, skyLate],
    },
  ],
};
