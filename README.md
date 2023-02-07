# Daily Journal

중요한 순간을 간단한 일기로 기록하기.  
현재 장소 또는 그 날 있었던 장소와 날씨를 짧은 글과 함께 기록할 수 있는 서비스.

### 🌱 1. 설치, 환경설정 및 실행 방법

#### - server

- .env 파일 생성

```
JWT_KEY=
```

- src/db 폴더 생성 → journals.json, users.json 파일 생성
- 설치 및 실행

```
npm install
npm run dev
```

#### - client

- .env 파일 생성

```
VITE_APP_API_URL=http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=기상청API서비스키&numOfRows=10&pageNo=1&dataType=JSON
VITE_APP_MAP_KEY=KAKAO_JavaScript키
VITE_APP_API_KEY=KAKAO_RESTAPI키
VITE_APP_ADDR_URL=//dapi.kakao.com/v2/local
VITE_APP_BASE_URL=http://localhost:8000
```

- 설치 및 샐행

```
npm install
npm run dev
```

### ✨ 2. 구현 목록

- [x] 사용자 위치 정보 가져오기  
       Geolocation API를 이용해 위치 정보를 획득  
       혹은 사용자가 직접 주소를 검색하여 위치 정보 입력
- [x] 날씨 정보  
       기상청 단기예보 조회서비스의 초단기실황 조회
- [x] 회원가입, 로그인
- [x] 일기 목록 조회
- [x] 로그인 후 일기 쓰기, 수정, 삭제
- [x] 회원가입, 로그인

### 💚 3. 사용한 프레임워크 및 라이브러리

Express, Typscript, nodemon, cors, bcryt, jsonwebtoken  
React, Vite, React query, Recoil, emotion, react daum postcode, joi

### 📦 4. 폴더 구조

```
client
  ├─ .gitignore
  ├─ .prettierrc.json
  ├─ custom.d.ts
  ├─ index.html
  ├─ package-lock.json
  ├─ package.json
  ├─ public
  ├─ src
  │  ├─ App.tsx
  │  ├─ main.tsx
  │  ├─ router.tsx
  │  ├─ assets
  │  │  └─ icon
  │  ├─ pages
  │  │  ├─ KeepJournal
  │  │  └─ index.tsx
  │  ├─ components
  │  │  ├─ Footer
  │  │  ├─ Header
  │  │  ├─ JournalCard
  │  │  ├─ JournalModal
  │  │  ├─ LoginModal
  │  │  ├─ Map
  │  │  └─ WeatherForecast
  │  ├─ model
  │  │  ├─ Journals.ts
  │  │  └─ Users.ts
  │  ├─ hooks
  │  │  ├─ useCoordinate.ts
  │  │  ├─ useGeolocation.ts
  │  │  └─ useOutsideClick.ts
  │  ├─ recoils
  │  │  ├─ auth.ts
  │  │  └─ weather.ts
  │  ├─ styles
  │  │  ├─ StyledMain.ts
  │  │  └─ reset.ts
  │  ├─ utilities
  │  │  └─ api.ts
  ├─ tsconfig.json
  ├─ vite.config.ts
  └─ tsconfig.node.json

 server
   ├─ .gitignore
   ├─ nodemon.json
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  ├─ dbController.ts
   │  ├─ index.ts
   │  ├─ middleware
   │  │  └─ auth.ts
   │  ├─ model
   │  │  ├─ Journal.ts
   │  │  └─ Users.ts
   │  └─ routes
   │     ├─ journals.ts
   │     └─ users.ts
   └─ tsconfig.json
```
