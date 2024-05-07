// test.utils.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common';
import { SuccesResponseInterceptor } from '../src/common/interceptors/succes-request-response.interceptor';

export default async function setupTestingModule({
  imports = [],
  exports = [],
  controllers = [],
  providers = [],
}: {
  imports?: ModuleMetadata['imports'];
  exports?: ModuleMetadata['exports'];
  controllers?: ModuleMetadata['controllers'];
  providers?: ModuleMetadata['providers'];
} = {}) {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports,
    exports,
    controllers,
    providers,
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalInterceptors(new SuccesResponseInterceptor());
  await app.init();

  return { app, moduleFixture };
}
