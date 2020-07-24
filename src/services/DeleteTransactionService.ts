import { getCustomRepository } from 'typeorm';
import TransactionRespository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRespository);
    const transaction = await transactionRepository.findOne({ where: id });
    if (transaction) await transactionRepository.remove(transaction);
    else throw new AppError('Transaction ID is not found...');
  }
}

export default DeleteTransactionService;
