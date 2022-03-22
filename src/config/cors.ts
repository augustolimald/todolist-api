import { CorsOptions } from 'cors';

const options: CorsOptions = {
  origin: '*',

  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default options;
