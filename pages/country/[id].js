import React, {useEffect, useState} from 'react';
import styles from './Country.module.css'
import Layout from "../../component/Layout/Layout";
import Link from "next/link"

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
    const country = await res.json()

    return country
}

const Country = ({country}) => {
    const [borders, setBorders] = useState([])

    const getBorders = async () => {
        const borders = await Promise.all(country.borders.map((border) => getCountry(border)));
        setBorders(borders)
    }

    useEffect(() => {
        getBorders()
    }, [])

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <div className={styles.overviewPanel}>
                        <img src={country.flag} alt={country.name}/>
                        <h1 className={styles.overviewName}>{country.name}</h1>
                        <div className={styles.overviewRegion}>{country.region}</div>

                        <div className={styles.overviewNumbers}>
                            <div className={styles.overviewPopulation}>
                                <div className={styles.overviewValue}>{country.population}</div>
                                <div className={styles.overviewLabel}>Population</div>
                            </div>
                            <div className={styles.overviewArea}>
                                <div className={styles.overviewValue}>{country.area}<span> km&sup2;</span></div>
                                <div className={styles.overviewLabel}>Area</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerRight}>
                    <div className={styles.detailPanel}>
                        <h4 className={styles.detailPanelHeading}>Details</h4>

                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailLabel}>Capital</div>
                            <div className={styles.detailValue}>{country.capital}</div>
                        </div>

                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailLabel}>SubRegion</div>
                            <div className={styles.detailValue}>{country.subregion}</div>
                        </div>

                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailLabel}>Language</div>
                            <div
                                className={styles.detailValue}>{country.languages.map(({name}) => name).join(', ')}</div>
                        </div>

                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailLabel}>Currency</div>
                            <div
                                className={styles.detailValue}>{country.currencies.map(({name}) => name).join(', ')}</div>
                        </div>

                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailLabel}>Native Name</div>
                            <div className={styles.detailValue}>{country.nativeName}</div>
                        </div>

                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailLabel}>Gini</div>
                            <div className={styles.detailValue}>{country.gini || 0}%</div>
                        </div>

                        <div className={styles.detailPanelBorders}>
                            <div className={styles.detailPanelLabel}>{borders?"":"Neighbouring Countries"}</div>
                            <div className={styles.detailContainer}>
                                {borders.map(({flag, name,alpha3Code}) => (
                                    <Link key={name} href={`/country/${alpha3Code}`}>
                                        <div key={name}
                                             className={styles.detailPanelBordersCountry}>
                                            <img style={{cursor:"pointer"}} src={flag} alt={name}/>
                                            <div className={styles.detailPanelBordersName}>{name}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Country;

export const getStaticPaths = async ()=>{
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = res.json();
    const paths = countries.map(country=>({
        params:{id:country.alpha3Code}
    }))
    return{
        paths,
        fallback:false,
    }
}

export const getStaticProps = async ({params}) => {
    const country = await getCountry(params.id);
    return {
        props: {
            country,
        }
    }
}
