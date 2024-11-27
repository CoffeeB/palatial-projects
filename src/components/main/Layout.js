import PropTypes from "prop-types";
import Head from "next/head";

const Layout = ({ title, desc, children }) => {
  return (
    <div>
      <Head>
        <title>{"Palatial Projects"}</title>
        <link rel="shortcut icon" href="/assets/img/Logo.png"></link>
        <meta
          name="description"
          content="At Palatial Projects, we blend creativity with functionality to transform visions into stunning architectural realities. With a commitment to excellence and a passion for design, our team of expert architects and designers crafts spaces that inspire and endure."
        />
        <meta
          name="keywords"
          content="Palatial Projects, architecture, design, creativity, functionality, stunning architectural realities, expert architects"
        />
        <meta property="og:title" content="Palatial Projects" />
        <meta
          property="og:description"
          content="At Palatial Projects, we blend creativity with functionality to transform visions into stunning architectural realities. With a commitment to excellence and a passion for design, our team of expert architects and designers crafts spaces that inspire and endure."
        />
        <meta property="og:image" content="/assets/img/Logo.png" />
      </Head>

      <main className="m-0 p-0">{children}</main>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // Add this line to define 'children' prop type
};

export default Layout;
