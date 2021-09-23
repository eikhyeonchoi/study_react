/**
 * SPA
 * single page application
 * 한개의 페이지로 이루진 어플리케이션
 * 화면을 전환할때 마다 서버에 계속 요청하면 상태유지도 번거롭고, 
 * 바뀌지 않은 부분도 다시 렌더링해야 하기 때문에 불필요한 로딩이 발생함
 * 그래서 뷰렌더링을 브라우저가 담당하도록 하고 필요한 부분만 js를 이용해 업데이트함
 * 단점
 * 일반 크롤러에서는 페이지의 정보를 재대로 수집하지 못함
 * 검색엔진의 검색 결과에 페이지가 잘 나타나지 않을 수 있다
 * 또 js가 실행될 때 까지 페이지가 비어 있어 로딩되는 동안 흰색 화면일 수 있다
 */



/**
 * 라우터적용
 * BrowserRouter컴포넌틍는 웹 어플리케이션에 HTML5의 History API를 사용해
 * 페이지를 새로고침하지 않고도 주소를 변경하고 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해줌
 */
// src/index.js
// import {BrowserRouter} from 'react-router-dom';
// <BrowserRouter>
//  <App />
// </BrowserRouter>

// src/App.js
// Route 컴포넌트를 선언해 라우터를 등록함
// <Route path='라우팅경로' component={컴포넌트} exact={정확여부?} />
// 여러개도 설정 가능함
// <Route path={['/about', '/info']} component={컴포넌트} exact={정확여부?} />
// 해당 링크로 가기위한 Link 컴포넌트
// <Link to='/profile/abc'>Profile</Link>

/**
 * URL에 파라미터 또는 쿼리를 줄 수 있다
 * /about/detail        << 이런식이 URL 파라미터
 * /about?detail=true   << 이런식이 URL 쿼리
 */

/**
 * URL 파라미터
 * <Route path={'/profile/:username'} component={Profile} />
 * 파라미터를 안주는 경우도 있으니 이렇게 하면 좋을 듯?
 * <Route path={['/profile', '/profile/:username']} component={Profile} />
 * -> 자식 컴포넌트에서 받는건 props의 match로 받으면 됨(객체)
 */
const Profile = ({match}) => {
    const users = [
        {name: 'abc',desc: '1'},
    ]
    const {username} = match.params;
    const user = users[users.findIndex(item => item.name === username)];
    if(!user) {
        return <h1>no user</h1>;
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.desc}</p>
        </div>
    );
};

/**
 * URL 쿼리스트링
 * 라우트는 기본 라우트 처럼 설정하면 되고 
 * -> 자식 컴포넌트에서 받는건 props의 location으로 받으면 됨(객체)
 * qs라이브러리를 통해 쿼리스트리을 객체로 만들 수 있음
 * qs.parse(location.search, {ignoreQueryPrefix: true});
 * 단 객체의 프로퍼티의 값은 문자열임(ex. true(x), 'true'(o))
 */
 const About = ({location}) => {
    const qString = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const isDetail = qString.detail === 'true';
    return (
        <div>
            <p>About</p>
            {isDetail && <div>detail info</div>}
        </div>
    );
};

/**
 * withRouter(react-router-dom)
 * 이 함수는 HoC(Higher-order Component), 라우트로 사용된 컴포넌트가 아니어도
 * match, location, history 객체를 접근할 수 있게 해줌
 */
import { withRouter } from 'react-router-dom';
const WithRouterSample = ({location, match, history}) => {
    return (
        <div>
            <h1>location</h1>
            <textarea
                value={JSON.stringify(location, null, 4)}
                rows={7}
                readOnly={true}
            />
            <h1>match</h1>
            <textarea
                value={JSON.stringify(match, null, 4)}
                rows={7}
                readOnly={true}
            />
            <button type='button' onClick={()=> history.push('/')}>go to home</button>
        </div>
    );
};
export default withRouter(WithRouterSample);

/**
 * Switch(react-router-dom)
 * 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링 시켜줌
 */
<Switch>
    <Route path='/' component={Home} exact={true} />
    <Route path={['/about', '/info']} component={About} />
    <Route path='/profiles' component={Profiles} />
    {/* path를 따로 정의 하지 않는다면 모든 상황에 렌더링 됨 */}
    <Route render={({location, history}) => (
        <div>
            <h2>404 error</h2>
            <p>{JSON.stringify(location)}</p>
            <p>{JSON.stringify(history)}</p>
        </div>
    )}/>
</Switch>

/**
 * NavLink(react-router-dom)
 * 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 트겆ㅇ 스타일 혹은 css클래스를 적용할 수 있는 컴포넌트임
 * 스타일을 적용하고 싶다면 -> activeStyle
 * 클래스를 넣고 싶다면     -> activeClassName
 * 
 */
// <NavLink activeClassName='active' activeStyle={activeStyle} to={`/profiles/${user.name}`}>{user.name}</NavLink>