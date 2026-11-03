# Inactivity reminder rules / 不活跃提醒规则

The fifth-month date in this project is a conservative habit. It is an early buffer relative to a roughly six-month inactivity boundary. It does not change that boundary, and it does not show whether a number is still active.

本仓库里的第 5 个月日期是一种保守习惯：相对大约 6 个月的不活跃边界，提前一个日历月提醒。它不改变那条边界，也不能说明号码现在是否有效。

Verify the current wording before you act / 行动前核对原文：

<https://help.giffgaff.com/en/articles/242797-understanding-why-your-number-has-been-deactivated>

Checked against that article on 2026-11-03. The page said it had been updated more than a week earlier. At that reading it described a SIM as inactive when it has not been used in the last 6 months, and it listed the kinds of use that count (a call, SMS, or MMS to another number, with exclusions stated on the page; a mobile-data connection; or an Airtime Credit or plan purchase). Merely receiving an SMS was not in that list. The same article said a deactivated SIM cannot be reactivated, and it described a PAC request window after deactivation.

2026-11-03 对照过这篇文章。页面写着更新于一周多以前。当时的表述是：SIM 在过去 6 个月没有使用，会被视为不活跃；并列出算作使用的几类行为（给另一个号码打电话、发 SMS 或 MMS，排除项以该页原文为准；用移动数据连上一次网；或购买一次 Airtime Credit 或套餐）。只接收短信不在那份列表里。同一篇文章写明，已经停用的 SIM 不能重新激活，并说明了停用后申请 PAC 的时间窗。

Those sentences belong to giffgaff's help centre and can change. This repository does not add its own day count on top of them (no "180 days" or similar).

这些句子属于 giffgaff 帮助中心，以后可能改。本仓库不在原文之外再造一个天数（例如不写「180 天」这类换算）。

The exported calendar uses calendar-month addition in the browser: the date you enter, plus 5 calendar months, clamped to the last valid day of the target month (31 January becomes 30 June). The separate plus-6-calendar-months figure, when the page shows it, is only a local reading aid for the roughly six-month boundary. It is not a deactivation timestamp from giffgaff, and it is not written into the `.ics` file.

导出的日历在浏览器里按日历月相加：输入日期加 5 个日历月，若目标月没有这一天，就取该月最后一天（1 月 31 日会落到 6 月 30 日）。页面上另显示的「加 6 个日历月」只是本地对照大约 6 个月边界的读数，不是 giffgaff 给出的停用时刻，也不会写进 `.ics`。

This tool does not query number status, does not provide one-time passwords (接码), and does not replace the official article, a login to your own account, or a PAC request.

本工具不查询号码状态，不提供接码，也不能代替官方文章、你自己登录账户，或 PAC 申请。

Companion reading from the independent site getgiffgaff.com (not giffgaff Limited) / 独立站点 getgiffgaff.com 的伴读（不是 giffgaff Limited）：

- <https://getgiffgaff.com/guides/giffgaff-keep-number/>
- <https://getgiffgaff.com/guides/giffgaff-pac/>
