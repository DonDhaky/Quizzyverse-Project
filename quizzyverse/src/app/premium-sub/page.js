"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useSession } from "next-auth/react";

// import axios from "axios";
// import { loadStripe } from '@stripe/stripe-js';

// utiliser 4242 4242 4242 4242 pour tester le paiement, avec n'importe quel CVC et une date valide

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

export default function PaymentPage() {
  
  // const handleCheckout = async () => {
  //   try {
  //     const { data } = await axios.post('/api/create-checkout-session');
  //     const stripe = await stripePromise;
  //     stripe.redirectToCheckout({ sessionId: data.id });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    window.location.href = "/";
    return null;
  }
  
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
    } 
  }, [session]);
  console.log(session); // session en cours
  console.log(email); // email de la session en cours

  const putPremium = async () => {
    try {
      const response = await fetch('/api/get-premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('User is now premium !', data);
      } else {
        console.error('1 : Failed to update user to premium (page.js) :', data.error);
      }
    } catch (error) {
      console.error('Fetch failed : ', error);
    }
  };

    return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <NavBar />
        <div>
          <script async
                  src="https://js.stripe.com/v3/buy-button.js">
          </script>
          
           <stripe-buy-button
             buy-button-id="buy_btn_1PNtj1C4cFi9tQG7kG9yTJEh"
             publishable-key="pk_test_51PNtWxC4cFi9tQG7OGKsW5psT3Sa76IFgvYCTW2YttovZi2wI3ITjnRwSfW7TsKkQTepqVbbdCvI0pKtHBgx6Ltf00uifcqBdI"
           >
           </stripe-buy-button>
           <button onClick={putPremium}>Get Premium</button>
        </div>

    </div>
    )

  }