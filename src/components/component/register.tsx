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
import { useNavigate } from 'react-router-dom';

import User from "@/interfaces/User";
import userService from "@/service/UserService";
import authProvider from "@/service/AuthProvider";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function Register() {
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const handleCheck = () => setCheck(!check);
  const navigate = useNavigate();

  useEffect(() => {
    function checkAuth() {
      if (authProvider.checkAuth()){
        return navigate('/')
      }
    }
    checkAuth();
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const user: User = {
      email,
      username,
      password,
      firstName,
      lastName,
      companyName,
    };

    try {
      const resp = await userService.createUser(user);
      console.log(resp.status)

      
      if (resp.status == 200){
        console.log('oi')
        return navigate('/')
      }

      navigate('/register')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-fit w-full flex justify-center items-center bg-gray-200 p-4 sm:p-6 md:p-8">
      <Card className="my-10 mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border-none bg-neutral-700 drop-shadow-2xl rounded-sm p-6 sm:p-8 md:p-10 lg:p-12 shadow-stone-400 shadow-[7px_7px_6px_0_rgba(0,0,0,0.1)]">
        <div className="text-3xl w-fit">
          <a href="/login" className="cursor-pointer text-gray-200 hover:text-yellow-400">
            <BsFillArrowLeftCircleFill />
          </a>
        </div>
        <form onSubmit={handleSubmit} autoComplete="Off" className="pt-0">
          <CardHeader>
            <CardTitle className="text-center font-bold text-2xl text-yellow-400">
              Cadastro
            </CardTitle>
            <CardDescription className="text-gray-200 text-center">
              Cadastre-se para utilizar todos os recursos do nosso sistema!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="companyName">Nome da empresa</Label>
                <Input
                className="bg-gray-200 text-stone-950"
                  autoComplete="off"
                  type="text"
                  id="companyName"
                  placeholder="Empresa do Evanildo"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="firstName">Primeiro nome</Label>
                <Input
                className="bg-gray-200 text-stone-950"
                autoComplete="off"
                  type="text"
                  id="firstName"
                  placeholder="Evanildo"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="lastName">Último nome</Label>
                <Input
                className="bg-gray-200 text-stone-950"
                autoComplete="off"
                  type="text"
                  id="lastName"
                  placeholder="Batista"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                className="bg-gray-200 text-stone-950"
                autoComplete="off"
                  type="text"
                  id="username"
                  placeholder="Evanildo Batista"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="email">Email</Label>
                <Input
                className="bg-gray-200 text-stone-950"
                autoComplete="off"
                  type="email"
                  id="email"
                  placeholder="exemplo@outlook.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 text-gray-200">
                <Label htmlFor="password">Senha</Label>
                <Input
                className="bg-gray-200 text-stone-950"
                autoComplete="off"
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
                  <span className="text-sm font-bold cursor-pointer hover:text-yellow-400 duration-500 underline hover:decoration-yellow-400">Não consigo me cadastrar</span>
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col ">

          <div className="mt-2 mb-2 w-full ">
              <Button type="submit" className="w-full font-bold text-base bg-stone-800 text-yellow-400 hover:bg-stone-700">
                Cadastrar{" "}
              </Button> 
            </div>
            <div className="w-full">
              <a href="/login" className="text-sm font-bold underline decoration-solid justify-start text-gray-200 ">Já possui uma conta? <span className="cursor-pointer hover:text-yellow-400 duration-500 underline hover:decoration-yellow-400">Entre aqui</span></a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;
