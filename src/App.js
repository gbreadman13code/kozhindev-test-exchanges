import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { Header } from './components/Header/Header';
import {Table} from './components/MainContent/Table/Table';
import {Converter} from './components/MainContent/InteractiveConverter/Converter';

import styles from './App.module.css'

import loader from './assets/loader.gif'

function App() {

    const [valuteArray, setValuteArray] = useState([])
    const [mainValute, setMainValute] = useState({})
    const [isLoad, setIsLoad] = useState(false)
    const [showAllValutes, setShowAllValutes] = useState(false)

    const renameValuteToPresent = (valuteName) => {
        switch (valuteName) {
            case 'Фунт стерлингов Соединенного королевства': return 'Фунт стерлингов'
                break
            case 'Венгерских форинтов': return 'Венгерский форинт'
                break
            case 'Гонконгских долларов': return 'Гонконгский доллар'
                break
            case 'Норвежских крон': return 'Норвежская крона'
                break
            case 'Индийских рупий': return 'Индийская рупия'
                break
            default: return valuteName
        }
    }
    const getValute = () => {
        axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(res => {
                const result = [
                    res.data.Valute.AUD,
                    res.data.Valute.GBP,
                    res.data.Valute.BRL,
                    res.data.Valute.HUF,
                    res.data.Valute.HKD,
                    res.data.Valute.DKK,
                    res.data.Valute.USD,
                    res.data.Valute.EUR,
                    res.data.Valute.NOK,
                    res.data.Valute.INR,
                ]
                for (let i = 0; i < result.length; i++) {
                    result[i].Name = renameValuteToPresent(result[i].Name)
                    if (result[i].Nominal > 1) {
                        result[i].Value = result[i].Value / result[i].Nominal
                        result[i].Nominal = 1
                    }
                }
                setValuteArray(result)
                setMainValute({
                    EURValute: res.data.Valute.EUR.Value,
                    USDValute: res.data.Valute.USD.Value,
                    CNYValute: res.data.Valute.CNY.Value,
                })
            })
            .then(setIsLoad(false))
    }

    const sortByRate = () => {
        valuteArray.sort(function(a,b){
            return b.Value/b.Nominal - a.Value/a.Nominal
        })
        setValuteArray(valuteArray => [...valuteArray])
    }
    const sortByISO = () => {
        valuteArray.sort(function(a,b){
            let nameA = a.CharCode.toLowerCase(), nameB = b.CharCode.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
        setValuteArray(valuteArray => [...valuteArray])
    }
    const sortByName = () => {
        valuteArray.sort(function(a,b){
            let nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
        setValuteArray(valuteArray => [...valuteArray])
    }
    const showOrHideValutes = () => {
        setShowAllValutes(!showAllValutes)
    }

    useEffect(() => {
        getValute()
    }, [])

  return (
    <div className={styles.App}>
      <Header getValute={getValute} valuteArray={valuteArray} setIsLoad={setIsLoad}/>

        {isLoad
            ?
            <img src={loader} alt=''/>
            :
            <Table
                sortByRate={sortByRate}
                sortByISO={sortByISO}
                sortByName={sortByName}
                valuteArray={valuteArray}
                mainValute={mainValute}
                setIsLoad={setIsLoad}
                getValute={getValute}
                isLoad={isLoad}
                showOrHideValutes={showOrHideValutes}
                showAllValutes={showAllValutes}
            />
        }
    </div>
  );
}

export default App;
