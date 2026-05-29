# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shipping.spec.js >> Address Shipping same-tab tests >> Address Shipping > SHIP-01 Shipping page opens from checkout
- Location: tests/shipping.spec.js:30:5

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

╔════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Looks like you launched a headed browser without having a XServer running.                     ║
║ Set either 'headless: true' or use 'xvfb-run <your-playwright-app>' before running Playwright. ║
║                                                                                                ║
║ <3 Playwright Team                                                                             ║
╚════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /home/runner/.cache/ms-playwright/webkit-2287/pw_run.sh --inspector-pipe --no-startup-window
  - <launched> pid=5611
  - [pid=5611][err]
  - [pid=5611][err] (process:5617): Gtk-WARNING **: 06:17:32.731: Failed to open display
  - [pid=5611] <gracefully close start>
  - [pid=5611] <kill>
  - [pid=5611] <will force kill>
  - [pid=5611] <process did exit: exitCode=1, signal=null>
  - [pid=5611] starting temporary directories cleanup
  - [pid=5611] finished temporary directories cleanup
  - [pid=5611] <gracefully close end>

```