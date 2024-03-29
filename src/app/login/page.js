"use client";

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import CircularLoading from "@/components/CircularLoading";

import { useStore } from "@/lib/globalStore";
import HOST from "@/lib/host";




const Page = () => {

    const { user, setUser } = useStore();

    const { toast } = useToast();

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)


    const login = async () => {
        setIsLoading(true)
        try {
            const data = await fetch(`https://${HOST}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                cache: 'no-store'
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
            }
        } catch (error) {
            toast({
                variant: "destructive",
                description: `Failed to login!`,
            })
            console.log(error);
        }
        setIsLoading(false);
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
                        <div className=" flex flex-col space-y-5 p-10 m-10 border-2 border-border rounded-md w-80 shadow-xl">
                            <p className="text-primary">Login</p>
                            <Separator />
                            <div className="flex flex-col space-y-5">
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
                                <Button onClick={() => login()}>Login</Button>
                                <Separator />
                                {/* <Button variant="link" onClick={() => setOnRegistered(true)}> click here to register</Button> */}
                                <Button variant='link' asChild>
                                    <Link href="/register">click here to register</Link>
                                </Button>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Page
