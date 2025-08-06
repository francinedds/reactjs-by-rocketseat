import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./Components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/Transactions";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

// Antes de passar essa interface para o "Contexts"
// interface Transaction{
//     id: number;
//     description: string;
//     type: 'income' | 'outcome';
//     price: number;
//     category: string;
//     createAt: string;
// } 


export function Transactions(){
    // Antes de passar para o "Contexts"

    // const [transactions, setTransactions] = useState<Transaction[]>([]);

    // async function loadTransaction(){
    //     const response = await fetch("http://localhost:3000/transactions")
    //     const data = await response.json();

    //     setTransactions(data);
    // }

    // useEffect(() => {
    //     loadTransaction()
    // }, [])

    // com useEffect, essa função será executada apenas uma vez e não em toda atualização do componente
    // useEffect não pode ser "async" (assíncrona), não criamos uma função e a chamamos dentro do useEffect
    
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    });

    return(
        <div>
           <Header />
           
           <Summary /> 

            <TransactionsContainer>

                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                <td width="50%">{transaction.description}</td> {/* Desenvolvimento de site */}
                                <td>
                                    <PriceHighlight variant={transaction.type}>
                                        {transaction.type === 'outcome' && ' - '}
                                        {priceFormatter.format(transaction.price)} {/* R$ 12.000,00  */}
                                    </PriceHighlight> 
                                </td>
                                <td>{transaction.category}</td> {/* Venda */} 
                                <td>{dateFormatter.format(new Date(transaction.createAt))}</td> {/* 20/03/2025* */}
                            </tr>
                            )
                        })}

                    </tbody>
                </TransactionsTable>   
            </TransactionsContainer>
        </div>
    )
}