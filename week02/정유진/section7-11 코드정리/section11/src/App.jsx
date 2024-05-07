// 투두 아이템들의 데이터를 스테이트로 만들어 보관해야 함
// 왜냐하면 새로운 데이터가 추가되거나 수정되거나 삭제되었을 때 
// 바로바로 화면에 그 변화를 반영할 수 있기 때문
// 이러한 state는 스테이트를 이용해야 하는 모든 컴포넌트들의 조상이 되는
// 앱 컴포넌트에 배치시켜줘야 함

import './App.css'
// id를 기록하기 위한 레퍼런스 객체 만들어주기 위해 useRef 추가
import { useState, useRef, useReducer, useCallback, createContext, useMemo } from "react";
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'
// import Exam from './components/Exam'

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

// App 컴포넌트 밖에 reducer() 함수 만들기
function reducer(state, action) {
  switch(action.type) {
    // App 컴포넌트에서는 새로운 todo 아이템을 생성해달라 요청을 보낸 것이기에
    // 새로운 state 값으로 새로운 배열을 반환해줄 것인데,
    // 첫번째 요소에는 새롭게 추가될 데이터인 action.data를, 그 뒤에는 spread 연산자로 기존의 state 값 그대로 펼쳐주기
    case "CREATE" : return [action.data, ...state];
    case "UPDATE" : return state.map((item) => item.id === action.targetId ? {...item, isDone: !item.isDone} : item);
    case "DELETE" : return state.filter((item)=>item.id !==action.targetId)
    default : return state;
  }
}

// 컴포넌트 외부에 선언하기 (데이터를 하위에 있는 컴포넌트들에게 공급만 해주면 되기 때문에 리렌더링 필요 X)
// TodoContext를 두 개의 Context로 분리
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();
function App() {
  // 새로운 state 만들어주기
  // mockData 값으로 todos state의 값 초기화해주기 
  // const [todos, setTodos] = useState(mockData);

  // useReducer() 훅 호출하기
  // useState 사용과 마찬가지로 두 번째 인수를 mockData로 줌으로써
  // 초기 값을 세 개의 객체 배열로 설정
  const [todos, dispatch] = useReducer(reducer, mockData);

  // useRef로 새로운 레퍼런스 객체 만들어주기
  // 초기값을 3으로 설정하는 이유 : 위의 mok data의 id와 겹치지 않게 하기 위해
  const idRef = useRef(3);

  // content라는 매개변수로 에디터 컴포넌트에 입력한 값을 받아와 새롭게 생성될 투두 아이템을 객체 형태로 만들어줘야 함
  // const onCreate = (content) => {
    // const newTodo = {
    //   id: idRef.current++,
    //   isDone: false,
    //   content: content,
    //   date: new Date().getTime()
    // }

    // 생성한 객체를 Todos 배열에 추가해주기
    // todos.push[newTodo] <- 이런식으로 하면 안됨. 왜냐하면 todos와 같은 이런 state 값은
    // 반드시 상태 변화 함수를 호출해서만 수정 가능
    // 왜냐하면 그렇게 해야만 변경된 스테이트의 값을 리액트가 감지할 수 있고 그럼으로써 컴포넌트를
    // 정상적으로 리렌더링 시켜주기 때문
    
    // 제공된 상태변화 함수인 setTodos를 호출한 후 인수로 새로운 값을 넣어줘야 함
    // setTodos([newTodo, ...todos])

    // dispatch 호출하고 action 객체 넣어주기
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: idRef.current++,
  //       isDone: false,
  //       content: content,
  //       date: new Date().getTime()
  //     }
  //   })
  // }

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime()
      }
    })
  },[]);

  // setTodos 함수를 호출해서 현재의 todos state 값을 바꿔주는 함수 필요
  // const onUpdate = (targetId) => {
    // todos state의 값들 중에 targetId와 일치하는 id를 갖는 todo 아이템의 isDone 프로퍼티를 변경하기

    // setTodos 함수 호출
    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    // setTodos(todos.map((todo)=> todo.id === targetId ? {...todo, isDone: !todo.isDone} : todo));  

      // 모든 todo 아이템들을 순회하면서 콜백함수 안에서는 조건문 이용하기
          // return으로 변형된 배열 반환해주기
          // 기존의 todo 아이템들의 값은 spread 연산자 사용하여 펼쳐주기
          // 이를 위와 같은 삼항 연산자로 씀

        //   dispatch({
        //     type: "UPDATE",
        //     targetId: targetId
        //   })
        // }

        const onUpdate = useCallback((targetId) => {
                dispatch({
                  type: "UPDATE",
                  targetId: targetId,
                });
              }, []);

        // 삭제 버튼을 눌렀을 때 호출되는 함수
        // targetId를 갖는 todo 아이템을 todos state로부터 제거
        // const onDelete = (targetId) => {
          // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
          // 
        //   dispatch({
        //     type: "DELETE",
        //     targetId: targetId
        //   })
        // }

  // 첫번째 인수 : 최적화 하고 싶은 함수, 두번째 인수 : deps
  // const func = useCallback(()=>{}, [])

  // onDelete 함수가 useCallback에 의해 마운트 되었을 때에만 생성되고 그 이후에는 리렌더링이
  // 아무리 많이 발생해도 다시는 생성되지 않도록 최적화됨
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId
    })
  }, [])

  const memoizedDispatch = useMemo(()=>{return {onCreate, onUpdate, onDelete}},[])

  return (
    // Editor 컴포넌트에게 onCreate 함수를 props로 전달해준 다음 Editor 컴포넌트에서는 props로 구조분해 할당을 이용해
    // onCreate 함수를 받고 이 함수를 추가 버튼이 클릭되었을 때 호출해주면 됨
    <div className="App">
      {/* <Exam /> */}
      <Header />
      {/* Provider 컴포넌트 아래에 있는 모든 컴포넌트들을 TodoContext의 data를 공급받을 수 있음 */}
      {/* 공급할 데이터는 Provider의 value라는 속성으로 지정 */}
      <TodoStateContext.Provider value={{todos}}>
      <TodoDispatchContext.Provider value={memoizedDispatch}>
        <Editor />
        {/* todos 스테이트를 리스트 컴포넌트에게 props로 전달 */}
        {/* 리스트 컴포넌트에서는 구조분해 할당 문법으로 props로 넘겨준 todos 스테이트를 받아옴 */}
        {/* 앱 컴포넌트에서 리스트 컴포넌트에게 props로 onUpdate 함수 넘겨주기 */}
        <List />

      </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App;
