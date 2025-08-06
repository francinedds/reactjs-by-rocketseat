import { PencilLine } from 'phosphor-react'; // instalando uma biblioteca de icones (é através do terminal)

import styles from './Sidebar.module.css';

//importação de fotos
import igniteBackground from '../assets/background-sidebar.png';
import profilePicture from '../assets/profile-picture.png';


export function Sidebar(){
    return(
        <aside className={styles.sidebar}>
            <img className={styles.cover} src={igniteBackground} alt="" />

            <div className={styles.profile}>

                <img className={styles.avatar} src={profilePicture} alt="" />
                <strong>Fulano</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={18} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    );
}