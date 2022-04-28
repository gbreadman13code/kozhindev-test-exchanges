import React, {useState} from 'react';
import styles from './Header.module.css'
import {Logo} from './Logo';
import {Converter} from '../MainContent/InteractiveConverter/Converter';

export const Header = (props) => {

    const [lastReloadDate, setLastReloadDate] = useState('')

    const refreshTable = () => {
        props.setIsLoad(true)
            props.getValute()
        // props.setIsLoad(false)

        const addZero = (num) => {
            if (num < 10) {
                num = '0' + num
                return num
            } else {
                return num
            }
        }
        const date = new Date()
        const lastRefresh = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds()) + ' ' + addZero(date.getDate()) + '.' + addZero(date.getMonth()) + '.' + addZero(date.getFullYear())
        setLastReloadDate(lastRefresh)
    }
    return (
        <div className={styles.container}>
            <Logo />
            <Converter valuteArray={props.valuteArray}/>
            {/*<div className={styles.refresh}>*/}
            {/*    {lastReloadDate.length > 0 ? <span>Последнее обновление <br/>{lastReloadDate}</span> : <div></div> }*/}
            {/*    <button onClick={refreshTable}>*/}
            {/*        <img src={reload} alt=''/>*/}
            {/*    </button>*/}
            {/*</div>*/}

        </div>
    )
}


