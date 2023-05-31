import { router } from '../router';
import { encoder } from '../utils/encoder';

export default router.all('*', () => {
  return {
    status: 404,
    body: encoder.encode(JSON.stringify({ data: 'Not Found' })),
  };
});
