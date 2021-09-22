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
 * node-sass, classnames, react-virtualized, react-icons, react-virtualized
 */