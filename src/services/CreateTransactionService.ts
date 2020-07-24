import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    if (type === 'outcome') {
      const { total } = await transactionRepository.getBalance();
      if (value > total) {
        throw new AppError('Balance not available...');
      }
    }

    const createCategory = new CreateCategoryService();
    const transactionCategory = await createCategory.execute({
      title: category,
    });

    const newTransaction = transactionRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });
    await transactionRepository.save(newTransaction);
    return newTransaction;
  }
}

export default CreateTransactionService;
