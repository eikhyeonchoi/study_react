/**
 * 컴포넌트를 스타일링할 때는 다양한 방식을 사용할 수 있다
 */

/**
 * 1. 일반 css
 * 말그대로 .css를 만든 뒤 import 후 사용
 */



/**
 * 2. sass사용
 * 두 가지 확장자 scss, sass을 지원함
 * 
 * 다른 sass 파일을 import할 땐 -> @import './styles/utils';
 * 근데 차차 depth가 커지면 ../../../ 이렇게 해야할 수 있으니
 * utils 등 필요한 sass파일을 미리 import할 수 있다
 * npm run eject하면 프로젝트폴더에 config가 생김
 * config -> webpack.config.js를 찾음
 * {
 *      test: sassRegex,
 *      exclude: sassModuleRegex,
 *      use: getStyleLoaders({
 *              importLoaders: 2,
 *              sourceMap:  isEnvProduction &&  shouldUseSourceMap
 *      }).concat({
 *          loader: require.resolve('sass-loader'),
 *          options: {
 *              sassOptions: {
 *              includePaths: [paths.appSrc + '/styles']
 *          },
 *              sourceMap: isEnvProduction && shouldUseSourceMap,
 *              additionalData: `@import 'utils.scss';`,
 *          }}),
 *      ... 이하 생략
 * 
 * additionnalData에 미리 import시킬 수 있다
 * 
 * 다른 라이브러리를 불러올때 보통 라이브러리가 node_modules에 있는데
 * 일일히 ../../node_modules/ 이렇게 할 필요 없고 "~"를 쓰면 "node_modules/"와 같이 디렉토리를 탐지함
 * @import '~open-color/open-color'; 
 */



/**
 * 3. css module 사용
 * css를 불러와서 사용할 때 클래스 이름을 고유한 값 즉 "파일이름_클래스이름__해시값" 형태로
 * 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되지 않도록 함
 * .module.css 확장자로 파일을 저장하기만 하면 CSS Module이 적용됨
 */
// CSSModule.module.css
//  .wrapper {
//     background: black;
//     padding: 1rem;
//     color: white;
//     font-size: 2rem;
// }
// 글로벌 css를 작성하고 싶다면..
// :global .something {
//     font-weight: 800;
//     color: aqua;
// }
// 일반 css파일(.css, .scss)에서도 :local을 사용해 CSS Module을 사용할 수 있다
// :local .wrapper{
//
// }

/**
 * classnames라는 라이브러리를 사용하면 (npm i classnames)
 * 클래스를 조건부로 설정할 때 편리함
 * 
 * import classnames from 'classnames/bind';
 * const cx = classnames.bind(styles);
 */
import styles from './CSSModule.module.css';
const CSSModule = () => {
    // styles는 객체이다
    // {wrapper: CSSModule_wrapper_해시값}
    return (
        <div className={`${styles.wrapper} ${styles.inverted}`}>
        {/* 
            classnames 라이브러리를 사용하면 className을 조건부로 설정하기 편함
            <div className={cx('wrapper', 'inverted')}></div> 
            하이 <span className={classnames('a', {b:true}, {c:false})}>css module</span>
        */}
            안녕 <span className="something">css module</span>
        </div>
    );
};
import CSSModule from './CSSModule.js';
const App = () => {
    return (
        <div>
            <CSSModule/>
        </div>
    );
};



/**
 * 4. styled-components
 * 자바스크립트 파일 안에 스타일을 선언하는 방식
 * 벡틱문자열에 스타일정보를 넣었음 여기서 사용한 문법을 Tagged 템플릿 리터럴이라고 부름
 * 일반 템플릿 리터럴과 다른 점은 템플릿 안에 JS객체나 함수를 전달하면 온전히 추출 가능
 *
 * 예제 `hello ${{foo:bar}} ${()=>'world'}`
 * 일반 템플릿 결과: "hello [object Object] ()=> 'world'!"
 * Tagged 템플릿 결과: (3) [Array(3), {...}, f]
 * 
 * 만약 컴포넌트 자체에 스타일을 넣고싶다면(예제)
 * className props를 최상위 DOM의 className값으로 설정하는 작업을 해놔야함
 * const Sample = ({className}) => {
 *      return <div className={className}>Sample</div>
 * }
 * const StyledSample = styled(Sample)`
 *      font-size: 2rem;
 * `;
 * 
 */
import styled, {css} from 'styled-components';
const Box = styled.div`
    background: ${props=> props.color || 'blue'};
    padding: 1rem;
    display: flex;
`;
const Button = styled.button`
    background: white;
    color: black;
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 600;

    &:hover {
        background: rgba(255,255,255,0.9);
    }

    // props에 따른 조건부 스타일링
    ${props => props.inverted && 
        // css를 안붙이고 그냥 써도 되지만 안에서 props를 참조한다면 반드시 css로 감싸야함
        css`
            background: none;
            border: 2px solid white;
            color: white;
            &:hover {
                background: white;
                color: black;
            }
    `};

    & + button {
        margin-left: 1rem;
    }
`;

const StyledComponent = () => {
    return (
        <Box color="black">
            <Button>hi</Button>
            <Button inverted={true}>테두리만</Button>
        </Box>
    );
};