import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.git}>
                <a href="https://github.com/oranje322" target="_blank" rel="noreferrer"> @oranje322</a>
                <a href="https://github.com/kristinand" target="_blank" rel="noreferrer"> @kristinand</a>
                <a href="https://github.com/ya-stefaniya" target="_blank" rel="noreferrer"> @ya-stefaniya</a>
                <a href="https://github.com/zaruba2004" target="_blank" rel="noreferrer"> @zaruba2004</a>
            </div>
            <div className={styles.course}>
                <a className={styles.link} href={'https://rs.school/js/'} target="_blank" rel="noreferrer">
                    <img className={styles.img} src="https://rs.school/images/rs_school_js.svg" alt="rsschhol" />
                    <span>/ 2021</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;