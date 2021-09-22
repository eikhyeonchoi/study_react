/**
 * HTML에서 id를 사용해 DOMdp 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는게 ref임
 * 리액트 컴포넌트 안에서도 id를 사용할 수 있지만, jsx안에서 id를 달면 해당 컴포넌트를 재사용하게 될 시
 * id가 여러개가 되서 문제가 됨
 * ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 이러한 문제가 발생하지 않음
 * ref를 사용하는 경우는 "DOM을 꼭 직접적으로 건드려야 할 때"임
 */

// 부모 컴포넌트
class App extends Component {
    render() {
        return (
            <div>
                {/* 컴포넌트도 ref를 달 수 있다 */}
                <ScrollBox ref={(ref)=> this.scrollBox = ref}/>
                {/* 
                    처음 렌더링될때는 this.scrollbox == undefined이기 때문에
                    렌더링된 이 후 클릭이벤트에 scrollbox.scrollToBottom 메서드를 실행함
                 */}
                <button onClick={()=> this.scrollBox.scrollToBottom()}>go to bottom</button>
            </div>
        );
    }
}

// 자식 컴포넌트
class ScrollBox extends Component {
    scrollToBottom = () => {
        const {scrollHeight, clientHeight} = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    };

    render() {
        const style = {
            border: '1px solid black',
            height: '300px',
            width: '300px',
            overflow: 'auto',
            position: 'relative'
        };

        const innerStyle = {
            width: '100%',
            height: '650px',
            background: 'linear-gradient(white, black)'
        };

        return (
            /** DOM을 직접 조작하고 싶을 때 ref을 설정한다 */
            <div style={style} ref={(ref)=>{this.box=ref}}>
                <div style={innerStyle}></div>
            </div>
        );
    }
}

/**
 * 정리
 * DOM에 직접 접근해야할 떄에만 ref를 사용함
 * 컴포넌트간 데이터 고류시에는 ref를 사용하는게 아님
 * 다시 한번 메모하지만 DOM을 직접 건드려야할 때 ref를 사용할 것
 */