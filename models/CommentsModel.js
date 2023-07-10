module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER, 
            },
            photoId: {
                type: DataTypes.INTEGER, 
            },
            content: {
                type: DataTypes.TEXT, 
            },
        }
    )
    return Comments;
}