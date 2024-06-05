// 'use client';

// import NavBar from '../components/Navbar';
// import MySQLAdapter from '../../../lib/next-auth-mysql-adapter';
// import { useState} from 'react';
// import Link from 'next/link';
// import bcrypt from 'bcrypt';


// export const Page = async () => {
//     const users = await MySQLAdapter.getAllUsersSorted();
//     return {
//         props: {users},
//     };
// };
// const Ranking = ({users}) => {
//     return (
//         <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//         <NavBar />
//         <div className="p-8">
//           <h1 className="text-2xl font-bold mb-4">User Rankings</h1>
//           <div className="w-full max-w-2xl">
//             <table className="w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-2">Rank</th>
//                   <th className="border border-gray-300 px-4 py-2">Username</th>
//                   <th className="border border-gray-300 px-4 py-2">XP</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, index) => (
//                   <tr key={user.id}>
//                     <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
//                     <td className="border border-gray-300 px-4 py-2">{user.username}</td>
//                     <td className="border border-gray-300 px-4 py-2 text-right">{user.xp}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-8">
//             <Link href="/" passHref>
//               <h1 className="text-blue-500 font-semibold underline">Home</h1>
//             </Link>
//           </div>
//         </div>
//       </main>
//     );
// };

// export default Ranking;