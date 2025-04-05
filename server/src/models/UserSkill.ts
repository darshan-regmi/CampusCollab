import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './User';
import { Skill } from './Skill';

@Table({
  tableName: 'user_skills',
  timestamps: true,
})
export class UserSkill extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Skill)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  skillId!: number;
}
