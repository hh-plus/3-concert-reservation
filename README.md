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
![스크린샷 2024-04-08 오후 7 51 19](https://github.com/hh-plus/3-concert-reservation/assets/71562311/9147b241-463a-4270-92e4-74cb9b05401f)





### 마일스톤
[notion](https://www.notion.so/0e137816d2544a87914244118e7804e1?pvs=4)
