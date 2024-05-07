import './Header.css';

const Header = () => {
    return (
    // Date 바로 불러오면 오류 발생하기 때문에 문자열로 바꿔주기
    <div className="Header">
        <h3>오늘은 📆</h3>
        <h1>{new Date().toDateString()}</h1>
    </div>
    );
};

export default Header;