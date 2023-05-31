import { router } from '../router';
import { decoder } from '../utils/decoder';
import { encoder } from '../utils/encoder';

export default router.get('/api/v1/index/:id', async ({ params }) => {
  const store = spinSdk.kv.openDefault();
  try {
    const value = store.get(`${params.id}_star`);
    const star = +decoder.decode(value) + 1;
    store.set(`${params.id}_star`, `${star}`);
    return {
      status: 200,
      body: encoder.encode(
        JSON.stringify({
          data: {
            star,
          },
        })
      ),
    };
  } catch (error) {
    store.set(`${params.id}_star`, '1');
    return {
      status: 404,
      body: encoder.encode(
        JSON.stringify({
          data: {
            star: 1,
            error,
          },
        })
      ),
    };
  }
});
