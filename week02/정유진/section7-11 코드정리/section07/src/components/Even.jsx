// useEffect를 이용하여 Even 컴포넌트가 Unmount 되는 시점 제어하기
import {useEffect} from "react";



const Even = () => {
    useEffect(() => {
        // 클린업, 정리함수 : useEffect의 콜백 함수가 반환하는 함수
        // 정리함수는 useEffect가 끝날 때 실행됨
        // 이와 같이 deps를 빈 배열로 전달해 주면 이 useEffect는 마운트 될 때 실행 되고
        // 종료는 Unmount 될 때 종료되기 때문에 그 때가 되면 이 정리 함수를 호출
        return () => {
            console.log("unmount");
        };
    }, []);
    return <div>짝수입니다</div>
}

export default Even;