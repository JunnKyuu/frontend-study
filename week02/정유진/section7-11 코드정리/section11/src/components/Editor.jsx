// 추가 버튼을 클릭했을 때 onCreate 함수를 호출하면서 인수로는 content state에 보관된 값을 전달
// onSubmit 함수가 실행 되면 앱 컴포넌트로부터 받은 onCreate 함수를 호출하면서 
// 인수로는 input 태그에 입력한 값을 전달하게 됨
// App 컴포넌트에 onCreate 함수가 실행되면서 새로운 Todo 아이템을 만들고
// 이렇게 만든 아이템을 setTodo 함수를 통해 Todos state에 추가하게 되고 
// 그럼으로써 데이터 추가가 실제로 이루어지게 됨

import "./Editor.css";
// 입력 폼에 포커스 주기 위해 useRef 추가
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from '../App';

const Editor = () => {
    // import 문을 이용해 불러온 TodoContext 인수로 넣어주기
    // 구조분해 할당 이용해 onCreate만 불러오기
    const {onCreate} = useContext(TodoDispatchContext)
    const [content, setContent] = useState("");
    // 새로운 레퍼런스 객체 생성
    const contentRef = useRef();

    // onChangeContent라는 이벤트 핸들러 만들기
    // 이벤트 핸들러에서 setContent 호출해서 e.target.value를 인수로 전달해 준 다음 이 input 태그에 value 속성 값으로
    // content를 전달 
    // onChange 속성 값으로는 onChangeContent 함수를 전달
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    // onKeyDown라는 이벤트 핸들러 만들기
    // 어떤 키를 눌렀는지는 이벤트 객체(e)의 keyCode라는 프로퍼티에 저장
    const onKeyDown = (e) => {
        if(e.keyCode === 13) {
            onSubmit();
        }

    // onSubmit 함수 내에서 onCreate 함수 호출해서 인수로는 input 태그에 작성된 값을 전달해주기 
    const onSubmit = () => {
        if (content === "") {
            // 제출 버튼 눌렀을 때 만약 빈 칸이면 포커스 되도록 하기
            contentRef.current.focus();
            return;
        }
        onCreate(content);
        // onCreate 함수 실행 후 입력창 비워주기
        setContent("");
    }

    return (
    <div className="Editor">
        <input 
        ref={contentRef}
        value={content}
        // input 태그에 onkeyDown 이벤트 핸들러 연결하기
        onKeyDown={onkeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
        />
        <button onClick={onSubmit}>추가</button>
    </div>
    );
};
}

export default Editor;