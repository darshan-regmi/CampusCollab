import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AfterCreate,
  AfterUpdate,
  AfterDestroy,
} from 'sequelize-typescript';
import { User } from './User';
import { Skill } from './Skill';
import { Booking } from './Booking';

@Table({
  tableName: 'reviews',
  timestamps: true,
  indexes: [
    { fields: ['skillId', 'rating'] },
    { fields: ['studentId'] },
  ],
})
export class Review extends Model {
  @ForeignKey(() => Skill)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  skillId!: number;

  @BelongsTo(() => Skill)
  skill!: Skill;

  @ForeignKey(() => Booking)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingId!: number;

  @BelongsTo(() => Booking)
  booking!: Booking;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  studentId!: number;

  @BelongsTo(() => User)
  student!: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment!: string;

  @Column({
    type: DataType.JSON,
    defaultValue: [],
  })
  upvotes!: number[];

  @Column({
    type: DataType.JSON,
    defaultValue: [],
  })
  downvotes!: number[];

  @AfterCreate
  @AfterUpdate
  @AfterDestroy
  static async updateSkillRating(instance: Review) {
    const skill = await Skill.findByPk(instance.skillId);
    if (skill) {
      const reviews = await Review.findAll({
        where: { skillId: instance.skillId },
      });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      skill.rating = totalRating / reviews.length;
      skill.reviewCount = reviews.length;
      await skill.save();
    }
  }
}
