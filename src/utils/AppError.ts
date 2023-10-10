// Padronizando as exceções que são tratadas dentro da aplicação

export class AppError {
  message: string;

  constructor(message: string){
    this.message = message
  }
}