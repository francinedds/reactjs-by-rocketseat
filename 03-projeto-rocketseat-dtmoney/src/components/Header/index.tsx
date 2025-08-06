import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";

import LogoImg from '../../assets/logo.svg' //falta colocar a logo aqui
import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={LogoImg} alt="" />

                <Dialog.Root> {/* modal lib @radixUI */}
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>   
                    </Dialog.Trigger>

                    <NewTransactionModal />
                   
                </Dialog.Root>

            </HeaderContent>
        </HeaderContainer>
    )
}