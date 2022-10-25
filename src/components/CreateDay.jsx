import useFetch from "../hooks/useFetch";
import {useNavigate} from "react-router-dom";

export default function CreateDay() {
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();
    const onClickButton = () => {
        fetch(`http://localhost:3001/days`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                day : days.length + 1,
            }),
        })
        .then(res => {
            if (res.ok) {
                alert("생성이 완료되었습니다.");
                navigate(`/`);
            }
        });
    }
    return (
        <>
            <h3>현재일수 : {days.length}일</h3>
            <button onClick={onClickButton}>Day 추가!</button>
        </>
    );
}