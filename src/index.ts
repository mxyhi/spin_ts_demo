import { HandleRequest, HttpRequest, HttpResponse } from '@fermyon/spin-sdk';
import './modules/index';
import { router } from './router';
import './plugins/index';

export const handleRequest: HandleRequest = async function (
  request: HttpRequest
): Promise<HttpResponse> {
  const response = {};
  return await router.handleRequest(request, response);
};
