import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <footer className="bg-gray-200 text-center lg:text-left">
      <div className="text-gray-700 text-center p-4">
        © {new Date().getFullYear()} Copyright: Test App
      </div>
    </footer>
  );
};

export default Footer;
