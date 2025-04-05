import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { User } from './User';
import { Skill } from './Skill';
import { Review } from './Review';

@Table({
  tableName: 'bookings',
  timestamps: true,
  indexes: [
    { fields: ['studentId', 'status'] },
    { fields: ['tutorId', 'status'] },
    { fields: ['date'] },
  ],
})
export class Booking extends Model {
  @ForeignKey(() => Skill)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  skillId!: number;

  @BelongsTo(() => Skill)
  skill!: Skill;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  studentId!: number;

  @BelongsTo(() => User, 'studentId')
  student!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tutorId!: number;

  @BelongsTo(() => User, 'tutorId')
  tutor!: User;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  startTime!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  endTime!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  totalPrice!: number;

  @Column({
    type: DataType.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending',
  })
  status!: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  @HasOne(() => Review)
  review?: Review;
}
