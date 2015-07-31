/*
 * Configure require
 * Define routes for modules
 */
require.config({
    baseUrl: 'app',
    paths: {
        'angular': '../lib/angular.min',
        'cookies': '../lib/cookies',
        'socket': '../lib/socket.min',
        'angular-ui-router': '../lib/angular-ui-router.min',
        'angular-cookie': '../lib/angular-cookie.min',
        'angular-translate': '../lib/angular-translate.min',
        'angular-translate-storage-cookie': '../lib/angular-translate-storage-cookie.min',
        'angular-translate-loader-static-files': '../lib/angular-translate-loader-static-files'
    },

    /*
     * Use shim for annotate angular dependencies
     */
    shim: {
        'angular': { exports: 'angular' },
        'cookies': { deps: ['angular'] },
        'socket': { deps: ['angular'] },
        'angular-ui-router': { deps: ['angular'] },
        'angular-cookie': { deps: ['angular'] },
        'angular-translate': { deps: ['angular'] },
        'angular-translate-storage-cookie': { deps: ['angular'] },
        'angular-translate-loader-static-files': { deps: ['angular'] }
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
    'angular',

    /*
     * Load libraries
     */
    'cookies',
    'socket',
    'angular-ui-router',
    '//api.mootkit.lc/socket.io/socket.io.js',
    'angular-cookie',
    'angular-translate',
    'angular-translate-storage-cookie',
    'angular-translate-loader-static-files',

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
    'modules/profile/profile',
    'modules/project/project',
    'modules/misc/misc'
]);
