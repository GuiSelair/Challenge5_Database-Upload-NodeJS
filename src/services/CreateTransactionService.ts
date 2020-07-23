// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import CreateCategoryService from './CreateCategoryService';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_title: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_title,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);

    const createCategory = new CreateCategoryService();
    const { id } = await createCategory.execute({
      title: category_title,
    });

    const newTransaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: id,
    });
    await transactionRepository.save(newTransaction);
    return newTransaction;
  }
}

export default CreateTransactionService;
