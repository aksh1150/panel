/**
 * Asynchronously loads the component for HomePage
 */

import loadable from '../EditContact/node_modules/utils/loadable';

export default loadable(() => import('./index'));
