import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/database';

// Idea attributes interface
interface IdeaAttributes {
  id: number;
  title: string;
  description: string;
  submittedby: number | null; // Modified to match DB column name
  documentUrl?: string | null; // URL to uploaded document
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Idea creation attributes
interface IdeaCreationAttributes extends Optional<IdeaAttributes, 'id' | 'status' | 'documentUrl'> {}

// Idea model class
class Idea extends Model<IdeaAttributes, IdeaCreationAttributes> implements IdeaAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public submittedby!: number | null; // Modified to match DB column name
  public documentUrl!: string | null;
  public status!: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  
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
    submittedby: { // Modified from submittedBy
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    documentUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'in-progress', 'completed'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Idea',
    tableName: 'ideas',
    underscored: false, // Added to ensure camelCase is not automatically converted
  }
);

export default Idea;