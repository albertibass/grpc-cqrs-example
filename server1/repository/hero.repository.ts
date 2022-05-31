import { Injectable } from '@nestjs/common';
import { Hero } from '../models/hero.model';
import { userHero, userHero1, userHero2, userHero3 } from './fixtures/user';

@Injectable()
export class HeroRepository {
  async findOneById(id: number): Promise<Hero> {
    return userHero;
  }

  async findAll(): Promise<Hero[]> {
    return [userHero, userHero1, userHero2, userHero3];
  }
}
