import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field()
  readonly title: string;
  @Field({ nullable: true })
  readonly description?: string;
  // @Field()
  // readonly books: Array<string>;
}