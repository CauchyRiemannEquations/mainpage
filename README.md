# Teacher J's Sidequest

Notion 데이터베이스를 카드형 홈페이지로 보여주는 Next.js 프로젝트입니다. `제목`, `유형/종류`, `링크`, `후기`, `설명` 열을 읽어서 종류별 필터가 있는 홈페이지로 보여줍니다.

## 먼저 알아두기

Vercel에 올리기 전에 GitHub가 반드시 필요한 것은 아닙니다.

다만 추천 순서는 `GitHub에 올리기 -> Vercel에서 GitHub 저장소 가져오기`입니다. 이렇게 해두면 나중에 디자인이나 내용을 고쳐서 GitHub에 올릴 때 Vercel이 자동으로 다시 배포해줍니다.

GitHub 없이도 `Vercel CLI`로 내 컴퓨터에서 바로 배포할 수 있습니다. 단, 매번 직접 배포 명령을 실행해야 해서 처음에는 GitHub 방식이 더 편합니다.

## 로컬에서 실행하기

### 1. Node.js 설치

아직 Node.js가 없다면 LTS 버전을 설치합니다.

https://nodejs.org

설치 후 터미널에서 아래 명령이 동작하면 준비가 된 것입니다.

```bash
node -v
npm -v
```

### 2. 프로젝트 폴더 열기

터미널에서 이 프로젝트 폴더로 이동합니다.

```bash
cd C:\Users\USER\Documents\Codex\2026-06-04\teacher-j-s-sidequest-vercel-next
```

### 3. 필요한 파일 설치

처음 한 번만 실행합니다.

```bash
npm install
```

### 4. Notion 연결 값 만들기

프로젝트 폴더 안에 `.env.local` 파일을 만들고 아래처럼 적습니다.

```bash
NOTION_TOKEN=여기에_노션_시크릿_토큰
NOTION_DATA_SOURCE_ID=37380a52-be9a-800f-9758-000b11197a27
NOTION_DATABASE_ID=37380a52be9a807cb04bfdf396d49ea8
```

Notion 열 이름을 바꾸지 않았다면 아래 값들은 없어도 됩니다. 열 이름을 바꿨을 때만 추가합니다.

```bash
NOTION_TITLE_PROPERTY=제목
NOTION_KIND_PROPERTY=유형
NOTION_LINK_PROPERTY=링크
NOTION_REVIEW_PROPERTY=후기
NOTION_DESCRIPTION_PROPERTY=설명
```

`NOTION_TOKEN`은 Notion에서 Integration을 만든 뒤 발급받는 Internal Integration Secret입니다. 이 값은 비밀번호처럼 다뤄야 하므로 GitHub에 올리면 안 됩니다.

### 5. Notion 데이터베이스 권한 주기

Notion에서 `Sidequests DB`를 열고, 오른쪽 위 메뉴에서 만든 Integration을 연결합니다. 이 권한을 주지 않으면 홈페이지가 Notion 자료를 읽지 못하고 샘플 카드만 보여줄 수 있습니다.

### 6. 개발 서버 켜기

```bash
npm run dev
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:3000
```

내용을 고치면 브라우저 화면이 자동으로 갱신됩니다.

### 7. 배포 전 확인

Vercel에 올리기 전에 아래 명령으로 배포 가능한 상태인지 확인합니다.

```bash
npm run build
```

에러 없이 끝나면 배포 준비가 된 것입니다.

## Vercel에 올리는 추천 방법: GitHub 사용

GitHub 방식은 내 컴퓨터에 Git이 설치되어 있어야 합니다. 아래 명령이 동작하는지 먼저 확인합니다.

```bash
git --version
```

만약 `git`을 찾을 수 없다는 메시지가 나오면 Git for Windows를 설치합니다.

https://git-scm.com/download/win

### 1. GitHub 저장소 만들기

GitHub에서 새 저장소를 만듭니다.

예시 이름:

```text
teacher-j-sidequest
```

Public, Private 둘 다 괜찮습니다. 혼자 관리할 사이트라면 Private으로 시작해도 됩니다.

### 2. 프로젝트를 GitHub에 올리기

프로젝트 폴더에서 아래 순서로 실행합니다.

```bash
git init
git add .
git commit -m "Initial Teacher J's Sidequest site"
git branch -M main
git remote add origin https://github.com/내아이디/teacher-j-sidequest.git
git push -u origin main
```

