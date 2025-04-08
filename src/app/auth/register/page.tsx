"use client";

import RegisterForm from "@/components/RegisterForm";
import SideIntro from "@/components/SideIntro";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
        <SideIntro />
      <section className="flex-1 flex items-center justify-center p-4 " >
        <RegisterForm />
      </section>
    </main>
  );
}
