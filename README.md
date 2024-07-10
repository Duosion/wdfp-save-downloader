# WDFP Save Downloader
A tool to backup your pinball game save data.

## Installation & Setup
1. Download the release from the [releases page](https://github.com/Duosion/wdfp-save-downloader/releases/latest)
   - For non-Windows users or manual setup, see the **"Manual Start Method"** section.
2. Extract the download.
3. Run `start.bat` to launch the server and mitmproxy.
   - **If you receive a Windows firewall popup, hit "Allow".**
   - This will allow your Android device/emulator to connect to your computer later.

## Downloading Your Save File
To download your save file, you will connect your Android device or emulator to the server running on your computer.

### Find Your Local IP Address (Windows)
1. On your keyboard press the Windows key + X.
2. Select ``Terminal``.
2. In the window that just opened, type the following:
   ```
   ipconfig
   ```
3. Locate your WiFi adapter's "IPv4 Address" under the "Wireless LAN adapter Wi-Fi:" section (e.g., `10.0.0.167`).
   - The section will typically look like the following. Notice the "IPv4 Address. . ." entry.
     ```
     Wireless LAN adapter Wi-Fi:
    
     Connection-specific DNS Suffix  . : <Excluded>
     IPv6 Address. . . . . . . . . . . : <Excluded>
     IPv6 Address. . . . . . . . . . . : <Excluded>
     Temporary IPv6 Address. . . . . . : <Excluded>
     Link-local IPv6 Address . . . . . : <Excluded>
     IPv4 Address. . . . . . . . . . . : 10.0.0.167
     Subnet Mask . . . . . . . . . . . : 255.255.255.0
     Default Gateway . . . . . . . . . : <Excluded>
                                         10.0.0.1
     ```

### Android/Emulator Setup
1. Install [TunProxy](https://github.com/yogkin/HttpProxy/releases/tag/1.0.1) on your Android device.
2. Ensure your Android device is on the same network as your computer.
3. Open TunProxy and enter your computer's IP address with `:8080` (e.g., `10.0.0.167:8080`).
4. Tap "START" and accept the VPN popup.
5. Open the pinball game and log in.
6. If prompted, click "Trust for this session" for the mitmproxy certificate.
7. Your save should now be in the `/saves` directory of the save downloader.
8. You can now close the app, stop the server, and uninstall TunProxy.

### iOS Setup
Credit to [trickster.dev](https://www.trickster.dev/post/setting-up-mitmproxy-with-ios17.1/) for these instructions.

1. Open the settings app.
2. Press the Wi-Fi button.
3. Scroll to the bottom of the sub-menu and press the "Configure Proxy" button.
4. Select the "Manual" option.
5. In the "Server" field, enter you computer's IP address. (e.g., `10.0.0.167`)
6. In the "Port" field, enter `8080`
7. Press the "Save" button at the top of the screen.
8. Open the pinball game and log in.
9. If prompted, click "Trust for this session" for the mitmproxy certificate.
10. Your save should now be in the `/saves` directory of the save downloader.
11. Close the app and disable the proxy.
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