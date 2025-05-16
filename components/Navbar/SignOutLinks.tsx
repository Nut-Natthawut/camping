"use client";
import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from 'lucide-react';

const SignOutLinks = () => {
  const { toast } = useToast();
  const hadleLogout = () => {
    toast({ description: "Logout Successfully" });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button
      className="flex w-full text-left items-center"
       onClick={hadleLogout}>
        <LogOut className="w-4 mx-1" />
        Logout
       </button>
    </SignOutButton>
  );
};
export default SignOutLinks;
