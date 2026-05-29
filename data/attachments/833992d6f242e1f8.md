# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.js >> API Internal same-tab tests >> API Internal > API-01 Product list API returns status 200
- Location: tests/api.spec.js:30:5

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
  - <launched> pid=5450
  - [pid=5450][err]
  - [pid=5450][err] (process:5456): Gtk-WARNING **: 06:17:28.238: Failed to open display
  - [pid=5450] <gracefully close start>
  - [pid=5450] <kill>
  - [pid=5450] <will force kill>
  - [pid=5450] <process did exit: exitCode=1, signal=null>
  - [pid=5450] starting temporary directories cleanup
  - [pid=5450] finished temporary directories cleanup
  - [pid=5450] <gracefully close end>

```