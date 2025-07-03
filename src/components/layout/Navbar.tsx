import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-3 px-5">
      <div className="felx items-center">
        <Link to={"/"}>
          {" "}
          <span className="font-bold ml-2">Task</span> Master
        </Link>
      </div>
      <Link to={"tasks"}>Tasks</Link>
      <Link to={"users"}>Users</Link>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </nav>
  );
}
