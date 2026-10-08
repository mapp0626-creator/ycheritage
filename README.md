# YC HERITAGE

흰색 헤더, 화면 높이를 채우는 풍경 사진, Contact Us 영역으로 구성한 단일 페이지 홈페이지입니다. 현재 Sites에 게시된 디자인과 이미지, 문구를 그대로 옮긴 독립 실행 프로젝트입니다.

## 실행

Node.js 22 이상과 npm이 필요합니다. 별도 API key, 환경 파일, 데이터베이스 또는 유료 서비스가 필요하지 않습니다. 설치할 외부 npm 패키지는 없습니다.

```sh
npm ci
npm run build
npm test
npm start
```

브라우저에서 http://127.0.0.1:4173 을 엽니다. 종료하려면 Ctrl+C를 누릅니다.

개발 중에는 `npm run dev`로 원본을 바로 제공합니다. 파일을 수정한 다음 브라우저를 새로고침하면 반영됩니다. 자동 새로고침 기능은 포함하지 않습니다.

## 폴더 구조

```text
src/
  index.html          페이지와 연락처
  style.css           반응형 레이아웃 및 배경 움직임
  script.js           움직임 정지/재생 및 연도 표시
public/assets/
  logo.png            제공받은 원본 로고
  hero_muted.jpg       영상 재생 전 사진
scripts/
  build.mjs           정적 파일 생성
  server.mjs          개발/미리보기 서버
  site.test.mjs       생성된 페이지의 링크·이미지 확인
site.config.mjs       경로 및 로컬 서버 설정
package.json
package-lock.json
.nvmrc
```

`dist/`는 빌드 결과이며 Git에서 제외합니다. 빌드하면 src와 public 내용이 dist로 복사됩니다. 생성된 dist 전체를 정적 웹 호스팅에 업로드할 수 있습니다. 사이트 소스는 루트 또는 하위 경로에서 사용할 수 있는 상대 경로를 사용합니다. `npm start`는 간단한 로컬 확인용 서버이며 외부 공개용 호스팅과 TLS 설정은 포함하지 않습니다.

## 내용 수정

- 주소, 이메일, 업무시간: `src/index.html`
- 로고와 메인 사진: `public/assets/`
- 색상, 사진 높이, 폰트, 여백: `src/style.css`
- 로컬 호스트/포트: `site.config.mjs` 또는 `HOST`, `PORT` 환경변수

현재 문의 이메일 `blahblah@blahblah.com`은 사용자가 제공한 임시 주소입니다. 실제 운영 전에 교체하세요. 문의 링크는 메일 앱을 열며 별도 메시지 전송 서버나 폼은 없습니다.

헤더의 Contact Us와 사진 아래의 스크롤 링크는 같은 페이지의 연락처로 이동합니다. 배경 움직임은 정지할 수 있고 운영체제의 동작 줄이기 설정을 따릅니다.

## 이미지와 글꼴

- 로고: 사용자가 제공한 YC HERITAGE 로고. 별도 공개 이용 허락을 부여하지 않습니다.
- 풍경 사진: Francesco Ungaro / [Unsplash](https://unsplash.com/es/fotos/fotografia-de-paisaje-de-montana-gris-y-verde-pWLwpVAYnB8), Unsplash License.
- Noto Sans KR, DM Sans, Libre Caslon Display는 Google Fonts에서 로드합니다. 인터넷 연결이 없으면 시스템 대체 글꼴을 사용합니다. 로고·사진·소스는 모두 저장소에 포함됩니다.

## 비밀정보

API key, credential, 로그인 토큰, Sites 접근 토큰 및 기존 Sites 저장소 이력은 포함하지 않았습니다. `.env*`, 비공개 키, Sites 메타데이터 등은 `.gitignore`에서 제외합니다. 이 프로젝트에는 필요한 secret이 없습니다.
