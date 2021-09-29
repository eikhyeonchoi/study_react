/**
 * 코드 스플리팅
 * 사용자에게 배포할 땐 빌드를 한 후 배포함
 * 빌드작업
 * 불필요한 주석, 경고메세지, 공백 제거를 통해 파일 크기를 최소화
 * JSX문법이나 다른 최신 자바스크립트 문법이 작동되도록 코드의 트랜스파일
 * -> WebPack이 알아서 함
 * 
 * 만약 페이지가 A, B, C가 있고 따로 설정하지 않으면 A, B, C컴포넌트에 대한 코드가 
 * 모두 한 파일이 저장되어 버림 -> 로딩이 오래걸려 좋지 않음
 * 코드 비동기 로딩(코드 스플리팅의 방법 중 하나)를 사용하면 필요한 시점에만
 * 딱딱 불러와서 렌더링할 수 있게 해줌
 */



/**
 * 코드스플리팅 방법 1
 * React.lazy() / Suspense를 통해 쉽게 구현할 수 있음
 */
 import React, { useState, Suspense } from 'react';
 
 // lazy로 컴포넌트를 설정하면 한 파일에 묶이지 않고 따로 파일을 생성함
 const SplitMe = React.lazy(() => import('./SplitMe'));
 const App = () => {
    const [visible, setVisible] = useState(false);
    const onClick = () => {
        setVisible(!visible);
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <p onClick={onClick}>Hello React!</p>
                <Suspense fallback={<div>loading...</div>}>
                    {visible && <SplitMe/>}
                </Suspense>
            </header>
        </div>
    );
};



/**
 * 코드 스플리팅 방법 2
 * Loadable Components사용
 * 코드 스플리팅을 도와주는 서드파티 라이브러리임
 * 서버사이드렌더링이 가능함(lazy, Suspense는 불가능)
 * 
 * ...  추 후 loadable 기능 작성
 */
import loadable from '@loadable/component';

const SplitMe = loadable(() => import('./SplitMe'), {
    // fallback: 로딩 중 다른 UI 보여주고 싶을 때 ...
    fallback: <div>loading ...</div>
});

const App = () => {
    const [visible, setVisible] = useState(false);
    const onClick = () => {
        setVisible(!visible);
    };

    // 마우스오버가 되면 해당 컴포넌트를 미리 load해놓는다
    const onMouseOver = () => {
        SplitMe.preload();
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <p onClick={onClick} onMouseOver={onMouseOver}>Hello React!</p>
                {visible && <SplitMe/>}
            </header>
        </div>
    );
};
 