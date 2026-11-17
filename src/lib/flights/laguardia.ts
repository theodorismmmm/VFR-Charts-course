import { step, type Flight } from "../flight-types";

const atis = "125.95  LaGuardia ATIS";
const app = "120.8  New York Approach";
const twr = "118.7  LaGuardia Tower";
const gnd = "121.7  LaGuardia Ground";

const surface = step(
  app,
  [
    [
      "Instructor",
      "LaGuardia is the blue airport inside the solid blue surface area. You are still over the Hudson at 1,200, in the exclusion. Runways are 4/22 and 13/31. Field elevation is 21.",
    ],
  ],
  "What has to happen before the nose points at the airport?",
  [
    ["clearance", "A Class B clearance. The surface area has no floor to duck under. The exclusion does not extend to the runway."],
    ["turn", "I turn inbound and call the tower on 118.7. The tower clearance covers the Bravo."],
    ["under", "I descend to 800 and scoot across. SFC only applies to jets."],
  ],
  "clearance",
  "SFC means the surface. There is no altitude under this piece of the Bravo. The River Visual runway 13 is an instrument procedure, not a VFR path out of the exclusion.",
);

const info = step(
  atis,
  [
    [
      "ATIS",
      "LaGuardia information November. Wind 320 at 8. Visibility 10. Few clouds at 5,000. Temperature 12, dewpoint 4. Altimeter 30.02. Runway 31 in use. Advise you have information November.",
    ],
  ],
  "You have November. What goes in the first call?",
  [
    ["letter", "The letter. “With information November.” I do not read the wind and the altimeter back."],
    ["all", "I read the whole ATIS so Approach knows the altimeter I set."],
    ["skip", "ATIS is for airliners. I call with my altitude only."],
  ],
  "letter",
  "The letter is the proof you listened. If it changes, the runway in use may have changed with it.",
);

const initial = step(
  app,
  [["Instructor", "You are over the Hudson at the GWB, 1,200, southbound, still in the exclusion. Approach is 120.8."]],
  "Initial call.",
  [
    [
      "call",
      "“New York Approach, Cessna 123AB, over the Hudson at the George Washington Bridge, 1,200, request Class Bravo clearance inbound LaGuardia with November.”",
    ],
    ["tower", "“LaGuardia Tower, Cessna 123AB, at the GWB, inbound to land.”"],
    ["turn", "I leave the river abeam the field and call when I can see the runway."],
  ],
  "call",
  "Approach owns the Bravo. Tower owns the runway after you are handed off. You do not leave the exclusion on the way to making the call.",
);

const outside = step(
  app,
  [["Approach", "Cessna 123AB, New York Approach, squawk 4621. Remain outside the Bravo."]],
  "Read back.",
  [
    ["out", "“Squawk 4621, remain outside the Bravo, Cessna 123AB.” I stay over the river."],
    ["in", "“Squawk 4621, Cessna 123AB.” I turn toward runway 31. Radar will see the code."],
    ["1200", "I stay on 1200. A discrete code is for IFR."],
  ],
  "out",
  "The code is not the clearance. “Remain outside” is the instruction, and the veil you are already inside does not change it.",
);

const veil = step(
  app,
  [["Instructor", "The 30-mile Mode C veil is already around you. You are squawking 4621 and you are still over the river."]],
  "Does the veil let you into the surface area?",
  [
    ["no", "No. The veil is an equipment boundary. The Bravo boundary is the solid blue line, and I am still outside it until cleared."],
    ["yes", "Inside the veil I am in the Bravo. The squawk finished the entry."],
    ["adsb", "ADS-B replaces the clearance. I can turn in once it is on."],
  ],
  "no",
  "Mode C and ADS-B Out are required in the veil and in the Bravo. They are not a clearance to be there.",
);

const into = step(
  app,
  [
    [
      "Approach",
      "Cessna 3AB, radar contact, two miles northwest of LaGuardia. Cleared into the Bravo airspace. Maintain VFR at or below 2,000. Fly heading 130.",
    ],
  ],
  "Read back the clearance you were actually given.",
  [
    [
      "full",
      "“Cleared into the Bravo, VFR at or below 2,000, heading 130, Cessna 3AB.”",
    ],
    ["short", "“Heading 130, Cessna 3AB.” The rest was advisory."],
    ["land", "“Cleared into the Bravo, cleared to land runway 31, Cessna 3AB.”"],
  ],
  "full",
  "Into the Bravo, the altitude, and the heading all get read back. Nobody cleared you to land. VFR in the Bravo is 3 miles and clear of clouds.",
);

