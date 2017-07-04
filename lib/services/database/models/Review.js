/**
 * model review
 */

module.exports = (sequelize, dataTypes) => sequelize.define('review', {
        id: {
            type: dataTypes.STRING(36)
            , primaryKey: true
        },
        traveledWith: {
            type: dataTypes.INTEGER
            , allowNull: false
        },
        entryDate: {
            type: dataTypes.BIGINT
            , allowNull: false
        },
        travelDate: {
            type: dataTypes.BIGINT
            , allowNull: false
        },
        user: {
            type: dataTypes.STRING(255)
            , allowNull: false
        },
        locale: {
            type: dataTypes.INTEGER
            , allowNull: false
        }
    }
    , {
        timestamps: false,
        tableName: 'review'
    }
);