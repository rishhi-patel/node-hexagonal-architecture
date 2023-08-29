// adapters/controllers/TodoController.ts
import { Request, Response } from "express"
import { route, GET, POST, PUT, DELETE, before } from "awilix-express"
import { Types } from "mongoose"
import TodoRepository from "../repositories/TodoRepository"

class TodoController {
  constructor(private readonly todoService: TodoRepository) {}

  // /todos
  @route("/todos")
  @POST()
  async createTodo(req: Request, res: Response): Promise<void> {
    const { title, completed } = req.body
    await this.todoService.create({ title, completed })
    res.status(201).send()
  }

  // /tods/:id
  @route("/:id")
  @GET()
  // adds middlwares
  // @before([authenticate()])
  async getTodoById(req: Request, res: Response): Promise<void> {
    const todoId = new Types.ObjectId(req.params.id)
    const todo = await this.todoService.getById(todoId)
    res.json(todo)
  }

  @PUT()
  async updateTodo(req: Request, res: Response): Promise<void> {
    const todoId = new Types.ObjectId(req.params.id)
    const { title, completed } = req.body
    const todo = await this.todoService.update(todoId, {
      title,
      completed,
    })

    res.json(todo)
  }

  @DELETE()
  async deleteTodo(req: Request, res: Response): Promise<void> {
    const todoId = new Types.ObjectId(req.params.id)
    await this.todoService.delete(todoId)

    res.status(204).send(todoId)
  }
}

export default TodoController
