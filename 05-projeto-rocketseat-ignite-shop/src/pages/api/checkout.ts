import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) { // Declara a função que vai lidar com a requisição. Isso é uma API route que pode ser acessada por /api/alguma-coisa.
  const { priceId } = req.body; // Em vez de usar um priceId fixo no código (antes estava fixo), agora ele espera que o cliente envie esse ID no corpo da requisição (por exemplo, com fetch ou axios).

  if (req.method !== "POST") { // Garante que apenas requisições POST possam acessar esse endpoint. Se outro método (GET, PUT, etc.) for usado, retorna erro 405 (Method Not Allowed).
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!priceId) { // Verifica se priceId foi realmente enviado no corpo. Se não, retorna erro 400 (Bad Request).
    return res.status(400).json({ error: 'Price not found.' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`; // Essas são as URLs para onde o Stripe vai redirecionar o usuário após o pagamento (Essas URLs estão baseadas em uma variável de ambiente NEXT_URL (ex: http://localhost:3000 ou o domínio do seu site)).
  const cancelUrl = `${process.env.NEXT_URL}/`;

  // Aqui o Stripe cria uma sessão de pagamento (é padrão).
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  })

  return res.status(201).json({ // A API responde com o link da sessão de checkout, que usamos no frontend para redirecionar o usuário ao Stripe (Ex: window.location.href = data.checkoutUrl).
    checkoutUrl: checkoutSession.url 
  })
}



// ### EXPLICAÇÃO:
// Essa é uma api criada para redimencionar o usuário a página do Stripe para realizar pagamento (uma rota externa). Assim o usuário não precisará cadastrar dados sensíveis dentro da nossa aplicação.
// O código criado aqui é padrão do Stripe e será usado pelo front-end ao clicar no botão "comprar". 
// Criamos uma function em pages/product/[id]