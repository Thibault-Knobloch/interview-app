# Setup

The app needs the Kitchen Admin API from the `interview-server` repo running. Set that up first (its `SETUP.md`).

## 1. Requirements
- **Node.js 22** (22.13 or newer). Using nvm: `nvm install 22 && nvm use`.
- One way to run the app:
  - **Phone:** install **Expo Go** from the App Store / Play Store. Your phone and computer must be on the same Wi-Fi.
  - **iOS Simulator** (macOS only): Xcode with an iOS simulator installed.
  - **Android Emulator:** Android Studio with an emulator (AVD) set up.

## 2. Install
```bash
npm install
```

## 3. Point the app at your server
```bash
cp .env.example .env.local
```
Then set `EXPO_PUBLIC_API_URL` in `.env.local` for how you run the app:

| Running on | `EXPO_PUBLIC_API_URL` |
|---|---|
| iOS Simulator | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Physical phone (Expo Go) | `http://<your computer's LAN IP>:3000`, e.g. `http://192.168.1.23:3000` |

Find your LAN IP on macOS with `ipconfig getifaddr en0`. On Windows, use `ipconfig`.
Restart `npm start` after changing `.env.local`.

## 4. Run
```bash
npm start
```
- Phone: scan the QR code with the Camera app (iOS) or Expo Go (Android).
- Simulator / emulator: press `i` (iOS) or `a` (Android) in the terminal.

Check it works: the first screen lists three storage areas. Count something, tap **Save count**, and the count appears on the web app's **Inventory counts** page (http://localhost:5173/counts).

## 5. Tests and type checks
```bash
npm test
npm run typecheck
```

## Troubleshooting
- **"Could not load storage areas":** the screen shows the server URL it tried. Check that the API is running, the URL in `.env.local` is right, and the phone is on the same Wi-Fi. Then restart `npm start`.
- **Expo Go says the project is incompatible:** update Expo Go to the latest version. This app uses Expo SDK 58.
- **Firewall:** allow incoming connections for Node on port 3000 if your phone can't reach the server.
