import { step, type Flight } from "../flight-types";

const atis = "124.6  Seaview ATIS";
const ground = "121.9  Seaview Ground";
const tower = "118.3  Seaview Tower";

const which = step(
  tower,
  [["Instructor", "Seaview is a towered field under a Class B shelf. The airport symbol is blue."]],
  "What are you looking at?",
  [
    ["blue", "A blue airport. The tower is operating. I do not self-announce my way into the pattern."],
    ["magenta", "Blue and magenta are the same symbol in different ink."],
    ["ctaf", "I use the CTAF printed for after hours. The tower can listen."],
  ],
  "blue",
  "Blue means the tower is open. You work ground and tower. CTAF is for when the tower is closed, and the chart will say so.",
);

const star = step(
  tower,
  [["Instructor", "There is a star beside the Seaview name. It is midday and the beacon is spinning."]],
  "What is the star, and what is the beacon telling you?",
  [
    ["weather", "The field has a rotating beacon. In Class D, a daytime beacon means the weather is below basic VFR. I get the ATIS before I commit."],
    ["rating", "A starred airport is a preferred VFR alternate. I continue."],
    ["closed", "The star means the tower is closed."],
  ],
  "weather",
  "The star is the beacon. In B, C, or D airspace a beacon on in daylight is a weather warning, not a decoration and not a clearance.",
);

const elev = step(
  tower,
  [["Instructor", "The data block reads CT 118.3 and 210."]],
  "What is 210?",
  [
    ["elev", "Field elevation, 210 feet MSL. Pattern altitude is about 1,200 MSL, not 210."],
    ["pattern", "The traffic pattern is at 210 feet. I plan to level there."],
    ["freq", "A second tower frequency."],
  ],
  "elev",
  "The bare elevation is feet MSL. A frequency has a decimal. Pattern altitude is not printed as that number.",
);

const info = step(
  atis,
  [
    [
      "ATIS",
      "Seaview information Charlie. Wind 320 at 8. Visibility 10. Ceiling 4,500. Runway 31 in use. Advise on initial contact you have information Charlie.",
    ],
  ],
  "You have the broadcast. First call to ground.",
  [
    ["letter", "“Seaview Ground, Cessna 123AB, at the south ramp, taxi with information Charlie.”"],
    ["read", "I read the whole ATIS back so Ground knows I copied the wind."],
    ["skip", "I call tower for takeoff. ATIS is optional if I can see the cone."],
  ],
  "letter",
  "You acknowledge the letter. You do not recite the weather, and you do not skip it. The runway in use can change when the letter does.",
);

const taxi = step(
  ground,
  [["Ground", "Cessna 123AB, runway 31, taxi via Alpha, hold short runway 31."]],
  "Read it back.",
  [
    ["hold", "“Runway 31 via Alpha, hold short runway 31, Cessna 123AB.”"],
    ["go", "“Taxi runway 31, Cessna 123AB.” I can cross the holding position because I am going to the runway."],
    ["tower", "I switch to tower now so I am ready. Ground has already given me the route."],
  ],
  "hold",
  "Hold short is read back with the runway, every time. The solid side of the holding-position marking is where you stop.",
);

const holdLate = step(
  ground,
  [["Ground", "Cessna 3AB, the traffic is still on the runway. Hold short. Do not cross the solid lines."]],
  "You are at the yellow bars. Last instruction.",
  [
    ["stop", "I stop on the solid side. I do not inch forward to be helpful."],
    ["cross", "I cross and wait on the runway. That is what “ready” looks like."],
    ["alpha", "I turn around on the runway and taxi back. The instruction was unclear."],
  ],
  "stop",
  "The holding position is four yellow lines. Solid lines face the taxiway. Crossing them without a clearance is a runway incursion.",
);

const luaw = step(
  tower,
  [["Tower", "Cessna 123AB, runway 31, line up and wait."]],
  "What does that clearance authorize?",
  [
    ["wait", "“Line up and wait, runway 31, Cessna 123AB.” I taxi on, I stop, I do not add power for the roll."],
    ["roll", "Line up and wait means take off without delay. I go."],
    ["holdshort", "I stay on the taxiway. Line up and wait is the same as hold short."],
  ],
  "wait",
  "Only “cleared for takeoff” starts the roll. Line up and wait puts you on the runway and stops you there.",
);