const landEasy = step(
  twr,
  [["Tower", "Cessna 3AB, wind 320 at 8, runway 31, cleared to land."]],
  "Read back the landing clearance.",
  [
    ["land", "“Runway 31, cleared to land, Cessna 3AB.”"],
    ["expect", "“Expect runway 31, Cessna 3AB.” I save the words “cleared to land” for short final."],
    ["four", "“Runway 4, cleared to land, Cessna 3AB.” The heading I was on looks closer to 4."],
  ],
  "land",
  "Easy gives you the whole plan. The words that put you on the runway are “cleared to land,” with the runway number. A heading is not a runway.",
);

const expect = step(
  app,
  [["Approach", "Cessna 3AB, expect runway 31. Continue heading 130, at or below 2,000."]],
  "“Expect” means what?",
  [
    ["plan", "I plan 31. I do not tell tower I am cleared to land, and I do not leave 2,000."],
    ["land", "Expect is the landing clearance. I descend for a straight-in."],
    ["four", "The ATIS wind favors runway 4. I turn for 4 and advise."],
  ],
  "plan",
  "Expect is a plan. Cleared to land is a clearance. You fly the heading and the altitude you have.",
);

const change = step(
  twr,
  [
    ["Tower", "Cessna 3AB, runway change. Wind 040 at 14. Runway 4, cleared to land."],
  ],
  "The runway just changed. Last instruction.",
  [
    ["four", "“Runway 4, cleared to land, Cessna 3AB.” I fly 4. I do not continue for 31 because I already briefed it."],
    ["31", "I land 31. A last-second change on final is optional for a light airplane."],
    ["ask", "I land 31 and discuss the wind on the taxiway."],
  ],
  "four",
  "You land the runway in the last clearance. The wind is why they changed it. Your earlier brief is cancelled.",
);

const around = step(
  twr,
  [["Tower", "Cessna 3AB, go around. Fly runway heading. Climb and maintain 2,000."]],
  "You are on a half-mile final. Last call.",
  [
    ["ga", "“Going around, runway heading, climbing to 2,000, Cessna 3AB.” Power, pitch, no turn until I have the altitude and the heading."],
    ["land", "I am too close. I land and apologize on the ground."],
    ["turn", "I turn crosswind immediately so I am out of the way of the traffic on the runway."],
  ],
  "ga",
  "Go around means you do not land. Runway heading and 2,000 are the clearance. The turn is a later instruction, not part of this one.",
);

const afterGa = step(
  app,
  [["Tower", "Cessna 3AB, contact New York Approach 120.8."]],
  "You are climbing runway heading through 1,200, gear and flaps coming up.",
  [
    ["app", "“Approach 120.8, Cessna 3AB.” I stay on runway heading. I do not call ground."],
    ["gnd", "I call ground on 121.7 and ask them to put me back on the runway."],
    ["turn", "I turn crosswind for runway 4. The go-around was only a spacing suggestion."],
  ],
  "app",
  "You did not land. Ground does not own a go-around. You read back the frequency and you fly the heading you already have until approach changes it.",
);

const ground = step(
  gnd,
  [["Tower", "Cessna 3AB, turn right when able, contact ground 121.7."]],
  "You are still on the runway, slowing.",
  [
    ["clear", "I exit, I stop clear of the hold-short lines, and only then I call ground on 121.7."],
    ["now", "I switch to 121.7 while I am rolling out so ground can plan my taxi."],
    ["cross", "“Contact ground” includes crossing runway 13/31 if it is in the way."],
  ],
  "clear",
  "Tower owns you until you are clear of the runway. Ground never cleared you across another runway. The solid lines still mean hold short.",
);

