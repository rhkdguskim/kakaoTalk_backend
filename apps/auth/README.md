### 기능
- 인증 : token 발급
- 

``` mermaid
flowchart TD
    A[API GateWay] --> B(Authenication MicroService)
    A --> C(Authorizaion MicroService)
    A --> D(Chat MicroService)
    A --> E(Friend MicroService)
    A --> F(Room MicroService)
    A --> G(File MicroService)
```