const takeoff = step(
  tower,
  [["Tower", "Cessna 3AB, runway 31, cleared for takeoff."]],
  "Now.",
  [
    ["roll", "“Cleared for takeoff runway 31, Cessna 3AB.” I roll."],
    ["wait", "I stay lined up until tower says “release.”"],
    ["turn", "I start the crosswind turn as soon as the wheels leave, to be out of the way."],
  ],
  "roll",
  "The takeoff clearance is the whole clearance. You fly runway heading until you are told otherwise.",
);

const immediate = step(
  tower,
  [["Tower", "Cessna 3AB, traffic a two-mile final, cleared for immediate takeoff runway 31."]],
  "Last second. Traffic is on final.",
  [
    ["now", "I roll without delay. If I am not ready I say “unable” and I stay put. I do not roll halfway and then stop."],
    ["sit", "Immediate still means I set power when I am comfortable. The traffic will go around."],
    ["reject", "I taxi onto the runway and reject the takeoff so the other airplane can land over me."],
  ],
  "now",
  "Immediate means you are already in position and you go, or you refuse before you enter. Stopping on the runway is the hazard the call was trying to prevent.",
);

const delta = step(
  tower,
  [["Tower", "Cessna 3AB, make left closed traffic. The ceiling of the Delta is 2,500."]],
  "The dashed blue line and the [25] mean what, for this pattern?",
  [
    ["in", "I stay inside the dashed blue line and below 2,500 MSL unless tower sends me out. Two-way radio is what got me in."],
    ["above", "I climb to 3,000 to get a better look. The number is a suggestion."],
    ["none", "Class D is only the runway. Once I am airborne I am in Class E and I can leave the frequency."],
  ],
  "in",
  "Dashed blue is the lateral boundary. [25] is the ceiling, 2,500 feet MSL. You needed two-way radio before you entered, and you still have it.",
);

const shelf = step(
  tower,
  [["Instructor", "The solid blue arc in the corner is labeled 80/30. You are at 1,500 in the Delta."]],
  "Can you climb to 3,500 to “get above the pattern”?",
  [
    ["no", "No. 80/30 is a Class B shelf from 3,000 to 8,000. I need a Bravo clearance before I go through 3,000. Under it, the speed limit is 200 knots."],
    ["yes", "The shelf is only for jets. A Cessna can climb through it if I stay VFR."],
    ["under", "3,500 is under 8,000, so I am still under the Bravo."],
  ],
  "no",
  "The fraction is top over floor. The floor is 3,000 feet MSL. Under it you are clear of that shelf. Through it, you are in Class B.",
);

const shelfLate = step(
  tower,
  [["Tower", "Cessna 3AB, traffic above you is inbound. Maintain at or below 2,000. Do not climb into the shelf."]],
  "Last instruction.",
  [
    ["two", "“At or below 2,000, Cessna 3AB.” I stay there."],
    ["three", "I climb to 3,000 anyway. The shelf floor is a buffer, not a line."],
    ["bravo", "I call “in the Bravo” after I am already through 3,000."],
  ],
  "two",
  "The last altitude is the one you fly. Calling after you have entered is not a clearance.",
);

