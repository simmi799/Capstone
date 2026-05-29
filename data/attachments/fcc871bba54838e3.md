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
  - <launching> /home/runner/.cache/ms-playwright/firefox-1522/firefox/firefox -no-remote -wait-for-browser -foreground -profile /tmp/playwright_firefoxdev_profile-wXGpfF -juggler-pipe -silent
  - <launched> pid=5490
  - [pid=5490][err] [5492] Sandbox: CanCreateUserNamespace() unshare(CLONE_NEWPID): EPERM
  - [pid=5490][err] Error: no DISPLAY environment variable specified
  - [pid=5490] <process did exit: exitCode=1, signal=null>
  - [pid=5490] starting temporary directories cleanup
  - [pid=5490] <gracefully close start>
  - [pid=5490] <kill>
  - [pid=5490] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=5490] finished temporary directories cleanup
  - [pid=5490] <gracefully close end>

```