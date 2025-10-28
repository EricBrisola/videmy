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

      <Image
        src={"/icon.png"}
        alt="videmy-icon"
        width={512}
        height={512}
        className="aspect-square min-[320]:w-10 min-[425px]:w-12 md:w-14 xl:w-16"
      />
      {/*TODO: talvez fazer uma logo */}
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
