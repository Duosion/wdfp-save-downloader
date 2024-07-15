**| :us: [English](README.md) | :kr: 한국인 |**
# WDFP 세이브 다운로더
핀볼 게임 세이브 데이터를 백업하기 위한 도구입니다.

## 설치 및 설정
1. [릴리스 페이지](https://github.com/Duosion/wdfp-save-downloader/releases/latest)에서 릴리스를 다운로드하세요.
   - 윈도우 이외의 사용자나 수동 설정을 원하시면 **"수동 시작 방법"** 섹션을 참조하세요.
2. 다운로드한 파일을 압축 해제하세요.
3. `start.bat`를 실행하여 서버와 mitmproxy를 시작하세요.
   - **Windows 방화벽 팝업이 나타나면 "허용"을 클릭하세요.**
   - 이렇게 하면 나중에 Android 기기/에뮬레이터가 컴퓨터에 연결할 수 있습니다.

## 세이브 파일 다운로드하기
세이브 파일을 다운로드하려면 Android 기기나 에뮬레이터를 컴퓨터에서 실행 중인 서버에 연결해야 합니다.

### 로컬 IP 주소 찾기 (Windows)
1. 키보드에서 Windows 키 + X를 누르세요.
2. `터미널`을 선택하세요.
3. 방금 열린 창에 다음을 입력하세요:
   ```
   ipconfig
   ```
4. "Wireless LAN adapter Wi-Fi:" 섹션 아래에서 WiFi 어댑터의 "IPv4 주소"를 찾으세요 (예: `10.0.0.167`).
   - 이 섹션은 일반적으로 다음과 같이 보입니다. "IPv4 주소. . ." 항목을 확인하세요.
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

### Android/에뮬레이터 설정
1. Android 기기에 [TunProxy](https://github.com/yogkin/HttpProxy/releases/tag/1.0.1)를 설치하세요.
2. Android 기기가 컴퓨터와 같은 네트워크에 연결되어 있는지 확인하세요.
3. TunProxy를 열고 컴퓨터의 IP 주소와 `:8080`을 입력하세요 (예: `10.0.0.167:8080`).
4. "START"를 탭하고 VPN 팝업을 수락하세요.
5. 핀볼 게임을 열고 로그인하세요.
6. 메시지가 표시되면 mitmproxy 인증서에 대해 "이 세션에 대해 신뢰"를 클릭하세요.
7. 이제 세이브가 세이브 다운로더의 `/saves` 디렉토리에 있어야 합니다.
8. 이제 앱을 닫고, 서버를 중지하고, TunProxy를 제거할 수 있습니다.

### iOS 설정
이 지침은 [trickster.dev](https://www.trickster.dev/post/setting-up-mitmproxy-with-ios17.1/)의 도움을 받았습니다.

1. 설정 앱을 여세요.
2. Wi-Fi 버튼을 누르세요.
3. 현재 Wi-Fi 연결의 (i)를 탭하세요.
4. 하위 메뉴 맨 아래로 스크롤하여 "프록시 구성" 버튼을 누르세요.
5. "수동" 옵션을 선택하세요.
6. "서버" 필드에 컴퓨터의 IP 주소를 입력하세요. (예: `10.0.0.167`)
7. "포트" 필드에 `8080`을 입력하세요.
8. 화면 상단의 "저장" 버튼을 누르세요.
9. 핀볼 게임을 열고 로그인하세요.
10. 메시지가 표시되면 mitmproxy 인증서에 대해 "이 세션에 대해 신뢰"를 클릭하세요.
11. 이제 세이브가 세이브 다운로더의 `/saves` 디렉토리에 있어야 합니다.
12. 앱을 닫고 프록시를 비활성화하세요.
    1. 1-3단계를 따르세요.
    2. "끄기" 옵션을 선택하세요.

iOS에 대한 더 자세한 스크린샷 포함 지침을 원하시면 [trickster.dev의 가이드](https://www.trickster.dev/post/setting-up-mitmproxy-with-ios17.1/)를 따르세요. 가이드에서 iOS 설정을 시작하는 부분으로 스크롤하세요; "iPhone 측에서 설정을 해봅시다..."

## 수동 시작 방법
1. [mitmproxy](https://mitmproxy.org)를 설치하세요 (그들의 [설치 지침](https://docs.mitmproxy.org/stable/overview-installation/)을 따르세요).
2. [Node.js](https://nodejs.org/en/download/package-manager)를 설치하세요.
3. mitmproxy bin 디렉토리로 이동하세요 (보통 `C:\Program Files\mitmproxy\bin`).
4. 명령 프롬프트를 열고 다음을 실행하세요:
   ```
   .\mitmproxy -p 8080 -s "path/to/save_downloader/directory/mitm-redirect.py"
   ```
   `path/to/save_downloader/directory`를 실제 경로로 바꾸세요.
5. 세이브 다운로더 디렉토리에서 새 터미널을 열고 다음을 실행하세요:
   ```
   npm install
   npx tsc
   npm run dev
   ```