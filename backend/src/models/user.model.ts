import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/database';
import bcrypt from 'bcrypt';

// User attributes interface
interface UserAttributes {
    id: string;
    email: string;
    name: string;
    username: string;
    password: string;
    isAdmin: boolean;
    isApproved: boolean;
    googleId?: string;
    microsoftId?: string;
    githubId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Interface for User creation attributes (optional fields during creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isAdmin' | 'isApproved'> {}

// User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public name!: string;
    public username!: string;
    public password!: string;
    public isAdmin!: boolean;
    public isApproved!: boolean;
    public googleId!: string | undefined;
    public microsoftId!: string | undefined;
    public githubId!: string | undefined;
    
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
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        microsoftId: {
            type: DataTypes.STRING,
            allowNull: true, 
            unique: true,
        },
        githubId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
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
