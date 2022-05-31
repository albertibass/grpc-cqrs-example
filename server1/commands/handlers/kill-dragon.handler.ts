import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroRepository } from '../../repository/hero.repository';
import { KillDragonCommand } from '../impl/kill-dragon.command';
import { Hero, GetHeroRequest, GetHeroResponse} from 'server1/interfaces/hero.interface';

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  private heros: Hero[] = [{ name: 'queendom', id: 1, ranking: 1 }, { name: 'produce101', id: 2, ranking: -1000 }];

  async execute(command: KillDragonCommand) {
    console.log(clc.greenBright('KillDragonCommand...'));

    const { heroId, dragonId } = command;

    this.heros[0].name = heroId;
    this.heros[1].name = dragonId;
    let data = { heros: this.heros }
    return data;
  }
}
