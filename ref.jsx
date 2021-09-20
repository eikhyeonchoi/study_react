/**
 * HTML에서 id를 사용해 DOMdp 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는게 ref임
 * 리액트 컴포넌트 안에서도 id를 사용할 수 있지만, jsx안에서 id를 달면 해당 컴포넌트를 재사용하게 될 시
 * id가 여러개가 되서 문제가 됨
 * ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 이러한 문제가 발생하지 않음
 * ref를 사용하는 경우는 "DOM을 꼭 직접적으로 건드려야 할 때"임
 */

