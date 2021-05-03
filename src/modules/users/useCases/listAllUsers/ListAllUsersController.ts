import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

interface IRequest{
  user_id: string;
}

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    let { user_id } = request.headers;
    
    try {

      user_id = user_id as string;

      const users = this.listAllUsersUseCase.execute({user_id});

      const usersArray = [];

      users.map((user)=> usersArray.push(user));

      return response.status(200).json(usersArray);
      
    } catch (error) {

      return response.status(400).json({error: "You need to be an administrator to list all users."})
      
    }
    
    
  }
}

export { ListAllUsersController };
