# WDFP Save Downloader
A tool to backup your pinball game save data.

## Installation & Setup
1. Install [mitmproxy](https://mitmproxy.org) (follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/)).
2. Download the release from the [releases page](https://github.com/Duosion/wdfp-save-downloader/releases/latest)
   - For non-Windows users or manual setup, see the **"Manual Start Method"** section.
3. Extract the download.
4. Run `start.bat` to launch the server and mitmproxy.

## Downloading Your Save File
To download your save file, you will connect your Android device or emulator to the server running on your computer.

### Find Your Local IP Address (Windows)
1. Open a command prompt and run:
   ```
   ipconfig
   ```
2. Locate your WiFi adapter's "IPv4 Address" under the "Wireless LAN adapter Wi-Fi:" section (e.g., `10.0.0.167`).

### Android/Emulator Setup
1. Install [TunProxy](https://github.com/yogkin/HttpProxy/releases/tag/1.0.1) on your Android device.
2. Ensure your Android device is on the same network as your computer.
3. Open TunProxy and enter your computer's IP address with `:8080` (e.g., `10.0.0.167:8080`).
4. Tap "START" and accept the VPN popup.
5. Open the pinball game and log in.
6. If prompted, click "Trust for this session" for the mitmproxy certificate.
7. Your save should now be in the `/saves` directory of the save downloader.
8. You can now close the app, stop the server, and uninstall TunProxy and mitmproxy.

## Manual Start Method
1. Install [Node.js](https://nodejs.org/en/download/package-manager).
2. Navigate to the mitmproxy bin directory (usually `C:\Program Files\mitmproxy\bin`).
3. Open a command prompt and run:
   ```
   .\mitmproxy -p 8080 -s "path/to/save_downloader/directory/mitm-redirect.py"
   ```
   Replace `path/to/save_downloader/directory` with your actual path.
4. In the save downloader directory, open a new terminal and run:
   ```
   npm install
   npx tsc
   npm run dev
   ```