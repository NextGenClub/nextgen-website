import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

// Project attributes interface
interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
  managerid: number | null;
  ideaid: number | null;
  createdat?: Date;
}

// Interface for Project creation attributes
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

// Project model class
class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public managerid!: number | null;
  public ideaid!: number | null;
  public readonly createdat!: Date;
}

// Initialize Project model
Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    managerid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    ideaid: {
      type: DataTypes.INTEGER,
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
    timestamps: true,
    createdAt: 'createdat',
    updatedAt: false
  }
);

export default Project;