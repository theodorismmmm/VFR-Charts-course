import { step, type Flight } from "../flight-types";

const app = "124.15  Metro Approach";
const twr = "119.3  Metro Tower";

const core = step(
  app,
  [["Instructor", "The inner magenta ring is labeled 40/SFC. You are still outside it."]],
  "What is the inner ring?",
  [
    ["core", "Class C to the surface, top 4,000 feet MSL. I establish two-way radio with approach before I cross it."],
    ["shelf", "The inner ring is the shelf. I can fly under it at 500 feet."],
    ["d", "Magenta means Class D. I call the tower, not approach."],
  ],
  "core",
  "Solid magenta to the surface is the Class C core. You talk to approach before you enter. Tower comes later.",
);

const shelf = step(
  app,
  [["Instructor", "The outer ring is labeled 40/15. You are at 1,200 feet, outside the inner ring and under the outer one."]],
  "Are you in the Class C?",
  [
    ["under", "No. The shelf floor is 1,500. At 1,200 I am under it. The core ahead still goes to the surface, and I do not climb into the shelf to “get it over with.”"],
    ["in", "Any magenta on the chart means I am already in the Charlie."],
    ["sneak", "I stay at 1,200 and fly through the inner ring. Under 1,500 I do not need a call."],
  ],
  "under",
  "40/15 is top and floor of the outer shelf. Under the floor you are not in that shelf. The surface core is a different circle, and you still may not cross it.",
);

const remain = step(
  app,
  [
    ["You", "Metro Approach, Cessna 123AB, 12 miles south, 2,500, inbound for landing with Delta."],
    ["Approach", "Cessna 123AB, Metro Approach, squawk 0432. Remain outside the Charlie."],
  ],
  "Read back, and put the airplane where the words put it.",
  [
    ["out", "“Squawk 0432, remain outside the Charlie, Cessna 123AB.” I do not cross the line."],
    ["in", "Two-way radio is established. I enter and call when I am inside."],
    ["tower", "I switch to tower. Approach only handles the shelf."],
  ],
  "out",
  "“Remain outside” is a real instruction. Two-way radio is necessary and it is not sufficient when the controller has told you to stay out.",
);

const cleared = step(
  app,
  [["Approach", "Cessna 3AB, radar contact, 10 miles south. Cleared into the Charlie airspace. Maintain VFR at or below 2,500."]],
  "This is the clearance. Read it back.",
  [
    ["in", "“Cleared into the Charlie, VFR at or below 2,500, Cessna 3AB.” Now I may cross the line."],
    ["old", "I am still on “remain outside.” Radar contact did not cancel it, so I stay out and say nothing."],
    ["down", "I descend below 1,500 so I can enter without using the clearance."],
  ],
  "in",
  "The new transmission replaced “remain outside.” You read back the clearance you just received, including the altitude.",
);

const clearedNow = step(
  app,
  [["Approach", "Cessna 3AB, the line is one mile ahead. Cleared into the Charlie, now. Maintain VFR at or below 2,500."]],
  "Last second. The boundary is under the nose.",
  [
    ["cross", "“Cleared into the Charlie, at or below 2,500, Cessna 3AB.” I cross level, I do not dive under the shelf."],
    ["turn", "I turn around. A late clearance means they did not really want me."],
    ["tower", "I check in with tower first and enter on the way."],
  ],
  "cross",
  "A clearance that arrives at the boundary is still a clearance. You read it back and you fly the altitude in it.",
);

const modeC = step(
  app,
  [["Approach", "Cessna 3AB, I am not receiving your Mode C. Reset the transponder, squawk 0432, and ident."]],
  "You are inside the Charlie. What is required?",
  [
    ["on", "Mode C altitude reporting, and ADS-B Out, in and above Class C. I reset, I squawk 0432, I ident."],
    ["off", "VFR means 1200. A discrete code was optional."],
    ["wait", "I leave the airspace first and fix it on the ramp. They can see me without it."],
  ],
  "on",
  "Class C requires an operating altitude encoder and ADS-B Out. The code they gave you is the code you squawk. 1200 was for outside.",
);

const rose = step(
  app,
  [["Instructor", "The compass rose south of the field is the Metro VOR, 115.8. You are on the 360 radial, south of the station."]],
  "What is that rose for on this arrival?",
  [
    ["check", "A radio cross-check. The 360 radial from the VOR means I am south of the field, which matches the window."],
    ["runway", "The rose is the runway. I align the airplane with a tick and land."],
    ["ignore", "VOR is an IFR symbol. On a VFR flight I cover it with my thumb."],
  ],
  "check",
  "Radials are magnetic bearings from the station. The rose confirms position. It does not replace the runway or the clearance.",
);

const jump = step(
  app,
  [["Approach", "Cessna 3AB, parachute activity two miles east of the field. Turn left heading 330."]],
  "The parachute symbol is east of course. Your move.",
  [
    ["turn", "“Heading 330, Cessna 3AB.” I do not overfly the jump area to save the mile."],
    ["over", "I hold heading. The symbol is only active on weekends."],
    ["below", "I descend under the jumpers. They exit high."],
  ],
  "turn",
  "The symbol means the activity exists. When approach gives you a heading away from it, that heading is the clearance you fly.",
);

