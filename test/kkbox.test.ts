import { kkboxServices } from './../src/services/kkbox/index';

(async () => {
  try {
    const svc = await kkboxServices()
    const ret = await svc.searchLyrics('五月天','孫悟空');

    console.log(ret);
  } catch (error) {
    console.log(error)
  }
})();

