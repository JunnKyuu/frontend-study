import './TodoItem.css';

// id, isDone, content, date, onUpdate : props
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

export default TodoItem;
