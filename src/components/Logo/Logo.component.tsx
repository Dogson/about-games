import React from "react";
import logoImg from "./assets/logo.svg";
import logoSmallImg from "./assets/logo-small.svg";

export type LogoProps = {
  inline?: boolean;
};

const Logo: React.FC<LogoProps> = ({ inline = false }) => {
  return inline ? (
    <div className="relative flex items-center">
      <img src={logoSmallImg} alt="logo" className="mr-2 h-6" />
      <span className="font-title text-lg font-bold text-shadow-lg">
        about games
      </span>
    </div>
  ) : (
    <div className="relative flex justify-center">
      <img src={logoImg} alt="logo" className="h-42" />
      <div
        className="font-title absolute m-[-5px] text-center text-6xl/19
          font-bold text-shadow-lg"
      >
        about
        <br /> games
      </div>
    </div>
  );
};

export default Logo;
