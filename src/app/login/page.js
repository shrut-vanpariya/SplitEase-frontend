"use client";

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import CircularLoading from "@/components/CircularLoading";
import HOST from "@/lib/host";




const page = () => {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [onRegistered, setOnRegistered] = useState(false)

    const { toast } = useToast()

    const router = useRouter()

    const login = async () => {

        const data = await fetch(`http://${HOST}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const res = await data.json();
        // console.log(res);

        if (res.status === 201) {
            // alert("You have login successfully!")
            // console.log(document.cookie);

            // open toast
            toast({
                description: `Loggedin Successfully.`,
            })
            localStorage.setItem("usersdatatoken", res.result.token);
            // setPassword(password)
            // setEmail(email)
            router.push('/')
        }
        else {
            alert("user not exist");
        }
    };

    const register = async () => {
        setIsLoading(true)

        const data = await fetch(`http://${HOST}/register`, {
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
            alert("You have registered successfully!")
            // setInpval({ ...inpval, fname: '', email: '', password: '', cpassword: '' });
        }

        setIsLoading(false)

        login();

        toast({
            description: `Registered Successfully.`,
        })
    };

    if (isLoading) {
        return (
            <CircularLoading />
        )
    }

    if (onRegistered) {
        return (
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
                    <Button variant="link" onClick={() => setOnRegistered(false)}>click here to login</Button>
                </div>
            </div>
        )
    }

    return (
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
                    <Button variant="link" onClick={() => setOnRegistered(true)}> click here to register</Button>
                </div>
            </div>
        </>
    )
}

export default page
