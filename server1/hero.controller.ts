import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetHeroRequest, GetHeroResponse, Hero, ListHeroResponse } from './interfaces/hero.interface';
// added
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetHeroesQuery} from './queries/impl';
import { CqrsModule } from '@nestjs/cqrs';
import { KillDragonCommand } from './commands/impl/kill-dragon.command';


@Controller()
export class HeroController {
    
    private readonly heros: Hero[] = [{ id: 123, name: 'Stanford', ranking: 3}, { id: 223, name: 'Berkeley', ranking: 4}];
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @GrpcMethod('HeroService')
    // get(data: GetHeroRequest): GetHeroResponse {
    //     console.log('server1 get invoked');
    //     return {
    //         hero: this.heros.find(({ id }) => id === data.id),
    //     };
    // }
    async get(id: number): Promise<Hero[]> {
        console.log("Running CQRS GET for query GET");
        //Using modified existing query from src/heroes/commands
        let data = await this.queryBus.execute(new GetHeroesQuery());
        console.log("Finished CQRS GET");
        console.log(data);
        return data;
      }
      


    // @GrpcMethod('HeroService')
    // async list(): Promise<ListHeroResponse> {
    //     console.log('server1 list invoked');
    //     return await this.queryBus.execute(new GetHeroesQuery());
    // }

    @GrpcMethod('HeroService')
    async list(): Promise<ListHeroResponse> {
      console.log("Running CQRS POST for command LIST()");
      //Using modified existing command from src/heroes/commands
      let data = await this.commandBus.execute(new KillDragonCommand('wjsn', 'kepler'));
      console.log("Finished CQRS POST");
      console.log(data);
      return data;
    }
    
}
