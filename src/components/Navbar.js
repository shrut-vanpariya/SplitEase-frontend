'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { AvatarDrop } from './Avatar';

import HOST from '@/lib/host';


const Navbar = () => {

    const [user, setUser] = useState();

    const isValid = async () => {
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
        }
        else {
            // console.log("user varify");
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        }
    }


    useEffect(() => {
        setTimeout(() => {
            isValid();
        }, 0);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between pl-10 pr-10 pt-7 pb-7 space-x-3 h-10">
                <Link className="text-3xl font-bold rounded-md border-foreground" href={'/'}>SplitEase</Link>
                <div className='flex space-x-5 justify-center items-center'>
                    <ModeToggle />
                    {
                        user
                            ?
                            <>
                                <AvatarDrop {...{ user, setUser }} />
                            </>
                            :
                            <>
                                <Link className="hover:border-b-2 rounded-md border-foreground" href={'/login'}>Login</Link>
                                <Link className="hover:border-b-2 rounded-md border-foreground" href={'/register'}>Register</Link>
                            </>
                    }
                </div>
            </header>
        </>

    )
}

export default Navbar
