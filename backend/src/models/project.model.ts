import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/database';

// Project attributes interface
interface ProjectAttributes {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  managerId: string | null; // Reference to User ID who leads the project
  startDate: Date | null;
  endDate: Date | null;
  ideaId: string | null; // Reference to original idea if applicable
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Project creation attributes
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'status' | 'managerId' | 'startDate' | 'endDate' | 'ideaId'> {}

// Project model class
class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public status!: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  public managerId!: string | null;
  public startDate!: Date | null;
  public endDate!: Date | null;
  public ideaId!: string | null;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Project model
Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('planning', 'in-progress', 'completed', 'on-hold'),
      defaultValue: 'planning',
    },
    managerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ideaId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'ideas',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
  }
);

export default Project;