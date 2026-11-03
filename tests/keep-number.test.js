import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  keepNumberBoundaryEstimate,
  keepNumberCalendar,
  keepNumberReminderDate,
} from "../web/keep-number.js";

const encoder = new TextEncoder();

function unfold(ics) {
  return ics.replaceAll("\r\n ", "");
}

test("adds five calendar months and clamps short months", () => {
  assert.equal(keepNumberReminderDate("2026-01-15"), "2026-06-15");
  assert.equal(keepNumberReminderDate("2026-01-31"), "2026-06-30");
  assert.equal(keepNumberReminderDate("2025-10-31"), "2026-03-31");
  assert.equal(keepNumberReminderDate("2024-09-30"), "2025-02-28");
  assert.equal(keepNumberReminderDate("2023-09-30"), "2024-02-29");
  assert.equal(keepNumberReminderDate("2026-08-31"), "2027-01-31");
  assert.equal(keepNumberBoundaryEstimate("2026-01-15"), "2026-07-15");
  assert.equal(keepNumberBoundaryEstimate("2026-03-31"), "2026-09-30");
  assert.equal(keepNumberBoundaryEstimate("2023-09-30"), "2024-03-30");
});

test("rejects dates that are not real YYYY-MM-DD calendar days", () => {
  for (const value of ["", "2026-02-31", "2026-02-29", "2026-1-15", "15-01-2026", null, undefined, "2026-01-15T00:00:00Z"]) {
    assert.equal(keepNumberReminderDate(value), null);
    assert.equal(keepNumberCalendar(value), null);
    assert.equal(keepNumberBoundaryEstimate(value), null);
  }
});

test("ics is a deterministic fifth-month event with no input date and no phone number", () => {
  const ics = keepNumberCalendar("2026-01-15");
  assert.ok(ics);
  assert.equal(ics.replaceAll("\r\n", "").includes("\n"), false);
  for (const line of ics.split("\r\n")) {
    if (line === "") continue;
    assert.ok(encoder.encode(line).length <= 75, line);
  }
  const text = unfold(ics);
  assert.match(text, /^BEGIN:VCALENDAR/);
  assert.match(text, /DTSTART;VALUE=DATE:20260615/);
  assert.match(text, /DTEND;VALUE=DATE:20260616/);
  assert.match(text, /UID:keep-number-5m-20260615@getgiffgaff.com/);
  assert.match(text, /https:\/\/help\.giffgaff\.com\/en\/articles\/242797-understanding-why-your-number-has-been-deactivated/);
  assert.match(text, /第5个月/);
  assert.equal(text.includes("20260115"), false);
  assert.equal(text.includes("2026-01-15"), false);
  assert.equal(text.includes("20260715"), false);
  assert.equal(text.includes("TEL"), false);
  assert.equal(text.includes("+44"), false);
  assert.equal(keepNumberCalendar("2026-01-15"), ics);
});

test("the static page does not store or submit the date", () => {
  const html = readFileSync(new URL("../web/index.html", import.meta.url), "utf8");
  const app = readFileSync(new URL("../web/app.js", import.meta.url), "utf8");
  const lib = readFileSync(new URL("../web/keep-number.js", import.meta.url), "utf8");
  const source = `${html}\n${app}\n${lib}`;
  for (const token of ["localStorage", "sessionStorage", "indexedDB", "fetch(", "XMLHttpRequest", "sendBeacon", "WebSocket", "type=\"tel\"", "<form"]) {
    assert.equal(source.includes(token), false, token);
  }
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /getgiffgaff\.com/);
  assert.match(html, /Not affiliated with or endorsed by giffgaff Limited/);
  assert.match(html, /无隶属/);
});
