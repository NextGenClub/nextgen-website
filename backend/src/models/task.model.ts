import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

// Task attributes interface
interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  iscomplete: boolean;
  priority: 'low' | 'medium' | 'high';
  assignedto: number | null;
  projectid: number | null;
  dueDate: Date | null;
  createdAt?: Date;
}

// Interface for Task creation attributes
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'createdAt'> {}

// Task model class
class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public iscomplete!: boolean;
  public priority!: 'low' | 'medium' | 'high';
  public assignedto!: number | null;
  public projectid!: number | null;
  public dueDate!: Date | null;
  public readonly createdAt!: Date;
}

// Initialize Task model
Task.init(
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
      allowNull: true,
    },
    iscomplete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
    },
    assignedto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    updatedAt: false
  }
);

export default Task;