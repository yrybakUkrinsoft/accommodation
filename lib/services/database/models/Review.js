/**
 * model review
 */

module.exports = (sequelize, dataTypes) => {
    const Review_rating = sequelize.import('./Review_rating.js')
    const Review_text = sequelize.import('./Review_text.js')
    const Review_title = sequelize.import('./Review_title.js')
    const Review = sequelize.define('review', {
            id: {
                type: dataTypes.STRING(36)
                , primaryKey: true
            },
            traveledWith: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            entryDate: {
                type: dataTypes.INTEGER
                , allowNull: false
            },
            travelDate: {
                type: dataTypes.INTEGER
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
    Review.hasOne(Review_rating)
    Review.hasMany(Review_text)
    Review.hasMany(Review_title)
    return Review;
}