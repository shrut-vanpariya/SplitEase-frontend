'use client';

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "./ui/use-toast";

import HOST from '@/lib/host';
import CircularLoading from "./CircularLoading";
import { useStore } from "@/lib/globalStore";

export default function CreateFriend() {

    const { toast } = useToast();

    const router = useRouter()

    const { user, setUser } = useStore();
    const { friends, setFriends } = useStore();
    const [email, setEmail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);


    const handleSubmit = async () => {
        setIsLoading(true);
        setOpenDialog(false);
        try {
            let token = localStorage.getItem("usersdatatoken");
            // console.log(token);
            const res = await fetch(`https://${HOST}/makefriend`, {
                cache: 'no-store',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    email: user.email,
                    femail: email
                })
            });
            const data = await res.json();
            if (data.status === 401 || !data || data.error === "User not found" || data.error === "Email is empty") {
                console.log("error page redirect");
                toast({
                    variant: "destructive",
                    description: `Failed to make friend..😥`,
                })
            }
            else {
                toast({
                    description: `${email} is now your friend..😊`,
                })
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }


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
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger asChild>
                                <Button variant="outline" onClick={() => { setOpenDialog(true) }}>Make Friend</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Make Friend</DialogTitle>
                                    <DialogDescription>
                                        Enter email id to make friend.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            value={email}
                                            placeholder="abc@gmail.com"
                                            className="col-span-3"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => handleSubmit()}>Make friend</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
            }
        </>
    )
}
