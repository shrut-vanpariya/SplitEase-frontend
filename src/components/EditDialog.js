'use client';

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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectSplitType } from "./SelectSplitType"
import { DatePicker } from "./DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "./ui/use-toast"

import HOST from '@/lib/host';
import { useStore } from "@/lib/globalStore";
import CircularLoading from "./CircularLoading";

export function EditDialog({ transactionCard, setTransactionCard }) {

    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { transactions, setTransactions } = useStore();

    const [transactionData, setTransactionData] = useState({ ...transactionCard });
    const handleSubmit = async () => {
        setIsLoading(true);
        setOpenDialog(false);
        try {
            let token = localStorage.getItem("usersdatatoken");
            // console.log(token);
            const res = await fetch(`https://${HOST}/transaction/${transactionData._id}`, {
                cache: 'no-store',
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(transactionData)
            });

            const data = await res.json();
            // console.log(data);
            if (data.status === 401 || !data) {
                // console.log("error page redirect");
            }
            else {
                const trns = transactions
                trns.map(obj => {
                    if (obj._id === data.transaction._id) {
                        return data.transaction;
                    }
                    return obj;
                })
                setTransactions(trns)
                setTransactionCard(data.transaction)
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
                        <Button variant="default"><CircularLoading /></Button>
                        :
                        <Button variant="default" onClick={() => { setOpenDialog(true) }}>Edit Transaction</Button>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
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
