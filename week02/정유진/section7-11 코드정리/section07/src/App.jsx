import './App.css'
import Viewer from './components/Viewer'
import Controller from './components/Controller'
import {useState, useEffect, useRef} from 'react'
import Even from './components/Even'

function App() {

  // State Lifting (State 끌어올리기)
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const isMount = useRef(false)

  // 1. 마운트 : 탄생
  // useEffect 호출하고 콜백 함수를 넣어준 다음 deps로는 빈 배열을 넣어줌
  // useEffect는 deps에 있는 값이 변경되어야만 실행 되기 때문에 결국 이 콜백 함수는
  // 이 컴포넌트가 처음 mount 될 때 이후에는 다시는 실행 되지 않음
  useEffect(()=>{
    console.log("mount");
  },[]);

  // 2. 업데이트 : 변화, 리렌더링
  // deps 생략해줌 (이 컴포넌트가 리렌더링 될 때마다 계속 실행됨)
  useEffect(()=>{
    // 이 콜백함수는 이 앱 컴포넌트가 최초로 마운트 될 때 먼저 실행이 되긴 함
    // 그 때에는 이 조건문이 참이 되기 때문에 여기서 current의 값을 true로 바꾸고 
    // 강제로 return 당하기 때문에 아래에서 아무런 일도 수행 불가능
    // 그리고 그 다음부터 컴포넌트가 리렌더링 되어서 다시 호춣될 때가 되어서야 console.log 출력 
    // 정리 : 진짜 컴포넌트의 업데이트 단계에서만 코드를 실행시키고 싶다면 isMount와 같은 레퍼런스 객체를 
    // 하나 생성하여 이렇게 플래그로써 사용하면 됨
    if(!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log("update");
  });

  // 3. 언마운트 : 죽음

  // 첫번째 인수로는 콜백함수, 두번째 인수로는 배열 넣어주기
  // 배열 값이 바뀌면 sideeffect로서 첫 번째 인수로 전달한 콜백 함수 실행
  // count state 값이 바뀔 때마다 첫 번째 인수로 전달한 콜백 함수 실행
  // useEffect를 이용하면 컴포넌트 내에서 우리가 원하는 값이 바뀌었을 때만 특정 동작을 callback함수로 실행하도록
  // 만들어주기 가능 
  // useEffect(()=>{
  //   console.log(`count: ${count} / input: ${input}`);
  // }, [count, input])
  // 의존성 배열
  // dependency array
  //deps (deps에 값 여러개 넣기 가능)


  // CountState와 setCount라는 상태 변화 함수를 두개 다 넘겨주기 위해
  // App 컴포넌트에서 이벤트 핸들러를 직접 만들어서 props로 전달 
  const onClickButton = (value) => {
    // setCount라는 react의 상태 변화 함수는 비동기로 동작
    // (비동기로 동작한다 = setTimeOut 함수처럼 함수는 여기서 호출했지만 함수의 완료는 나중에 된다.)
    // 리액트의 state는 비동기로 
    setCount(count + value);
    // 출력될 때 setCount 함수가 실제로는 호출만 된 거지 완료가 된 건 아님 (= Count의 state 값은 아직 변경 X)
    // 결론 : react의 state는 비동기로 업데이트 되기 때문에 변경된 state 값을 바로 사용해서 무언가 Side Effect에 
    // 해당하는 부가적인 작업을 진행하려면 UseEffect를 이용해야 함
    // 모든 리액트 컴포넌트는 라이프 사이클을 가지며 useEffect를 사용하여 제어 가능
    // console.log(count);
  }

  return (
    // section 태그로 묶어주는 이유 : css로 스타일링을 적용할 때 컴포넌트들마다의 백그라운드와 이 내부 여백을 적용해주기 위함
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        // onChange 이벤트 핸들러
        <input value={input} onChange={(e)=>{
          setInput(e.target.value);
        }} />
      </section>
      <section>
        <Viewer count={count}/>
        {count % 2 ===0 ? <Even/> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton}/>
      </section>
    </div>
  )
}

export default App
