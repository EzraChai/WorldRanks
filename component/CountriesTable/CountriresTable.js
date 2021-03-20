import React, {useState} from 'react';
import styles from "./CountriesTable.module.css"
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@material-ui/icons";
import Link from "next/link";

const orderBy = (countries, direction, value) => {
    if (direction === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : (-1))
    }
    if (direction === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }
    return countries
}

const SortArrow = ({direction}) => {
    if (!direction) {
        return <></>
    }
    if (direction === 'desc') {
        return <div className={styles.headingArrow}>
            <KeyboardArrowDownRounded color={"inherit"}/>
        </div>
    } else {
        return <div className={styles.headingArrow}>
            <KeyboardArrowUpRounded color={"inherit"}/>
        </div>
    }
}

const CountriesTable = ({countries}) => {
    const [direction, setDirection] = useState()
    const [value, setValue] = useState()

    const orderedCountries = orderBy(countries, direction, value)

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc")
        } else if (direction === "desc") {
            setDirection("asc")
        } else {
            setDirection(null)
        }
    }

    const setValueAndDirection = (value) => {
        switchDirection()
        setValue(value)
    }

    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.headingFlag}/>
                <button className={styles.headingName} onClick={() => setValueAndDirection('name')}>
                    Name
                    {value === "name" && <SortArrow direction={direction}/>}
                </button>
                <button className={styles.headingPopulation} onClick={() => setValueAndDirection('population')}>
                    Population
                    {value === "population" && <SortArrow direction={direction}/>}
                </button>

                <button className={styles.headingArea} onClick={() => setValueAndDirection('area')}>
                    Area (km<sup style={{fontSize: "0.6rem"}}>2</sup>)
                    {value === "area" && <SortArrow direction={direction}/>}
                </button>

                <button className={styles.headingGini} onClick={() => setValueAndDirection('gini')}>
                    Gini
                    {value === "gini" && <SortArrow direction={direction}/>}
                </button>
            </div>
            {orderedCountries.map((country) => (
                <Link href={`/country/${country.alpha3Code}`} key={country.name}>
                    <div style={{cursor:"pointer"}}  className={styles.row}>
                        <div className={styles.flag}>
                            <img  src={country.flag} alt={country.name}/>
                        </div>
                        <div className={styles.name}>{country.name}</div>
                        <div className={styles.population}>{country.population}</div>
                        <div className={styles.area}>{country.area || 0}</div>
                        <div className={styles.gini}>{country.gini || 0}%</div>
                    </div>
                </Link>
            ))}
        </div>

    );
};

export default CountriesTable;