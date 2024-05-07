// TodoItem 컴포넌트를 렌더링하고 있는 List 컴포넌트

import "./List.css";
import TodoItem from "./TodoItem";
// 검색어가 변경되면 리스트 컴포넌트가 리렌더링 되어야 함
// 그렇기 때문에 현재 검색어를 state로 보관해야 함
import {useState, useMemo, useContext} from 'react';
import { TodoStateContext } from '../App';
// 구조분해 할당 문법으로 props로 넘겨준 Todo state를 받아올 수 있음

// 리스트 컴포넌트에서는 전달받은 onUpdate 함수를 구조분해 할당으로 받아서
// 리턴문에서 todo 아이템들에게 props로 똑같이 넘겨주면 
const List = () => {
    const todos = useContext(TodoStateContext);
    // useState()로 새로운 state 생성하기
    // 사용자가 브라우저에서 검색어 입력하면 리스트 컴포넌트의 서치 state에 보관됨
    // => 서치 state 값이 바뀔 때마다 리스트 컴포넌트가 리렌더링 되고
    // 그 때마다 todos 배열에서 현재의 검색 결과에 해당하는 값들만 필터링
    const [search, setSearch] = useState("");

    // 이벤트 핸들러인 onChangeSearch라는 함수 만들기
    const onChangeSearch = (e) => {
        // 함수 안에서는 매개변수로 이벤트 객체를 받아와 setState를 호출하고
        // 인수로 e.target.value 전달
        setSearch(e.target.value);
    };

    // 이 함수는 필터링 된 todos를 반환해야 함
    const getFilteredData = () => {
        if(search === "") {
            return todos;
        }
        // filter 메서드 호출해서 필터링 된 todos 배열 반환
        // todo를 매개변수로 받아서 현재 todo의 content의 include 메서드 호출해서
        // search 값이 존재하는 아이템들만 필터링

        // 대소문자 구분없이 검색어 잘 나올 수 있도록 toLowerCase()로 다 소문자로 바꿔주기
        return todos.filter((todo)=>todo.content.toLowerCase().includes(search.toLowerCase())
        );
    };

    const filteredTodos = getFilteredData();

    // const getAnalyzedData = () => {
        // 서치바에 무언가를 검색한다 해서 실제로 어떤 todo 데이터가
        // 추가, 삭제, 완료되어서 수치 결과가 변화하는 것 X
        // -> 실질적으로 새로운 todo가 추가, 수정, 삭제 되었을 때에만
        // 다시 호출해야 함
        // 따라서 아래와 같은 연산 자체를 메모이제이션 해야 함 -> useMemo 훅 사용
        // (메모이제이션 한 후 특정 조건이 만족되었을 때에만 결과 값을 다시 계산)

        // console.log('getAnalyzedData 호출')
        // 현재 등록된 전체 todo 아이템의 개수를 저장
        // todos state의 length라는 값으로 초기화
        // const totalCount = todos.length;
        // 완료된 todo 아이템의 개수를 저장
        // const doneCount = todos.filter((todo)=>todo.isDone).length;
        // const notDoneCount = totalCount - doneCount;

        // return 객체로 묶어서 내보내기
    //     return {
    //         totalCount,
    //         doneCount,
    //         notDoneCount,
    //     }
    // }

    // 두 번째 인수로 오는 배열 : 의존성 배열(deps)
    // useEffect와 마찬가지로 deps가 변경되었을 때에만 첫번째 인수인 콜백 함수를 다시 실행
    // 추가로 useMemo()는 해당 콜백 함수가 반환하는 값을 그대로 다시 반환

    // 구조분해 할당 이용하여 totalCount, doneCount, notDoneCount 받아오기
    const {totalCount, doneCount, notDoneCount} = useMemo(()=>{
        // 메모이제이션 하고자 하는 연산을 넣어주면 됨
        console.log('getAnalyzedData 호출')
        const totalCount = todos.length;
        const doneCount = todos.filter((todo)=>todo.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        }
        // 첫번째 인수로 전달한 콜백 함수를 두 번째 인수로 전달한 deps를 기준으로 메모이제이션
        // 아무것도 deps로 전달되지 않았을 때에는 첫 번째 콜백 함수의 연산 수행과 반환이
        // 이 컴포넌트가 최초에 렌더링 되었을 때 딱 한 번만 일어남

        // todos state 값이 변경될 때마다 연산 수행
    }, [todos])

    // List 컴포넌트가 리렌더링 될 때마다 getAnalyzed 함수를 호출한 후 그 결과값을
    // 구조분해 할당을 이용해 순서대로 totalCount, doneCount, notDoneCount를 받아오기
    // const {totalCount, doneCount, notDoneCount} = getAnalyzedData()

    // TodoItem이 List 형식으로 렌더링
    return (
        <div>
            <h4>Todo List 🌱</h4>
            <div>
                <div>total: {totalCount}</div>
                <div>done: {doneCount}</div>
                <div>notDone: {notDoneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} placeholder='검색어를 입력하세요' />
            <div className="todos_wrapper">
                {/* Todos 배열에 담긴 데이터를 리스트 형태로 렌더링 */}
                {/* map 메서드를 이용해서 배열에 담긴 데이터를 리스트 형태로 렌더링 가능 */}
                {/* map 메서드를 react에서 이용하면 콜백 함수가 HTML 요소를 반환하도록 설정 */}
                {/* 콜백 함수의 반환 값들이 list 형태로 화면에 렌더링 */}
                {/* 리액트 컴포넌트도 렌더링 가능 */}
                {
                    filteredTodos.map((todo) => {
                        // 각각의 컴포넌트에 props 전달하기 : todo 매개변수의 모든 값을 props로 전달해주기
                        // 위해서 spread 연산자 사용

                        // list로 어떠한 component를 렌더링하고 있을 때에는
                        // 모든 아이템 컴포넌트에 반드시 key라는 프롭을 고유한 값으로 전달해야 함
                        // 여기에서의 key 프롭은 app.jsx 참고

                        // 리턴문에서 todo 아이템들에게 props로 넘겨주기
                        return <TodoItem key={todo.id} {...todo} />;
                    })
                }
            </div>
        </div>
        );
        };

export default List;