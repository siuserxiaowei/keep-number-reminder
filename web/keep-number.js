/**
 * Browser-local fifth-month keep-number reminder.
 * Pure date math and an .ics string. No network, no storage, no phone numbers.
 */

const OFFICIAL_INACTIVITY_HELP =
  "https://help.giffgaff.com/en/articles/242797-understanding-why-your-number-has-been-deactivated";

function isoDate(value) {
  const match = String(value ?? "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    Number.isNaN(date.getTime())
    || date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

function formatIsoDate(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function compactDate(iso) {
  return iso.replaceAll("-", "");
}

/**
 * Add calendar months, clamping to the last valid day of the target month.
 * 2026-01-31 plus 5 months is 2026-06-30. This is not a fixed day count.
 */
export function addCalendarMonths(lastActionDate, months) {
  const date = isoDate(lastActionDate);
  if (!date || !Number.isInteger(months) || months < -240 || months > 240) {
    return null;
  }
  const originalDay = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(originalDay, lastDay));
  return formatIsoDate(date);
}

/** Fifth-month reminder: last activity plus 5 calendar months. */
export function keepNumberReminderDate(lastActionDate) {
  return addCalendarMonths(lastActionDate, 5);
}

/**
 * Local reading aid for the roughly six-month inactivity boundary.
 * Same calendar-month method plus 6. Not an official deactivation timestamp.
 */
export function keepNumberBoundaryEstimate(lastActionDate) {
  return addCalendarMonths(lastActionDate, 6);
}

function icsEscape(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("\r\n", "\n")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function foldLine(line) {
  const encoder = new TextEncoder();
  const parts = [];
  let current = "";
  let currentBytes = 0;
  const limit = () => (parts.length === 0 ? 75 : 74);
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (current && currentBytes + size > limit()) {
      parts.push(current);
      current = "";
      currentBytes = 0;
    }
    current += char;
    currentBytes += size;
  }
  if (current) parts.push(current);
  return parts.join("\r\n ");
}

/** RFC 5545 calendar for the fifth-month date only. No phone number or account id. */
export function keepNumberCalendar(lastActionDate) {
  const reminder = keepNumberReminderDate(lastActionDate);
  const start = reminder ? isoDate(reminder) : null;
  if (!reminder || !start) return null;
  const end = new Date(start.getTime());
  end.setUTCDate(end.getUTCDate() + 1);
  const endIso = formatIsoDate(end);
  const stamp = `${compactDate(reminder)}T120000Z`;
  const description = [
    "Fifth-month local buffer before the roughly six-month inactivity boundary.",
    "This is not a number-status check and not an official giffgaff notice.",
    "Verify the current help article and your own account.",
    `Official help: ${OFFICIAL_INACTIVITY_HELP}`,
    "第5个月本地缓冲，对应大约6个月不活跃边界的提前量。这不是号码状态查询，也不是 giffgaff 官方通知。请核对官方帮助原文和你自己的账户。",
  ].join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//getgiffgaff.com//Keep Number Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:keep-number-5m-${compactDate(reminder)}@getgiffgaff.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compactDate(reminder)}`,
    `DTEND;VALUE=DATE:${compactDate(endIso)}`,
    "SUMMARY:giffgaff keep-number check (5th month) / 保号第5个月复核",
    `DESCRIPTION:${icsEscape(description)}`,
    `URL:${OFFICIAL_INACTIVITY_HELP}`,
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}
