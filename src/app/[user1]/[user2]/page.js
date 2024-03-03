'use client';

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // states
import TransactionCard from '@/components/TransactionCard';
import { CreateExpense } from '@/components/CreateExpense';

import HOST from '@/lib/host';;

const page = ({ params }) => {

    const UserId1 = params.user1;
    const UserId2 = params.user2;

    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {

        // const user = JSON.parse(localStorage.getItem('user'))
        // console.log(user.ValidUserOne.email);

        let token = localStorage.getItem("usersdatatoken");
        // console.log(token);
        const res = await fetch(`http://${HOST}/gettransaction/${UserId1}/${UserId2}`, {
            cache: 'no-store',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        if (data.status === 401 || !data) {
            // console.log("error page redirect");
        }
        else {
            // console.log(data);
            setTransactions(data);
        }

    }

    useEffect(() => {
        setTimeout(() => {
            getTransactions();
        }, 1000);
    }, []);

    return (
        <div className='flex w-full flex-col justify-center items-center space-y-5 pt-10 pb-10'>
            <CreateExpense {...{ UserId1, UserId2, transactions, setTransactions }} />
            {transactions.transactions?.map((transaction) => {
                return <TransactionCard {...{ transaction, transactions, setTransactions }} />
            })}
        </div>
    )
}

export default page
