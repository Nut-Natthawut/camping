"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, LoaderCircle } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "sm" | "lg";

type SubmitButtonProps = {
  className?: string;
  size?: btnSize;
  text?: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {
  // loading_หมุนๆ
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      size={size}
      className={`${className} mt-4`}
    >
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        <p>{text}</p>
      )}
    </Button>
  );
};

export const SignInCardButton = () => {
  return (
    <SignInButton mode="modal">
      <Button size={"icon"} variant={"outline"}>
        <Heart />
      </Button>
    </SignInButton>
  );
};

export const CartSubmitButton = ({isFavorite}: {isFavorite: boolean}) => {

  const {pending} = useFormStatus();
  return (
    <Button type="submit" size={'icon'} variant={'outline'}>
      {
        pending
        ? <LoaderCircle className="animate-spin" />
        : isFavorite
        ? <Heart fill="blue" />
        : <Heart />
      }
    </Button>
  );
}