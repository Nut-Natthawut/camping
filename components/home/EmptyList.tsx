import Link from "next/link";
import { Button } from "../ui/button";

const EmptyList = ({
  heading = "No items",
  message = "Please add some items",
  btnText = "Back to Home",
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) => {
  return <div className="py-3 text-center">
    <h2 className="text-2xl font-bold">{heading}</h2>
    <p className="text-lg mb-4 text-muted-foreground">{message}</p>
    <Button className="capitalize" asChild>
        <Link href={'/'}> {btnText}</Link>
    </Button>
       
  </div>;
};
export default EmptyList;
