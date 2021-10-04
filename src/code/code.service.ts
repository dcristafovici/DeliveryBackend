import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCodeInput } from './code.dto';
import { Code } from './code.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private CodeRepository: Repository<Code>,
  ) {}

  async sendPhoneAndGetStatus(phone: string): Promise<boolean> {
    const code = Math.floor(1000 + Math.random() * 9000);
    await this.CodeRepository.save({ code, phone });
    return true;
  }

  async checkCode(data: AddCodeInput): Promise<boolean> {
    const { phone, code } = data;
    const item = await this.CodeRepository.findOne({
      where: { phone },
      order: { created_at: 'DESC' },
    });
    const check = item.code === code;
    return check ? true : false;
  }
}
