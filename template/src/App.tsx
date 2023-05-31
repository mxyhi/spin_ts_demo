import Button from '@suid/material/Button';
import { request } from './utils/request';

export default function App() {
  const handler = () => {
    request('https://spin-ts-demo-dh5xv9bx.fermyon.app/api/v1/index/123').then(
      res => {
        console.log(res);
      },
      reason => {
        console.log(reason);
      }
    );
  };
  return (
    <Button onClick={handler} variant="contained">
      Hello world
    </Button>
  );
}
