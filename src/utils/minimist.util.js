
import parseArgs from 'minimist';
import { argv } from 'process';

const options = {

  alias: {
    p: 'port',
    t: 'type'
  },

  default: {
    port: 8080,
    type: 'memory'
  }
}

export const { port, type } = parseArgs(argv, options);

