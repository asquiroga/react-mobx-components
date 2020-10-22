import React from "react";

interface HeaderProps {
  title: String;
  body?: String;
}

const Header = ({ title, body = "jeje" }: HeaderProps) => {
  return (
    <>
      <h2>[{title}]</h2>
      <p>{body}</p>
    </>
  );
};

export default Header;
