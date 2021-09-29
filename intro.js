/**
 * 핵심키워드
 * virtual DOM, 모듈, 번들링, 로더, babel
 * 
 * 리액트란?
 * 오직 뷰만 신경쓰는 라이브러리
 * 리액트는 virtual DOM을 사용해 DOM 업데이틑 추상화함으로써 DOM 처리 횟수를 최소소화하고 효율적으로 진행
 * 1. 데이터를 업데이트하면 전체 UI를 virtual DOM에 리렌더링함
 * 2. 이전 virtual DOM에 있던 내용과 현재내용을 비교함
 * 3. 바뀐 부분마 실제 DOM에 업데이트함
 * 
 * 리액트의 모듈
 * node_modules라는 디렉터리에 모듈들이 저장됨 
 * 그리고 imoort구문을 통해 불러와서 (재)사용할 수 있음
 * 원래 모듈을 불러와서 사용하는게 없는데, 이러한 기능을 사용하기 위해 
 * 번들러(webpack)을 사용한다(파일을 묶듯 연결함)
 * -> 불러온 모듈을 모두 합쳐 하나의 파일을 생성함
 * 번들러를 사용하면 파일이나 css파일도 불러와서 사용가능함 
 * 이렇게 파일을 불러오는 것은 로더가 담당함(file-loader, css-loader, babel-loader)
 * babel-loader는 js파일을 불러오면서 최신 js문법을 바벨도구를 이용해 ES5문법으로 바꿈(호환성)
 * 
 */

/**
 * make project
 * npm init react-app project-name
 */

/**
 * frequent use lib
 * node-sass: sass 사용
 * classnames: className 관리를 쉽게
 * react-virtualized: 리스트 최적화
 * react-icons: 아이콘
 * immer: 불변성 및 깊이가 깊은 state 관리 쉽게
 * react-router-dom: 라우팅
 * qs: querystring to object
 * axios: ajax
 * redux: 전역상태 관리 쉽게 // createStore, combineReducers
 * react-redux: 리액트용 리덕스 // Provider, connect, useSelector, useDispatch
 * redux-devtools-extension: 관리자도구에서 redux 추적가능 // composeWithDevTools
 * redux-actions: 리덕스를 더 편하게 // createAction, handleActions
 * redux-logger: 리덕스 로거
 * redux-chunk: 비동기 작업 처리 시 미들웨어임, 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해줌
 * redux-saga: 비동기 작업 관련 미들웨어 라이브러리, 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치시키는 규칙을 작성해 비동기 작업을 처리할 수 있게 해줌
 * @loadable/component: 코드스플리팅을 위한 서드파티 라이브러리
 */