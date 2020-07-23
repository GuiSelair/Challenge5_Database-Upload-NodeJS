import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface RequestDTO {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: RequestDTO): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const categoryExisted = await categoryRepository.findOne({
      where: { title },
    });

    if (categoryExisted) {
      return categoryExisted;
    }

    const newCategory = categoryRepository.create({ title });
    await categoryRepository.save(newCategory);
    return newCategory;
  }
}

export default CreateCategoryService;
