"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

import { Separator } from "@/components/ui/separator";
import CircularLoading from "@/components/CircularLoading";
import CreateFriend from "@/components/CreateFriend";
import FriendCard from "@/components/FriendCard";

import HOST from '@/lib/host';
import { useStore } from "@/lib/globalStore";

export default function Home() {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useStore();
  const { friends, setFriends } = useStore();


  const isValid = async () => {
    if (user) return;

    setIsLoading(true);
    try {
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
        setUser(data.ValidUserOne);
        // localStorage.setItem('user', JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getFriends = async () => {
    if (friends.length) return
    setIsLoading(true);
    try {
      let token = localStorage.getItem("usersdatatoken");

      const res = await fetch(`https://${HOST}/getfriends`, {
        cache: 'no-store',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      const data = await res.json();
      if (data.status === 401 || !data) {
        // console.log("error page redirect");
      }
      else {
        setFriends(data.friends)
        // console.log(data.friends);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    isValid();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // console.log(user);
    if (user) {
      getFriends();
    }
  }, [user])

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
            <div className="flex flex-col w-96 min-h-screen justify-start items-center">
              <div className="flex justify-between items-center w-full pt-10 pb-10">
                <h1 className="font-normal text-3xl" >Friends</h1>
                <CreateFriend />
              </div>
              <Separator className="mb-10" />
              {/* <p> User : {user?.ValidUserOne.username}</p> */}
              {/* <p> Email : {user?.ValidUserOne.email}</p> */}
              <div className="space-y-5">
                {friends?.map((friend, id) => {
                  return <FriendCard key={id} UserId={user?._id} {...friend} />
                })}
              </div>
            </div>
          </>
      }
    </>
  );
}
