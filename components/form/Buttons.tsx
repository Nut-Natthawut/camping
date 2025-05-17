"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

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
    {
        pending
         ? <LoaderCircle className="animate-spin" /> 
         : <p>{text}</p>
    }
      
      
    </Button>
  );
};
