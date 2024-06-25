# WDFP Save Downloader
A tool for making a copy of your pinball game save data.

## Installation & Running
- Install [Node.js](https://nodejs.org/en/download/package-manager).
- Install [mitmproxy](https://mitmproxy.org)
  - Follow their [installation instructions](https://docs.mitmproxy.org/stable/overview-installation/) for your platform.
  - Mitmproxy will act as an intermediary between the save downloader and the game client, allowing the save downloader to copy your save data.
- Clone the repository from the command line.
  ```
  git clone https://github.com/Duosion/starpoint.git
  ```
  - If you do not have git installed, simply download the .zip for this repository by clicking the green "Code" button and then selecting "Download ZIP" from the dropdown.
- Navigate to the directory where the repository was cloned/unzipped to.
- Locate and double click on the ``start.bat`` file to start the server and mitmproxy.
  - If you do not use Windows, or do not want to run the start.bat file, see the **"(Optional) Manual Start Method"** section below.
- The server is now listening on port 8000 for a request from your game client.

## Downloading Your Save File
- In order to download the save file, we have to connect your Android device to the server that is running on your computer.

### Discovering Local IP Address (Windows)
- Open a new command prompt and run the following command:
  ```
  ipconfig
  ```
- Find the section for your wifi adapter. e.g. "Wireless LAN adapter Wi-Fi:". And make note of the "IPv4 Address" value. Mine, for instance, is ``10.0.0.167``.

### Android/Emulator Setup
- To connect the Android device to the save downloader on your computer we will be using an app called [TunProxy](https://github.com/raise-isayan/TunProxy). 
  - If you do not want to use this app, there are other methods of connecting your Android device to your PC, such as your phone's built-in WiFi proxy settings.
- Download and install the TunProxy APK to your Android device from [here](https://github.com/yogkin/HttpProxy/releases/tag/1.0.1).
- Once installed, ensure that your Android device is connected to the same internet network as the computer running Starpoint.
- Open the TunProxy app and input your computer's IP address along with ``:8080`` into the "Proxy address (ipv4:port) field". For example, my field would look like ``10.0.0.167:8080``
- Press the "START" button and accept the VPN popup.
- Open the pinball game on your Android device and log in as you normally would.
- **You might see a popup on the loading screen about trusting the mitmproxy certificate. Click the "Trust for this session" button.**
- If all went according to plan, your save should now be stored in .json format in the ``/saves`` directory where you installed the save downloader.
- You can now close the app, stop the save downloader server, and uninstall the TunProxy app and mitmproxy.

## (Optional) Manual Start Method
- Navigate to the mitmproxy Program Files directory, usually located at ``C:\Program Files\mitmproxy\bin``.
- Open a command prompt in this directory and run the following line:
  ```
  .\mitmproxy -p 8080 -s "path/to/save_downloader/directory/mitm-redirect.py"
  ```
    - **Note**: The ``path/to/save_downloader/directory`` portion of the below command should be replaced with the path to the directory where you installed Starpoint. Keep the ``/mitm-redirect.py`` portion.
- Navigate to the directory where you have the save downloader installed. 
- Open a new terminal, and start the server.
  ```
  npm install
  npx tsc
  npm run start
  ```