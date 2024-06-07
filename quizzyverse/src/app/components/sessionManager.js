import { useSession } from "next-auth/react";

const sessionManager = () => {

const { data: session, status } = useSession();
const [email, setEmail] = useState('');
const [userId, setUserId] = useState('');

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
      setEmail(session.user.id);
    }
  }, [session]);
  console.log(session); // session en cours
  console.log(email); // email du user de la session en cours
  console.log(userId); // id du user de la session en cours
}

export default sessionManager;