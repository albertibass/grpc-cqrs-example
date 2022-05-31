import { AggregateRoot } from '@nestjs/cqrs';
import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event';
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event';
import { HeroRepository } from '../repository/hero.repository';

export class Hero extends AggregateRoot {
  constructor(private readonly id: string, private name: string) {
    super();
  }

  killEnemy(enemyId: string) {
    // logic
    this.apply(new HeroKilledDragonEvent(this.id, enemyId));
    console.log(this.name);
  }

  addItem(itemId: string) {
    // logic
    this.apply(new HeroFoundItemEvent(this.id, itemId));
  }

  // modify name of school
  modifyName() {
    // this.apply(new Hero('newname', schoolId)); 
    this.name = "newname";
    // how toupdate repository?

  }
}
