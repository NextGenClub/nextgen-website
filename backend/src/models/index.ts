import sequelize from '../utils/database';

import User from './user.model';
import Idea from './idea.model';
import Vote from './vote.model';
import Task from './task.model';
import Project from './project.model';

// Define associations between models

// User associations
User.hasMany(Idea, {
  foreignKey: 'submittedby',
  as: 'ideas'
});

User.hasMany(Task, {
  foreignKey: 'assignedto',
  as: 'tasks'
});

User.hasMany(Project, {
  foreignKey: 'managerid',
  as: 'managedProjects'
});

// Idea associations
Idea.belongsTo(User, {
  foreignKey: 'submittedby',
  as: 'submitter'
});

Idea.hasMany(Vote, {
  foreignKey: 'ideaid',
  as: 'votes'
});

Idea.hasOne(Project, {
  foreignKey: 'ideaid',
  as: 'project'
});

// Vote associations
Vote.belongsTo(User, {
  foreignKey: 'userid',
  as: 'user'
});

Vote.belongsTo(Idea, {
  foreignKey: 'ideaid',
  as: 'idea'
});

// Project associations
Project.belongsTo(User, {
  foreignKey: 'managerid',
  as: 'manager'
});

Project.belongsTo(Idea, {
  foreignKey: 'ideaid',
  as: 'originalIdea'
});

Project.hasMany(Task, {
  foreignKey: 'projectid',
  as: 'tasks'
});

// Task associations
Task.belongsTo(User, {
  foreignKey: 'assignedto',
  as: 'assignee'
});

Task.belongsTo(Project, {
  foreignKey: 'projectid',
  as: 'project'
});

export {
  User,
  Idea,
  Vote,
  Task,
  Project,
  sequelize
}; 