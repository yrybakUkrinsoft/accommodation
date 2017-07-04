/**
 * model review_title
 */

module.exports = (sequelize, dataTypes) => {
    const Review = serialize.import('./Review.js');

    const ReviewTitle = sequelize.define('review_title', {
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
    );

    ReviewTitle.belongsTo(Review,{foreignKey:'reviewId'});

    return ReviewTitle;
}