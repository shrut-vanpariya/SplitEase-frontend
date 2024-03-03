import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectSplitType({ transactionData, setTransactionData }) {

    const handleSplitTypeChange = (value) => {
        setTransactionData({ ...transactionData, splittype: value });
        console.log(transactionData);
    };

    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue
                    placeholder={transactionData.splittype || "Select Split Type"}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Split Type</SelectLabel>
                    <SelectItem
                        value="you paid split equally"
                        onClick={() => handleSplitTypeChange("you paid split equally")}
                    >
                        you paid split equally
                    </SelectItem>
                    <SelectItem
                        value="other paid split equally"
                        onClick={() => handleSplitTypeChange("other paid split equally")}
                    >
                        other paid split equally
                    </SelectItem>
                    <SelectItem
                        value="you paid full amount"
                        onClick={() => handleSplitTypeChange("you paid full amount")}
                    >
                        you paid full amount
                    </SelectItem>
                    <SelectItem
                        value="other paid full amount"
                        onClick={() => handleSplitTypeChange("other paid full amount")}
                    >
                        other paid full amount
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
