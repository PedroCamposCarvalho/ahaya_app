interface IEnvironmentConfig {
  environment: 'dev' | 'prod';
  url: string;
  byPass: boolean;
  appVersion: number;
  id_place: string;
  materials: boolean;
}

const thisEnvironment = 'prod';

export default {
  environment: thisEnvironment,
  url:
    thisEnvironment === 'dev'
      ? 'http://192.168.15.117:8888/'
      : 'https://ahaya.pluma.tech/',
  byPass: true,
  appVersion: 500,
  id_place: 'f13f0061-01f0-476f-9d6c-fe4a1a1f64ca',
  materials: true,
} as IEnvironmentConfig;
