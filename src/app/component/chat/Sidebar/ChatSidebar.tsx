"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import SingleUserCard from "./SingleUserCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import { useAppSelector } from "@/redux/hooks";
import { LoggedIn } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toggelChatSidebar } from "@/redux/slice/chatSlice";
import { LuArrowLeft } from "react-icons/lu";
import { BiHomeAlt2 } from "react-icons/bi";
import clsx from "clsx";

const ChatSidebar = () => {
  const user = useAppSelector((state) => state.auth);
  const chat = useAppSelector((state) => state.chat);
  const { data, isLoading } = useQuery(
    ["getAllChats", user.isUserAuthenticated],
    () => userApis.getUserChatList(),
    { enabled: user.isUserAuthenticated }
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const AutoLogin = useMutation(() => userApis.AutoLogin(), {
    onSuccess: (data) => {
      dispatch(LoggedIn(data));
    },
    onError: () => {
      router.push("/login");
    },
  });

  useEffect(() => {
    if (!user.isUserAuthenticated) {
      AutoLogin.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isUserAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-400"></div>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <h1 className="text-2xl text-neutral-400">No chat found</h1>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "fixed  left-0 bottom-0 z-[51] py-2 bg-neutral-900 transition-all ease-in-out duration-100  max-w-sm w-full max-md:w-3/4 max-md:shrink shrink-0 h-full",
        chat.showChatSidebar ? " max-md:left-0 " : "max-md:-left-96"
      )}
    >
      <div className="flex items-center gap-1">
        <button
          className="px-1  ml-2 max-md:block hidden"
          onClick={() => dispatch(toggelChatSidebar())}
        >
          <LuArrowLeft className="text-lg text-neutral-300" />
        </button>
        <div className="flex items-center h-10 bg-neutral-800 border border-neutral-600 border-opacity-30 px-2 rounded-full">
          <BiSearch className="text-neutral-400 text-xl" />
          <input
            type="search"
            placeholder="Search chat "
            className=" bg-transparent h-full px-3 text-neutral-300 placeholder:text-neutral-500 my-1 outline-none  border-none"
          />
        </div>
        <Link href={"/"}>
          <BiHomeAlt2 className="text-xl ml-2 text-neutral-400" />
        </Link>
      </div>
      {/* messages */}
      <section className=" mt-20 flex flex-col gap-2 chatlist-container overflow-hidden hover:overflow-y-auto  max-h-[82%]">
        <h2 className="px-6 font-semibold text-xl">Chats</h2>
        {data?.map((chat) => {
          return <SingleUserCard key={chat._id} {...chat} />;
        })}
      </section>
    </div>
  );
};

export default ChatSidebar;
