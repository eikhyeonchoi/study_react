/**
 * 성능 최적화
 * 
 * 느려지는 원인
 * 만약 리스트 항목들이 무수히 많다면
 * 거기서 특정 항목의 이벤트를 수행할 때 리스트의 모든 항목을 리렌더링 한다면
 * 렌더링하는데 시간이 오래 걸리기 때문에 불편할거임
 * 따라서 특정항목의 이벤트가 발생한다면 그 항목만 리렌더링 하는게 좋음
 */

/**
 * React.memo(Component)
 * 받은 props가 변경될 때만 해당 Component를 리렌더링함
 * 리스트 관련 컴포넌트를 작성할 때 보통 리스트, 리스트 아이템 컴포넌트를 구현하는데
 * 이때 꼭 React.memo()를 통해 컴포넌트자체를 최적화 해줄 것
 */

/**
 * useState의 함수형 업데이트
 * 만약 특정함수가 state에 묶여있다면(state를 다룬다면)
 * 해당 state가 바뀌면 그 함수 자체도 새로 생성됨 -> 느려짐
 * 원래 setter함수를 사용할때 새로운 값을 인수로 넣었지만
 * 함수를 넣을 수 있음 함수를 넣는다면 useCallback의 두 번째 파라미터(배열)의 요소를 넣지 않아도 됨
 */
const [number, setNumber] = useState(0);
const onIncrase = useCallback(() => {
    setNumber(prevNumber => prevNumber + 1)
}, []);

/**
 * useReducer 사용
 * 만약 특정함수가 state에 묶여있다면(state를 다룬다면)
 * 해당 state가 바뀌면 그 함수 자체도 새로 생성됨 -> 느려짐
 * 방법은 useState를 함수형으로 하던가
 * 아니면 useReducer를 사용할 것
 */

/**
 * 불변성의 중요성(state)
 * ... 추 후 업데이트
 */

/**
 * react-virtualized
 * 만약 리스트에 2500개가 있는데
 * 그냥 내비두면 2500개 한번에 리스트에 나와서 스크롤을 하지 않았음에도 불구하고
 * 2500개가 렌더링될 것임
 */