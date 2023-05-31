import { router } from '../router';

export const cors = (cors: object) => {
  router.routes.forEach(route => {
    const handler = route[route.length - 1];
    if (Array.isArray(handler)) {
      const lastHandler = handler[handler.length - 1];
      route[route.length - 1] = [
        async (...args) => {
          const response = await lastHandler(...args);
          return {
            headers: { ...cors },
            ...response,
          };
        },
      ];
    }
  });
};
