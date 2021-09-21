/**
 * 라이프사이클
 * 모든 리액트 컴포넌트에는 라이프사이클이 존재
 * 라이프사이클은 클래스형 컴포넌트에만 사용가능하지만
 * 함수형 컴포넌트에서도 Hooks 기능을 통해 비슷하게 구현가능
 * 
 * 종류는 총 9가지
 * Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드
 * Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후 실행되는 메서드
 * 
 * 카테고리는 3가지
 * 마운트
 *     DOM이 생성되고 브라우저상에 나타나는 것을 마운트라고함
 *     순서1 - constructor: 컴포넌트를 만들떄마다 호출되는 클래스 생성자 메서드
 *     순서2 - getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메서ㅜ드
 *     순서3 - render: 준비한 UI를 렌더링하는 메서드
 *     순서4 - componentDidMount: 컴포넌트가 브라우저상에 나타난 후 호출하는 메서드
 * 업데이트
 *     총 4가지 경우에 업데이트함
 *     1. props가 바뀔 때
 *     2. state가 바뀔 때
 *     3. 부모 컴포넌트가 리렌더링 될 때
 *     4. this.forceUpdate로 강제로 렌더링을 트리거할 때
 *     순서1 - getDerivedStateFromProps: 마운트 과정에서도 호출함, 동일한 기능이며 업데이트하기 전 호출
 *     순서2 - shouldComponentUpdate: 리렌더링 해야 할지 말아야 할지를 결정하는 메서드 bool을 리턴하고 true시 계속, false시 중단
 *     순서3 - render: 컴포넌트를 리렌더링 만약 this.forceUpdate를 호출하면 shouldComponentUpdate를 생략하고 render를 실행함
 *     순서4 - getSnapshotBeforeUpdate: 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출되는 메서드
 *     순서5 - componentDidUpdate: 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드
 * 언마운트
 *     컴포넌트를 DOM에서 제거하는 것을 언마운트라고함
 *     순서1 - componentWillUnmount: 컴포넌트가 브라우저상에서 사라지기 전에 호출하는 메서드
 * 
 * 라이프 사이클 메서드 상세
 * 1. render()
 *    준비한 UI를 렌더링하는 메서드임, 이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 안되고 DOM에 접근해서도 안됨
 *    DOM정보를 가져오거나 state에 변화를 줄 때엔 componentDidMount에서 처리해야함
 * 2. constructor()
 *    컴포넌트를 처음 만들때 처음으로 실행됨, 초기 state를 설정가능
 * 3. getDerivedStateFromProps(nextProps, prevState)
 *    props로 받아온 값을 state에 동기화시키는 용도로 사용함 
 * 4. componentDidMount()
 *    컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행함, 다른 js라이브러리, 프레임워크의 함수를 호출하거나 이벤트등록 및 비동기작업을 처리하면 됨
 * 5. shouldComponentUpdate(nextProps, nextState)
 *    props, state를 변경했을 때 리렌더링을 시작할지 여부를 지정하는 메서드임, 이 메서드는 반드시 bool을 리턴해야함
 * 6. getSnapshotBeforeUpdate(prevProps, prevState)
 *    render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출
 * 7. componentDidUpdate(prevProps, prevState, snapshot)
 *    리렌더링을 완료한 후 실행, 업데이트가 끝난 직 후 이므로 DOM관련 처리르 해도 무방함
 * 8. componentWillUnmount()
 *    컴포넌트를 DOM에서 제거할 떄 실행함, componentDidMount에서 등록한 이벤트, DOM등이 있다면 여기서 제거해야함
 * 9. componentDidCatch(error, info)
 *    컴포넌트 렌더링 도중에 에러가 발생했을 때 죽지않고 오류 UI를 보여줄 수 있게 해줌
 * 
 * 
 * 
 * 라이프사이클 메서드는 상태에 변화가 있을 때마다 실행하는 메서드임
 * 이 메서드들은 서드파티 라이브러리르 사용하거나 DOM을 직접 건드려야하는 상황에서 유용함
 */

