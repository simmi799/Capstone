# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: payment.spec.js >> Payment same-tab tests >> Payment > PAY-01 Payment opens after valid shipping
- Location: tests/payment.spec.js:30:5

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
  - <launched> pid=5519
  - [pid=5519][err]
  - [pid=5519][err] (process:5525): Gtk-WARNING **: 06:17:30.153: Failed to open display
  - [pid=5519] <gracefully close start>
  - [pid=5519] <kill>
  - [pid=5519] <will force kill>
  - [pid=5519] <process did exit: exitCode=1, signal=null>
  - [pid=5519] starting temporary directories cleanup
  - [pid=5519] finished temporary directories cleanup
  - [pid=5519] <gracefully close end>

```