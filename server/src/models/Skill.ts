import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './User';
import { UserSkill } from './UserSkill';
import { UserFavorite } from './UserFavorite';
import { Review } from './Review';

interface Availability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
}

@Table({
  tableName: 'skills',
  timestamps: true,
})
export class Skill extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tutorId!: number;

  @BelongsTo(() => User)
  tutor!: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 15,
    },
  })
  duration!: number;

  @Column({
    type: DataType.ENUM('online', 'in-person', 'hybrid'),
    allowNull: false,
  })
  location!: 'online' | 'in-person' | 'hybrid';

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  availability!: Availability[];

  @Column({
    type: DataType.DECIMAL(2, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  })
  rating!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  reviewCount!: number;

  @BelongsToMany(() => User, () => UserSkill)
  students?: User[];

  @BelongsToMany(() => User, () => UserFavorite)
  favoritedBy?: User[];

  @HasMany(() => Review)
  reviews?: Review[];
}
