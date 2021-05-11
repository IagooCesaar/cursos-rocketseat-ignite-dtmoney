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

interface ITransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<ITransaction[]>([]);

export function TransactionsProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  function createTransaction(transaction: ITransactionInput) {
    api.post('/transactions', transaction)
  }

  return (
    <TransactionsContext.Provider
      value={transactions}
    >
      {children}
    </TransactionsContext.Provider>
  )
}