import styles from './Avatar.module.css';

export function Avatar(props){
    return(
        <img className={styles.avatar} src={props} alt="" />
    );
}


// Um novo componente é criado para salvar custominações que mais se repetem na aplicação
// Como por exemplo, customização do avatar
// Ou seja, é algo reutilizavel

// NÃO CONSEGUI CERTO