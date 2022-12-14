import { memo } from 'react';
import { Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import { IDay } from './DayList';
import { IWord } from './Word';

export default memo(function Header() {
    const days:IDay[] = useFetch("http://localhost:3001/days");
    const deleteKey = days.at(-1)?.id;
    const deleteTarget = days.at(-1)?.day;
    
    const words:IWord[] = useFetch("http://localhost:3001/words");
    const deleteWords:unknown = [];
    
    if(words.length !== 0 && deleteTarget) {
        words.forEach((word) => {
            if(Number(word.day) === Number(deleteTarget)) {
                (deleteWords as number[]).push(word.id);
            }
        });
    }

    const deleteDay = () => {
        if (window.confirm("가장 최근에 추가했던 Day가 삭제됩니다.") && deleteKey !== undefined && (deleteWords as number[]).length !== 0) {
            fetch(`http://localhost:3001/days/${deleteKey}`, {
                method: "DELETE",
            })
            .then(res => {
                if(res.ok) {
                    window.location.reload();
                }
            });

            // 단어 삭제
            for(let id = 0; id < (deleteWords as number[]).length; id++) {
                fetch(`http://localhost:3001/words/${(deleteWords as number[])[id]}`, {
                    method: "DELETE",
                });
            }
        }
    }

    return (
        <div className="header">
            <h1>
                <Link to="/">토익 영단어 고급</Link>
            </h1>

            <div className="menu">
                <a href="/createWord" className="link">단어 추가</a>
                <a href="/createDay" className="link">Day 추가</a>
                <a href="#x" className="link" onClick={deleteDay}>Day 삭제</a>
            </div>
        </div>
    );
});