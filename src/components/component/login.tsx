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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(email, password)
  }

  return (
    <div className="h-dvh w-dvh content-center">
      <Card className="m-auto h-fit w-1/4">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-center font-bold text-2xl">
              Login
            </CardTitle>
            <CardDescription>
              Se já possui uma conta, entre para utilizar todos os recursos do
              nosso sistema!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
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
                <Checkbox id="check" name="check" />
                <label className="pl-1" htmlFor="check">
                  Lembrar
                </label>
              </div>

              <div className="flex pl-1  underline underline-offset-2">
                <a href="/register">
                  {" "}
                  Para se cadastrar
                  <span className="font-bold"> clique aqui</span>
                </a>
              </div>
            </div>

            <div className="mt-5">
              <Button type='submit' className="font-bold text-base">Entrar </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
