import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroesQuery } from '../impl';
import { Hero, GetHeroRequest, GetHeroResponse} from 'server1/interfaces/hero.interface';


@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroesQuery> {
  constructor(private readonly repository: HeroRepository) {}
  private readonly heros: Hero[] = [{ name: 'produce101', id: 1, ranking: 1 }, { name: 'queendom', id: 2, ranking: -1000 }];
  // async execute(query: GetHeroesQuery) {
  //   console.log(clc.yellowBright('Async GetHeroesQuery...'));
  //   let data = await this.repository.findAll();
  //   return {heros: data};
  // }

  async execute(query: GetHeroesQuery) {
    // @GrpcMethod('HeroService')
    // get(data: GetHeroRequest): GetHeroResponse {
    //     console.log('server1 get invoked');
    //     return {
    //         hero: this.heros.find(({ id }) => id === data.id),
    //     };
    // }
    console.log(clc.yellowBright('Async GetHeroesQuery...!'));
    let data = await this.repository.findAll();
    console.log(data);

    let newData = { hero: this.heros[0], };
    console.log("newData");
    console.log(newData);
    return newData;
  }

}
