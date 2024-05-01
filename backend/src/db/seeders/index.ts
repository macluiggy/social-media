import { runSeeders } from 'typeorm-extension';
import datasourceConfig from '../config/datasource.config';

const dS = datasourceConfig;
export default dS;

(async () => {
  await dS.initialize();

  await runSeeders(dS, {
    seedName: 'seeds',
  });
})();
