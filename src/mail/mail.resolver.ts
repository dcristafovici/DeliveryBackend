import { Resolver, Query, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';

@Resolver(() => Boolean)
export class MailResolver {
  constructor(private mailService: MailService) {}

  @Query(() => Boolean)
  async sendSimpleText(): Promise<boolean> {
    return this.mailService.sendSimpleText();
  }
}
