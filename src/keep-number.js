/**
 * Local-only fifth-month keep-number reminder helpers.
 * Dates stay in the browser / caller — no phone numbers or accounts are stored.
 */

function isoDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
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

/** Return YYYY-MM-DD for lastActionDate + 5 months (early buffer before the 6-month rule). */
export function keepNumberReminderDate(lastActionDate) {
  const date = isoDate(lastActionDate);
  if (!date) return null;
  const originalDay = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + 5);
  const lastDay = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(originalDay, lastDay));
  return formatIsoDate(date);
}

/** Build a minimal .ics calendar (no phone number / account fields). */
export function keepNumberCalendar(lastActionDate) {
  const reminder = keepNumberReminderDate(lastActionDate);
  if (!reminder) return null;
  const compact = reminder.replaceAll("-", "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//getgiffgaff//Keep Number Reminder//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:keep-number-${compact}@getgiffgaff.com`,
    `DTSTART;VALUE=DATE:${compact}`,
    "SUMMARY:Check giffgaff number activity / 检查保号状态",
    "DESCRIPTION:Review the official inactivity rule and verify your account and qualifying activity. This fifth-month reminder is an early risk buffer\\, not a service guarantee. / 请复核官方规则；第 5 个月提醒不是号码状态保证。",
    "URL:https://help.giffgaff.com/en/articles/242797-understanding-why-your-number-has-been-deactivated",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
