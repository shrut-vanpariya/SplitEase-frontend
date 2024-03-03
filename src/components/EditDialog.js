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
import { SelectSplitType } from "./SelectSplitType"
import { DatePicker } from "./DatePicker"
import { Textarea } from "@/components/ui/textarea"

import HOST from '@/lib/host';

export function EditDialog({ transactionCard, setTransactionCard, transactions, setTransactions }) {

    const [transactionData, setTransactionData] = useState({ ...transactionCard });
    const handleSubmit = async () => {
        let token = localStorage.getItem("usersdatatoken");
        // console.log(token);
        const res = await fetch(`http://${HOST}/transaction/${transactionData._id}`, {
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
            const trns = data.transaction
            setTransactions({ ...transactions, trns })
            setTransactionCard(trns)
            // console.log(data);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Edit Transaction  </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                    <DialogDescription>
                        Make changes to your transaction here. Click save when you're done.
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
