import { categories } from "@/utils/categories";
import Link from "next/link";

const CategoriseList = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <div>
      <div className="flex justify-center items-center font-bold my-1 gap-4 gap-x-4 ">
        {categories.map((item) => {
            const isActive = item.label === category
          return (
            <Link
              href={`/?category=${item.label}${searchTerm}`}
              key={item.label}
            >
              <article className={`p-3 flex flex-col justify-center items-center hover:text-primary hover:scale-110 duration-300 ${isActive ? "text-primary " : ""}`}>
                <item.icon className="h-6 w-6" />
                <p>{item.label}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default CategoriseList;
