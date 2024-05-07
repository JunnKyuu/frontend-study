// TodoItem 컴포넌트를 렌더링하고 있는 List 컴포넌트

import "./List.css";
import TodoItem from "./TodoItem";
// 검색어가 변경되면 리스트 컴포넌트가 리렌더링 되어야 함
// 그렇기 때문에 현재 검색어를 state로 보관해야 함
import {useState} from 'react';

// 구조분해 할당 문법으로 props로 넘겨준 Todo state를 받아올 수 있음

// 리스트 컴포넌트에서는 전달받은 onUpdate 함수를 구조분해 할당으로 받아서
// 리턴문에서 todo 아이템들에게 props로 똑같이 넘겨주면 
const List = ({todos, onUpdate, onDelete}) => {

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

    // TodoItem이 List 형식으로 렌더링
    return (
        <div>
            <h4>Todo List 🌱</h4>
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
                        return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />;
                    })
                }
            </div>
        </div>
        );
        };

export default List;