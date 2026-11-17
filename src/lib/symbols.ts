export type SymbolGroup =
  | "Airports"
  | "Radio"
  | "Airspace"
  | "Notes on the chart"
  | "Navigation and hazards";

export type ChartSymbol = {
  id: string;
  group: SymbolGroup;
  name: string;
  line: string;
  body: string;
};

export const SYMBOL_GROUPS: SymbolGroup[] = [
  "Airports",
  "Radio",
  "Airspace",
  "Notes on the chart",
  "Navigation and hazards",
];

export const symbols: ChartSymbol[] = [
  {
    id: "magenta-airport",
    group: "Airports",
    name: "Non-towered airport",
    line: "Magenta circle and runway ticks. No operating control tower.",
    body: "On a U.S. sectional the airport symbol is magenta when there is no tower in operation. The ticks show the runway alignment, not a clearance. You self-announce on the CTAF printed under the name. Field elevation is the number that is not a frequency.",
  },
  {
    id: "blue-airport",
    group: "Airports",
    name: "Towered airport",
    line: "Blue circle and runway ticks. A control tower is in operation.",
    body: "Blue means the tower is operating for the published hours. You need a clearance to taxi, to take off, and to land. After the tower closes, many of these fields are flown on CTAF and the chart shows that in the airport data. Do not treat a blue symbol as optional radio.",
  },
  {
    id: "private-r",
    group: "Airports",
    name: "Private airport",
    line: "An R in the airport circle. Private use, not a public landing.",
    body: "The R means restricted or private use. It is a landmark, not an alternate you may drop into because it looks closer. Landing there without the owner’s permission is a trespass, and it is not the field you were cleared to.",
  },
  {
    id: "heliport",
    group: "Airports",
    name: "Heliport",
    line: "A small H in a circle. Helicopters, not your runway.",
    body: "Hospital and downtown pads are printed so you do not mistake a pad for an airport with a runway. Fixed-wing traffic does not land there. In the New York area the pads sit under the same Class B shelves as the airports.",
  },
  {
    id: "beacon",
    group: "Airports",
    name: "Airport beacon",
    line: "A star beside the name. The field has a rotating beacon.",
    body: "The star is the beacon, not a star rating. A white-green beacon marks a lighted land airport. In Class B, C, or D, seeing the beacon on in the daytime is a hint the weather is below VFR minima. It is not a clearance and it is not the tower.",
  },
  {
    id: "field-elevation",
    group: "Airports",
    name: "Field elevation",
    line: "The elevation in feet MSL, printed with the airport data. Not a frequency and not a pattern altitude.",
    body: "North Harbor’s 23 and LaGuardia’s 21 are feet above sea level. Pattern altitude is usually about 1,000 feet AGL unless the chart or the Chart Supplement says otherwise. Do not fly the elevation number as if it were an assigned altitude.",
  },
  {
    id: "runway-numbers",
    group: "Airports",
    name: "Runway number",
    line: "The runway heading rounded to the nearest ten degrees, with the last digit dropped.",
    body: "Runway 31 is about 310° magnetic. The other end is 13. Runway 4 is about 040°, opposite 22. You land the runway ATC assigned or, at a non-towered field, the one that matches the wind. A prettier wind on the other end is a request, not a turn you make on short final.",
  },
  {
    id: "segmented-circle",
    group: "Airports",
    name: "Segmented circle and wind indicator",
    line: "The traffic-pattern indicator on the field. The wind cone shows the wind; the circle shows the pattern.",
    body: "The cone points the way the wind is going, so you take off and land into the wind. The segmented circle is where the pattern direction is signaled on the ground. On the chart, the absence of an RP note means a standard left pattern.",
  },
  {
    id: "rp",
    group: "Airports",
    name: "Right traffic (RP)",
    line: "RP beside a runway number means that runway uses right traffic.",
    body: "Standard traffic is left. RP is the exception, and it applies only to the runway it is printed on. Another airport’s RP is not your pattern. If the chart is silent, you fly left traffic.",
  },
  {
    id: "ctaf",
    group: "Radio",
    name: "CTAF",
    line: "The frequency everyone at a non-towered field uses to see and be seen.",
    body: "Common Traffic Advisory Frequency. The call is airport name, aircraft type and call sign, position, intention, and the airport name again. “North Harbor traffic, Cessna 123AB, entering left downwind runway 33, North Harbor.” There is no clearance to read back. UNICOM is often the same frequency; UNICOM is for airport services, CTAF is for traffic.",
  },
  {
    id: "atis",
    group: "Radio",
    name: "ATIS",
    line: "The recorded weather and runway in use. You tell ATC you have the letter.",
    body: "Automatic Terminal Information Service. Listen before you call ground, tower, or approach. The broadcast ends with a phonetic letter. Your first call includes “with November,” not a repeat of the whole weather. If the letter changes while you are taxiing, the plan may have changed. Get the new one.",
  },
  {
    id: "ground",
    group: "Radio",
    name: "Ground control",
    line: "Movement on the taxiways. Not a takeoff clearance, and not a frequency you switch to while still on the runway.",
    body: "Call ground with your position and the ATIS letter. Read back the route and any hold-short. After landing, stay with tower until you are clear of the runway, then switch to ground. Switching early leaves you on the runway without the controller who owns it.",
  },
  {
    id: "tower",
    group: "Radio",
    name: "Control tower",
    line: "The frequency that owns the runway and the pattern.",
    body: "“Cleared for takeoff” and “cleared to land” come from tower. “Line up and wait” means taxi onto the runway and stop. It is not permission to roll. “Go around” means add power, climb on the runway heading they give you, and do not land. Read back the runway and the restriction.",
  },
  {
    id: "approach",
    group: "Radio",
    name: "Approach control",
    line: "The radar frequency outside the tower’s airspace. This is who clears you into Class B or C.",
    body: "First call is who you are, where you are, altitude, what you want, and the ATIS letter. “Stand by” or “remain outside” means you do not enter. A Class B clearance has to include the words into the Bravo. Heading and altitude in the same transmission are part of the clearance and are read back.",
  },
  {
    id: "class-g",
    group: "Airspace",
    name: "Class G",
    line: "Uncontrolled airspace. No clearance, and the weather minimums are the lowest on the chart.",
    body: "Below 1,200 feet AGL in the daytime, Class G is 1 statute mile and clear of clouds. That is legal, not comfortable. You still see and avoid, and you still stay out of the Class E, D, C, and B drawn around you. G is what is left when no other class is drawn to the surface.",
  },
  {
    id: "class-e",
    group: "Airspace",
    name: "Class E",
    line: "Controlled airspace that is not B, C, or D. A dashed magenta line means E down to the surface.",
    body: "Where the dashed magenta ring is drawn, Class E starts at the surface. Elsewhere the floor is often 700 or 1,200 feet AGL, shown by the vignette shading. In E below 10,000 feet the VFR weather is 3 miles, 500 below, 1,000 above, 2,000 horizontal. No radio clearance is required just to be there.",
  },
  {
    id: "class-d",
    group: "Airspace",
    name: "Class D",
    line: "Dashed blue circle. Towered airport, surface up to the ceiling in the box.",
    body: "The dashed blue line is the lateral boundary. The number in the box, such as [25], is the ceiling in hundreds of feet: 2,500 feet MSL. You need two-way radio with the tower before you enter. VFR weather is the same 3-152 used in Class C and E. Above the ceiling you are not still “in the Delta.”",
  },
  {
    id: "class-b-shelf",
    group: "Airspace",
    name: "Class B shelf",
    line: "Solid blue arc. The fraction is top over floor, in hundreds of feet.",
    body: "80/30 means the shelf tops at 8,000 feet MSL and the floor is 3,000 feet MSL. You may fly under the floor without a Bravo clearance, and you may not climb through the floor without one. Under the lateral limits of Class B the speed limit is 200 KIAS. A shelf is still Class B. The phrase is “cleared into the Bravo airspace.”",
  },
  {
    id: "class-c",
    group: "Airspace",
    name: "Class C core",
    line: "Solid magenta circle. Usually surface to a published top, often 4,000 feet.",
    body: "The core is the inner circle, typically 40/SFC. Establish two-way radio with approach before you cross the line. If the controller says “remain outside the Charlie,” two-way radio exists and you still stay out. VFR weather is 3 miles and 500/1,000/2,000. Mode C and ADS-B Out are required in and above Class C.",
  },
  {
    id: "class-c-shelf",
    group: "Airspace",
    name: "Class C shelf",
    line: "The outer magenta ring. A floor and a top, not a wall down to the ground.",
    body: "40/15 means the outer area runs from 1,500 feet MSL up to 4,000. Below 1,500 you are under the shelf, usually in Class E, and you are not in the Charlie. That is not a trick to sneak into the airport. The core inside it still goes to the surface, and the runway still belongs to tower.",
  },
  {
    id: "class-b",
    group: "Airspace",
    name: "Class B surface area",
    line: "Solid blue, floor printed SFC. There is no altitude to duck under.",
    body: "Around LaGuardia the New York Class B comes to the surface. A VFR aircraft needs an ATC clearance to enter, plus the equipment and the weather: 3 miles and clear of clouds. “Cleared into the Bravo” is the phrase. Expect, proceed, or a heading alone is not that phrase. The River Visual runway 13 is an instrument procedure, not a VFR shortcut through the exclusion.",
  },
  {
    id: "mode-c",
    group: "Airspace",
    name: "Mode C and ADS-B",
    line: "Altitude reporting, and ADS-B Out, before you enter B or C.",
    body: "A discrete squawk is not decoration. You read back the code and you do not enter just because you are squawking it. ADS-B Out is required where a Mode C transponder is required, including Class B and C and the veil. “Radar contact” still does not, by itself, clear you into the airspace.",
  },
  {
    id: "mode-c-veil",
    group: "Airspace",
    name: "Mode C veil",
    line: "The 30-nautical-mile ring around the primary Class B airport.",
    body: "Inside the veil you need an operating Mode C transponder and ADS-B Out, from the surface up. The veil is not the Class B boundary. You can be inside the veil and still outside the Bravo, and you can be told to remain outside the Bravo while you are already in the veil.",
  },
  {
    id: "sfra",
    group: "Airspace",
    name: "Hudson River exclusion",
    line: "A cutout under the New York Class B. It is not a clearance into LaGuardia.",
    body: "14 CFR 93 Subpart W is the Hudson River and East River Exclusion. Over the Hudson, from the surface up to but not including the Class B floor, you can transit without a Bravo clearance if you follow the SFRA. The floor of the Bravo over the river is 1,300 feet MSL. The moment you need to leave the river for LaGuardia, you need a clearance.",
  },
  {
    id: "exclusion-altitude",
    group: "Notes on the chart",
    name: "Exclusion altitudes",
    line: "Transient traffic flies at or above 1,000 and below 1,300. Local traffic stays below 1,000.",
    body: "A transient flight is one that goes from one end of the exclusion to the other without maneuvering. That band is 1,000 feet MSL up to, but not including, 1,300. Local sightseeing stays below 1,000. 1,300 and above is Class B, the Skyline route, and it needs a clearance. “Close enough” at 1,400 is a Bravo bust.",
  },
  {
    id: "shoreline",
    group: "Notes on the chart",
    name: "Hudson shoreline rule",
    line: "Southbound on the west shore. Northbound on the east shore.",
    body: "14 CFR 93.352 puts southbound traffic along the west bank and northbound along the east bank, inside the banks of the river. You do not swap sides to avoid someone who is already on your side. You hold your shore, announce again, and pass with the picture the rule was written for.",
  },
  {
    id: "reporting-point",
    group: "Notes on the chart",
    name: "Mandatory reporting point",
    line: "Self-announce at the points the New York TAC marks, on 123.05.",
    body: "The call is aircraft type, position, direction, and altitude. “Cessna, George Washington Bridge, one thousand one hundred, southbound.” A VFR checkpoint flag is only a landmark. A mandatory SFRA report is a radio call. This training sheet flags Alpine and the George Washington Bridge as the reports this flight actually makes.",
  },
  {
    id: "speed-140",
    group: "Notes on the chart",
    name: "140 knots in the exclusion",
    line: "Indicated airspeed not above 140 knots while you are in the SFRA.",
    body: "14 CFR 93.351 sets 140 KIAS for the Hudson and East River exclusions. Lights on. The 200-knot rule under Class B and the 250-knot rule below 10,000 still exist, and 140 is the tighter limit while you are in the exclusion. You slow down before you enter, not after someone asks.",
  },
  {
    id: "east-river",
    group: "Notes on the chart",
    name: "East River exclusion",
    line: "Fixed-wing aircraft stay out unless LaGuardia authorizes them.",
    body: "The East River exclusion is not a second Hudson. Fixed-wing airplanes are prohibited unless ATC authorizes the flight. The published path is to contact LaGuardia Tower on 126.05 before Governors Island, and to monitor 123.075. A VFR transit down the Hudson does not turn east at the Battery.",
  },
  {
    id: "skyline",
    group: "Notes on the chart",
    name: "Skyline route",
    line: "Class B at 1,300 feet and above over the Hudson. Clearance required.",
    body: "The Skyline route is the Class B transition over the river, not the exclusion underneath it. Southbound you get the clearance from LaGuardia on 126.05 before Alpine. Northbound you get it from Newark Tower on 127.85 before the Verrazano. Climbing into it and calling later is entering Class B without a clearance.",
  },
  {
    id: "vfr-checkpoint",
    group: "Navigation and hazards",
    name: "VFR checkpoint",
    line: "The magenta flag. A landmark you planned to see, not a reporting point by itself.",
    body: "Checkpoints are how a VFR pilot knows where the airplane is without a needle. You brief them before engine start. On the Hudson sheet, a flag is a place you should see outside. It is not automatically a place you must transmit. The SFRA reports are the ones the exclusion requires.",
  },
  {
    id: "mef",
    group: "Navigation and hazards",
    name: "Maximum elevation figure",
    line: "The big number in a grid square. Highest terrain or obstacle there, rounded up, in hundreds of feet.",
    body: "16 means 1,600 feet MSL. It is not an assigned altitude, a minimum vectoring altitude, or a route. It tells you how high the square can reach. Cross-country altitude still has to clear terrain, obstacles, and the airspace floors printed on top of that.",
  },
  {
    id: "obstruction",
    group: "Navigation and hazards",
    name: "Obstruction",
    line: "A tower symbol. The top number is MSL. The number in parentheses is AGL.",
    body: "2049 (549) is a tower whose top is 2,049 feet above sea level and whose own height is 549 feet. You miss it sideways and vertically. A quiet airport picture does not remove it. Lighted towers are the ones with the lights drawn at the top of the symbol.",
  },
  {
    id: "restricted",
    group: "Navigation and hazards",
    name: "Restricted area",
    line: "The hatched box with an R number. Not a suggestion.",
    body: "When a restricted area is active you stay out unless ATC authorizes the transit. The chart does not promise it is cold. You check times before you plan across it, and a go-around is not a reason to cut the corner through the box.",
  },
  {
    id: "vor",
    group: "Navigation and hazards",
    name: "VOR",
    line: "The compass rose. A radio navigation aid, radials measured from magnetic north.",
    body: "The VOR is a cross-check, not a picture of the runway. The frequency and the identifier are printed with the rose. A radial is a bearing from the station. On a VFR arrival you can use it to confirm which side of the field you are on before you accept a heading into the airspace.",
  },
  {
    id: "parachute",
    group: "Navigation and hazards",
    name: "Parachute jump area",
    line: "The parachute symbol. Activity that may be there whether or not you were told.",
    body: "The symbol marks a jump area. ATC may vector you around it, and the chart already told you it exists. You do not overfly it to save a mile. If approach says parachute activity and gives a heading, you fly the heading.",
  },
  {
    id: "hold-short",
    group: "Navigation and hazards",
    name: "Runway holding position",
    line: "Four yellow lines. Solid lines are the side you do not cross.",
    body: "Two solid and two dashed. You stop on the solid side. A taxi clearance that includes “hold short” is read back every time, with the runway. “Line up and wait” is the only instruction that puts you on the runway short of a takeoff clearance. Neither one is “cleared for takeoff.”",
  },
];

const byId = new Map(symbols.map((symbol) => [symbol.id, symbol]));

export function getSymbol(id: string): ChartSymbol {
  const symbol = byId.get(id);
  if (!symbol) throw new Error(`Unknown chart symbol ${id}`);
  return symbol;
}
