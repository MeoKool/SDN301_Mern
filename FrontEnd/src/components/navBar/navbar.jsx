import { Link } from "react-router-dom";
import { Button } from "../ui/button";
export default function NavBar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link to="#" className="flex items-center">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              to="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              About
            </Link>
            <Link
              to="/services"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
