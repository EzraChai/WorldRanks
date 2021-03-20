import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../component/Layout/Layout";
import SearchInput from "../component/SearchInput/SeachInput"
import CountriesTable from "../component/CountriesTable/CountriresTable";
import {useState} from "react";

export default function Home({countries}) {

    const [keyword, setKeyword] = useState("")

    const filterCountries = countries.filter(country => country.name.toLowerCase().includes(keyword) || country.region.toLowerCase().includes(keyword) || country.subregion.toLowerCase().includes(keyword));

    const onInputChange = (e) => {
        e.preventDefault()

        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <Layout>
            <div className={styles.inputContainer}>
                <div className={styles.counts}>
                    Found {countries.length} Countries
                </div>
                <div className={styles.input}>
                    <SearchInput onChange={(e) => onInputChange(e)}/>
                </div>

            </div>
            <CountriesTable countries={filterCountries}/>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();
    return {
        props: {
            countries
        }
    }
}
