import {
  FiBell,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";

import SearchInput from "../ui/SearchInput";
import usePageTitle from "../../hooks/usePageTitle";

const Navbar = () => {
  const pageTitle = usePageTitle();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">

      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold text-text">
          {pageTitle}
        </h1>

        <p className="text-sm text-muted">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <SearchInput className="hidden w-72 md:block" />

        <button className="relative rounded-lg bg-card p-2 transition hover:bg-card-hover">
          <FiBell size={20} />

          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-danger"></span>
        </button>

        <button className="flex items-center gap-3 rounded-lg bg-card px-3 py-2 transition hover:bg-card-hover">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <FiUser size={18} />
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-medium text-text">
              Joygopal
            </p>

            <p className="text-xs text-muted">
              Administrator
            </p>
          </div>

          <FiChevronDown
            className="hidden text-muted lg:block"
            size={18}
          />

        </button>

      </div>

    </header>
  );
};

export default Navbar;