const jumpLate = step(
  app,
  [["Approach", "Cessna 3AB, disregard the 330. Jumpers are now on that side. Turn right heading 030, immediate."]],
  "The jump area moved across your nose. Last call.",
  [
    ["030", "“Heading 030, Cessna 3AB.” I turn right now. The 330 is cancelled."],
    ["330", "I finish the first turn. The first heading was already read back."],
    ["field", "I point at the airport and sort the heading out on tower."],
  ],
  "030",
  "“Disregard” kills the previous heading. The last heading is the one in the window.",
);

const pad = step(
  app,
  [["Instructor", "A hospital pad is charted just west of the core, marked H. The runway is still the Class C airport."]],
  "What is the H?",
  [
    ["heli", "A heliport. I do not land a fixed-wing airplane there, and I do not report it as the field."],
    ["alt", "A satellite runway for Metro. I can land there if the main runway is busy."],
    ["vor", "The H is a holding fix on the VOR."],
  ],
  "heli",
  "An H in a circle is a heliport. It is a landmark and a place helicopters use. It is not your runway.",
);

export const metro: Flight = {
  id: "metro",
  order: 3,
  code: "MTR",
  airport: "Metro",
  title: "Class C arrival",
  airspace: "Class C core 40/SFC, shelf 40/15",
  summary:
    "A training Class C. You stay outside until the clearance actually says you are in, then you follow a late heading around the parachute area. Training frequencies.",
  chartTitle: "METRO — TRAINING CLASS C — NOT FOR NAVIGATION",
  track: "M 480 560 L 480 420 L 420 340 L 470 280",
  marks: [
    { kind: "shade", d: "M0 0 H1000 V640 H0 Z", fill: "#f4f0d8" },
    {
      id: "class-c-shelf",
      kind: "ring",
      cx: 500,
      cy: 300,
      r: 210,
      stroke: "#d1006c",
      sw: 3,
      label: "40/15",
      lx: 730,
      ly: 180,
    },
    {
      id: "class-c",
      kind: "ring",
      cx: 500,
      cy: 300,
      r: 110,
      stroke: "#d1006c",
      sw: 3,
      label: "40/SFC",
      lx: 500,
      ly: 168,
    },
    { id: "class-c", kind: "airport", x: 500, y: 300, tower: true, name: "METRO", detail: "CT 119.3 · 96" },
    { id: "vor", kind: "vor", x: 500, y: 520, name: "MTR", freq: "115.8" },
    { id: "parachute", kind: "para", x: 760, y: 300 },
    { id: "heliport", kind: "heli", x: 300, y: 250, name: "HOSP" },
    { id: "approach", kind: "note", x: 36, y: 36, lines: ["APP 124.15", twr, "ATIS 127.25"] },
    { id: "mode-c", kind: "label", x: 80, y: 560, text: "MODE C", fill: "#1d4e89", size: 16, anchor: "start" },
  ],
  beats: [
    {
      id: "core",
      phase: "Chart brief",
      zoneId: "class-c",
      symbolId: "class-c",
      x: 500,
      y: 540,
      heading: 0,
      situation: "Twelve miles south. The inner magenta ring is the core.",
      easy: [core],
      medium: [core],
      hard: [core],
    },
    {
      id: "shelf",
      phase: "Under the shelf",
      zoneId: "class-c-shelf",
      symbolId: "class-c-shelf",
      x: 720,
      y: 420,
      heading: 320,
      situation: "You are at 1,200 feet, outside the inner ring, under the outer one.",
      easy: [shelf],
      medium: [shelf],
      hard: [shelf],
    },
    {
      id: "outside",
      phase: "Approach",
      zoneId: "approach",
      symbolId: "approach",
      x: 500,
      y: 480,
      heading: 0,
      situation: "Approach has answered. The boundary is still ahead.",
      easy: [remain],
      medium: [remain],
      hard: [remain],
    },
    {
      id: "cleared",
      phase: "The line",
      zoneId: "class-c",
      symbolId: "class-c",
      x: 500,
      y: 430,
      heading: 0,
      situation: "You are a mile from the magenta line, still outside.",
      easy: [cleared],
      medium: [remain, cleared],
      hard: [remain, cleared, clearedNow],
    },
    {
      id: "mode-c",
      phase: "Transponder",
      zoneId: "mode-c",
      symbolId: "mode-c",
      x: 500,
      y: 360,
      heading: 0,
      situation: "You are inside the Charlie and approach does not like your transponder.",
      easy: [modeC],
      medium: [modeC],
      hard: [modeC],
    },
    {
      id: "vor",
      phase: "Cross-check",
      zoneId: "vor",
      symbolId: "vor",
      x: 500,
      y: 500,
      heading: 0,
      situation: "The rose is just behind you. The identifier matches.",
      easy: [rose],
      medium: [rose],
      hard: [rose],
    },
    {
      id: "jump",
      phase: "Jump area",
      zoneId: "parachute",
      symbolId: "parachute",
      x: 640,
      y: 320,
      heading: 40,
      situation: "The parachute symbol is two miles east. Approach is on the frequency.",
      easy: [jump],
      medium: [jump, jumpLate],
      hard: [jump, jumpLate],
    },
    {
      id: "pad",
      phase: "The pad",
      zoneId: "heliport",
      symbolId: "heliport",
      x: 340,
      y: 270,
      heading: 80,
      situation: "A marked H is off the left, closer than the runway.",
      easy: [pad],
      medium: [pad],
      hard: [pad],
    },
  ],
};
