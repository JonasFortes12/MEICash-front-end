import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, PlusCircle } from "lucide-react";
import { DialogHeader } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { FormEvent, useEffect, useState } from "react";
import transactionsService from "@/service/TransactionsService";

import Transaction from "@/interfaces/Transaction";
import categoryService from "@/service/CategoryService";

function Transactions() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("");
  const [trans, setTrans] = useState<Transaction[]>([]);

  useEffect(() => {
    async function getAllTransactions() {
      try {
        const resp = await transactionsService.getAll();
        setTrans(resp.json());
      } catch (error) {
        console.log(error);
      }
    }
    getAllTransactions;
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newTrans = {
      title,
      desc,
      value,
      categoryName,
      color,
    };

    try {
      const resp = await transactionsService.addTransaction(newTrans);

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitCategory(e: FormEvent) {
    e.preventDefault();

    const newCategory: Category = {
      categoryName,
      color,
    };

    try {
      const resp = await categoryService.addCategory(newCategory);

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen flex">

      <div className="w-1/5 flex flex-col w-1/5 h-screen bg-stone-800 ">
        <div className="text-center p-6 pb-1">
          <a className="text-gray-200 text-3xl font-bold cursor-pointer">Mei<span className="text-yellow-400">Cash</span></a>
        </div>
        <div className="text-center p-7 pt-2">
          <div className="border-b-2 border-gray-200"></div>
        </div>
        <div className="h-full flex flex-col">
          <ul className="list-disc text-gray-200 pl-14 justify-start text-base marker:text-yellow-400 tracking-widest">
            <li className="cursor-pointer hover:text-yellow-400 duration-500"><a href="/transaction">Histórico de transações</a></li>
            <li className="cursor-default">xxxxxxxxxx</li>
            <li className="cursor-default">xxxxxxxxxx</li>
            <li className="cursor-default">xxxxxxxxxx</li>
            <li className="cursor-default">xxxxxxxxxx</li>
          </ul>
        </div>
      </div>

      <div className="w-4/5 h-screen space-y-4 text-center justify-self p-10">

        <div className="border-b-2 border-gray-200 justify-between flex">
            <div className="text-start font-bold text-2xl text-stone-700">
              <h1>Bem-vindo, <span className="text-yellow-400">xxxxxxxxxx</span>!</h1>
            </div>
            <div>
              <p>Options</p>
            </div>
        </div>

        <h1 className="text-2xl font-bold pt-2 text-stone-700">
          Histórico de Transações - xxxxxxx
        </h1>

        <div className="flex items-center justify-between ">
          <form className="flex items-center gap-2">
            <Input name="id" placeholder="Id do pedido" />
            <Input name="name" placeholder="Nome do produto" />
            <Button type="submit" variant={"secondary"}>
              <Search className="w-4 h-4 mr-2 " />
              Filtrar Resultados
            </Button>
          </form>
          <div className="space-x-1">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-stone-800">
                <PlusCircle className="w-4 h-4 mr-2 " />
                Nova categoria
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar nova categoria</DialogTitle>
                <DialogDescription>
                  Registrar uma nova categoria no sistema
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-6" onSubmit={handleSubmitCategory}>
                <div className="grid grid-cols-2 items-center text-left gap-3">
                  <Label htmlFor="category">Nome da categoria</Label>
                  <Input
                    className="col-span-4"
                    id="category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                  <p className="flex">
                    Escolha a cor desejada{" "}
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </p>
                </div>

                <DialogFooter>
                  <DialogClose>
                    <Button type="button" variant={"outline"}>
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button onClick={handleSubmit}>Registrar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-stone-800">
                <PlusCircle className="w-4 h-4 mr-2 " />
                Nova transação
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar transação</DialogTitle>
                <DialogDescription>
                  Registrar uma nova transação no sistema
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 items-center text-left gap-3">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    className="col-span-4"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center text-left gap-3">
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    type="number"
                    className="col-span-4"
                    id="value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 items-center text-left gap-3">
                  <Label htmlFor="desc">Descrição da transação</Label>
                  <Input
                    className="col-span-4"
                    id="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 items-center text-left gap-3">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    className="col-span-4"
                    id="category"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                  <p className="flex">
                    Escolha a cor desejada{" "}
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </p>
                </div>

                <DialogFooter>
                  <DialogClose>
                    <Button type="button" variant={"outline"}>
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button onClick={handleSubmit}>Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border rouded-lg p-4">
          {trans.map((data, index) => (
            <Card className="justify-items-start">
              <CardContent>
                <CardHeader className="grid justify-items-start">
                  <CardTitle className="font-bold text-2xl">
                    {data.title}
                  </CardTitle>
                  <CardDescription>
                    Valor da transação: R${data.value}
                  </CardDescription>

                  <div className="pt-3 text-start">
                    <p>{data.desc}</p>{" "}
                  </div>
                </CardHeader>

                <CardFooter className="grid grid-cols-2 gap-1 space-x-1 justify-end font-bold pb-0">
                  <div className="max-w-full border rounded-lg p-1 bg-lime-400 text-white border-none cursor-pointer">
                    {data.category}
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
