"use client";

import { data } from "autoprefixer";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import FriendCard from "@/components/FriendCard";
import { Separator } from "@/components/ui/separator";
import { CreateFriend } from "@/components/CreateFriend";

import HOST from '@/lib/host';

export default function Home() {

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState();

  const router = useRouter()

  const isValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);
    const res = await fetch(`https://${HOST}/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    // console.log(data);
    if (data.status === 401 || !data) {
      // console.log("error page redirect");
      router.push('/login')

    }
    else {
      // console.log("user varify");
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      getFriends();

    }
  }

  const getFriends = async () => {
    // const user = JSON.parse(localStorage.getItem('user'))
    // console.log(user.ValidUserOne.email);

    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);
    const res = await fetch(`https://${HOST}/getfriends`, {
      cache: 'no-store',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    // console.log(data);
    if (data.status === 401 || !data) {
      // console.log("error page redirect");
    }
    else {
      setFriends(data.friends)
      console.log(data.friends);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      isValid();
    }, 2000);
  }, []);

  return (
    <>
      <div className="flex flex-col w-96 min-h-screen justify-start items-center">
        <div className="flex justify-between items-center w-full pt-10 pb-10">
          <h1 className="font-normal text-3xl" >Friends</h1>
          <CreateFriend {...{ user }} />
        </div>
        <Separator className="mb-10" />
        {/* <p> User : {user?.ValidUserOne.username}</p> */}
        {/* <p> Email : {user?.ValidUserOne.email}</p> */}
        <div className="space-y-5">
          {friends?.map((friend, id) => {
            return <FriendCard UserId={user?.ValidUserOne._id} {...friend} />
          })}
        </div>
      </div>
    </>
  );
}
