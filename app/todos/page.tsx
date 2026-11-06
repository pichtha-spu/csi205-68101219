"use client";
import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import { useState, useEffect } from "react";
import { Button } from "@/components/tailgrids/core/button";

import { fetchTodos } from "@/data/todos";
import type { TodoType } from "@/data/todos";
import { Plus } from "@tailgrids/icons";
import { ClockThree } from "@tailgrids/icons";
import { Check } from "@tailgrids/icons";
import { Trash1 } from "@tailgrids/icons";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { TextField } from "@/components/tailgrids/core/text-field";

export default function Page() {
  //states
  const [loading, setLoading] = useState(true);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [onlyWaiting, setOnlyWaiting] = useState<boolean>(false);
  const todos = onlyWaiting
    ? todosRaw.filter((todo) => !todo.completed)
    : todosRaw;

  const [itemsPerpage, setItemsPerpage] = useState<number>(5);
  const totalPages = Math.ceil(todos.length / itemsPerpage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const displayedPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1),
  );

  useEffect(() => {
    let cancelled = false;

    const restoreTodos = async () => {
      try {
        const todoRawStr = localStorage.getItem("todoRaw");
        if (todoRawStr) {
          try {
            const savedTodos: unknown = JSON.parse(todoRawStr);
            if (Array.isArray(savedTodos) && savedTodos.length > 0) {
              if (!cancelled) setTodosRaw(savedTodos as TodoType[]);
              return;
            }
          } catch (error) {
            console.warn(
              "Could not restore saved todos; loading mock data.",
              error,
            );
          }
        }

        const mockTodos = (await fetchTodos()) as TodoType[];
        if (!cancelled) setTodosRaw(mockTodos);
      } catch (error) {
        console.error("Could not load mock todos.", error);
        if (!cancelled) setTodosRaw([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void restoreTodos();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("todoRaw", JSON.stringify(todosRaw));
    }
  }, [loading, todosRaw]);

  // onload => [once] => todoRaw
  /* useEffect(() => {
    fetchTodos()
      .then((data) => {
        setTodosRaw(data as TodoType[]);
      })
      .catch(() => setTodosRaw([]))
      .finally(() => setLoading(false));
  }, []); */

  //delete
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  //make done
  const makeDone = (id: number) => {
    setTodosRaw((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  // add todo
  const addTodo = () => {
    const titleInput = document.getElementById("title");
    if (!(titleInput instanceof HTMLInputElement)) return;

    // validate
    const title = titleInput.value.trim();
    if (!title) return;

    const nextTodos = [
      ...todosRaw,
      {
        userId: 1,
        id: todosRaw.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
        title,
        completed: false,
      },
    ];

    setTodosRaw(nextTodos);
    const visibleTodoCount = onlyWaiting
      ? nextTodos.filter((todo) => !todo.completed).length
      : nextTodos.length;
    setCurrentPage(Math.ceil(visibleTodoCount / itemsPerpage));
    setShowDialog(false);
    titleInput.value = "";
  };

  return (
    <>
      {/* todos container */}
      <div className="w-[600px] mx-auto mt-4">
        {/* controller */}
        <div className="flex items-center justify-between">
          {/* toggle */}
          <div className="flex items-center gap-2">
            <Toggle
              label="Show only"
              checked={onlyWaiting}
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />

            <Button
              size="sm"
              className="!bg-yellow-500 !text-white hover:!bg-yellow-600"
              disabled
            >
              waiting
              <ClockThree />
            </Button>
          </div>
          {/* dropdown */}
          <div className="w-1/3">
            <NativeSelect
              value={itemsPerpage}
              onChange={(e) => setItemsPerpage(Number(e.target.value))}
            >
              <NativeSelectOption value="5">
                5 items per page
              </NativeSelectOption>
              <NativeSelectOption value="10">
                10 items per page
              </NativeSelectOption>
              <NativeSelectOption value="50">
                50 items per page
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
        {/* table */}
        <div className="mt-2">
          <TableRoot>
            <TableHeader>
              <TableRow className="bg-black [&>th]:text-white">
                <TableHead scope="col">ID</TableHead>
                <TableHead scope="col">Title</TableHead>
                <TableHead scope="col">
                  <div className="flex items-center justify-end gap-2">
                    <span>Completed</span>
                    {/* ปุ่ม + */}
                    <Button
                      size="sm"
                      variant="primary"
                      className="h-8 w-8 p-0"
                      onClick={() => setShowDialog(true)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* show loading spinner when loading is true */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              )}

              {!loading && todos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-red-500">
                    No data
                  </TableCell>
                </TableRow>
              )}

              {/* render data */}
              {todos
                .filter((todo, index) => {
                  const lower = (currentPage - 1) * itemsPerpage;
                  const upper = currentPage * itemsPerpage - 1;
                  return index >= lower && index <= upper;
                })
                .map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="!h-8 !min-w-[40px] !justify-center !rounded-lg !bg-gray-500 !text-white !font-bold !opacity-100"
                      >
                        {todo.id}
                      </Button>
                    </TableCell>

                    <TableCell>{todo.title}</TableCell>
                    <TableCell className="flex justify-end gap-1">
                      <Button //ปุ่ม นาฬิกาแสดงสถานะการทำงานของ todo
                        size="sm"
                        className={`!h-8 !min-w-[104px] !justify-center !gap-2 !whitespace-nowrap !text-white !opacity-100 ${
                          todo.completed ? "!bg-green-600" : "!bg-yellow-500"
                        }`}
                        onClick={() => makeDone(todo.id)}
                      >
                        {todo.completed ? "done" : "waiting"}
                        {todo.completed ? <Check /> : <ClockThree />}{" "}
                      </Button>

                      <Button //ปุ่ม ถังขยะสำหรับลบ todo
                        size="sm"
                        variant="danger"
                        className="h-8 p-2"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash1 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableRoot>
        </div>
        {/* pagination */}
        {todosRaw.length > 0 && (
          <div className="mt-1 w-full mx-auto flex justify-center items-center gap-1">
            <Button
              size="sm"
              appearance="outline"
              disabled={displayedPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              First
            </Button>
            <div>
              <Pagination
                currentPage={displayedPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                sideLayout="icon"
              />
            </div>
            <Button
              size="sm"
              appearance="outline"
              disabled={displayedPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </Button>
          </div>
        )}
      </div>

      <Backdrop isOpen={showDialog} onOpenChange={setShowDialog}>
        <Dialog>
          <DialogHeader>
            <DialogTitle className="flex item-center gap-2 text-2xl">
              <Plus className="bg-blue-100 rounded-md" size={32} />
              New todo
            </DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">ID (Auto)</Label>
                <Input
                  className="w-full pointer-event-none bg-gray-100 text-gray-400"
                  value={
                    todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1
                  }
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">Title</Label>
                <Input
                  autoFocus
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full"
                  id="title"
                />
              </TextField>
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose appearance="outline">Cancel</DialogClose>
            <DialogClose onClick={() => addTodo()}>Add todo</DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
    </>
  );
}
