import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import HOST from '@/lib/host';

export function CreateFriend({ user }) {

    const [email, setEmail] = useState()

    const handleSubmit = async () => {
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
                email: user.ValidUserOne.email,
                femail: email
            })
        });

        const data = await res.json();

        if (data.status === 401 || !data) {
            console.log("error page redirect");
        }
        else {
            console.log(data);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Make Friend</Button>
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
    )
}
