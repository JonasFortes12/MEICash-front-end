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
import { useNavigate } from "react-router-dom";

import User from "@/interfaces/User";
import userService from "@/service/UserService";
import authProvider from "@/service/AuthProvider";

import {
  BsFillArrowLeftCircleFill,
  BsFillInfoSquareFill,
} from "react-icons/bs";
import toast from "react-hot-toast";

function Register() {
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });

  const handleCheck = () => setCheck(!check);
  const navigate = useNavigate();

  useEffect(() => {
    function checkAuth() {
      if (authProvider.checkAuth()) {
        return navigate("/");
      }
    }
    checkAuth();
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    // Example: password must be at least 8 characters long
    return password.length >= 8;
  };

  const validateFields = () => {
    let valid = true;
    let errors = {
      companyName: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    };

    if (!companyName) {
      errors.companyName = "Nome da empresa é obrigatório";
      valid = false;
    }
    if (!firstName) {
      errors.firstName = "Primeiro nome é obrigatório";
      valid = false;
    }
    if (!lastName) {
      errors.lastName = "Último nome é obrigatório";
      valid = false;
    }
    if (!username) {
      errors.username = "Nome de usuário é obrigatório";
      valid = false;
    }
    if (!email) {
      errors.email = "Email é obrigatório";
      valid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Email inválido";
      valid = false;
    }
    if (!password) {
      errors.password = "Senha é obrigatória";
      valid = false;
    } else if (!validatePassword(password)) {
      errors.password = "Senha deve ter pelo menos 8 caracteres";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

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
      console.log(resp.status);

      if (resp.status == 200) {
        toast("Cadastro realizado com sucesso!", {
          icon: <BsFillInfoSquareFill className="text-green-400" />,
          style: {
            background: "#292524",
            color: "#e5e7eb",
          },
        });
        return navigate("/");
      }

      if (resp.status == 400) {
        toast("Usuário ou email já cadastrado!", {
          icon: <BsFillInfoSquareFill className="text-red-400" />,
          style: {
            background: "#292524",
            color: "#e5e7eb",
          },
        });
      }

      toast("Erro ao realizar o cadastro!", {
        icon: <BsFillInfoSquareFill className="text-red-400" />,
        style: {
          background: "#292524",
          color: "#e5e7eb",
        },
      });

      return navigate("/register");
    } catch (error) {
      toast("Erro ao realizar o cadastro!", {
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
    <div className="h-fit w-full flex justify-center items-center bg-gray-200 p-4 sm:p-6 md:p-8">
      <Card className="h-fit my-10 mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border-none bg-neutral-700 drop-shadow-2xl rounded-sm p-6 sm:p-8 md:p-10 lg:p-12 shadow-stone-400 shadow-[7px_7px_6px_0_rgba(0,0,0,0.1)]">
        <div className="text-3xl w-fit">
          <a
            href="/login"
            className="cursor-pointer text-gray-200 hover:text-yellow-400"
          >
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
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
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
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
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
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
                    Não consigo me cadastrar
                  </span>
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col ">
            <div className="mt-2 mb-2 w-full ">
              <Button
                type="submit"
                className="w-full font-bold text-base bg-stone-800 text-yellow-400 hover:bg-stone-700"
              >
                Cadastrar{" "}
              </Button>
            </div>
            <div className="w-full">
              <a
                href="/login"
                className="text-sm font-bold underline decoration-solid justify-start text-gray-200 "
              >
                Já possui uma conta?{" "}
                <span className="cursor-pointer hover:text-yellow-400 duration-500 underline hover:decoration-yellow-400">
                  Entre aqui
                </span>
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;
