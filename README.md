### 도커 캐시 삭제 명령어

- docker builder prune

## 동시성 제어

## 성능을 높이기 위한 전략
1. 인덱스 설정
   - cashLog의 userId : 현재 캐시 구현을 로그를 모두 가져와서 매번 계산하는 방식으로 작성해 userId를 이용해 조회할 일이 많음.
   - concertDateUser의 concertDateId: 예약 가능한 좌석을 확인하는 기능이 필요하기에, concertDateId(콘서트의 날짜정보)를 이용해 조회할 일이 많음.
   - concertDate의 concertId: 예약 가능한 날짜를 확인하는 경우 concertId로 빠르게 조회할 일이 많음.
2. redis(cache)를 이용한 대기열 토큰 발급, 관리
   - 클라이언트가 최초로 토큰 발급을 신청하면 redis에 입장 가능 시간과 유저 정보를 insert.
   - 클라이언트에서 폴링방식으로 주기적인 요청을 보낸다고 가정했을 때, 서버는 redis db만을 확인해 현재 대기 순서를 확인.
   - 스케줄러가 주기적으로 입장 시간 < 현재 시간인 데이터를 확인해 삭제하며, 삭제된 토큰을 가지고 요청을 보내면 active 토큰으로 전환
   - database까지 요청을 보내지 않음으로써 db 부하를 감소!

### 필요한 부분

- 캐시를 사용하는 파트

```typescript
동시에 두 기기 이상을 이용해 로그인을 하여, 동시에 캐시를 사용하면 하나만 구매할 수 있는 캐시임에도
모두 구매할 수 있는 문제가 생길 수 있음.
```

- 낙관 lock, 비관 lock
  - 캐시를 사용하는 파트는 충돌이 일어날 가능성이 적기에, 낙관 lock을 사용해도 좋아보임.
  - 하지만 돈 처럼 중요한 비즈니스 파트에는 비관 lock을 이용해 확실히 제어 해주는게 좋지 않을까 싶기도..

## 브랜치 전략

### main

- 실제 유저들에게 배포되어 있는 환경.
- main을 업데이트 하기 전에 반드시 staging에서 QA팀과 테스트를 거쳐야한다.
- main 브랜치는 push를 막고 반드시 PR로만 merge를 진행한다.

### staging

- 실제 환경과 같은 환경으로 구축해 테스트 할 수 있도록 구축
- staging에서 브랜치를 따서 dev에 merge를 하고, 해당 기능을 staging에 다시 merge한다.
- 절대 dev를 staging에 merge하지 않는다.

### dev

- 개발 중인 기능을 테스트하는 브랜치

### api docs

[swagger-docs](https://app.swaggerhub.com/apis-docs/rnjsdud980/reserve-concert/0.0.1)

### 요구사항 분석

1. 토큰발급

- 토큰에는 콘서트 정보, 대기 순번을 확인할 수 있는 값을 넣어야 한다.
- 요청 들어온 콘서트 정보, 대기 순번이 db에 있는 값과 다르다면 새로운 토큰을 생성한다.
- db에 토큰이 없다면 새로운 토큰을 발급한다.

2. 콘서트 예약

- 일정 조회, 좌석 선택이 선행되어야 한다.
- 한 자리에 여러명이 예약이 가능하지 않도록 lcok을 활용해야한다.
- 좌석이 예약되고나서 5분 뒤에는 해당 좌석이 결제되지 않았다면 빈 좌석으로 처리한다.

3. 결제처리

- 예약한 좌석을 결제하고, 토큰을 초기화 해야한다.
- 요청 받은 좌석의 유효성 검사를 진행해야한다.

### 토큰 발급

```mermaid
sequenceDiagram
    actor C AS Client
    participant S AS Server

    C->>S: 토큰 유효성 검증 요청

    S--> S : 이미 발급받은 토큰이 있는지 확인
    S--> S : 유효한 토큰인지 검증 (현재 입장하려는 콘서트에 부합하는 토큰을 가지고 있는지)

    note right of C: 수용능력 내에 있는지 확인
    alt 수용 능력 내
	    S-->>C: 바로 입장 가능한 유효 토큰 발급
    else 수용 능력을 벗어남
	    S-->>C:  현재 대기열의 마지막 번호에서 1을 더한 토큰 발급
    end

    note right of C: response
    alt 토큰이 없는 경우
    	S-->>C : 토큰을 새로 발급
    else 토큰 존재
	    S-->>C : 현재 순번, 대기 시간 등을 반환
    else 유효하지 않은 토큰
	    S-->>C : Invalid Error
    end

```

### 콘서트 예약

```mermaid
sequenceDiagram
    actor C AS Client
    participant S AS Server
    note right of C: 모든 요청은 토큰 검증을 거친다.
    note right of C: 대기순번이 0인지 확인하고 0이 아니라면 새로운 토큰을 발급시킨다.

    note left of C: 일정 조회
    C->>S: 콘서트 일정 조회 요청
    S->>S: 날짜 정보 조회

    S-->>C : 신청 가능한 일정 조회

    note left of C: 좌석 정보 조회
    C->> S: 좌석정보 조회 요청
    S->>S: 좌석 정보 조회
    S-->>C : 사용 가능 좌석 조회

    note left of C: 좌석 예약
    C->> S: 좌석 예약 요청
    alt 좌석이 존재함
	  S ->> S : 좌석 예약 처리(5분)
	  S ->> C : 좌석 예약 성공 반환
	  else 좌석이 존재하지 않음
	  S ->> C : 좌석 예약 실패 반환
    end




```

### 결제 처리

```mermaid
sequenceDiagram
    actor C AS Client
    participant S AS Server
    note right of C: 모든 요청은 토큰 검증을 거친다.
    note right of C: 대기순번이 0인지 확인하고 0이 아니라면 새로운 토큰을 발급시킨다.

    note left of C: 결제 처리
    S --> S : 좌석의 예약과 결제하려는 좌석의 유효성 처리
    alt 유효하지 않은 좌석
    S -->> C : 좌석 유효성 에러
    end

    S --> S : 잔액 검증
    alt 잔액이 충분하지 않음
    S -->> C : 잔액 부족 에러
    end

    S --> S : 결제 처리, 토큰 소멸, 포인트 사용 히스토리 작성
    S --> C : 결제 성공 응답

```

### ERD

- 하나의 콘서트는 여러개의 날짜를 가짐.
- 각 날짜의 콘서트는 여러 유저를 가질 수 있으며, Concert의 maxSeats만큼 seat를 가질 수 있음.
- 유저의 토큰에는 콘서트의 정보, 토큰의 만료 시간, 대기 순번 등의 정보를 암호화 하여 저장함.
- payStatus를 이용해 '예약'과 '결제' 상태를 나누어 좌석의 상태를 관리함.
  - '예약' 상태 이면서 데이터가 생성된지 5분이 지났다면 해당 row를 '좌석 예약 가능'으로 처리하고 다른 유저가 예약할 때 삭제

![스크린샷 2024-04-08 오후 7 51 19](https://github.com/hh-plus/3-concert-reservation/assets/71562311/9147b241-463a-4270-92e4-74cb9b05401f)

### 마일스톤

[notion](https://www.notion.so/0e137816d2544a87914244118e7804e1?pvs=4)
