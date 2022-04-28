import React from 'react';
import styles from './Header.module.css'
import logo from '../../assets/flags/logo.png'

export const Logo = () => {
    return <img className={styles.logo} src={logo} alt=''/>
}