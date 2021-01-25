import { SearchMoviesByPopularActionType } from '../action-types/searchMoviesByPopular'
import { SearchMoviesByPopularAction } from '../actions/searchMoviesByPopular'
import { MoviesState } from '../moviesState'

const searchMoviesByPopularReducer = (
  state: MoviesState,
  action: SearchMoviesByPopularAction
): MoviesState => {
  switch (action.type) {
    case SearchMoviesByPopularActionType.SEARCH_MOVIES_BY_POPULAR:
      return { loading: true, error: null, data: [] }
    case SearchMoviesByPopularActionType.SEARCH_MOVIES_BY_POPULAR_SUCCESS:
      return { loading: false, error: null, data: action.payload }
    case SearchMoviesByPopularActionType.SEARCH_MOVIES_BY_POPULAR_ERROR:
      return { loading: false, error: action.payload, data: [] }
    default:
      return state
  }
}

export default searchMoviesByPopularReducer
