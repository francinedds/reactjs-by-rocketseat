/* eslint-disable prettier/prettier */
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Helmet } from 'react-helmet-async'
import { Label } from '@radix-ui/react-label'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { registerRestaurant } from '@/api/register-restaurant'
import { useMutation } from '@tanstack/react-query'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate() 
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

  const { mutateAsync: registerRestaurantFn } = useMutation({ mutationFn: registerRestaurant })

  async function handleSignUp(data: SignUpForm) {
    try{
    console.log(data);

    await registerRestaurantFn({
      restaurantName: data.restaurantName, 
      managerName: data.managerName, 
      email: data.email, 
      phone: data.phone   
    })

    toast.success('Enviamos um link de autenticação para seu e-mail.', {
      action: {
        label: 'login',
        onClick: () => navigate(`/sign-in?email=${data.email}`),
      },
    }) 
    } catch {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <div>
      <Helmet title="Cadastro" />
      <div className="p-8">

      <Button asChild className='absolute right-8 top-8'>
          <Link to="/sign-in">
            Fazer Login
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} action="" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do Estabelecimento</Label>
              <Input id="restaurantName" type="text" {...register('restaurantName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerUser">Seu Nome</Label>
              <Input id="managerUser" type="text" {...register('managerName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="text" {...register('phone')} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar Cadastro
            </Button>

            <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
              Ao continuar, você concorda com nossos <a href='#' className='underline underline-offset-2'> Termos 
              de Serviços </a> e <a href='#' className='underline underline-offset-2'>Políticas de Privacidade</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}