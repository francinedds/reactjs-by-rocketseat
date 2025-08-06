import { HomeContainer, Product } from '@/styles/pages/home';
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from "next"
import Head from "next/head";
import Image from 'next/image';

import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe"
import Stripe from 'stripe';
import Link from 'next/link';

interface HomeProps { // Define o tipo das props recebidas pelo componente Home.
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({ // Chama a API do Stripe para listar todos os produtos (stripe.products.list())
    expand: ['data.default_price'] // O parâmetro expand faz com que o Stripe inclua automaticamente o objeto default_price dentro de cada produto (ao invés de retornar só o id do preço).
  });

  const products = response.data.map(product => { // Mapeia os produtos retornados.
    const price = product.default_price as Stripe.Price; // 'price' recebe o default_price já expandido. O 'as Stripe.Price' força o TypeScript a reconhecer que é um objeto Price e não apenas um string.

    return { // Cria um novo objeto com apenas os dados que você quer usar no front-end:
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', { // Converte o preço do produto para o formato monetário brasileiro (R$), com separadores de milhar e vírgula decimal.
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount ?? 0) / 100), // se o valor estiver indefinido, assume 0 (evita erro).
    }
  });

  return { // Retorna os produtos como props para o componente Home.
    props: { 
      products,
    },
    revalidate: 60 * 60 * 2 // 2 hours // Ativa o ISR (Incremental Static Regeneration) com revalidate. Ou seja, depois de 2 horas, o Next.js vai rebuildar essa página no background com dados atualizados.
  }
}

// getStaticProps x getServerSideProps:

// Função	            Executada quando?	          Tempo de resposta	              Uso ideal
// getStaticProps	    No build ou com revalidação	Super rápido (página já gerada)	Dados que mudam raramente
// getServerSideProps	A cada requisição	          Mais lento (gera na hora)      	Dados dinâmicos, personalizados ou sensíveis

// Use getStaticProps para páginas que não mudam a cada acesso e que você quer servir super rápido.
// Use getServerSideProps quando precisa de dados sempre atualizados ou personalizados.

// Só precisamos usá-las quando há dados externos sendo carregados, como os produtos do Stripe