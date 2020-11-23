/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../editContact/node_modules/utils/loadable';

export default loadable(() => import('./index'));
