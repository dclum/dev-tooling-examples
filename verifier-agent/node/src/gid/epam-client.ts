import { AuthClient } from './auth-client';
import axios from './axios';
import { CreatePresentationRequestDto, PresentationRequestResponseDto } from './create-presentation-request-dto';

export class EpamClient {
  constructor(private readonly authClient: AuthClient) {}

  async createPresentationRequest(createPresentationRequestDto: CreatePresentationRequestDto): Promise<PresentationRequestResponseDto> {
    const accessToken = await this.authClient.getAppAccessToken();
    const response = await axios.post<PresentationRequestResponseDto>(
      '/v2/aries/management/external-party/proof-requests',
      createPresentationRequestDto,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    return response.data;
  }

  async getPublicKey(): Promise<string> {
    const response = await axios.get<PublicKeyResponse>('/v2/aries/management/external-party/public-key');
    return response.data.public_key;
  }
}

interface PublicKeyResponse {
  public_key: string;
}
