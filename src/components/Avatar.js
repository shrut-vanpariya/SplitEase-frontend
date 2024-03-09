"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import HOST from '@/lib/host';
import { useStore } from '@/lib/globalStore';

export function AvatarDrop() {

    const router = useRouter()

    const { user, setUser } = useStore();
    const { friends, setFriends } = useStore();

    const [globalLoading, setGlobalLoading] = useState(false);


    const handleLogout = async () => {
        setGlobalLoading(true);
        try {
            let token = localStorage.getItem("usersdatatoken");
            // console.log(token);
            const res = await fetch(`https://${HOST}/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                    Accept: "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            // console.log(data);
            if (data.status === 201) {
                // console.log("user logout");
                localStorage.removeItem("usersdatatoken");
                setUser(null);
                setFriends([]);
                router.push('/login')
            }
            else {
                // console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
        setGlobalLoading(false);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline">Open</Button> */}
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {user?.username}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {user?.email}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => handleLogout()}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
