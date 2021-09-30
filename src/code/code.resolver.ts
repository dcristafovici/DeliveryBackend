import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddCodeInput } from './code.dto';
import { Code } from './code.entity';
import { CodeService } from './code.service';

@Resolver(() => Code)
export class CodeResolver {
  constructor(private codeService: CodeService) {}

  @Mutation(() => Boolean)
  async sendPhoneAndGetStatus(@Args('phone') phone: string): Promise<boolean> {
    return await this.codeService.sendPhoneAndGetStatus(phone);
  }

  @Mutation(() => Boolean)
  async checkCode(@Args('data') data: AddCodeInput): Promise<boolean> {
    return await this.codeService.checkCode(data);
  }
}
