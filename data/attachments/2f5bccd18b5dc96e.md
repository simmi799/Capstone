# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.js >> User Profile same-tab tests >> User Profile > PROF-01 Profile page opens
- Location: tests/profile.spec.js:31:5

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Looks like you launched a headed browser without having a XServer running.                     ║
║ Set either 'headless: true' or use 'xvfb-run <your-playwright-app>' before running Playwright. ║
║                                                                                                ║
║ <3 Playwright Team                                                                             ║
╚════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /home/runner/.cache/ms-playwright/firefox-1522/firefox/firefox -no-remote -wait-for-browser -foreground -profile /tmp/playwright_firefoxdev_profile-7V2imf -juggler-pipe -silent
  - <launched> pid=5600
  - [pid=5600][err] [5602] Sandbox: CanCreateUserNamespace() unshare(CLONE_NEWPID): EPERM
  - [pid=5600][err] Error: no DISPLAY environment variable specified
  - [pid=5600] <process did exit: exitCode=1, signal=null>
  - [pid=5600] starting temporary directories cleanup
  - [pid=5600] <gracefully close start>
  - [pid=5600] <kill>
  - [pid=5600] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=5600] finished temporary directories cleanup
  - [pid=5600] <gracefully close end>

```