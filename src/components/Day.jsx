import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Word from './Word';

export default function Day() {
    const day = useParams().day;
    // const [words, setWords] = useState([]);
    // useEffect(() => {
    //     fetch(`http://localhost:3001/words?day=${day}`)
    //     .then(res => res.json())
    //     .then(data => setWords(data))
    //     .finally(console.log("finally"));
    // }, [day]);
    // const wordList = words.filter(word => word.day == day);

    const words = useFetch(`http://localhost:3001/words?day=${day}`);
    const days = useFetch(`http://localhost:3001/days`);
    console.log(days.length, day)

    return (
        <>
            <h2>Day{day}</h2>
            {words.length === 0 && <span>Loading...</span>}
            <table>
                <tbody>
                    {words.map(word => (
                        <Word word={word} key={word.id} />
                    ))}
                </tbody>
            </table>
            <div className="day">
                {Number(day) === 1 ? null : <a className='prev' href={`/day/${Number(day)-1}`}>이전날</a>}
                {Number(day) === days.length ? null : <a className='next' href={`/day/${Number(day)+1}`}>다음날</a>}
            </div>
        </>
    );
}