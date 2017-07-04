/**
 * model review_rating
 */

module.exports = (sequelize, dataTypes) => {
    const Review = serialize.import('./Review.js');

    const ReviewRating = sequelize.define('review_rating', {
            id: {
                type: dataTypes.INTEGER
                , primaryKey: true
            },
            reviewId: {
                type: dataTypes.STRING(36)
                , allowNull: false
            },
            general: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            childFriendly: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            location: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            service: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            room: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            priceQuality: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            food: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            interior: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            size: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            activities: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            restaurants: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            sanitaryState: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            accessibility: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            nightlife: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            culture: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            surrounding: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            atmosphere: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            noviceSkiArea: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            advancedSkiArea: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            apresSki: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            beach: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            entertainment: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            environmental: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            pool: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            terrace: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
        }
        , {
            timestamps: false,
            tableName: 'review_rating'
        }
    );

    ReviewRating.belongsTo(Review,{foreignKey:'reviewId'});

    return ReviewRating;
}
