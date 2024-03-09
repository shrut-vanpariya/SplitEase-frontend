'use client';

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // states
import TransactionCard from '@/components/TransactionCard';
import { CreateExpense } from '@/components/CreateExpense';
import CircularLoading from '@/components/CircularLoading';

import HOST from '@/lib/host';
import { useStore } from '@/lib/globalStore';

const Page = ({ params }) => {

    const UserId1 = params.user1;
    const UserId2 = params.user2;

    // const [transactions, setTransactions] = useState([]);
    const { transactions, setTransactions } = useStore();

    const [isLoading, setIsLoading] = useState(false);

    const { user, setUser } = useStore();
    const { friends, setFriends } = useStore();


    const isValid = async () => {
        if (user) return;

        setIsLoading(true);
        try {
            let token = localStorage.getItem("usersdatatoken");
            // console.log(token);
            const res = await fetch(`https://${HOST}/validuser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            const data = await res.json();
            // console.log(data);
            if (data.status === 401 || !data) {
                // console.log("error page redirect");
                router.push('/login')

            }
            else {
                // console.log("user varify");
                setUser(data.ValidUserOne);
                // localStorage.setItem('user', JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const getFriends = async () => {
        if (friends.length) return
        setIsLoading(true);
        try {
            let token = localStorage.getItem("usersdatatoken");

            const res = await fetch(`https://${HOST}/getfriends`, {
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
                setFriends(data.friends)
                // console.log(data.friends);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        isValid();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // console.log(user);
        if (user) {
            getFriends();
        }
    }, [user])

    const getTransactions = async () => {
        setIsLoading(true);
        try {
            let token = localStorage.getItem("usersdatatoken");
            // console.log(token);
            const res = await fetch(`https://${HOST}/gettransaction/${UserId1}/${UserId2}`, {
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
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getTransactions();
    }, []);

    // useEffect(() => {
    //     console.log(transactions);
    // }, [transactions])

    return (
        <div className='flex flex-col min-h-screen w-full justify-start items-center'>
            <div className='sticky w-full top-10  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center pl-10 pr-10 pt-10 pb-10 space-x-3'>
                <CreateExpense {...{ UserId1, UserId2 }} />
            </div>
            <div className='flex w-full flex-col justify-center items-center space-y-5 pt-5 pb-10'>
                {
                    isLoading
                        ?
                        <CircularLoading />
                        :
                        <>
                            {transactions?.map((transaction, id) => {
                                return <TransactionCard key={id} {...{ transaction }} />
                            })}
                        </>
                }
            </div>
        </div>
    )
}

export default Page
