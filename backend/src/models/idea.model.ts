import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

// Idea attributes interface
interface IdeaAttributes {
  id: number;
  title: string;
  description: string;
  submittedby: number | null;
  documentUrl: string | null;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Idea creation attributes
interface IdeaCreationAttributes extends Optional<IdeaAttributes, 'id' | 'submittedby' | 'documentUrl' | 'status'> {}

// Idea model class
class Idea extends Model<IdeaAttributes, IdeaCreationAttributes> implements IdeaAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public submittedby!: number | null;
  public documentUrl!: string | null;
  public status!: 'pending' | 'approved' | 'rejected';
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Idea model
Idea.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    submittedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    documentUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Idea',
    tableName: 'ideas',
    underscored: false, // Prevent automatic conversion to snake_case
  }
);

export default Idea;