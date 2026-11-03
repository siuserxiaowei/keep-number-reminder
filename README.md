# keep-number-reminder

Local-only **fifth-month** calendar reminder for infrequently used UK SIMs (designed around [giffgaff](https://www.giffgaff.com/)’s publicly documented inactivity boundary).

**Live tool (preferred):** https://getgiffgaff.com/tools/keep-number-reminder/

This repository mirrors the small date + `.ics` helpers so other blogs, READMEs, and scripts can link a clear open-source entry point. It does **not** talk to giffgaff APIs, does **not** store phone numbers, and is **not** affiliated with or endorsed by giffgaff.

## Why a fifth month?

giffgaff’s help articles describe deactivation after **six months** without a listed qualifying action. This project generates an **early buffer reminder at month 5** so you have time to verify your account yourself. That buffer is a site convention, not a change to the operator’s rule. Always re-read the current official article before acting:

- https://help.giffgaff.com/en/articles/242797-understanding-why-your-number-has-been-deactivated

Receiving SMS alone is **not** treated here as a listed qualifying action. Check the official list (call/SMS/MMS to another number with exclusions, mobile data, or buying credit/plan).

## Use in the browser

Open `demo/index.html` via any static file server (ES modules need HTTP). Or use the hosted page above.

```js
import { keepNumberReminderDate, keepNumberCalendar } from "./src/keep-number.js";

keepNumberReminderDate("2026-01-15"); // → "2026-06-15"
keepNumberCalendar("2026-01-15");     // → RFC5545 .ics string
```

The `.ics` file contains only the reminder date, a short bilingual summary, and the official help URL — never a phone number or account id.

## Chinese summary / 中文说明

- 输入「最近一次可验证有效动作」日期，本地算出第 **5** 个月缓冲提醒，并可导出标准日历文件。
- 官方停用边界仍以连续 **6** 个月无列明动作为准；第 5 个月是提前量，不是官方改周期。
- 日期只在本机计算；日历不含号码与账号。
- 完整产品页与规则伴读：https://getgiffgaff.com/tools/keep-number-reminder/  
  保号规则对照：https://getgiffgaff.com/guides/giffgaff-keep-number/

getgiffgaff 是面向中文用户的独立第三方 giffgaff / 英国 SIM 教程与购卡站，非运营商官网。

## License

MIT
