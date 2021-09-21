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
 * css module 사용
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
// :global .something {
//     font-weight: 800;
//     color: aqua;
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