/*
 * Configure require.js for project structure
 */
require.config({
    baseUrl: '/app'
});

/*
 * Load all necessary parts of Angular app
 * Currently load services and module definitions (for routing)
 */
require([
    /*
     * Load App as main part of Angular App
     */
    'app',

    /*
     * Load services
     */
    'services/loader',
    'services/auth',
    'services/socket',
    'services/logger',

    /*
     * Load modules
     */
    'modules/auth/auth',
    'modules/project/project',

])
