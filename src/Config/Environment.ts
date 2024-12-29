interface IEnvironmentConfig {
  environment: 'dev' | 'prod';
  url: string;
  byPass: boolean;
  appVersion: number;
  id_place: string;
  materials: boolean;
}

const thisEnvironment = 'dev';

export default {
  environment: thisEnvironment,
  url:
    thisEnvironment === 'dev'
      ? 'http://localhost:8888/'
      : 'https://ahaya.pluma.tech/',
  byPass: false,
  appVersion: 600,
  id_place: 'f13f0061-01f0-476f-9d6c-fe4a1a1f64ca',
  materials: true,
} as IEnvironmentConfig;
