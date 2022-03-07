import { GidApiClientFactory } from '@globalid/api-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NonceService } from './nonce.service';
import { UserData } from './verifications.interface';

@Injectable()
export class VerificationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly gidApiClientFactory: GidApiClientFactory,
    private readonly nonceService: NonceService
  ) {}

  makeConnectUrl(): string {
    const value = this.configService.get<string>('CONNECT_URL');
    const url = new URL(value);
    if (url.searchParams.get('scope') === 'openid') {
      const nonce: string = this.nonceService.generate();
      url.searchParams.set('nonce', `${nonce}`);
    }
    return url.toString();
  }

  async connect(code: string): Promise<UserData> {
    const client = await this.gidApiClientFactory.create(code);
    return {
      attestations: await client.attestations.get(),
      identity: await client.identity.get(),
      pii: await client.pii?.get()
    };
  }
}
