import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Action } from './action.enum';

import { Website } from '../entities/website.entity'
import { Account } from '../../accounts/entities/account.entity'

type Subjects = InferSubjects<typeof Account | typeof Website> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(account: Account) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (account.admin) {
      can(Action.UPDATE, Website, { tenantId: account.admin.id });
      can(Action.REMOVE, Website, { tenantId: account.admin.id });
    }
    
    can(Action.CREATE, Website);
    can(Action.FIND_ALL, Website);
    can(Action.FIND_ONE, Website);
    can(Action.UPDATE, Website);
    can(Action.REMOVE, Website);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
