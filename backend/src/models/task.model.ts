import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/database';

// Task attributes interface
interface TaskAttributes {
  id: string;
  title: string;
  description: string | null;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string | null; // Reference to User ID
  projectId: string | null; // Reference to Project ID
  dueDate: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Task creation attributes
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'description' | 'status' | 'priority' | 'assignedTo' | 'projectId' | 'dueDate'> {}

// Task model class
class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description!: string | null;
  public status!: 'not-started' | 'in-progress' | 'completed';
  public priority!: 'low' | 'medium' | 'high';
  public assignedTo!: string | null;
  public projectId!: string | null;
  public dueDate!: Date | null;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Task model
Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    status: {
      type: DataTypes.ENUM('not-started', 'in-progress', 'completed'),
      defaultValue: 'not-started',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    assignedTo: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.UUID,
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
  }
);

export default Task;