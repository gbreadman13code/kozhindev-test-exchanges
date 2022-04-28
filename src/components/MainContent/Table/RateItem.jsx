import React from 'react';
import styles from './Table.module.css'

export const RateItem = (props) => {
    const floorNominalForRUB = () => {
        if (props.nominale !== 1) {
            return (Math.floor(props.rate / props.nominal * 1000) / 1000)
        }
    }
    const floorNominalForOtherValute = (rateOfValute) => {
        if (props.nominale !== 1) {
            return Math.floor(props.rate / rateOfValute / props.nominal * 1000) / 1000
        }
    }
    return (
        <div className={styles.tableString}>
            <span className={styles.numberOfString}>{props.numberOfString + 1}</span>
            <span className={styles.tableNameItem}>{props.name}</span>
            <span className={styles.tableItem}>{props.iso}</span>
            <span className={styles.tableItem}>{floorNominalForRUB()}</span>
            <span className={styles.tableItem}>{floorNominalForOtherValute(props.mainValute.USDValute)}</span>
            <span className={styles.tableItem}>{floorNominalForOtherValute(props.mainValute.EURValute)}</span>
            <span className={styles.tableItem}>{floorNominalForOtherValute(props.mainValute.CNYValute)}</span>
        </div>
    )
}