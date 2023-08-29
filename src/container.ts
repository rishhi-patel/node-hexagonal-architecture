import { createContainer, asClass } from "awilix"
import { scopePerRequest } from "awilix-express"
import { Application } from "express"
import TodoRepository from "./adapters/repositories/TodoRepository"

export const loadContainer = (app: Application) => {
  const Container = createContainer({
    injectionMode: "CLASSIC",
  })
  Container.register({
    todoService: asClass(TodoRepository).scoped(),
  })
  app.use(scopePerRequest(Container))
}
