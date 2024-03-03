import { useRouter } from 'next/navigation'


import { Button } from "@/components/ui/button"
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

export function AvatarDrop({ user, setUser }) {

    const router = useRouter()

    const handleLogout = async () => {
        let token = localStorage.getItem("usersdatatoken");
        // console.log(token);
        const res = await fetch(`http://${HOST}/logout`, {
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
            router.push('/login')
        }
        else {
            // console.log("error");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline">Open</Button> */}
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{user.ValidUserOne.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {user.ValidUserOne.username}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {user.ValidUserOne.email}
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
