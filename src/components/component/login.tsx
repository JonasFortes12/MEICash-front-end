import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent, useEffect, useState } from "react";
import userService from "@/service/UserService";
import { useNavigate } from "react-router-dom";
import authProvider from "@/service/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { BsFillInfoSquareFill } from "react-icons/bs";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function checkAuth() {
      if (authProvider.checkAuth()) {
        return navigate("/");
      }
    }
    checkAuth();
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    try {
      const resp = await userService.login(user);

      if (resp) {
        authProvider.login(resp.token);

        toast("Login realizado com sucesso!", {
          icon: <BsFillInfoSquareFill className="text-green-400" />,
          style: {
            background: "#292524",
            color: "#e5e7eb",
          },
        });
        return navigate("/");
      }

      return
    } catch (error) {
      toast("Usuário ou senha incorretos!", {
        icon: <BsFillInfoSquareFill className="text-red-400" />,
        style: {
          background: "#292524",
          color: "#e5e7eb",
        },
      });
      console.log(error);
    }
  }

  return (
    <div className="h-dvh w-dvh flex justify-center items-center bg-gray-200 p-4 sm:p-6 md:p-8">

      <Card className="border-none w-full max-w-md bg-neutral-700 drop-shadow-2xl rounded-sm p-6 sm:p-8 md:p-12 shadow-stone-400 shadow-[7px_7px_6px_0_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-center font-bold text-2xl text-yellow-400">
              Login
            </CardTitle>
            <CardDescription className="text-gray-200 text-center">
              Se já possui uma conta, entre para utilizar todos os recursos do
              nosso sistema!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  className="bg-gray-200 text-stone-950"
                  type="text"
                  id="username"
                  placeholder="Evanildo"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="password">Senha</Label>
                <Input
                  className="bg-gray-200 text-stone-950 "
                  type="password"
                  id="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex flex-row justify-between text-gray-200 pt-2">
              <div className="flex items-center">
                <Checkbox className="bg-gray-200" id="check" name="check" />
                <label className="pl-1" htmlFor="check">
                  Lembrar-me
                </label>
              </div>

              <div className="flex pl-1">
                <a href="/">
                  <span className="text-sm font-bold cursor-pointer hover:text-yellow-400 duration-500 underline hover:decoration-yellow-400">
                    {" "}
                    Esqueci minha senha
                  </span>
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col mb-4">
            <div className="mt-2 mb-2 w-full ">
              <Button
                type="submit"
                className="w-full font-bold text-base bg-stone-800 text-yellow-400 hover:bg-stone-700"
              >
                Entrar{" "}
              </Button>
            </div>
            <div className="w-full">
              <a
                href="/register"
                className="text-sm font-bold underline decoration-solid justify-start text-gray-200 "
              >
                Ainda não possui uma conta?{" "}
                <span className="cursor-pointer hover:text-yellow-400 duration-500 underline hover:decoration-yellow-400">
                  Cadastre-se aqui
                </span>
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
