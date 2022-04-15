import { randomUUID } from 'crypto';

export interface params {
  clientId: string;
  initiationUrl: string;
  redirectUrl?: string;
}

export const createPresentationRequestUrl = (params: params): URL => {
  const trackingId = randomUUID();
  const { clientId, initiationUrl, redirectUrl } = params;

  const url = new URL('https://link.global.id');
  url.searchParams.append('app_uuid', clientId);
  const proofRequestUrl = new URL(initiationUrl);
  proofRequestUrl.searchParams.append('tracking_id', trackingId);
  url.searchParams.append('proof_request_url', proofRequestUrl.toString());
  if (redirectUrl !== undefined) {
    const redirect = new URL(redirectUrl);
    redirect.searchParams.append('tracking_id', trackingId);
    url.searchParams.append('redirect_url', redirect.toString());
  }
  return url;
};
