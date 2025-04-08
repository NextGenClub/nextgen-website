import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';
import Idea from './idea.model';
import User from './user.model';

// Vote attributes interface
interface VoteAttributes {
  id: number;
  userid: number;
  ideaid: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Vote creation attributes
interface VoteCreationAttributes extends Optional<VoteAttributes, 'id'> {}

// Vote model class
class Vote extends Model<VoteAttributes, VoteCreationAttributes> implements VoteAttributes {
  public id!: number;
  public userid!: number;
  public ideaid!: number;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Vote model
Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    ideaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ideas',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Vote',
    tableName: 'votes',
    underscored: false,
  }
);

export default Vote;