'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(
        models.User,
        { foreignKey: 'userId', as: "Artist" }
      );
      Song.belongsTo(
        models.Album,
        { foreignKey: 'albumId' }
      );
      Song.belongsToMany(
        models.Playlist,
        { through: models.PlaylistSong, foreignKey: 'songId' }
      );
      Song.hasMany(
        models.Comment,
        { foreignKey: 'songId', onDelete: 'CASCADE', hooks: true }
      );
          //
      // define association here
    }
  }
  Song.init({
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImage: DataTypes.STRING,
    audioFile: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Song',
    scopes: {
      noPlaylistSong: {
        attributes: {
          include:  ["id", "userId", "albumId", "title",
                "description", "url", "previewImage", "audioFile", "createdAt", "updatedAt"],
          exclude: ["PlaylistSong"]
        }
      }
    }
  });
  return Song;
};
