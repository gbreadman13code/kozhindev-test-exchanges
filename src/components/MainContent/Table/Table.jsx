import React, {useState} from 'react';
import {RateItem} from './RateItem';
import {HeaderString} from './HeaderString';
import styles from './Table.module.css'
import reload from '../../../assets/reload.png'
export const Table = (props) => {

    const [lastReloadDate, setLastReloadDate] = useState('')

    const refreshTable = () => {
        props.setIsLoad(true)
        props.getValute()
        // props.setIsLoad(false)


        // + ' ' + addZero(date.getDate()) + '.' + addZero(date.getMonth()) + '.' + addZero(date.getFullYear())

        const addZero = (num) => {
            if (num < 10) {
                num = '0' + num
                return num
            } else {
                return num
            }
        }
        const date = new Date()
        const lastRefresh = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
        setLastReloadDate(lastRefresh)
    }

    let valuteArray = props.valuteArray
    let mainValute = props.mainValute
    // let isLoad = props.isLoad
    let sortByRate = props.sortByRate

    const shortValuteArray = [valuteArray[0], valuteArray[1], valuteArray[2], valuteArray[3], valuteArray[4]]

    return (
        <div className={styles.container}>
                <div>
                    <HeaderString sortByRate={sortByRate} sortByISO={props.sortByISO} sortByName={props.sortByName}/>
                    {props.showAllValutes
                        ?
                        valuteArray.length !== 0 ? valuteArray.map((item, index) => <RateItem key={index} numberOfString={index} iso={item.CharCode} name={item.Name} rate={item.Value} nominal={item.Nominal} mainValute={mainValute} />) : <span></span>
                        :
                        valuteArray.length !== 0 ? shortValuteArray.map((item, index) => <RateItem key={index} numberOfString={index} iso={item.CharCode} name={item.Name} rate={item.Value} nominal={item.Nominal} mainValute={mainValute} />) : <span></span>
                    }
                    <button className={styles.showOrHideButton} onClick={props.showOrHideValutes}>{props.showAllValutes === false ? 'показать полностью' : 'скрыть'}</button>

                </div>
            <div className={styles.buttonContainer}>
                <div className={styles.refresh}>
                    {/*{lastReloadDate.length > 0 ? <span>Последнее обновление <br/>{lastReloadDate}</span> : <div></div> }*/}
                    <button className={styles.refreshButton} onClick={refreshTable}>
                        {lastReloadDate.length > 0 ? <span>последнее обновление: {lastReloadDate}</span> : <div></div> }
                        <img src={reload} alt='обновить курсы'/>
                    </button>
                </div>
            </div>
        </div>
    )
}

