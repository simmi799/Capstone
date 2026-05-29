# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: support.spec.js >> Customer Support same-tab tests >> Customer Support > SUP-01 Support page opens
- Location: tests/support.spec.js:30:5

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
  - <launching> /home/runner/.cache/ms-playwright/firefox-1522/firefox/firefox -no-remote -wait-for-browser -foreground -profile /tmp/playwright_firefoxdev_profile-rViPXj -juggler-pipe -silent
  - <launched> pid=5531
  - [pid=5531][err] [5533] Sandbox: CanCreateUserNamespace() unshare(CLONE_NEWPID): EPERM
  - [pid=5531][err] Error: no DISPLAY environment variable specified
  - [pid=5531] <process did exit: exitCode=1, signal=null>
  - [pid=5531] starting temporary directories cleanup
  - [pid=5531] <gracefully close start>
  - [pid=5531] <kill>
  - [pid=5531] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=5531] finished temporary directories cleanup
  - [pid=5531] <gracefully close end>

```