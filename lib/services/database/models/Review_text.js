/**
 * model review_text
 */

module.exports = (sequelize, dataTypes) => sequelize.define('texts', {
        id: {
            type: dataTypes.INTEGER
            , primaryKey: true
        },
        reviewId: {
            type: dataTypes.STRING(36)
            , allowNull: false
        },
        locale: {
            type: dataTypes.INTEGER
            , allowNull: false
        },
        text: {
            type: dataTypes.TEXT
            , allowNull: false
        }
    }
    , {
        timestamps: false,
        tableName: 'review_text'
    }
)