export const seaview: Flight = {
  id: "seaview",
  order: 2,
  code: "SVW",
  airport: "Seaview",
  title: "Class D, under a Bravo shelf",
  airspace: "Class D to 2,500, Class B shelf 80/30",
  summary:
    "A training tower under a Class B shelf. ATIS, a hold-short readback, line up and wait, then a takeoff clearance that may come late. Training frequencies, not a real field.",
  chartTitle: "SEAVIEW — TRAINING CLASS D — NOT FOR NAVIGATION",
  track: "M 180 500 L 360 430 L 480 400 L 520 300 L 620 220",
  marks: [
    { kind: "shade", d: "M0 0 H1000 V640 H0 Z", fill: "#f4f0d8" },
    { kind: "shade", d: "M620 0 H1000 V200 C900 160 760 80 620 0 Z", fill: "#d6e4f0" },
    {
      id: "class-b-shelf",
      kind: "path",
      d: "M640 40 A340 340 0 0 1 1000 280",
      stroke: "#1a3f86",
      sw: 3,
    },
    { id: "class-b-shelf", kind: "label", x: 860, y: 70, text: "CLASS B  80/30", fill: "#1a3f86", size: 16 },
    {
      id: "class-d",
      kind: "ring",
      cx: 480,
      cy: 340,
      r: 168,
      stroke: "#1a3f86",
      dash: "8 5",
      label: "CLASS D  [25]",
      lx: 480,
      ly: 150,
    },
    { id: "blue-airport", kind: "airport", x: 480, y: 340, tower: true, name: "SEAVIEW", detail: "CT 118.3 · 210", rot: -40 },
    { id: "field-elevation", kind: "label", x: 560, y: 390, text: "ELEV 210", fill: "#1c1c1c", size: 13, anchor: "start" },
    { id: "beacon", kind: "label", x: 400, y: 300, text: "★", fill: "#1c1c1c", size: 18 },
    { id: "atis", kind: "note", x: 40, y: 40, lines: ["ATIS 124.6", "GND 121.9", "TWR 118.3", "RWY 31"] },
    { id: "hold-short", kind: "holdshort", x: 250, y: 470 },
    { kind: "label", x: 250, y: 520, text: "HOLD SHORT", fill: "#1c1c1c", size: 12 },
  ],
  beats: [
    {
      id: "blue",
      phase: "Chart brief",
      zoneId: "blue-airport",
      symbolId: "blue-airport",
      x: 300,
      y: 460,
      heading: 40,
      situation: "You are on the ramp. The symbol on the sheet is blue.",
      easy: [which],
      medium: [which],
      hard: [which],
    },
    {
      id: "beacon",
      phase: "Weather",
      zoneId: "beacon",
      symbolId: "beacon",
      x: 360,
      y: 420,
      heading: 20,
      situation: "Midday. The beacon on the field is rotating.",
      easy: [star],
      medium: [star],
      hard: [star],
    },
    {
      id: "elev",
      phase: "Airport data",
      zoneId: "field-elevation",
      symbolId: "field-elevation",
      x: 430,
      y: 400,
      heading: 10,
      situation: "You are reading the data block before you listen to ATIS.",
      easy: [elev],
      medium: [elev],
      hard: [elev],
    },
    {
      id: "atis",
      phase: "ATIS",
      zoneId: "atis",
      symbolId: "atis",
      x: 200,
      y: 500,
      heading: 40,
      situation: "Information Charlie is in your ear.",
      easy: [info],
      medium: [info],
      hard: [info],
    },
    {
      id: "taxi",
      phase: "Taxi",
      zoneId: "hold-short",
      symbolId: "ground",
      x: 280,
      y: 490,
      heading: 40,
      situation: "Ground has given you Alpha and a hold short.",
      easy: [taxi],
      medium: [taxi],
      hard: [taxi],
    },
    {
      id: "bars",
      phase: "Holding position",
      zoneId: "hold-short",
      symbolId: "hold-short",
      x: 250,
      y: 470,
      heading: 40,
      situation: "The four yellow lines are at the nose.",
      easy: [holdLate],
      medium: [taxi, holdLate],
      hard: [taxi, holdLate],
    },
    {
      id: "luaw",
      phase: "Runway",
      zoneId: "blue-airport",
      symbolId: "tower",
      x: 460,
      y: 360,
      heading: 310,
      situation: "You are number one at the hold-short line. Tower is on 118.3.",
      easy: [luaw],
      medium: [luaw, takeoff],
      hard: [luaw, takeoff, immediate],
    },
    {
      id: "delta",
      phase: "Pattern",
      zoneId: "class-d",
      symbolId: "class-d",
      x: 560,
      y: 260,
      heading: 220,
      situation: "Left crosswind. The dashed blue circle and the [25] are the airspace you are in.",
      easy: [delta],
      medium: [delta],
      hard: [delta],
    },
    {
      id: "shelf",
      phase: "Above the Delta",
      zoneId: "class-b-shelf",
      symbolId: "class-b-shelf",
      x: 700,
      y: 140,
      heading: 300,
      situation: "The solid blue arc is the shelf. You are level at 1,500.",
      easy: [shelf],
      medium: [shelf, shelfLate],
      hard: [shelf, shelfLate],
    },
  ],
};
