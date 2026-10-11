import { iife, umd } from '../../scripts/build/rollup.config';

iife.input = umd.input;
iife.output.name = 'acaiStubPlugin';

export default [umd, iife];
