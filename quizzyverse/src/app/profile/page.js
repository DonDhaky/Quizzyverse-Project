  "use client";

  import Link from "next/link";
  import NavBar from "../components/Navbar";
  import { useState } from "react";
  import { signOut } from "next-auth/react";
  import { useSession } from "next-auth/react";

  export default function User() {
    const { data: session } = useSession();
    const [email, setEmail] = useState(session?.user?.email || '');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const userId = session?.user?.id;
    console.log('Justing',session);
    
    const handleEdit = async () => {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // console.log(JSON.stringify({ email, password, userId }));

      const response = await fetch("api/users/update-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userId }),
      });

      if (response.ok) {
        alert("Profile updated successfully !");
      } else {
        alert("Failed to update profile");
      }

    };

    const handleDelete = async () => {
      const response = await fetch("api/users/update-users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        signOut();
        router.replace("/");
        console.log('good delete');
      } else {
        alert("Failed to delete account");
      }
    };

    const unConnect = async () => {
      signOut();
    }

    return (
      <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <NavBar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">
            Welcome {session?.user?.email}
          </h1>
          <h2 className="text-xl font-semibold mb-6">Manage your account here</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Type your email or set a new e-mail:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Type your password or set a new one :
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Confirm password :
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>

          <div className="mt-8">
            <Link href="/" passHref>
              <h1 className="text-blue-500 font-semibold underline">Accueil</h1>
            </Link>
          </div>

          <div className="mt-8">
            <button 
            onClick={unConnect}
            className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600">
              Déconnexion
            </button>
          </div>
        </div>
      </main>
    );
  }
