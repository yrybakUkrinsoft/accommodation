/**
 * model review_title
 */

module.exports = (sequelize, dataTypes) => sequelize.define('titles', {
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
        title: {
            type: dataTypes.STRING(255)
            , allowNull: false
        }
    }
    , {
        timestamps: false,
        tableName: 'review_title'
    }
)