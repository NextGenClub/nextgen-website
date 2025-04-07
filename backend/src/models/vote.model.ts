import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';
import Idea from './idea.model';
import User from './user.model';

class Vote extends Model {
  public id!: number;
  public ideaid!: number;
  public userid!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ideaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Idea,
        key: 'id'
      }
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'votes',
    underscored: false
  }
);

export default Vote;