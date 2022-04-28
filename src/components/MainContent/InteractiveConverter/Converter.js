import React, {useEffect, useState} from 'react';
import styles from './Converter.module.css'

export const Converter = (props) => {

    const valuteArray = props.valuteArray

    const [inputFirstValute, setInputFirstValute] = useState(0)
    const [selectedFirstValute, setSelectedFirstValute] = useState('Австралийский доллар')

    const [inputSecondValute, setInputSecondValute] = useState(0)
    const [selectedSecondValute, setSelectedSecondValute] = useState('Австралийский доллар')

    const handleFirstSelectedValuteChange = (event) => {
        setSelectedFirstValute(event.target.value)
        localStorage.setItem('firstValute', event.target.value)
        if (selectedSecondValute === 'Российский рубль') {
            const firstValuteRate = valuteArray.find(item => item.Name === event.target.value).Value
            setInputSecondValute(Math.floor(inputFirstValute * firstValuteRate * 100) / 100)
            localStorage.setItem('secondValuteRate', Math.floor(inputFirstValute * firstValuteRate * 100) / 100)
        } else {
            const firstValuteRate = valuteArray.find(item => item.Name === selectedFirstValute).Value
            const secondValuteRate = valuteArray.find(item => item.Name === selectedSecondValute).Value
            setInputSecondValute(Math.floor(firstValuteRate/secondValuteRate * inputFirstValute * 100) / 100)
            localStorage.setItem('secondValuteRate', Math.floor(firstValuteRate/secondValuteRate * inputFirstValute * 100) / 100)
        }
    }
    const handleSecondSelectedValuteChange = (event) => {
        setSelectedSecondValute(event.target.value)
        localStorage.setItem('secondValute', event.target.value)
        if (selectedFirstValute === 'Российский рубль') {
            const secondValuteRate = valuteArray.find(item => item.Name === event.target.value).Value
            setInputFirstValute(Math.floor(inputSecondValute * secondValuteRate * 100) / 100)
            localStorage.setItem('firstValuteRate', Math.floor(inputSecondValute * secondValuteRate * 100) / 100)
        } else {
            const firstValuteRate = valuteArray.find(item => item.Name === selectedFirstValute).Value
            const secondValuteRate = valuteArray.find(item => item.Name === selectedSecondValute).Value
            setInputFirstValute(Math.floor(secondValuteRate/firstValuteRate * inputSecondValute * 100) / 100)
            localStorage.setItem('firstValuteRate', Math.floor(secondValuteRate/firstValuteRate * inputSecondValute * 100) / 100)
        }

    }
    const handleFirstValuteInputChange = (event) => {
        setInputFirstValute(event.target.value)
        localStorage.setItem('firstValuteRate', event.target.value)
        if (selectedFirstValute === 'Российский рубль') {
            const secondValuteRate = valuteArray.find(item => item.Name === selectedSecondValute).Value
            setInputSecondValute(Math.floor(event.target.value / secondValuteRate * 100) / 100)
            localStorage.setItem('secondValuteRate', Math.floor(event.target.value / secondValuteRate * 100) / 100)
        } else if (selectedSecondValute === 'Российский рубль') {
            const firstValuteRate = valuteArray.find(item => item.Name === selectedFirstValute).Value
            setInputSecondValute(Math.floor(firstValuteRate * event.target.value * 100) / 100)
            localStorage.setItem('secondValuteRate', Math.floor(firstValuteRate * event.target.value * 100) / 100)
        } else {
            const secondValuteRate = valuteArray.find(item => item.Name === selectedSecondValute).Value
            const firstValuteRate = valuteArray.find(item => item.Name === selectedFirstValute).Value
            setInputSecondValute(Math.floor(firstValuteRate/secondValuteRate * event.target.value * 100) / 100)
            localStorage.setItem('secondValuteRate', Math.floor(firstValuteRate/secondValuteRate * event.target.value * 100) / 100)
        }
    }
    const handleSecondValuteInputChange = (event) => {
        setInputSecondValute(event.target.value)
        localStorage.setItem('secondValuteRate', Math.floor(event.target.value))
        if (selectedSecondValute === 'Российский рубль') {
            const firstValuteRate = valuteArray.find(item => item.Name === selectedFirstValute).Value
            setInputFirstValute(Math.floor(event.target.value / firstValuteRate * 100) / 100)
            localStorage.setItem('firstValuteRate', Math.floor(event.target.value / firstValuteRate * 100) / 100)
        } else if (selectedFirstValute === 'Российский рубль') {
            const secondValuteRate = valuteArray.find(item => item.Name === selectedSecondValute).Value
            setInputFirstValute(Math.floor(event.target.value * secondValuteRate * 100) / 100)
            localStorage.setItem('firstValuteRate', Math.floor(event.target.value * secondValuteRate * 100) / 100)
        }
        else {
            const firstValuteRate = valuteArray.find(item => item.Name === selectedFirstValute).Value
            const secondValuteRate = valuteArray.find(item => item.Name === selectedSecondValute).Value
            setInputFirstValute(Math.floor(secondValuteRate/firstValuteRate * event.target.value * 100) / 100)
            localStorage.setItem('firstValuteRate', Math.floor(secondValuteRate/firstValuteRate * event.target.value * 100) / 100)
        }

    }

    useEffect(() => {
        setInputFirstValute(localStorage.getItem('firstValuteRate'))
        setSelectedFirstValute(localStorage.getItem('firstValute'))
        setInputSecondValute(localStorage.getItem('secondValuteRate'))
        setSelectedSecondValute(localStorage.getItem('secondValute'))
    }, [])

    return (
        <div className={styles.convertValutesContainer}>
            <div className={styles.convertValuteContainer}>
                <input type='number' value={inputFirstValute} onChange={handleFirstValuteInputChange} placeholder='0'/>
                <select name='firstValute' id='first' defaultValue={selectedFirstValute} value={selectedFirstValute} onChange={handleFirstSelectedValuteChange}>
                    <option>Российский рубль</option>
                    {valuteArray.map((item, index) => (<option key={index}>{item.Name}</option>))}
                </select>
            </div>
            <div>
                <input type='number' value={inputSecondValute} defaultValue={12} onChange={handleSecondValuteInputChange} placeholder='0'/>
                <select name='secondValute' id='second' defaultValue={selectedSecondValute} value={selectedSecondValute} onChange={handleSecondSelectedValuteChange}>
                    <option>Российский рубль</option>
                    {valuteArray.map((item, index) => (<option key={index}>{item.Name}</option>))}
                </select>
            </div>
        </div>
    )
}