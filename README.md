## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*선택사항
- [x] 타입스크립트 적용
  - 타입파일 분리 types/index.ts
- [x] 반응형
  - 디바이스 사이즈에 따라 버튼의 문구가 깨지지않도록 레이아웃, 너비 조정
  - 디바이스 사이즈가 늘어나면서 하단 [테스트 페이지 > 다음 문제] 버튼의 비율을 늘림
  - [테스트 페이지 > 단어선택영역] 화면이 커짐에 따라 늘어나지 않도록 최소 사이즈 설정 및 중앙 배치

*특이사항
- 전역상태관리 라이브러리로 recoil 사용
  - recoil 폴더 하위에 quiz관련 상태, UI관련 상태를 나누어 관리
  - 뷰에서 호출해야하는 로직을 selector로 분리하고자 함.
  - 중복된 타이머기능 > useTimer hook 구현
    - timer 시작 조건, 시간 형식 조건, 타이머설정시간을 prop으로 받음
    
- 데이터 구조
  ```
  export interface MyTestState {
   id: number 
   startDatetime: string
   current: number //현재 풀고 있는 문제 번호
   complete: boolean //테스트 완료여부
   completeCount: number //테스트 완료 횟수
   answers: AnswerState[]
  }
  ```
  ```
    export enum AnswerState {
      CORRECT, //정답
      WRONG, //오답
      TRYING, //현재 문제
      TODO, //남은 문제
  }
  ```
  