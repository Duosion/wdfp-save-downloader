**| :us: English | :kr: [한국어](README_kr.md) |**
# WDFP Save Downloader
A tool to backup your pinball game save data.

> [!WARNING]
> As of July 25th, 2024. This tool no longer works due to the closure of the pinball game's servers.

## Installation & Setup
1. Download the release from the [releases page](https://github.com/Duosion/wdfp-save-downloader/releases/latest)
   - For non-Windows users or manual setup, see the **"Manual Start Method"** section.
2. Extract the download.
3. Run `start.bat` (``start-ios.bat`` if you play on an iPhone).
   - **If you receive a Windows firewall popup, hit "Allow".**
4. A new tab will open in your web browser. Keep this open for later.

## Downloading Your Save File
To download your save file, you will connect your Android device or emulator to the server running on your computer.

### Android/Emulator Setup
1. Install the WG tunnel app from the [Google Play Store](https://play.google.com/store/apps/details?id=com.zaneschepke.wireguardautotunnel) or [Github](https://github.com/zaneschepke/wgtunnel/releases/tag/3.4.7)
2. Ensure your Android device is on the same network as your computer.
3. Open the WG tunnel app.
4. Tap the "+" button in the bottom right corner of the screen.
5. Tap "WireGuard"
6. Tap "Add from QR code"
7. Scan the QR code that is visible in the tab that opened up in your browser.
8. At the top of the screen, there will be some numbers; i.e. 10.0.0.167.
9. Tap the round button to the right of these numbers.
10. Accept the VPN popup.
11. Tap the round button to the right of these numbers again.
12. Open the pinball game and log in.
13. If prompted, click "Trust for this session".
14. Your save should now be in the `/saves` directory of the save downloader.
15. You can now close the app, stop the server, and uninstall TunProxy.

### iOS Setup
Credit to [trickster.dev](https://www.trickster.dev/post/setting-up-mitmproxy-with-ios17.1/) for these instructions.

1. Open the settings app.
2. Press the Wi-Fi button.
3. Tap the (i) for your current Wi-Fi connection.
4. Scroll to the bottom of the sub-menu and press the "Configure Proxy" button.
5. Select the "Manual" option.
6. In the "Server" field, enter you computer's IP address. (e.g., `10.0.0.167`)
7. In the "Port" field, enter `8080`
8. Press the "Save" button at the top of the screen.
9. Open the pinball game and log in.
10. If prompted, click "Trust for this session".
11. Your save should now be in the `/saves` directory of the save downloader.
12. Close the app and disable the proxy.
    1. Follow steps 1-3.
    2. Select the "Off" option.

If you want more detailed instructions with screenshots for iOS, follow [trickster.dev's guide](https://www.trickster.dev/post/setting-up-mitmproxy-with-ios17.1/). Scroll down where the guide starts doing the setup on iOS; "Let us do the setup on the iPhone side..."

## Manual Start Method
1. Install [mitmproxy](https://mitmproxy.org) (follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/)).
2. Install [Node.js](https://nodejs.org/en/download/package-manager).
3. Navigate to the mitmproxy bin directory (usually `C:\Program Files\mitmproxy\bin`).
4. Open a command prompt and run:
   ```
   .\mitmproxy -p 8080 -s "path/to/save_downloader/directory/mitm-redirect.py"
   ```
   Replace `path/to/save_downloader/directory` with your actual path.
5. In the save downloader directory, open a new terminal and run:
   ```
   npm install
   npx tsc
   npm run dev
   ```