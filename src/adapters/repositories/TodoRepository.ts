// adapters/repositories/TodoRepository.ts
import mongoose, { Types } from "mongoose"

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
})

const TodoModel = mongoose.model("Todo", todoSchema)

class TodoRepository {
  async create(todoData: any): Promise<any> {
    const newTodo = new TodoModel(todoData)
    await newTodo.save()
    return newTodo.toObject()
  }

  async getById(todoId: Types.ObjectId): Promise<any> {
    return TodoModel.findById(todoId).lean()
  }

  async update(todoId: Types.ObjectId, todoData: any): Promise<any> {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      { $set: todoData },
      { new: true }
    ).lean()
    return updatedTodo
  }

  async delete(todoId: Types.ObjectId): Promise<boolean> {
    const result = await TodoModel.findByIdAndDelete(todoId)
    return result !== null
  }
}

export default TodoRepository
