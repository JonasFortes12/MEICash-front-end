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
  
  import { useEffect, useState } from "react";
  import transactionsService from "@/service/TransactionsService";
  
  import Transaction from "@/interfaces/Transaction";
  
  function Transactions() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [trans, setTrans] = useState<Transaction[]>([]);
  
    useEffect(() => {
      async function getAllTransactions() {
        try {
          const resp = await transactionsService.getAll();
          setTrans(resp.json());
        } catch (error) {
          console.log(error)
        }
      }
      getAllTransactions;
    }, []);
  
    async function handleSubmit() {
      const newTrans = {
        title,
        desc,
        value,
        category,
        color,
      };
  
      try {
        const resp = await transactionsService.addTransaction(newTrans);
  
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className=" max-w-4xl mx-auto space-y-4 text-center">
        <h1 className="text-3xl font-bold">Histórico de Transações - xxxxxxx</h1>
  
        <div className="flex items-center justify-between ">
          <form className="flex items-center gap-2">
            <Input name="id" placeholder="Id do pedido" />
            <Input name="name" placeholder="Nome do produto" />
            <Button type="submit" variant={"secondary"}>
              <Search className="w-4 h-4 mr-2 " />
              Filtrar Resultados
            </Button>
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2 " />
                Nova transação
              </Button>
            </DialogTrigger>
  
            <DialogContent className="bg-white">
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
    );
  }
  
  export default Transactions;
  