import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

// Vote attributes interface
interface VoteAttributes {
  userid: string;
  ideaid: string;
  createdAt?: Date;
}

// Vote model class
class Vote extends Model<VoteAttributes> implements VoteAttributes {
  public userid!: string;
  public ideaid!: string;
  public readonly createdAt!: Date;
}

// Initialize Vote model
Vote.init(
  {
    userid: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    ideaid: {
      type: DataTypes.UUID,
      primaryKey: true,
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
    timestamps: true,
    updatedAt: false,
    underscored: false,
  }
);

export default Vote;