"use client";

import { useState } from "react"

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
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SelectSplitType } from "./SelectSplitType"
import { DatePicker } from "./DatePicker"
import { useToast } from "./ui/use-toast"
import CircularLoading from "./CircularLoading"

import HOST from '@/lib/host';
import { useStore } from "@/lib/globalStore";

export function CreateExpense({ UserId1, UserId2 }) {

    const { toast } = useToast();

    const { transactions, setTransactions } = useStore();

    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [transactionData, setTransactionData] = useState({
        amount: 0,
        date: Date.now(),
        splittype: "you paid split equally",
        description: ""
    });
    const handleSubmit = async () => {
        setIsLoading(true);
        setOpenDialog(false);
        try {
            let token = localStorage.getItem("usersdatatoken");
            // console.log(token);
            const res = await fetch(`https://${HOST}/maketransaction/${UserId1}/${UserId2}`, {
                cache: 'no-store',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(transactionData),
                cache: 'no-store'
            });
            const data = await res.json();
            // console.log(data);
            if (data.status === 401 || !data) {
                // console.log("error page redirect");
                toast({
                    variant: "destructive",
                    description: `Failed to create expense..!`,
                })
            }
            else {
                const trns = transactions;
                trns.push(data.transaction);
                // console.log(trns);
                setTransactions(trns);
                toast({
                    description: `Expense created successfully..!`,
                })
                // console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                {
                    isLoading
                        ?
                        <CircularLoading />
                        :
                        <Button variant="default" onClick={() => { setOpenDialog(true) }}>Create Expense</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Transaction</DialogTitle>
                    <DialogDescription>
                        {"Make changes to your transaction here. Click save when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={transactionData.amount}
                            className="col-span-3"
                            onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="splittype" className="text-right">
                            Split Type
                        </Label>
                        <SelectSplitType {...{ transactionData, setTransactionData }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        <DatePicker {...{ transactionData, setTransactionData }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="descreption" className="text-right">
                            Descreption
                        </Label>
                        <Textarea
                            className='col-span-3'
                            placeholder="Type your descreption here."
                            value={transactionData.description}
                            onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => { handleSubmit() }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
