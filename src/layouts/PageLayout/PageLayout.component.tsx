import React from "react";
import HeaderModule from "../../components/Header/HeaderModule/Header.module.tsx";

const PageLayout: React.FC<{
  noHeader?: boolean;
  noSearchInHeader?: boolean;
  children: React.ReactNode;
}> = ({ noHeader = false, noSearchInHeader, children }) => {
  return (
    <div>
      {!noHeader && <HeaderModule noSearch={noSearchInHeader} />}
      <div className="box-border flex min-h-screen flex-col items-center gap-2">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
