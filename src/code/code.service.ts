import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCodeInput } from './code.dto';
import { Code } from './code.entity';
import axios from 'axios';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private CodeRepository: Repository<Code>,
  ) {}

  async sendPhoneAndGetStatus(phone: string): Promise<boolean> {
    const code = Math.floor(1000 + Math.random() * 9000);
    await axios
      .post(
        `https://sms.ru/sms/send?api_id=92A71F47-3172-BFCB-208C-9C025611EC78&to=${phone}&msg=${code}&json=1`,
      )
      .then(async ({ data }) => {
        if (data.status_code === 100) {
          await this.CodeRepository.save({ code, phone });
          return true;
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });

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

    if (!check) {
      throw new HttpException('Code is wrong. Try again', 403);
    }

    return check;
  }
}
