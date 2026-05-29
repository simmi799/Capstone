# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shipping.spec.js >> Address Shipping same-tab tests >> Address Shipping > SHIP-01 Shipping page opens from checkout
- Location: tests/shipping.spec.js:30:5

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
  - <launching> /home/runner/.cache/ms-playwright/firefox-1522/firefox/firefox -no-remote -wait-for-browser -foreground -profile /tmp/playwright_firefoxdev_profile-dPsQpn -juggler-pipe -silent
  - <launched> pid=5620
  - [pid=5620][err] [5622] Sandbox: CanCreateUserNamespace() unshare(CLONE_NEWPID): EPERM
  - [pid=5620][err] Error: no DISPLAY environment variable specified
  - [pid=5620] <process did exit: exitCode=1, signal=null>
  - [pid=5620] starting temporary directories cleanup
  - [pid=5620] <gracefully close start>
  - [pid=5620] <kill>
  - [pid=5620] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=5620] finished temporary directories cleanup
  - [pid=5620] <gracefully close end>

```