/**
 * Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능임
 * ex. 로그인 정보, 어플리케이션 환경 설정 등등
 * 
 * 원래 컴포넌트 간 상태를 교류해야할 때 부모->자식 흐름으로 props를 전달했음
 * context API를 사용하면 굳이 부모->자식을 거치지 않더라도 전역적으로
 * 상태를 교류?할 수 있다
 */

/**
 * Render props 패턴
 * 컴포넌트는 추 후 사용할 때 
 * 아래 예제처럼 사용할 수 있다
 * 원래 컴포넌트 태그 사이 값을 주면 자식컴포넌트에서 받아서
 * children이라는 props로 바로 사용했는데 단지 함수를 준 것뿐임
 * Context API는 이런 방식으로 작동함
 */
const RenderPropsSample = ({children}) => {
    return <div>결과 : {children(5)}</div>;
};
<RenderPropsSample>{value=> 2 * value}</RenderPropsSample>



/**
 * Context API 사용법
 * Consumer는 뜻 그대로 소비자임 값을 context에서 가져와서 사용(렌더링)
 * Provider도 뜻 그대로 제공자라 값을 context값을 변경할 때 사용함
 * 그래서 보통 Provider를 사용한다면 Provider로 쓰인 컴포넌트가 부모고 Consumer가 자식임
 */

// 1. Context API를 만듬
import { createContext } from 'react';
const ColorContext = createContext({color: 'black'});
export default ColorContext;

// 2. Consumer를 통해 사용(Render Props패턴으로 동작함)
const ColorBox = () => {
    return (
        <ColorContext.Consumer>
            {value => (
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: value.color
                }} />
            )}
        </ColorContext.Consumer>
    );
};

// 3. Provider를 통해 context 변경(단 value props가 꼭 있어야함)
const App = () => {
    return (
        <ColorContext.Provider value={{}}>
            <div>
                <ColorBox/>
            </div>
        </ColorContext.Provider>
    );
};


/**Provider, Consumer 예제 */
// createContext를 통해 기본 값을 설정해둠
const ColorContext = createContext({
    state: {color: 'black', subcolor: 'red'},
    actions: {
        setColor: ()=> {},
        setSubcolor: ()=> {},
    },
});

const ColorProvider = ({children}) => {
    const [color, setColor] = useState('black');
    const [subcolor, setSubcolor] = useState('red');

    const value = {
        state: {color, subcolor},
        actions: {setColor, setSubcolor}
    };

    // children을 그대로 렌더링해주고 
    // value값을 state로 바꿔줌
    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );  
};

const {Consumer: ColorConsumer} = ColorContext;
export {ColorProvider, ColorConsumer};
export default ColorContext;