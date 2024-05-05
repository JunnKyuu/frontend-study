import {useReducer} from "react";

// reducer : 변환기
// -> 상태를 실제로 변화시키는 변환기 역할을 하는 함수

// reducer에서 새롭게 state 값을 반환해주면 그렇게 반환된 값을 useReducer가 불러와
// 실제로 state 값을 변경시켜줌
function reducer(state, action) {
    console.log(state, action);
//     if(action.type === "INCREASE") {
//         return state + action.data;
//     }
//     else if(action.type === "DECREASE") {
//         return state - action.data;
// }
        switch(action.type) {
            case "INCREASE":
                return state + action.data;
            case "DECREASE":
                return state - action.data;
            default:
                return state;
        }
}

const Exam = () => {

    // useReducer() 훅 호출하기
    // dispatch : 발송하다, 급송하다
    // -> 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
    // dispatch로 상태변화를 요청하고 useReducer()가 상태 변화를 실제로 처리하는 함수를 처리
    // 이 때의 함수는 우리가 직접 만들어야 함
    const [state, dispatch] = useReducer(reducer, 0)

    const onClickPlus = () => {
        // 인수 : 상태가 어떻게 변화되길 원하는지 전달하기
        // -> 보통은 dispatch 함수에는 객체 형태로 type이라는 프로퍼티에는 상태를 전달
        // 액션 객체 : 인수로 전달된 요청의 내용을 담고 있는 객체

        // dispatch 함수를 호출하면 reduce 함수가 호출되고 그 때 action 객체가 매개변수로써 전달
        dispatch({
            type : "INCREASE",
            data : 1
        })
    }

    const onClickMinus = () => {
        dispatch({
            type : "DECREASE",
            data : 1
        })
    }

    return <div>
        <h1>{state}</h1>
        <button onClick={onClickPlus}>+</button>
        <button onClick={onClickMinus}>-</button>
    </div>
}


export default Exam;