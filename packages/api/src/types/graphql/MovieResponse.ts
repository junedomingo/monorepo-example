import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class MovieResponse {
  @Field()
  directed_by: string;

  @Field()
  title: string;
}
