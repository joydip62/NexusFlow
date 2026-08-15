import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <FiSearch
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
      />
    </div>
  );
};

export default SearchInput;