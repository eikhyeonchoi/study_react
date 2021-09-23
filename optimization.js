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
 * 원래 setter함수를 사용할때 새로운 값을 인수로 넣었지만(setNumber(prevNumber+1))
 * 함수를 넣을 수 있음 -> 함수를 넣는다면 useCallback의 두 번째 파라미터(배열)의 요소를 넣지 않아도 됨
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
 * state가 객체(배열도 객체)일경우 항상 map, filter등을 사용하면서 
 * 기존 state는 계속 유지하면서 새로운 객체를 만들면서 state를 관리해줬음
 * 왜 새로운 객체를 만드냐면 React.memo를 사용했을 때 props가 변화한지를 감지하기 위해서임
 * 즉 바뀌지 않은 객체와 새로 바뀐 객체를 비교해서 리렌더링 성능을 최적화함
 * (
 *  아에 객체 자체가 달라야함 
 *  // bad
 *  const obj = {};
 *  const newObj = obj;
 *  -> 이렇게하면 저 변수가 가리키는 참조값이 같기 때문에 같은 객체를 가리킴
 *  // good
 *  const newObj = {...obj};
 * )
 * 
 * immer(라이브러리)을 사용하면 불변성을 보다 쉽게 유지할 수 있음
 * import produce from 'immer'; // immer을 import 한 후
 * produce(param1, param2)를 사용해 state를 관리할 수 있다
 * param1: 기존 state(수정하고 싶은 state)
 * param2: 상태를 어떻게 update할지 정의하는 함수
 * 이 라이브러리의 핵심은 불변성을 유지하지 않아도 알아서 불변성을 유지해준다는 것
 * 즉 Array.prototype.push(), Array.prototype.splice()등 원본배열을 직접 수정하는 메서드도 사용 가능
 * 만약 param1을 함수로 정의한다면 produce는 업데이트 함수를 리턴함
 * const update = produce(draft => {
 *      draft.value++;
 * });
 * const nextState = update({value:1, foo:'bar'});
 * useState의 함수형 업데이트를 구현할 수 있음
 * 
 * immer을 사용해도 되긴 하지만 immer을 쓸 경우 함수를 불러야하기 때문에 오히려 코드가 더 복잡해 질 수 있다
 * 만약 state의 depth가 낮다면 그냥 immer을 쓰지 않고 불변성을 지키면서 작성하고
 * depth가 높다면 immer을 써서 코드량을 줄이는게(가독성을 높이는게) 맞다
 */

// immer 사용
// 함수형 업데이트와 큰 차이는 없지만 불변성을 안지키면서 메서드를 호출 할 수 있다
setData(produce(draft=> {
    draft.array.push({id:nextId.current++, name:form.name, username:form.username});
}));

// 기본형(useCallback의 두 번째 파라미터의 state요소는 기본형만 넣으면 된다)
setData({
    ...data,
    array: [...data.array, {id:nextId.current++, name:form.name, username:form.username}],
});

// 함수형 업데이트
setData(data=> ({
    ...data,
    array: [...data.array, {id:nextId.current++, name:form.name, username:form.username}],
}))



/**
 * react-virtualized
 * 만약 리스트에 2500개가 있는데
 * 그냥 내비두면 2500개 한번에 리스트에 나와서 스크롤을 하지 않았음에도 불구하고
 * 2500개가 렌더링될 것임
 * ... 추 후 업데이트
 */

