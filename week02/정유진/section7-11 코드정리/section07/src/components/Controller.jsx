const Controller = ({onClickButton}) => {
    // onClick 이벤트 핸들러에 화살표 함수 안에서 onClickButton 호출되도록 한 이유 : 
    // 원하는 인수를 전달하기 위함
    return <div>
        <button onClick={()=>{
            onClickButton(-1);
        }}
        >-1</button>
        <button onClick={()=>{
            onClickButton(-10);
        }}
        >-10</button>
        <button onClick={()=>{
            onClickButton(-100);
        }}
        >-100</button>
        <button onClick={()=>{
            onClickButton(+100);
        }}
        >+100</button>
        <button onClick={()=>{
            onClickButton(+10);
        }}
        >+10</button>
        <button onClick={()=>{
            onClickButton(+1);
        }}
        >+1</button>
    </div>;
};

export default Controller;