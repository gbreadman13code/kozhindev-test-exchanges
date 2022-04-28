import React from 'react';
import styles from './Table.module.css'
import rub from '../../../assets/flags/rus.png'
import usd from '../../../assets/flags/usa.png'
import eur from '../../../assets/flags/eur.png'
import china from '../../../assets/flags/china.png'

export const HeaderString = (props) => {
    return (
        <div className={styles.headerString}>
            <span className={styles.numberOfString}>№</span>
            <button className={styles.tableNameItem} onClick={props.sortByName}>Название валюты</button>
            <button className={styles.tableItem} onClick={props.sortByISO}>Код валюты</button>

            <button className={styles.tableItem} onClick={props.sortByRate}> <img src={rub} alt=''/> RUB</button>
            <button className={styles.tableItem} onClick={props.sortByRate}> <img src={usd}/> USD</button>
            <button className={styles.tableItem} onClick={props.sortByRate}> <img src={eur} alt=''/>EUR</button>
            <button className={styles.tableItem} onClick={props.sortByRate}> <img src={china} alt=''/>CNY</button>
        </div>
    )
}