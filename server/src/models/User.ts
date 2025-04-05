import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { Skill } from './Skill';
import { UserSkill } from './UserSkill';
import { UserFavorite } from './UserFavorite';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [6, 100],
    },
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  displayName!: string;

  @Column(DataType.STRING)
  photoURL?: string;

  @Column({
    type: DataType.ENUM('student', 'tutor'),
    defaultValue: 'student',
  })
  role!: 'student' | 'tutor';

  @HasMany(() => Skill)
  taughtSkills?: Skill[];

  @BelongsToMany(() => Skill, () => UserSkill)
  skills?: Skill[];

  @BelongsToMany(() => Skill, () => UserFavorite)
  favorites?: Skill[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}
