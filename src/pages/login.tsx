import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

// import { useAuth } from "@/lib/hooks/useAuth";

const Login = () => {
  //   const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // await login();
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh]">
      <h3 className="mb-4">Login page</h3>
      <Button>Login</Button>
    </div>
  );
};

export default Login;
