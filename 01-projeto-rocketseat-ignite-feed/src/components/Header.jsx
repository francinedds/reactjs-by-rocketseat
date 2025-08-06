import styles from './Header.module.css'

import igniteLogo from '../assets/ignite-logo.svg'; //importamos todas as imagens assim

export function Header(){
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="logotipo" />
            <strong>Ignite Feed</strong>    
        </header>

    );
}
