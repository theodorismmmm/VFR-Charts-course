import { courses } from "../src/lib/courses";
import { gradeClick, rawGap } from "../src/lib/plate-hit";
import { getPlate, plates } from "../src/lib/plates";

let failed = 0;

function assert(cond: boolean, message: string) {
  if (!cond) {
    failed += 1;
    console.error("FAIL", message);
  }
}

for (const lesson of courses[0].lessons) {
  assert(Boolean(getPlate(lesson.id)), `missing plate ${lesson.id}`);
}

for (const plate of plates) {
  const aspect = plate.height / plate.width;
  const ids = new Set(plate.marks.map((m) => m.id));
  assert(ids.size === plate.marks.length, `${plate.lessonId} duplicate mark ids`);
  for (const question of plate.questions) {
    assert(ids.has(question.markId), `${plate.lessonId} missing ${question.markId}`);
  }

  for (const mark of plate.marks) {
    const gap = rawGap(mark.shape, mark, mark, aspect);
    assert(gap <= 0.4, `${plate.lessonId} ${mark.id} pin is off its shape (gap ${gap.toFixed(2)})`);
    for (const minStroke of [0, 6]) {
      const grade = gradeClick(plate.marks, mark.id, { x: mark.x, y: mark.y }, aspect, minStroke);
      assert(
        grade.result === "correct",
        `${plate.lessonId} click on ${mark.id} (slop ${minStroke}) graded ${grade.result}${grade.result === "other" ? " → " + grade.mark.id : ""}`,
      );
    }
  }
}

const chart = plates.find((p) => p.lessonId === "chart-symbols");
if (chart) {
  const aspect = chart.height / chart.width;
  const airport = chart.marks.find((m) => m.id === "towered")!;
  const ring = gradeClick(chart.marks, "class-c", airport, aspect, 0);
  assert(
    ring.result === "other" && ring.mark.id === "towered",
    "airport symbol must not count as the Class C ring",
  );
  const north = chart.marks.find((m) => m.id === "class-c")!;
  const asAirport = gradeClick(chart.marks, "towered", north, aspect, 0);
  assert(
    asAirport.result === "other" && asAirport.mark.id === "class-c",
    "Class C pin must not count as the airport",
  );
}

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
console.log(`ok ${plates.length} plates`);
