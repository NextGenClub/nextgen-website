import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../utils/database';
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
    // New fields for team member profiles
    bio?: string | null;
    position?: string | null;
    avatar?: string | null;
    socialLinks?: Record<string, string> | null;
    skills?: string[] | null;
    showInTeam?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 
    'id' | 
    'isAdmin' | 
    'isApproved' | 
    'showInTeam' |
    'createdAt' | 
    'updatedAt'
> {}

// User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public name!: string;
    public username!: string;
    public password!: string;
    public googleId!: string | undefined;
    public githubId!: string | undefined;
    public isAdmin!: boolean;
    public isApproved!: boolean;
    public bio?: string | null;
    public position?: string | null;
    public avatar?: string | null;
    public socialLinks?: Record<string, string> | null;
    public skills?: string[] | null;
    public showInTeam!: boolean;
    
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
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        position: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        socialLinks: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: {},
        },
        skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
        showInTeam: {
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
                // Set default values for new fields if not provided
                if (user.socialLinks === undefined) user.socialLinks = {};
                if (user.skills === undefined) user.skills = [];
                if (user.showInTeam === undefined) user.showInTeam = false;
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
