// 투두 아이템들의 데이터를 스테이트로 만들어 보관해야 함
// 왜냐하면 새로운 데이터가 추가되거나 수정되거나 삭제되었을 때 
// 바로바로 화면에 그 변화를 반영할 수 있기 때문
// 이러한 state는 스테이트를 이용해야 하는 모든 컴포넌트들의 조상이 되는
// 앱 컴포넌트에 배치시켜줘야 함

import './App.css'
// id를 기록하기 위한 레퍼런스 객체 만들어주기 위해 useRef 추가
import { useState, useRef } from "react";
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'

// mockData라는 변수는 앱 컴포넌트가 리렌더링될 때마다 다시 생성될 필요가 없고 상수이기 때문에 값을 바꿀 수도 없기 때문에
// 컴포넌트 외부에 생성해도 됨
// 하나의 Todo 아이템의 데이터를 객체로 표현하기 -> 배열로 초기화 해준 다음 데이터를 객체 형태로 넣어주기
const mockData = [
  {
    // 각각의 아이템을 구별하기 위해 ID 넣어주기
    id: 0,
    isDone: false,
    content: "React 공부하기",
    // new Date()로 새로운 객체를 생성해서 getTime 메서드로 현재 시간에
    // 해당하는 타임스탬프 넣어주기
    date: new Date().getTime(),
  },
  {
    // 각각의 아이템을 구별하기 위해 ID 넣어주기
    id: 1,
    isDone: false,
    content: "빨래하기",
    // new Date()로 새로운 객체를 생성해서 getTime 메서드로 현재 시간에
    // 해당하는 타임스탬프 넣어주기
    date: new Date().getTime(),
  },
  {
    // 각각의 아이템을 구별하기 위해 ID 넣어주기
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    // new Date()로 새로운 객체를 생성해서 getTime 메서드로 현재 시간에
    // 해당하는 타임스탬프 넣어주기
    date: new Date().getTime(),
  },
]

function App() {
  // 새로운 state 만들어주기
  // mockData 값으로 todos state의 값 초기화해주기 
  const [todos, setTodos] = useState(mockData);
  // useRef로 새로운 레퍼런스 객체 만들어주기
  // 초기값을 3으로 설정하는 이유 : 위의 mok data의 id와 겹치지 않게 하기 위해
  const idRef = useRef(3);

  // content라는 매개변수로 에디터 컴포넌트에 입력한 값을 받아와 새롭게 생성될 투두 아이템을 객체 형태로 만들어줘야 함
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime()
    }

    // 생성한 객체를 Todos 배열에 추가해주기
    // todos.push[newTodo] <- 이런식으로 하면 안됨. 왜냐하면 todos와 같은 이런 state 값은
    // 반드시 상태 변화 함수를 호출해서만 수정 가능
    // 왜냐하면 그렇게 해야만 변경된 스테이트의 값을 리액트가 감지할 수 있고 그럼으로써 컴포넌트를
    // 정상적으로 리렌더링 시켜주기 때문
    
    // 제공된 상태변화 함수인 setTodos를 호출한 후 인수로 새로운 값을 넣어줘야 함
    setTodos([newTodo, ...todos])
  }

  // setTodos 함수를 호출해서 현재의 todos state 값을 바꿔주는 함수 필요
  const onUpdate = (targetId) => {
    // todos state의 값들 중에 targetId와 일치하는 id를 갖는 todo 아이템의 isDone 프로퍼티를 변경하기

    // setTodos 함수 호출
    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    setTodos(todos.map((todo)=> todo.id === targetId ? {...todo, isDone: !todo.isDone} : todo));  

      // 모든 todo 아이템들을 순회하면서 콜백함수 안에서는 조건문 이용하기
          // return으로 변형된 배열 반환해주기
          // 기존의 todo 아이템들의 값은 spread 연산자 사용하여 펼쳐주기
          // 이를 위와 같은 삼항 연산자로 씀
        }

        // 삭제 버튼을 눌렀을 때 호출되는 함수
        // targetId를 갖는 todo 아이템을 todos state로부터 제거
        const onDelete = (targetId) => {
          // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
          setTodos(todos.filter((todo)=>todo.id !== targetId))
        }

  return (
    // Editor 컴포넌트에게 onCreate 함수를 props로 전달해준 다음 Editor 컴포넌트에서는 props로 구조분해 할당을 이용해
    // onCreate 함수를 받고 이 함수를 추가 버튼이 클릭되었을 때 호출해주면 됨
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      {/* todos 스테이트를 리스트 컴포넌트에게 props로 전달 */}
      {/* 리스트 컴포넌트에서는 구조분해 할당 문법으로 props로 넘겨준 todos 스테이트를 받아옴 */}
      {/* 앱 컴포넌트에서 리스트 컴포넌트에게 props로 onUpdate 함수 넘겨주기 */}
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  )
}

export default App;
