'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import CircularLoading from "@/components/CircularLoading";

import HOST from '@/lib/host';
import { useStore } from '@/lib/globalStore';

const Page = () => {

    const router = useRouter();

    const { toast } = useToast();

    const { user, setUser } = useStore();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [username, setUsername] = useState("");

    const register = async () => {
        setIsLoading(true)

        try {
            const data = await fetch(`https://${HOST}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password, cpassword })
            });
            // console.log("User registration successfully done.");
            const res = await data.json();
            // console.log(res);
            if (res.status === 201) {
                // setInpval({ ...inpval, fname: '', email: '', password: '', cpassword: '' });
                toast({
                    description: `Registered Successfully.`,
                })
                login()
            }
            else {
                toast({
                    variant: "destructive",
                    description: `Registration failed!`,
                })

            }
        } catch (error) {
            toast({
                variant: "destructive",
                description: `Registration failed!`,
            })
            console.log(error);
        }
        setIsLoading(false)
    };

    const login = async () => {
        setIsLoading(true)
        try {
            const data = await fetch(`https://${HOST}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const res = await data.json();
            // console.log(res);
            if (res.status === 201) {
                // open toast
                toast({
                    description: `Loggedin Successfully.`,
                })
                localStorage.setItem("usersdatatoken", res.result.token);
                setUser(res.result.userValid)
                router.push('/')
            }
            else {
                toast({
                    variant: "destructive",
                    description: `Failed to login!`,
                })
                router.push('/login')
            }
        } catch (error) {
            toast({
                variant: "destructive",
                description: `Failed to login!`,
            })
            router.push('/login')
            console.log(error);
        }
        setIsLoading(false)
    };

    return (
        <>
            {
                isLoading
                    ?
                    <>
                        <CircularLoading />
                    </>
                    :
                    <>
                        <div className="flex flex-col space-y-5 p-10 m-10 border-2 border-border rounded-md w-80 shadow-xl">
                            <p className="text-primary">Register</p>
                            <Separator />
                            <div className="flex flex-col space-y-5">
                                <Input
                                    className="text-primary"
                                    type="text"
                                    placeholder="Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Input
                                    className="text-primary"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    className="text-primary"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    className="text-primary"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                />
                                <Button onClick={register}>Register</Button>
                                <Separator />
                                <Button variant='link' asChild>
                                    <Link href="/login">click here to register</Link>
                                </Button>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Page
