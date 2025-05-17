import { Input } from "../ui/input"

const Search = () => {
  return (
    <Input
      type="text"
      placeholder="Search..."
      className="max-w-xs"
      suppressHydrationWarning
    />
  )
}

export default Search