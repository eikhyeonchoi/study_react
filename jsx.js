/**
 * JSX란 js의 확장문법
 * 바벨을 사용해 일반 js로 변환된다
 * 
 */
import React, {Fragment} from 'react';

function App() {
    /**
     * 1. 감싸인 요소
     * 여러요소가 있다면 반드시 감싸야함
     * div를 사용하고 싶지 않다면 Fragment를 사용해도 됨 
     * 안을 비우고 <>만 사용해도 됨
     */
    return (
        // asd
        <div>
            <div>
                <div>1</div>
                <div>2</div>
            </div>
            <Fragment>
                <div>1</div>
                <div>2</div>
            </Fragment>
        </div>
    );

    /**
     * 2. js 표현 및 조건부 연산
     * 2-1. 코드를 {}로 감싸면 된다
     * 2-2. 0을 제외한 Falsy값은 보여지지 않아야 한다면 &&
     * 2-3. undefined를 리턴하지 않아야 한다면  ||
     */
    const name = 1;
    return (
        <>
            <>{name}</>
            {/* 삼항연산자 사용가능 */}
            <>{name === 1 ? <h1>1</h1> : <h1>2</h1>}</>

            {/* null 렌더링시 아무것도 보여지지 않음(0을 제외한 Falsy한 값 모두 아무것도 보여지지 않음) */}
            <>{name === 1 ? <h1>1</h1> : null}</>
            {/* null 렌더링 즉, 아무것도 보여주고 싶지 않다면 && 연산자 사용 가능 */}
            <>{name === 1 && <h1>1</h1>}</>

            {/* undefined 반환 방지 */}
            <>{name || <h1>if undefined default</h1>}</>
        </>
    );

    /**
     * 3. 인라인 스타일링
     * 객체형태로 넣을것(-는 카멜케이스로 바꾸면 됨)
     */
    return (
        // 이런식으로 객체처럼
        <div style={{backgroundColor: 'red',}}></div>
    );

    /**
     * 4. class 대신 className
     */
    return (<div className='custom-class-name'></div>);

}

export default App;
