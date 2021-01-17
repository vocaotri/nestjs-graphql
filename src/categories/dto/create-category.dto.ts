import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType()
export class CategoryDTO {
  @Field({ nullable: true })
  readonly title?: string;
  @Field({ nullable: true })
  readonly description?: string;
  // @Field(type =>[])
  // readonly books: [];
}