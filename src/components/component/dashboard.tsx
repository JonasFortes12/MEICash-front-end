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
import authProvider from "@/service/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { BsXSquareFill } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import userService from "@/service/UserService";

function Transactions() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("");
  const [trans, setTrans] = useState<Transaction[]>([]);
  const [auxTrans, setAuxTrans] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState({ companyName: "", username: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTrans, setSelectedTrans] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function checkAuth() {
      if (!authProvider.checkAuth()) {
        return navigate("/login");
      }
    }
    async function getUser() {
      try {
        const resp = await userService.getUser();
        setUser(resp);
      } catch (error) {
        console.log(error);
      }
    }
    async function getAllTransactions() {
      try {
        const resp = await transactionsService.getAll();
        setTrans(resp);
        setAuxTrans(resp);
      } catch (error) {
        console.log(error);
      }
    }
    checkAuth();
    getUser();
    getAllCategories();
    getAllTransactions();
  }, []);

  async function getAllCategories() {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    authProvider.logout();

    return navigate("/login");
  }

  async function handleSubmitTransaction(e: FormEvent) {
    e.preventDefault();

    const newTrans = {
      title: title,
      timestamp: new Date(),
      type: selectedType,
      value: value,
      description: desc,
    };

    const id = selectedCategory;

    try {
      const resp = await transactionsService.addTransaction(newTrans, id);

      if (resp.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitCategory(e: FormEvent) {
    e.preventDefault();

    const newCategory = {
      name: categoryName,
      color: color,
    };

    try {
      const resp = await categoryService.addCategory(newCategory);

      if (resp.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmitSearch(e: FormEvent) {
    e.preventDefault();

    if (!search) {
      return setTrans(auxTrans)
    }

    const data = transactionsService.searchTransaction(search, auxTrans);

    if (data) {
      return setTrans(data);
    }

    return setTrans(auxTrans);
  }

  async function handleSubmitDelete(e: FormEvent) {
    e.preventDefault();

    const id = selectedTrans;

    try {
      const resp = await transactionsService.deleteTransaction(id);

      if (resp.ok) {
        const data = await transactionsService.getAll();
        setTrans(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row overflow-x-auto">
      {/* Sidebar */}
      <div className="md:min-h-screen min-h-64 md:w-1/5 flex flex-col bg-stone-800">
        <div className="text-center p-6 pb-1">
          <a className="text-gray-200 text-3xl font-bold cursor-pointer">
            Mei<span className="text-yellow-400">Cash</span>
          </a>
        </div>
        <div className="text-center p-7 pt-2">
          <div className="border-b-2 border-gray-200"></div>
        </div>
        <div className="flex-grow flex flex-col">
          <ul className="list-disc text-gray-200 pl-14 justify-start text-base marker:text-yellow-400 tracking-widest">
            <li className="cursor-pointer hover:text-yellow-400 duration-500">
              <a href="/">Histórico de transações</a>
            </li>
          </ul>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="w-full md:w-4/5 min-h-screen space-y-4 text-center p-4 md:p-7 overflow-hidden">
        <div className="border-b-2 border-gray-200 flex flex-col md:flex-row justify-between overflow-hidden pt-3">
          <div className="text-start font-bold text-2xl text-stone-700">
            <h1>
              Bem-vindo,{" "}
              <span className="text-yellow-400">{user.username}</span>!
            </h1>
          </div>
          <div className="pt-2 flex space-x-5 text-stone-800">
            <DropdownMenu>
              <FaCirclePlus className="cursor-pointer hover:text-yellow-400 duration-500" />
              <FaBell className="cursor-pointer hover:text-yellow-400 duration-500" />
              <FaUser className="cursor-pointer hover:text-yellow-400 duration-500 " />
              <FaGear className="cursor-pointer hover:text-yellow-400 duration-500 " />
              <DropdownMenuTrigger className="pt-0 flex">
                <FaCaretDown className="cursor-pointer hover:text-yellow-400 duration-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer justify-between"
                >
                  <p>Sair</p>
                  <IoLogOutOutline className="text-lg" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
  
        <h1 className="text-2xl font-bold pt-2 text-stone-700">
          Histórico de Transações - {user.companyName}
        </h1>
  
        <div className="flex flex-col md:flex-row items-center justify-between">
          <form
            className="flex items-center gap-2 w-full md:w-1/2"
            onSubmit={handleSubmitSearch}
          >
            <Input
              name="id"
              placeholder="Título da transação"
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" variant={"secondary"}>
              <Search className="w-4 h-4 mr-2" />
              Filtrar Resultados
            </Button>
          </form>
          <div className="space-x-1 mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-stone-800 hover:bg-gray-800 duration-500">
                  <PlusCircle className="w-4 h-4 mr-2" />
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
                      className="col-span-2"
                      id="category"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                    />
                    <p className="flex col-span-2">
                      Escolha a cor desejada:
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </p>
                  </div>

                  <DialogFooter className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <DialogClose className="flex-1">
                      <Button variant={"outline"} className="w-full" >Cancelar</Button>
                    </DialogClose>
                    <DialogClose className="flex-1">
                      <Button type="submit" className="w-full">Registrar</Button>
                    </DialogClose>
                  </DialogFooter>

                </form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-stone-800">
                  <PlusCircle className="w-4 h-4 mr-2" />
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
                <form className="space-y-6" onSubmit={handleSubmitTransaction}>
                  <div className="grid grid-cols-2 items-center text-left gap-3">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      className="col-span-2"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center text-left gap-3">
                    <Label htmlFor="value">Valor</Label>
                    <Input
                      type="number"
                      className="col-span-2"
                      id="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center text-left gap-3">
                    <Label htmlFor="desc">Descrição da transação</Label>
                    <Input
                      className="col-span-2"
                      id="desc"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center text-left gap-3">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={(value) => {
                        setSelectedCategory(value);
                      }}
                      required
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categorias cadastradas</SelectLabel>
                          {categories.length === 0 ? (
                            <p>Sem categorias cadastradas!</p>
                          ) : (
                            categories.map((data, index) => (
                              <SelectItem key={index} value={data.id}>
                                {data.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 items-center text-left gap-3">
                    <Label htmlFor="category">Tipo de Transação</Label>
                    <Select
                      value={selectedType}
                      onValueChange={(value) => {
                        setSelectedType(value);
                      }}
                      required
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos de transações</SelectLabel>
                          <SelectItem value="INCOME">RENDA</SelectItem>
                          <SelectItem value="EXPENSE">DESPESA</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <DialogClose className="flex-1">
                      <Button variant={"outline"} className="w-full" >Cancelar</Button>
                    </DialogClose>
                    <DialogClose className="flex-1">
                      <Button type="submit" className="w-full">Registrar</Button>
                    </DialogClose>
                  </DialogFooter>


                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-3">
          {trans.length == 0 ? (
            <div className="text-start">
              <p>Sem transações cadastradas!</p>
            </div>
          ) : (
            trans.map((data, index) => (
              <Card key={index} className="justify-items-start">
                <CardContent>
                  <CardHeader className="grid justify-items-start">
                    <CardTitle className="w-full font-bold text-2xl text-stone-700 flex justify-between">
                      <div>{data.title}</div>
                      <form
                        onClick={() => setSelectedTrans(data.id)}
                        onSubmit={handleSubmitDelete}
                        className="pt-2 text-lg"
                      >
                        <button type="submit">
                          <BsXSquareFill className="cursor-pointer" />
                        </button>
                      </form>
                    </CardTitle>
                    <CardDescription>
                      Valor da transação: R${data.value}
                    </CardDescription>
                    <div className="pt-3 text-start">
                      <p>
                        <span className="font-bold">Descrição:</span>{" "}
                        {data.description}
                      </p>
                    </div>
                    <div className="pt-3 text-start">
                      <p>
                        <span className="font-bold">Tipo de transação: </span>
                        {data.type == 'INCOME'? 'RENDA' : 'DESPESA'}
                      </p>
                    </div>
                  </CardHeader>
                </CardContent>
                <CardFooter className="h-max space-x-1 justify-end font-bold pl-10">
                  <div
                    className="w-full md:w-1/3 border rounded-lg p-1 text-white border-none cursor-pointer"
                    style={{ backgroundColor: data.categoryColor }}
                  >
                    {data.categoryName}
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
  
    
}

export default Transactions;
