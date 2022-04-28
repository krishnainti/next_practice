import Head from "next/head";
import { ReactElement } from "react";

type Meta = {
  name?: string;
  content?: string;
};
type Props = {
  title: string;
  meta?: Meta;
};

const Header = ({
  title = "Test App",
  meta = { name: "", content: "" },
}: Props): ReactElement => {
  return (
    <Head>
      <title>{title}</title>
      <meta name={meta.name} content={meta.content} />
    </Head>
  );
};

export default Header;
