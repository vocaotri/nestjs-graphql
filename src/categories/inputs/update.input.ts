import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CategoryUpdate {
  @Field()
  readonly id: string;
  @Field({ nullable: true })
  readonly title?: string;
  @Field({ nullable: true })
  readonly description?: string;
}