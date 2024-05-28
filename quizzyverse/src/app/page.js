// src/app/page.js (or wherever your Home component is located)
import Link from "next/link";
import NavBar from "../../components/Navbar";
export default function Home() {
  return (
    <body className="bg-neutral-200 px-4">
      <NavBar/>
    </body>
  );
}
