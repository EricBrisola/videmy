import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-card-bg flex h-16 w-full items-center justify-between p-3">
      <Link
        href={"/"}
        className="bg-highlight-blue rounded-md px-6 py-2 font-medium text-white"
      >
        Home
      </Link>
      <div className="h-10 w-10">
        <Image src={"/icon.png"} alt="videmy-icon" width={250} height={250} />
      </div>
      <Link
        href={"/upload"}
        className="bg-highlight-blue rounded-md px-6 py-2 font-medium text-white"
      >
        Upload
      </Link>
    </nav>
  );
};

export default Navbar;
