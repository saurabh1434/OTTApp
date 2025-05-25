import React from "react";

type Props = {
  onSignInClick: () => void;
  onSignUpClick: () => void;
};

const Navbar: React.FC<Props> = ({ onSignInClick, onSignUpClick }) => (
  <nav>
    <button onClick={onSignInClick}>Sign In</button>
    <button onClick={onSignUpClick}>Sign Up</button>
  </nav>
);

export default Navbar;
