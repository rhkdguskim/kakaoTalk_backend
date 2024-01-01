## 유저/친구 서비스
### 기능

- 비밀번호 / 닉네임 / 이름을 변경합니다.
- 사용자 프로필 이미지 업로드, 상태메세지 관리 기능을 제공합니다.
- 서비스를 이용하는 사용자의 유저를 검색 할 수 있습니다.
- 사용자는 친구를 추가/삭제 할 수 있습니다.
- 사용자는 친구들의 프로필 / 상태메세지를 볼 수 있습니다.

### 비지니스 규칙

- 유저
    - 같은 아이디로 중복해서 생성 할 수 없습니다.
    - 패스워드는 대/소문자 및 특수문자를 포함해야합니다.
    - 사용자는 자기자신의 사용자 프로필을 관리할 수 있습니다.
    - 관리자를 제외한 일반 사용자는 자기자신의 아이디만 관리할 수 있습니다.
    - 한개의 아이디로 한명의 사용자만 사용 할 수 있습니다.
- 친구
    - 내가 바라보는 친구의 이름과 실제 친구의 이름을 다르게 설정 할 수 있습니다.
    - 자기자신을 친구로 추가 할 수 없습니다.
    - 같은사람을 여러명 친구로 추가 할 수 없습니다.
    - 친구가 아닌사람과 채팅을 할때에는 낯선사람과 대화 경고 화면이 나타납니다.

### 사용 기술

- Class Validator를 활용하여 API 인터페이스를 검사합니다.
    - NestJS의 Pipe를 활용하였습니다.
- Express의 Multer를 사용하여 파일업로드를 구현하였습니다.
    - 배경화면, 프로필 이미지 업로드 및 이미지 파일 제공