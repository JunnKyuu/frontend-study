import './TodoItem.css';
import {memo} from "react";

// id, isDone, content, date, onUpdate : props
// TodoItem 컴포넌트는 자신이 받고 있는 id, isDone, content, date, onUpdate, onDelete와 같은
// props가 바뀌지 않는다면 다시는 렌더링 발생 X
const TodoItem = ({id, isDone, content, date, onUpdate, onDelete}) => {

    // onChangeCheckbox라는 이벤트 핸들러 만들기
    const onChangeCheckbox = () => {
        onUpdate(id);
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return (
    <div className="TodoItem">
        {/* input 태그에 onChangeCheckbox 이벤트 핸들러 props로 넣어주고 위에서 onChangeCheckbox 실행되면  */}
        {/* onUpdate 함수 호출해주기 */}
        {/* button이 아닌 input 요소이기 때문에 onClick이 아닌 onChange라는 이벤트 핸들러 사용 */}
        <input onChange={onChangeCheckbox} readOnly checked={isDone} type="checkbox" />
        <div className="content">{content}</div>
        {/* new Date()로 새로운 데이트 객체를 생성하면서 인수로 타임스탬프 전달 후  toLocaleDateString() 메서드 이용 */}
        <div className="date">{new Date(date).toLocaleDateString()}</div>
        <button onClick={onClickDeleteButton}>삭제</button>
    </div>
    );
};

// 고차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps)=> {
//     // 반환값에 따라 props가 바뀌었는지 안바뀌었는지 판단
//     // T -> props 바뀌지 X, -> 리렌더링 X
//     // F -> props 바뀜 -> 리렌더링 O
//     if(prevProps.id !== nextProps.id) return false;
//     if(prevProps.isDone !== nextProps.isDone) return false;
//     if(prevProps.content !== nextProps.content) return false;
//     if(prevProps.date !== nextProps.content) return false;
    
//     return true;
// });

export default memo(TodoItem);
