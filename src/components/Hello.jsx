import React from 'react';
import styles from './Hello.module.css';

const { useState } = React;
const Hello = ({ age }) => {
    const [name, setName] = useState('Mike');

    const ChangeName = () => {
        name === "Mike" ? setName('Jane') : setName("Mike");
    }

    return (
        <>
            <div className={styles.msg}>Hello</div>
            <div>{name}{age}</div>
            <button onClick={() => {
                setName(name === "Mike" ? "Jane" : "Mike");
            }}>Change Name</button>
        </>
    );
}

export default Hello;