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
import { FormEvent, useState } from "react";

function Register() {
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const handleCheck = () => setCheck(!check);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(name, email, password, check);
  }

  return (
    <div className="h-dvh w-dvh content-center">
      <Card className="m-auto h-fit w-1/3">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-center font-bold text-2xl">
              Cadastro
            </CardTitle>
            <CardDescription>
              Cadastre-se para utilizar todos os recursos do nosso sistema!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome da empresa</Label>
                <Input
                  type="text"
                  id="companyName"
                  placeholder="Empresa do Evanildo"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Primeiro nome</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Evanildo"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Último nome</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Batista"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome de usuário</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Evanildo Batista"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="exemplo@outlook.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col ">
            <div className="w-full flex flex-row justify-between">
              <div className="flex items-center">
                <Checkbox id="check" name="check" onClick={handleCheck} />
                <label className="pl-1" htmlFor="check">
                  Lembrar
                </label>
              </div>

              <div className="flex pl-1  underline underline-offset-2">
                <a href="/login">
                  Já registrado?
                  <span className="font-bold"> Clique aqui</span>
                </a>
              </div>
            </div>

            <div className="mt-5">
              <Button type="submit" className="font-bold text-base">
                Cadastrar
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;
