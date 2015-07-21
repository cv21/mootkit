/*
    TODO:
    Вернуть baseURL
    Сделать шумку
    Сделать живой фронт
 */

require.config({
    shim: {
        angular: {
            exports: '/lib/angular.min.js'
        }
    }
});

/*
 * Load all necessary parts of Angular app
 * Currently load services and module definitions (for routing)
 */
require([
    /*
     * Load Angular core
     */
    '/lib/angular.min.js',

    /*
     * Load libraries
     */
    '/lib/angular-ui-router.min.js',
    '/lib/angular-cookie.min.js',
    '/lib/loading-bar.min.js',
    '//api.mootkit.lc/socket.io/socket.io.js',
    '/lib/angular-translate.min.js',
    '/lib/angular-translate-storage-cookie.min.js',
    '/lib/angular-translate-loader-static-files.js',
    '/lib/socket.min.js',
    '/lib/cookies.js',

    /*
     * Load App as main part of Angular App
     */
    '/app/app.js',

    /*
     * Load services
     */
    '/app/services/loader.js',
    '/app/services/auth.js',
    '/app/services/socket.js',
    '/app/services/logger.js',

    /*
     * Load modules
     */
    '/app/modules/auth/auth.js',
    '/app/modules/project/project.js'
]);
