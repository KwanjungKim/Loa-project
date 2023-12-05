/// <reference types="vite/client" />

// typesScript로 인해 window에 Kakao를 받을 속성 type이 정의되어 있지 않아
// 아래 코드를 추가하여 해결했음
interface Window {
  Kakao: any;
}
