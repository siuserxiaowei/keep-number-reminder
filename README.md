# keep-number-reminder

**Live tool / 在线工具：** <https://getgiffgaff.com/tools/keep-number-reminder/>

在浏览器本地，把「最近一次可核对的使用日期」换成第 5 个月的保号日历提醒，并导出 `.ics`。日期和号码不会离开这台浏览器。

A browser-local reminder that turns a last-activity date into a fifth-month calendar event and an `.ics` file. Dates and numbers stay on the device.

## Third-party disclosure / 第三方说明

Maintained by [getgiffgaff.com](https://getgiffgaff.com/), an independent third party. Not affiliated with or endorsed by giffgaff Limited.

由 [getgiffgaff.com](https://getgiffgaff.com/) 维护，独立第三方，不隶属 giffgaff Limited，也未获其背书。

G0 / G2 are SKU labels used by the getgiffgaff shop. They are not official giffgaff product names.

G0 / G2 是 getgiffgaff 店铺用来区分货源的 SKU 标签，不是 giffgaff 官方产品名。

## What it does / 它做什么

- Takes a last-activity date you type into the page.
- Adds five calendar months (clamped to the last valid day of the target month) and shows that fifth-month reminder.
- Downloads one all-day `.ics` event for that reminder date. The file has no phone number.
- Runs entirely in the browser. There is no backend.

- 你在页面里输入一个最近使用日期。
- 按日历月加 5 个月（目标月没有这一天时，取该月最后一天），得到第 5 个月提醒日。
- 下载这一天的全天 `.ics`。文件里没有电话号码。
- 全部在浏览器内完成，没有后端。

## What it does not / 它不做什么

- It does not query whether a number is still active.
- It does not send one-time passwords or provide 接码.
- It does not replace [giffgaff official help](https://help.giffgaff.com/en/articles/242797-understanding-why-your-number-has-been-deactivated), a login to your own account, or a PAC request.
- It does not upload dates. The page has no phone-number field and does not write dates or numbers to `localStorage`.
- The fifth-month date is an early buffer. It is not an official change of the inactivity rule, and it is not proof the number is safe.

- 不查询号码是否仍然有效。
- 不发送验证码，不提供接码。
- 不能代替 [giffgaff 官方帮助](https://help.giffgaff.com/en/articles/242797-understanding-why-your-number-has-been-deactivated)、你自己登录官方账户核对，或 PAC 转号申请。
- 不上传日期。页面没有电话号码输入框，也不会把日期或号码写入 `localStorage`。
- 第 5 个月是提前缓冲，不是官方把规则改成了 5 个月，也不能证明号码仍然安全。

## Quick start / 快速开始

Open the live tool / 打开在线工具：

<https://getgiffgaff.com/tools/keep-number-reminder/>

Or serve this repository and open `web/index.html` / 或在本仓库起一个静态服务器，打开 `web/index.html`：

```bash
python3 -m http.server 8080
```

Visit <http://127.0.0.1:8080/web/>.

打开 <http://127.0.0.1:8080/web/>。

A double-click on the HTML file (`file://`) can block its ES modules. Use a static server.

直接双击打开 `file://` 时，浏览器可能拦截 ES module。请用静态服务器。

The date helpers can also be imported from Node or a bundler. They do not perform network I/O / 日期函数也可在 Node 或其他打包器里引用，它们不做任何网络请求：

```js
import { keepNumberReminderDate, keepNumberCalendar } from "./web/keep-number.js";

keepNumberReminderDate("2026-01-15"); // "2026-06-15"
keepNumberCalendar("2026-01-15");     // RFC 5545 text, no phone number
```

## Rules / 规则边界

The fifth-month reminder is a conservative habit relative to the roughly six-month inactivity boundary described in giffgaff's own help. Confirm the current article before you act. This repository does not invent an extra day count. Notes and the official link: [docs/rules.md](docs/rules.md).

第 5 个月提醒是相对官方帮助里「大约 6 个月不活跃」边界的保守提前量。行动前请核对官方原文。本仓库不另造一个天数。说明与官方链接见 [docs/rules.md](docs/rules.md)。

Companion guides from the same independent site / 同一独立站点的伴读（不是运营商官网）：

- <https://getgiffgaff.com/guides/giffgaff-keep-number/>
- <https://getgiffgaff.com/guides/giffgaff-pac/>

## Contributing / 贡献

- Do not commit secrets, tokens, or credentials.
- Do not commit user phone numbers, PAC or STAC codes, account identifiers, or screenshots that contain them.
- Do not add a backend, analytics call, or browser storage that receives dates or phone numbers.
- When you describe the inactivity rule, link the official help article. Do not invent day counts.

- 不要提交密钥、令牌或凭证。
- 不要提交用户电话号码、PAC / STAC、账号标识，或包含这些内容的截图。
- 不要添加会接收日期或电话号码的后端、统计请求或浏览器存储。
- 描述不活跃规则时，链接官方帮助原文，不要自行编造天数。

## License / 许可证

[MIT](LICENSE)
