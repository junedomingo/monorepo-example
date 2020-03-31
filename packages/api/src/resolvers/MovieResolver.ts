import { Resolver, Query } from 'type-graphql';
import { MovieResponse } from '../types/graphql';

@Resolver()
export class MovieResolver {
  @Query(() => MovieResponse)
  movie() {
    return {
      title: 'Life of Pi',
      directed_by: 'Ang Lee',
    };
  }
}
