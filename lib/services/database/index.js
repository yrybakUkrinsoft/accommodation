/**
 * Postgres connector class
 */

const Sequelize = require('sequelize');
const EventEmitter = require('events')

module.exports = class PostgresConnector {
    /**
     * Represents a PostgresConnector class.
     * @constructor
     * @param {Object} options - may have host and port.
     * @param {string} [options.host=localhost] - host.
     * @param {number} [options.port=6379] - port.
     * @param {string} [options.username=''] - username
     * @param {string} [options.password=''] - password
     * @param {string} [options.database=''] - database
     */
    constructor(options) {
        if (!(this instanceof PostgresConnector)) return new PostgresConnector(options);
        this.events = new EventEmitter()

        this._options = options || {};
        this._options.host = this._options.host || 'localhost';
        this._options.port = this._options.port || '5432';
        this._options.username = this._options.username || '';
        this._options.password = this._options.password || '';
        this._options.pool = this._options.pool || 10;
        this._options.database = this._options.database || '';

        if (this._options.username && this._options.password && this._options.database) {
            this._client = new Sequelize(
                this._options.database
                , this._options.username
                , this._options.password
                , {
                    host: this._options.host
                    , dialect: 'postgres'
                    , maxConcurrentQueries: this._options.pool
                    , pool: {
                        max: this._options.pool
                    }
                    , primaryKey: false
                    , logging: false
                }
            );

            this._client.sync()
                .catch(err=> {
                    this.events.emit('error', err)
                })
        } else {
            throw new Error('username, password and/or database is/are absent');
        }

        /**
         * The place where all modules (singletons) will be placed
         * @type {{}}
         * @private
         */
        this._singletons = {};


        /**
         * The place where all db models will be placed
         * @type {{}}
         * @private
         */
        this._models = {};
    }

    /**
     * Init all models with their methods.
     */
    init() {
        const readdir = require('fs').readdirSync;
        const join = require('path').join;

        const self = this;

        const models = readdir(join(__dirname, './models'));  // get all models name in ./models dir
        models.forEach((model)=> {
            // creates model name that contain model name + Model word ant start with upper symbol
            var name = model.split('.')[0];

            // attaches each model to PostgresConnector for the fastest getting
            self._models[name] = self._client.import(`./models/${model}`);
        });


        const classes = readdir(join(__dirname, './model_methods'));
        classes.forEach(currentClass=> {
            var name = currentClass.split('.')[0].toLowerCase();
            self[name] = new (require(`./model_methods/${currentClass}`))(self)
        })
        return;
    }


    /**
     * Gets model via sequelize import method
     * @param {string} modelName - name of Model
     * @returns {Model}
     */
    getModel(modelName) {
        return this._models[modelName];
    }


    /**
     * Get message object. (Just wrap message for object)
     * @param {string} message
     * @returns {{message: *}}
     */
    getError(message) {
        return {
            message: message
        }
    }

    /**
     * Get module by name
     * @param {string} name
     * @returns {*}
     */
    get(name) {
        return this._singletons[name];
    }

    /**
     * Sets module as singleton by name
     * @param {string} name
     * @param {function|Object|module} module
     */
    set(name, module) {
        return this._singletons[name] = module;
    }
}
