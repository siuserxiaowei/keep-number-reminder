import {
  keepNumberBoundaryEstimate,
  keepNumberCalendar,
  keepNumberReminderDate,
} from "./keep-number.js";

const lastActivity = document.querySelector("#last-activity");
const reminderDate = document.querySelector("#reminder-date");
const boundaryDate = document.querySelector("#boundary-date");
const status = document.querySelector("#status");
const downloadButton = document.querySelector("#download");
const result = document.querySelector("#result");

function render() {
  const value = lastActivity.value;
  const reminder = keepNumberReminderDate(value);
  const boundary = keepNumberBoundaryEstimate(value);
  const calendar = reminder ? keepNumberCalendar(value) : null;
  downloadButton.disabled = !calendar;

  if (!value) {
    reminderDate.textContent = "—";
    boundaryDate.textContent = "—";
    status.textContent = "";
    return;
  }

  if (!reminder || !boundary || !calendar) {
    reminderDate.textContent = "—";
    boundaryDate.textContent = "—";
    status.textContent = "Enter a real calendar date. / 请输入真实的日历日期。";
    return;
  }

  reminderDate.textContent = reminder;
  boundaryDate.textContent = boundary;
  status.textContent =
    "Calculated in this browser only. Nothing was sent or saved. / 只在本浏览器内算完，没有发送，也没有保存。";
}

function downloadCalendar() {
  const reminder = keepNumberReminderDate(lastActivity.value);
  const calendar = keepNumberCalendar(lastActivity.value);
  if (!reminder || !calendar) return;

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `keep-number-reminder-${reminder}.ics`;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

lastActivity.addEventListener("input", render);
lastActivity.addEventListener("change", render);
document.querySelector("#calculate").addEventListener("click", () => {
  render();
  result.focus();
});
downloadButton.addEventListener("click", downloadCalendar);
render();
