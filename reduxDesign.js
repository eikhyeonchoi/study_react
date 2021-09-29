
/**
 * ★★★ 중요 ★★★
 * 일단 redux를 궁극적인 이유는 "전역적인 상태관리"임
 * 어디 컴포넌트에서든 한번에 상태를 바꿀 수 있다는 점
 */

/**
 * Redux 설계 패턴
 * 가장 많이 사용하는 패턴은 presentational component(이하 p)와 container component(이하 c)를 분리하는 것
 * 
 * p에선 주로 상태 관리가 이뤄지지 않고 단지 props를 받아와 화면에 UI를 보여 주기만 하는 컴포넌트를 의미함
 * c는 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아 오기도하고 리덕스 스토어에 액션을 디스패치 하기도 함
 * -> 리덕스와 연동된 컴포넌트를 컨테이너 컴포넌트라 부름
 * 예제 redux-tuto 프로젝트 참고...
 */

/**
 * 리덕스를 만드는 과정...
 * (리덕스를 통해 상태관리를 하는 과정?)
 * 리액트리덕스는 connect함수를 제외하곤 쓰지 않음
 * 
 * ※ (네이밍은 하기나름임)
 * 1. 모듈을 만듦
 * 모듈에는 액션타입, 액션생성함수, 초기값, 리듀서 등이 있어야함
 * 그냥 쌩으로 만들거나 redux-actions -> {createAction, handleActions}를 사용하거나
 * 
 * 2. 컨테이너를 만듦
 * 일단 컨테이너란 리덕스 스토어와 연동되는 컴포넌트라고 볼 수 있다
 * connect 함수를 이용해 컨테이너 컴포넌트와 리덕스 스토어를 연결함
 * 컨테이너에서의 리턴값?은 프레젠테이셔널 컴포넌트(props가 추가된)를 리턴하게 함
 * 그냥 쌩으로 만들거나 react-redux -> {useSelector, useDispatch}를 사용하거나
 * ※ useDispatch를 사용하면 useCallback도 같이 사용을 권장
 * // const dispatch = useDispatch();
 * // const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
 * ※ useSelector를 사용했다면 자동으로 최적화가 되지 않아 export시 React.memo를 컨테이너 컴포넌트에 사용해야 최적화가 됨
 * 
 * 3. 컴포넌트(프레젠테이셔널)를 만들어서 뿌린다
 * 단순히 컨테이너 컴포넌트에서 받은 props활용하면 됨
 * 기능을 붙이거나 이런건 없고 그냥 바인딩하는 정도
 * 
 * 4. 만든 리듀서를 합치고 스토어를 만들고 스토어에 등록함
 * redux -> combineReducers(객체)
 * 만들어진 리듀서들을 합침 -> 보통 /modules/index.js
 * export default combineReducers({...});
 * 
 * redux -> createStore(리듀서)
 * 스토어를 만듦 -> 보통 index.js
 * import {createStore} from 'redux';
 * import {combineWithDevTools} from 'redux-devtools-extension';
 * import {Provider} from 'react-redux';
 * const store = createStore(reducer, combineWithDevTools());
 * 
 * react-redux -> Provider를 통해 스토어를 등록?함
 * return <Provider store={store}><App/></Provider>
 */

/**
 * 비동기 처리시 redux-saga 설계 패턴
 * 일반적 redux와 차이점만 기술
 * 
 * 모듈 작성의 차이
 * 일반적인 상태관라랑은 좀 다르게 비동기를 처리해야하기 때문에 사가를 쓰는 것인데
 * 일반적인 상태관리 모듈작성 패턴 :: 액션정의 -> 액션생성함수 작성 -> 리듀서 작성(초깃값 설정)
 * 일반적인 상태관리 상태변경 과정 :: 특정 이벤트 발생 -> 디스패치 콜 -> 리듀서 콜 -> 스토어의 상태변경 됨
 * 여기선 액션 생성함수의 매칭되게 모든 리듀서항목을 작성함
 * 
 * 비동기 상태관리 모듈작성 패턴 :: 액션정의 -> 액션생성함수 작성 -> 사가함수 작성 -> 액션생성-사가함수 매칭 함수 작성 -> 리듀서 작성
 * 비동기 상태관리 상태변경 과정 :: 특정이벤트 발생 -> 디스패치 콜 -> 사가 콜 -> 사가안에서 리듀서 콜 -> 스토어의 상태변경 됨
 * 여기선 액션 생성함수와 리듀서의 항목이 다를 수 있다
 * 액션 생성함수는 (액션생성-사가함수 매칭 함수 작성, 직접적인 콜)에서 쓰임
 */

// 액션 정의
const IMAGE_GET = 'image/GET';
const IMAGE_SUCCESS = 'image/SUCCESS';
const IMAGE_FAILURE = 'image/FAILURE';
const IMAGE_LOADING = 'image/LOADING';
 
// 액션 생성함수 정의
// 리듀서항목들의 type과 다른 액션 생성함수임
const getImage = createAction(IMAGE_GET);

// 초깃값 설정
const init = {
    loading: false,
    error: false,
    images: [],
};
 
// 사가함수
function* getImageSaga(action = {}) {
    console.log(action);
    yield put({
        type: IMAGE_LOADING,
    });

    try {
        const response = yield call(api.getImageFromUnsplash);
        yield put({
            type: IMAGE_SUCCESS,
            image: response.data
        });
    } catch (e) {
        yield put({
            type: IMAGE_FAILURE,
            error: e,
        });

        throw e;
    }

    yield put({
        type: IMAGE_LOADING,
    });
}


// 액션생성-사가함수 매칭 함수
// IMAGE_GET type의 요청이 발생하면 
// getImageSaga를 수행함
function* imageSaga() {
    yield takeLatest(IMAGE_GET, getImageSaga);
}

// 리듀서작성
// 액션 생성함수의 목록과 일치하지 않음
const image = handleActions(
    {
        [IMAGE_SUCCESS]: (state, action) => ({...state, images: [...state.images, action.image]}),
        [IMAGE_FAILURE]: (state, action) => ({...state, erorr: action.error}),
        [IMAGE_LOADING]: (state, action) => ({...state, loading: !state.loading}),
    },
    init
)
export {getImage, imageSaga};
export default image;
 
/**
 * 스토어 등록의 차이
 * redux-saga -> createSagaMiddleware를 통해 사가 미들웨어생성
 * redux -> applyMiddleware를 통해 미들웨어를 등록함
 * 생성한 사가 미들웨어를 run(sagas...);
 */
const sm = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sm)));
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root')
);
sm.run(rootSaga)