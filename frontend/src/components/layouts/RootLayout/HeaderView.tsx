import React from "react";

// styles
import styles from "./HeaderView.module.scss";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeaderView = ({ children, ...props }: Props) => {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  );
};

interface LogoProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Logo = ({ children, ...props }: LogoProps) => {
  return <div {...props}>{children}</div>;
};

interface LinksProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Links = ({ children, ...props }: LinksProps) => {
  return <div {...props}>{children}</div>;
};

HeaderView.Logo = Logo;
HeaderView.Links = Links;

export default HeaderView;
