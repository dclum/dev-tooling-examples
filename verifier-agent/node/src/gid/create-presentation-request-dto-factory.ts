import { PresentationRequirementsFactory } from '../presentationRequest/presentation-requirements-factory';
import { CreateProofRequestDto } from './create-presentation-request-dto';

export class CreatePresentationRequestDtoFactory {
  constructor(private readonly presentationRequirementsFactory: PresentationRequirementsFactory) {}
  create(trackingId: string, webhookUrl: string): CreateProofRequestDto {
    return (<CreateProofRequestDto>{
      presentationRequirements: this.presentationRequirementsFactory.create(),
      webhookUrl: webhookUrl,
      trackingId: trackingId
    }) as CreateProofRequestDto;
  }
}
