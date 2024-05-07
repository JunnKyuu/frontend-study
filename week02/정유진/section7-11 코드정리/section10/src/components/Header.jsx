import './Header.css';
// memo 메서드 불러오기
import {memo} from "react";

const Header = () => {
    return (
    // Date 바로 불러오면 오류 발생하기 때문에 문자열로 바꿔주기
    <div className="Header">
        <h3>오늘은 📆</h3>
        <h1>{new Date().toDateString()}</h1>
    </div>
    );
};

// 컴포넌트 밖에서 memo 메서드를 호출하고 인수로는 최적화하고자 하는 컴포넌트인 Header를 그대로 넣어주기
// const memoizedHeader = memo(Header);

// // 최적화가 이루어진 Header 내보내기
// export default memoizedHeader;

export default memo(Header);