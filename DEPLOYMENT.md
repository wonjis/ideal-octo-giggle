# Vercel 배포 가이드

## 🚀 빠른 배포

### 1. Vercel 계정 연동

```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# Vercel 로그인
vercel login
```

### 2. GitHub에서 직접 배포 (권장)

1. [Vercel Dashboard](https://vercel.com/dashboard)에 접속
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 선택: `ideal-octo-giggle`
5. Framework Preset: **Create React App** (자동 감지됨)
6. Build & Output Settings는 자동으로 설정됨:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/build`
7. Environment Variables 설정 (아래 참조)
8. **Deploy** 버튼 클릭!

## 🔐 필수 환경 변수 설정

Vercel Dashboard → 프로젝트 → Settings → Environment Variables에서 다음 변수들을 추가하세요:

### API Keys (필수)

```bash
# Claude API Key
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Hugging Face API Token
HUGGINGFACE_API_KEY=hf_xxxxx
```

### Frontend 환경 변수 (자동 설정)

```bash
# API URL (vercel.json에서 자동 설정됨)
REACT_APP_API_URL=/api
```

### Supabase (선택사항 - 향후 사용자 인증/저장 기능)

```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJxxxx
SUPABASE_SERVICE_KEY=eyJxxxx
```

## 📋 환경 변수 설정 방법

### Vercel Dashboard에서 설정:

1. Vercel Dashboard → 프로젝트 선택
2. Settings → Environment Variables
3. 각 변수를 추가:
   - Name: `ANTHROPIC_API_KEY`
   - Value: 실제 API 키 입력
   - Environment: Production, Preview, Development 모두 체크
4. "Save" 클릭

### Vercel CLI로 설정 (선택사항):

```bash
# Production 환경
vercel env add ANTHROPIC_API_KEY production

# Preview 환경
vercel env add ANTHROPIC_API_KEY preview

# Development 환경
vercel env add ANTHROPIC_API_KEY development
```

## 🔧 Vercel 프로젝트 구조

```
ideal-octo-giggle/
├── api/                    # Serverless Functions (자동 배포)
│   └── generate.ts         # /api/generate 엔드포인트
├── frontend/               # React App
│   ├── public/
│   ├── src/
│   └── build/             # 빌드 출력 (Vercel이 자동 생성)
├── vercel.json            # Vercel 설정
├── .vercelignore          # 배포 제외 파일
└── package.json           # 루트 패키지 설정
```

## 🎯 Vercel 설정 설명 (vercel.json)

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "framework": "create-react-app",

  // Serverless Functions 설정
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x",      // Node.js 20 사용
      "memory": 1024,                // 1GB 메모리
      "maxDuration": 30              // 최대 30초 실행
    }
  },

  // URL 라우팅
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"       // API 요청을 serverless function으로
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"   // SPA 라우팅
    }
  ],

  // CORS 헤더 설정
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

## 🧪 배포 후 테스트

배포가 완료되면 Vercel이 URL을 제공합니다 (예: `https://your-project.vercel.app`)

### Frontend 테스트:
- 메인 페이지 접속: `https://your-project.vercel.app`

### API 테스트:
```bash
curl -X POST https://your-project.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "oversized t-shirt with pocket"}'
```

## 📊 배포 모니터링

### Vercel Dashboard에서 확인 가능:
- **Deployments**: 모든 배포 이력
- **Functions**: Serverless function 로그 및 성능
- **Analytics**: 트래픽 및 사용량
- **Logs**: 실시간 로그 확인

### 로그 확인:
```bash
# Vercel CLI로 실시간 로그 확인
vercel logs --follow
```

## 🔄 자동 배포

GitHub과 연동하면:
- `main` 브랜치에 push → Production 배포
- PR 생성 → Preview 배포 (테스트용 URL 자동 생성)
- 모든 커밋마다 자동 빌드 및 배포

## ⚡ 성능 최적화

### 1. Edge Functions (선택사항)
더 빠른 응답을 위해 Edge Functions 사용:

```json
{
  "functions": {
    "api/generate.ts": {
      "runtime": "edge"  // Edge Runtime 사용
    }
  }
}
```

⚠️ 주의: Edge Runtime은 일부 Node.js API를 지원하지 않습니다.

### 2. 캐싱
정적 리소스는 자동으로 CDN에 캐싱됩니다.

## 🛠️ 문제 해결

### API 키 오류
```
Error: ANTHROPIC_API_KEY not configured
```
→ Vercel Dashboard에서 환경 변수 확인

### 빌드 실패
```
Error: Command failed: cd frontend && npm run build
```
→ 로컬에서 빌드 테스트: `cd frontend && npm run build`

### Serverless Function 타임아웃
```
Error: Function execution timed out
```
→ `vercel.json`에서 `maxDuration` 증가 (최대 60초)

### CORS 오류
```
Access to fetch blocked by CORS policy
```
→ `vercel.json`의 headers 설정 확인

## 📱 도메인 설정 (선택사항)

1. Vercel Dashboard → 프로젝트 → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정 (Vercel이 안내)

## 💰 비용

- **Hobby Plan** (무료):
  - 100GB 대역폭/월
  - Serverless function 실행: 100GB-Hrs
  - 충분한 개발/테스트용

- **Pro Plan** ($20/월):
  - 1TB 대역폭/월
  - 더 많은 serverless 실행 시간
  - 팀 협업 기능

## 🔗 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Build Configuration](https://vercel.com/docs/build-step)

## ✅ 체크리스트

배포 전 확인사항:

- [ ] Anthropic API 키 발급 ([console.anthropic.com](https://console.anthropic.com))
- [ ] Hugging Face API 토큰 발급 ([huggingface.co](https://huggingface.co/settings/tokens))
- [ ] Vercel 계정 생성 ([vercel.com](https://vercel.com))
- [ ] GitHub 저장소와 Vercel 연동
- [ ] 환경 변수 설정 완료
- [ ] 로컬에서 빌드 테스트 완료
- [ ] 배포 후 API 테스트 완료

---

배포 완료! 🎉
