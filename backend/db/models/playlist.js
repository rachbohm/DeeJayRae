'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );
      Playlist.belongsToMany(
        models.Song,
        { through: models.PlaylistSong, foreignKey: 'playlistId' }
      );
          //
      // define association here
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
