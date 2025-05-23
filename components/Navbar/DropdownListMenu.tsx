import { AlignLeft } from "lucide-react";
import { Button } from "../ui/button";
import Usericon from "./Usericon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { links } from "@/utils/links";
import SignOutLinks from "./SignOutLinks";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
// edit-error-next suppressHydrationWarning
const DropdownListMenu = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} suppressHydrationWarning>
            <AlignLeft />
            <Usericon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* ล็อคเอ้าแล้ว */}
          <SignedOut>
            <DropdownMenuItem>
              <SignInButton mode="modal">
                <button suppressHydrationWarning>Login</button>
              </SignInButton>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <SignUpButton mode="modal">
                <button suppressHydrationWarning>Register</button>
              </SignUpButton>
            </DropdownMenuItem>
          </SignedOut>

          {/* ล็อคอินแล้ว */}
          <SignedIn>
            {links.map((item, index) => {
              return (
                <DropdownMenuItem key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutLinks />
            </DropdownMenuItem>
            
          </SignedIn>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropdownListMenu;
