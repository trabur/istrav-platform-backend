import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import * as secureSession from 'fastify-secure-session'
import { CaslAbilityFactory } from './abilities/admin.ability'
import { Action } from './abilities/action.enum'

import { Admin } from './entities/admin.entity';
import getAccountFromHeader from '../getAccountFromHeader';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.CREATE, Admin)) {
      return this.adminsService.create(createAdminDto);
    } else {
      return {}
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);
    
    if (ability.can(Action.FIND_ALL, Admin)) {
      return this.adminsService.findAll();
    } else {
      return {}
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.FIND_ONE, Admin)) {
      return this.adminsService.findOne(id);
    } else {
      return {}
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.UPDATE, Admin)) {
      updateAdminDto.id = id
      return this.adminsService.update(updateAdminDto);
    } else {
      return {}
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    let account = getAccountFromHeader(req)
    const ability = this.caslAbilityFactory.createForUser(account);

    if (ability.can(Action.REMOVE, Admin)) {
      return this.adminsService.remove(id);
    } else {
      return {}
    }
  }
}
