import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

export type SmartLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

const SmartLink: React.FC<SmartLinkProps> = ({
  to,
  children,
  className,
  target,
  rel,
}) => {
  const isExternal = /^https?:\/\//.test(to);

  const sharedClassName = classNames(className);

  if (isExternal) {
    return (
      <a href={to} className={sharedClassName} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={sharedClassName}>
      {children}
    </Link>
  );
};

export default SmartLink;
