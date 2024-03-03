import React, { useState } from 'react'
import { EditDialog } from './EditDialog'
import { Button } from './ui/button';

import HOST from '@/lib/host';

const TransactionCard = ({ transaction, transactions, setTransactions }) => {

    const { amount, splittype, date, description } = transaction;

    const [transactionCard, setTransactionCard] = useState({ ...transaction })

    const handleDelete = async () => {
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
        }
        else {
            alert('deleted successfully')
        }
    }

    return (
        <div className='flex flex-col space-y-5 rounded-2xl w-96 border p-5'>
            <p>Amount : {transactionCard.amount}</p>
            <p>Splittype : {transactionCard.splittype}</p>
            <p>Date : {transactionCard.date}</p>
            <p>Descreption : {transactionCard.description}</p>
            <EditDialog {...{ transactionCard, setTransactionCard, transactions, setTransactions }} />
            <Button
                onClick={() => handleDelete()}
            >
                Delete Transaction
            </Button>
        </div>
    )
}

export default TransactionCard
