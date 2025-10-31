import React from "react";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="box-border flex min-h-screen flex-col items-center gap-2 px-10
        pt-20"
    >
      {children}
    </div>
  );
};

export default HomeLayout;
