import { Header } from "../../components/Header";
import { Outlet } from "react-router-dom"; // funcionalidade: espaço para ser inserido um conteúdo específico para cada página

import { LayoutContainer } from "./styles";

export function DefaultLayout(){
    return (
        <LayoutContainer>

            <Header />
            <Outlet/> 

        </LayoutContainer>
    )
}