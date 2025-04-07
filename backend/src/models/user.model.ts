import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

// User attributes interface
interface UserAttributes {
    id: number;
    email: string;
    name: string;
    username: string;
    password: string;
    googleId?: string;
    githubId?: string;
    isAdmin: boolean;
    isApproved: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isAdmin' | 'isApproved' | 'createdAt' | 'updatedAt'> {}

// User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public name!: string;
    public username!: string;
    public password!: string;
    public googleId!: string | undefined;
    public githubId!: string | undefined;
    public isAdmin!: boolean;
    public isApproved!: boolean;
    
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
    // Instance method to validate password
    public async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

// Initialize User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        googleId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
        },
        githubId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
        timestamps: true,
        hooks: {
            // Hash password before saving
            beforeCreate: async (user: User) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
                // Set username to email if not provided
                if (!user.username) {
                    user.username = user.email.split('@')[0];
                }
                // Set name to username if not provided
                if (!user.name) {
                    user.name = user.username;
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    }
);

export default User;
