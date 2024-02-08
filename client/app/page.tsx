'use client';
import Image from "next/image";

import { Button } from "semantic-ui-react";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, loading, error, fetchData } = useFetch('/users/register', 'POST');
  console.log("loading", loading);
  console.log("data", data);
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <img src="/next.svg" alt="logo" width={100} />
      <Button primary onClick={() => { fetchData() }}>Test Fetch</Button>
      <Button secondary onClick={() => { router.push('/home') }}>Go to Home</Button>
    </div>
  );
}
