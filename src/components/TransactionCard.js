'use client';

import React, { useState } from 'react'
import { EditDialog } from './EditDialog'
import { Button } from './ui/button';
import { useToast } from "./ui/use-toast";
import CircularLoading from '@/components/CircularLoading';

import HOST from '@/lib/host';
import { useStore } from '@/lib/globalStore';

const TransactionCard = ({ transaction }) => {

    // const { amount, splittype, date, description } = transaction;

    const { transactions, setTransactions } = useStore();

    const { toast } = useToast();

    const [transactionCard, setTransactionCard] = useState({ ...transaction })
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            let token = localStorage.getItem("usersdatatoken");
            // console.log(token);
            const res = await fetch(`https://${HOST}/transaction/${transactionCard._id}`, {
                cache: 'no-store',
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            });
            const data = await res.json();
            // console.log(data);
            if (data.status === 401 || !data) {
                // console.log("error page redirect");
                toast({
                    variant: "destructive",
                    description: `Failed to delete transaction!`,
                })
            }
            else {
                // console.log(data);
                let trns = transactions
                trns = trns.filter(el => el !== transaction)
                // console.log(trns);
                setTransactions(trns);
                toast({
                    description: `Transaction deleted successfully!`,
                })
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <div className='flex flex-col space-y-5 rounded-2xl w-96 border p-5'>
            <p>Amount : {transactionCard.amount}</p>
            <p>Splittype : {transactionCard.splittype}</p>
            <p>Date : {transactionCard.date}</p>
            <p>Descreption : {transactionCard.description}</p>
            <EditDialog {...{ transactionCard, setTransactionCard }} />
            {
                isLoading
                    ?
                    <Button> <CircularLoading /> </Button>
                    :
                    <Button onClick={() => handleDelete()}>Delete Transaction</Button>
            }
        </div>
    )
}

export default TransactionCard
