import { stripe } from '@/lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';
import Head from "next/head";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({product}: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true); // Ativa um estado (isCreatingCheckoutSession) que provavelmente serve para desabilitar o botão ou mostrar um "carregando..." enquanto a requisição está acontecendo.

      const response = await axios.post('/api/checkout', { // Envia uma requisição POST para /api/checkout, passando o priceId do produto que está sendo comprado. Essa requisição será tratada pela rota que você mostrou antes (/api/checkout), que cria a sessão de pagamento.
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl; // Extrai a checkoutUrl da resposta da API (que vem do Stripe) e redireciona o navegador para ela, iniciando o checkout com o Stripe.
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
      <>
        <Head>
          <title>{product.name} | Ignite Shop</title>
        </Head>
        
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>

          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>

            <p>{product.description}</p>

            <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
              Comprar agora
            </button>
          </ProductDetails>
        </ProductContainer>
      </>
    );
  }

  export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
  
  export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id;
  
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price']
    });
  
    const price = product.default_price as Stripe.Price;
  
    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format((price.unit_amount ?? 0) / 100),
          description: product.description,
          defaultPriceId: price.id
        }
      },
      revalidate: 60 * 60 * 1 // 1 hours
    }
  }