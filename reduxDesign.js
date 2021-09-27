/**
 * Redux 설계 패턴
 * 가장 많이 사용하는 패턴은 presentational component(이하 p)와 container component(이하 c)를 분리하는 것
 * 
 * p에선 주로 상태 관리가 이뤄지지 않고 단지 props를 받아와 화면에 UI를 보여 주기만 하는 컴포넌트를 의미함
 * c는 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아 오기도하고 리덕스 스토어에 액션을 디스패치 하기도 함
 * -> 리덕스와 연동된 컴포넌트를 컨테이너 컴포넌트라 부름
 * 예제 redux-tuto 프로젝트 참고...
 */