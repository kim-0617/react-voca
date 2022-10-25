import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function CreateWord() {
    const days = useFetch("http://localhost:3001/days");
    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        if(isLoading) return; // 로딩중이면 클릭이벤트 막기
        
        setIsLoading(true);
        fetch(`http://localhost:3001/words`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                day: dayRef.current.value,
                eng: engRef.current.value,
                kor: korRef.current.value,
                isDone: false
            }),
        })
        .then(res => {
            if (res.ok) {
                alert("생성이 완료되었습니다.");
                setIsLoading(false); // 모든 작업이 완료되면 false로 만들어서 버튼 실행할 수 있도록..
                navigate(`/day/${dayRef.current.value}`);
            }
        });
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="input_area">
                    <label htmlFor="Eng">Eng</label>
                    <input type="text" id="Eng" ref={engRef} />
                </div>
                <div className="input_area">
                    <label htmlFor="Kor">Kor</label>
                    <input type="text" id="Kor" ref={korRef} />
                </div>
                <div className="input_area">
                    <label htmlFor="Day">Day</label>
                    <select id="Day" ref={dayRef}>
                        {days.map(day => <option key={day.id} value={day.day}>{day.day}</option>)}
                    </select>
                </div>
                <button style={{opacity : isLoading ? 0.3 : 1}}>{isLoading ? "저장중.." : "저장하기"}</button>
            </form>
        </>
    );
}