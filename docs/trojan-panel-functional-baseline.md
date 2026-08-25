# Trojan Panel functional baseline

Fixed at parent commit `eca21520031e733b234d7a5e7aedbb96274d3b81` and UI
commit `1d4e286b3395354ca956b7e4ac6bef8af764b5df`. This inventory governs
content and interaction only; it is not a material appearance reference.

| Area | Required structure and behavior |
| --- | --- |
| Authentication | Login/register, fully visible verification image, no crop or extra vertical gap |
| Admin dashboard | Metrics, traffic ranking with period, server detail with server/period filters |
| User dashboard | Remaining-traffic hero, subscription export, QR only for supported clients |
| Accounts | Search, state filter, bulk create, import/export, row actions |
| Nodes | Protocol badges, client visibility, connection detail drawer |
| Servers | List/detail, combined/separate quota, kernel summary, resource charts, mTLS probe |
| Kernel | Version catalog, inventory, canary task creation, task history and retry |
| File tasks | Types 0–4, task state, artifact download |
| Email | Recipient filter and state -1/0/1 |
| Blacklist | IP/FQDN validation feedback |
| Settings | Account/email/appearance tabs; submit the complete DTO |
| Profile | Password and profile editing |

Cross-cutting constraints:

- administrator and ordinary-user models use one Shell;
- the host adapter performs permission filtering before rendering;
- browser mode follows the system initially; a manual mode is session-only;
- palette is persisted locally;
- desktop sidebar and mobile segmented bottom navigation share one nav model;
- the page itself does not scroll, while content/list regions own scrolling;
- table header and rows share one horizontal scroll container;
- overlay, select, date, dialog, and feedback surfaces share one layer system;
- all controls retain keyboard focus visibility and reduced-motion behavior.
