# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: support.spec.js >> Customer Support same-tab tests >> Customer Support > SUP-01 Support page opens
- Location: tests/support.spec.js:30:5

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
  - <launched> pid=5634
  - [pid=5634][err]
  - [pid=5634][err] (process:5640): Gtk-WARNING **: 06:17:33.378: Failed to open display
  - [pid=5634] <gracefully close start>
  - [pid=5634] <kill>
  - [pid=5634] <will force kill>
  - [pid=5634] <process did exit: exitCode=1, signal=null>
  - [pid=5634] starting temporary directories cleanup
  - [pid=5634] finished temporary directories cleanup
  - [pid=5634] <gracefully close end>

```