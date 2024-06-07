import { useSession } from "next-auth/react";

const userLoggedManagement = () => {

const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    window.location.href = "/login";
    return null;
  }
}

export default userLoggedManagement;