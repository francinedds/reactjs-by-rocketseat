import styles from './Comment.module.css';

import { Trash } from 'phosphor-react';
import { ThumbsUp } from 'phosphor-react';

import profilePicturePost from '../assets/profile-picture-post.png'
import { useState } from 'react';

export function Comment({ content, OnDeleteComment }){
    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment(){
        setLikeCount((state) => {
            return state + 1 
        });
    }


    function handleDeleteComment(){
        OnDeleteComment(content)
    }

    return(
        <div className={styles.comment}>
            <img className={styles.avatar} src={profilePicturePost} alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Fulano</strong>
                            <time title="08 de Janeiro às 22:00h" dateTime="2025-01-08 22:00:00">Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'> 
                            <Trash size={20} />
                        </button>
                    </header>
                    <p>{ content }</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}

// Observação: colocamos essa parte dentro do componente "post", com a tag <comment/>
// como uma parte do post em si