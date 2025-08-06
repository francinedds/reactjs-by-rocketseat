import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function Success({ customerName, product }: SuccessProps) {
    return (
      <>
        <Head>
          <title>Compra efetuada | Ignite Shop</title>
          
          <meta name="robots" content="noindex" />
        </Head>

        <SuccessContainer>
          <h1>Compra Efetuada!</h1>

          <ImageContainer>
            <Image src={product.imageUrl} width={120} height={110} alt="" />
          </ImageContainer>

          <p>Uhuul, <strong>{customerName}</strong>! Sua <strong>{product.name}</strong> já está a caminho da sua casa.</p>
          
          <Link href="/">
            Voltar ao catálogo
          </Link>
        </SuccessContainer>
      </>
    );
  }
  
  export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) { // faz uma verificação, caso o session_id não exista (ou seja, caso a página success não funcione), volta para a home. São coisas que podem acontecer quando usamos dados externos.
      return {
        redirect: {
          destination: '/', // redireciona para a home.
          permanent: false,
        }
      }
    }

    const sessionId = String(query.session_id); // obtém o ID da sessão de pagamento do Stripe que foi passado via URL após checkout.
  
    const session = await stripe.checkout.sessions.retrieve(sessionId, { // Faz uma requisição para a API do Stripe para recuperar os detalhes dessa sessão.
      expand: ['line_items', 'line_items.data.price.product'] // O expand é necessário para carregar todos os dados aninhados, como os produtos comprados (sem isso, você só receberia IDs).
    });
  
    const customerName = session.customer_details?.name || 'Cliente';
    const lineItem = session.line_items?.data[0];
    const product = lineItem?.price?.product as Stripe.Product;
  
    return {
      props: { // Os dados são passados como props para a página Success.
        customerName,
        product: {
          name: product.name,
          imageUrl: product.images[0]
        }
      }
    }
  }