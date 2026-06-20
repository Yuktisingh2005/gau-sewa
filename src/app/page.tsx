"use client";
import { useState } from "react";
import HomePage from "@/components/HomePage";
import Loader from "@/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <HomePage />
    </>
  );
}