export const laguardia: Flight = {
  id: "laguardia",
  order: 5,
  code: "KLGA",
  airport: "LaGuardia",
  title: "VFR arrival and landing",
  airspace: "New York Class B, surface area",
  summary:
    "From the Hudson exclusion into the LaGuardia surface Class B. Real structure: ATIS 125.95, approach 120.8, tower 118.7, ground 121.7, runways 4/22 and 13/31, elevation 21. Medium changes the runway. Hard sends you around. The plate is a real FAA New York TAC excerpt — training only, not for navigation.",
  chartTitle: "LAGUARDIA — FAA NEW YORK TAC EXCERPT — NOT FOR NAVIGATION",
  chartSrc: "/charts/ny-lga-tac.jpg",
  chartWidth: 1200,
  chartHeight: 768,
  chartCredit: "FAA New York Terminal Area Chart excerpt (public domain). Training only — not for navigation.",
  track: "M 276 384 L 276 346 L 288 315 L 324 307 L 360 315 L 396 323 L 414 326",
  marks: [
    { id: "class-b", kind: "ring", cx: 414, cy: 326, r: 78, stroke: "#1a3f86", sw: 3, label: "CLASS B  SFC" },
    { id: "mode-c-veil", kind: "ring", cx: 414, cy: 326, r: 210, stroke: "#1a3f86", dash: "3 6", sw: 1.6, label: "30 NM VEIL" },
    { id: "runway-numbers", kind: "runway", x: 414, y: 326, len: 64, rot: -50, name: "13/31" },
    { id: "class-b", kind: "runway", x: 414, y: 326, len: 72, rot: 40, name: "4/22" },
    { id: "atis", kind: "note", x: 540, y: 246, lines: ["ATIS 125.95", "APP 120.8", "TWR 118.7", "GND 121.7", "CD 135.2"] },
    { id: "approach", kind: "label", x: 252, y: 384, text: "EXCLUSION", fill: "#1c3c52", size: 13 },
    { id: "approach", kind: "label", x: 252, y: 404, text: "below 1,300", fill: "#1c3c52", size: 11 },
    { id: "tower", kind: "label", x: 500, y: 360, text: "ELEV 21", fill: "#142033", size: 13 },
  ],
  beats: [
    {
      id: "surface",
      phase: "Chart brief",
      zoneId: "class-b",
      symbolId: "class-b",
      x: 276,
      y: 384,
      heading: 20,
      situation: "Over the Hudson at 1,200. LaGuardia is east, inside the solid blue line.",
      easy: [surface],
      medium: [surface],
      hard: [surface],
    },
    {
      id: "atis",
      phase: "ATIS",
      zoneId: "atis",
      symbolId: "atis",
      x: 276,
      y: 360,
      heading: 20,
      situation: "Information November, runway 31 in use, altimeter 30.02.",
      easy: [info],
      medium: [info],
      hard: [info],
    },
    {
      id: "call",
      phase: "Initial call",
      zoneId: "approach",
      symbolId: "approach",
      x: 276,
      y: 346,
      heading: 10,
      situation: "Still in the exclusion. Approach is 120.8.",
      easy: [initial],
      medium: [initial],
      hard: [initial],
    },
    {
      id: "squawk",
      phase: "Remain outside",
      zoneId: "class-b",
      symbolId: "mode-c",
      x: 288,
      y: 315,
      heading: 70,
      situation: "Approach answered. You have not been cleared in.",
      easy: [outside],
      medium: [outside],
      hard: [outside],
    },
    {
      id: "veil",
      phase: "The veil",
      zoneId: "mode-c-veil",
      symbolId: "mode-c-veil",
      x: 324,
      y: 307,
      heading: 90,
      situation: "You are inside the 30-mile veil and outside the solid blue surface area.",
      easy: [veil],
      medium: [veil],
      hard: [veil],
    },
    {
      id: "clearance",
      phase: "Class B clearance",
      zoneId: "class-b",
      symbolId: "class-b",
      x: 360,
      y: 315,
      heading: 90,
      situation: "Two miles from the surface area. This is the call that matters.",
      easy: [into],
      medium: [outside, into],
      hard: [outside, into],
    },
    {
      id: "runway",
      phase: "Runway",
      zoneId: "runway-numbers",
      symbolId: "runway-numbers",
      x: 396,
      y: 323,
      heading: 100,
      situation: "You are inside the Bravo at 2,000. Tower is about to own the runway.",
      easy: [landEasy],
      medium: [expect, change],
      hard: [expect, change, around],
    },
    {
      id: "rollout",
      phase: "On the runway",
      zoneId: "atis",
      symbolId: "ground",
      x: 414,
      y: 326,
      heading: 40,
      situation: "The runway call is done. The next frequency is the one that still owns the airplane.",
      easy: [ground],
      medium: [ground],
      hard: [afterGa],
    },
  ],
};
