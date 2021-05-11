import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api';

interface ITransaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

// interface ITransactionInput {
//   title: string;
//   type: string;
//   category: string;
//   amount: number;
// }

// type ITransactionInput = Pick<ITransaction, 'title' | 'type' | 'category' | 'amount'>

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

interface ITransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<ITransactionContextData>(
  {} as ITransactionContextData
);

export function TransactionsProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transaction: ITransactionInput) {
    api.post('/transactions', transaction)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}