import env from './Environment';

interface ProductsIdsConfig {
  appointment: number;
  day_use: number;
  monthly: number;
}

export default {
  appointment: env.environment === 'dev' ? 842569 : 842569,
  day_use: env.environment === 'dev' ? 173270 : 842568,
  monthly: env.environment === 'dev' ? 173271 : 899031,
} as ProductsIdsConfig;
