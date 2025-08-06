import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
    appInfo: {
      name: 'Ignite Shop',
  }
})

// Essa parte cria e exporta uma instância do cliente Stripe para que você possa se comunicar com a API do Stripe em outras partes do seu projeto.