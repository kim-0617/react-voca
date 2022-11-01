import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { IDay } from "./DayList";

export default function CreateWord() {
    const days: IDay[] = useFetch("http://localhost:3001/days");
    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLSelectElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoading && dayRef.current && engRef.current && korRef.current) {
            const day = dayRef.current.value;
            const eng = engRef.current.value;
            const kor = korRef.current.value;

            setIsLoading(true);
            fetch(`http://localhost:3001/words`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day,
                    eng,
                    kor,
                    isDone: false
                }),
            })
                .then(res => {
                    if (res.ok) {
                        alert("생성이 완료되었습니다.");
                        setIsLoading(false); // 모든 작업이 완료되면 false로 만들어서 버튼 실행할 수 있도록..
                        navigate(`/day/${day}`);
                    }
                });
        }
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
                <button style={{ opacity: isLoading ? 0.3 : 1 }}>{isLoading ? "저장중.." : "저장하기"}</button>
            </form>
        </>
    );
}