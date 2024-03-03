'use client';

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

import HOST from '@/lib/host';


const FriendCard = ({ UserId, username, _id }) => {

    const router = useRouter()
    const [totalExpense, setTotalExpense] = useState();

    const getTotalExpense = async () => {
        let token = localStorage.getItem("usersdatatoken");
        // console.log(token);

        const res = await fetch(`http://${HOST}/totalexpense/${UserId}/${_id}`, {
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
            setTotalExpense(data);
            // console.log(data);
        }
    }

    useEffect(() => {
        getTotalExpense()
    }, [])

    return (
        <Button
            variant="default"
            className='flex pl-10 pr-10 pt-10 pb-10 rounded-2xl border min-w-96 justify-between items-center'
            onClick={() => { router.push(`/${UserId}/${_id}`) }}
        >
            <p className='text-xl'>{username}</p>
            <div>
                <p>{totalExpense?.type}</p>
                <p>{totalExpense?.amount}</p>
            </div>
        </Button>
    )
}

export default FriendCard
