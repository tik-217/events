import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderBtns } from "@/entities/headerBtns";

export const Header = memo(function Header() {
  return (
    <header className="mt-5 mb-8 flex justify-between items-center">
      <section>
        <Link href={"/"}>
          <Image
            src={"/vercel.svg"}
            height={0}
            width={0}
            sizes={"20vw"}
            alt={"logo"}
            className="w-[35%] h-auto"
          />
        </Link>
      </section>
      <HeaderBtns />
    </header>
  );
});
