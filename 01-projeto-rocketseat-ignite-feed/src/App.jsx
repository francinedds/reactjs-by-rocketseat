import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";
import styles from './App.module.css';


import './global.css'; // para importar o CSS

//funcionalidades:
//author: { avatar_url: "", name:"", role:"" }
//publishedAt: Date
//content: String

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @ Rocketseat'
    },

    content: [
      { type: 'paragraph', content: 'Hello, guys!' },
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque soluta repellat nam delectus praesentium odio repellendus et cum! Qui cupiditate rerum hic praesentium repellat velit maxime eligendi asperiores quisquam dolores?' },
      { type: 'link', content: 'fulano.design/doctorcare' },
    ],

    publishedAt: new Date('2025-01-16 21:00:00')
  },

  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @ Rocketseat'
    },

    content: [
      { type: 'paragraph', content: 'Hello, guys!' },
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque soluta repellat nam delectus praesentium odio repellendus et cum! Qui cupiditate rerum hic praesentium repellat velit maxime eligendi asperiores quisquam dolores?' },
      { type: 'link', content: 'fulano.design/doctorcare' },
    ],

    publishedAt: new Date('2025-01-15 20:00:00')
  },
];

function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        
        <Sidebar />

        <main>
          {posts.map(post => {
           return (
              <Post 
                  key={post.id} //antes estava dando erro por causa da key unique
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
              />
          )
         })}
        </main>

      </div>
    </div>
  )
}

export default App



