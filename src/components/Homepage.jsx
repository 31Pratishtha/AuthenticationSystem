import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="flex justify-center items-center gap-20 text-neutral-900 text-xl pt-14">
      <Link to="/signup">
        <div className="w-36 h-8 bg-amber-500 text-center text- rounded-sm">
          SignUp
        </div>
      </Link>
      <Link to="/login">
        <div className="w-36 h-8 bg-amber-500 text-center rounded-sm">
          LogIn
        </div>
      </Link>
    </div>
  );
}