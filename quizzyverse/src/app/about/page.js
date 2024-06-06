import Link from "next/link";
import NavBar from "../components/Navbar";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <NavBar/>
      <section className="min-h-screen flex flex-col items-center">
        <div className="mt-8 w-full max-w-3xl flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4">About Quizzyverse</h1>
        <p className="mb-4">
          Quizzyverse is a fun and engaging platform where you can test your
          knowledge on various topics.
        </p>
        <h2 className="text-2xl font-bold mb-2">The Team</h2>
        <p className="mb-4">
          We are a team of passionate developers, designers, and content
          creators who love quizzes and learning new things.
        </p>
        <ul className="list-none list-inside mb-4 text-dec font-bold">
          <li>Alexandre</li>
          <li>Erick</li>
          <li>Clémence</li>
          <li>Mayeul</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Technologies Used</h2>
        <ul className="list-none list-inside mb-4 text-dec">
          <li>Next.js</li>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>Node.js</li>
          <li>Express.js</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
        <p className="mb-4">
          Our mission is to provide an entertaining and educational experience
          for users of all ages.
        </p>
        </div>
      </section>
    </main>
  );
}