`내아이디` 부분은 본인의 GitHub 아이디로 바꿉니다.

이미 Git 저장소가 만들어져 있다면 `git init`은 다시 하지 않아도 됩니다.

### 3. Vercel에서 프로젝트 가져오기

1. https://vercel.com 에 로그인합니다.
2. `Add New...` 또는 `New Project`를 누릅니다.
3. GitHub 계정을 연결합니다.
4. `teacher-j-sidequest` 저장소를 선택합니다.
5. Framework Preset이 `Next.js`로 잡혀 있는지 확인합니다.
6. Build Command는 보통 자동으로 `npm run build`가 잡힙니다.
7. Output Directory는 따로 건드리지 않아도 됩니다.

### 4. Vercel 환경변수 추가

Vercel의 프로젝트 설정에서 Environment Variables에 아래 값을 추가합니다.

```bash
NOTION_TOKEN=여기에_노션_시크릿_토큰
NOTION_DATA_SOURCE_ID=37380a52-be9a-800f-9758-000b11197a27
NOTION_DATABASE_ID=37380a52be9a807cb04bfdf396d49ea8
```

열 이름을 바꿨다면 아래 값도 추가합니다.

```bash
NOTION_TITLE_PROPERTY=제목
NOTION_KIND_PROPERTY=유형
NOTION_LINK_PROPERTY=링크
NOTION_REVIEW_PROPERTY=후기
NOTION_DESCRIPTION_PROPERTY=설명
```

Production, Preview, Development 중 어디에 넣을지 고를 수 있다면 처음에는 전부 체크해두면 편합니다.

### 5. Deploy 누르기

`Deploy`를 누르면 Vercel이 사이트를 빌드하고 주소를 만들어줍니다.

배포가 끝나면 이런 형태의 주소가 생깁니다.

```text
https://teacher-j-sidequest.vercel.app
```

### 6. 이후 수정하는 방법

로컬에서 코드를 고친 뒤 아래처럼 GitHub에 올립니다.

```bash
git add .
git commit -m "Update homepage"
git push
```

GitHub와 Vercel이 연결되어 있으면 `git push` 후 Vercel이 자동으로 새 버전을 배포합니다.

## GitHub 없이 Vercel에 바로 올리는 방법

GitHub를 쓰지 않고 내 컴퓨터에서 바로 올릴 수도 있습니다.

### 1. Vercel CLI 실행

프로젝트 폴더에서 실행합니다.

```bash
npx vercel
```

처음 실행하면 로그인과 프로젝트 연결 질문이 나옵니다. 대부분 기본값으로 진행하면 됩니다.

### 2. 환경변수 등록

Vercel 웹사이트의 프로젝트 설정에서 Environment Variables를 추가하거나, CLI에서 환경변수를 추가합니다.

웹사이트에서 추가하는 쪽이 실수하기 쉽지 않습니다.

필수 값:

```bash
NOTION_TOKEN=여기에_노션_시크릿_토큰
NOTION_DATA_SOURCE_ID=37380a52-be9a-800f-9758-000b11197a27
NOTION_DATABASE_ID=37380a52be9a807cb04bfdf396d49ea8
```

### 3. 실제 공개 배포

미리보기 배포가 아니라 실제 공개 주소로 올리려면 아래 명령을 실행합니다.

```bash
npx vercel --prod
```

## 자주 막히는 부분

### Notion 자료가 안 나오고 샘플만 보일 때

대부분 아래 둘 중 하나입니다.

- Vercel 또는 `.env.local`에 `NOTION_TOKEN`이 빠져 있음
- Notion 데이터베이스에 Integration 권한을 주지 않았음

### Vercel 배포는 성공했는데 자료가 오래된 것 같을 때

이 프로젝트는 Notion 데이터를 일정 시간마다 다시 가져오도록 되어 있습니다. 보통 몇 분 안에 반영됩니다.

### GitHub에 올릴 때 `.env.local`도 같이 올라가면 안 되나요?

올라가면 안 됩니다. `.env.local`에는 Notion 비밀 토큰이 들어갑니다. 이 프로젝트의 `.gitignore`에서 `.env` 파일을 제외하도록 해두었으니 그대로 두면 됩니다.
