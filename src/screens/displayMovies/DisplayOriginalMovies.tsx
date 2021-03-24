import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import ErrorScreen from '../errorScreen/ErrorScreen'
import MoviesCarousel from '../../components/layout/carousel/MoviesCarousel'
import Pagination from '../../components/shared/pagination/Pagination'
import '../../assets/css/DisplayMovies.css'
import useAccessMoviesData from '../../hooks/useAccessMoviesData'
import MoviesGrid from '../../components/layout/moviesGrid/MoviesGrid'
import { genreArray, genreIdsArray } from '../../utils/genresArray';

interface MatchParam {
  category?: string
  page?: string
}

const DisplayOriginalMovies: React.FC<RouteComponentProps<MatchParam>> = ({
  match,
  history,
}) => {
  const { category } = match.params
  const [errorParam, setErrorParam] = useState(Number(match.params.page) ? false:true)
  const [currentPage, setCurrentPage] = useState(
    match.params.page && Number(match.params.page) ? Number(match.params.page) : 1
  )
  const {
    searchMoviesByPopular,
    searchMoviesByTopRated,
    searchMoviesByUpComing,
    searchMoviesByGenreId
  } = useActions()

  let { loading, error, data } = useAccessMoviesData(category)

  useEffect(() => {
    match.params.page &&
    Number(match.params.page) &&
      !Number.isNaN(Number(match.params.page)) &&
      Number(match.params.page) !== currentPage &&
      setCurrentPage(Number(match.params.page))
    if (
      match.params.page &&
      !Number.isNaN(Number(match.params.page)) &&
      Number(match.params.page) === currentPage
    ) {
      if (category === 'popular') {
        searchMoviesByPopular(currentPage)
        setErrorParam(false)
      } else if (category === 'top-rated') {
        setErrorParam(false)
        searchMoviesByTopRated(currentPage)
      } else if (category === 'upcoming') {
        searchMoviesByUpComing(currentPage)
        setErrorParam(false)
      }else if(category && genreArray.includes(category)){
        let genreId:{id:number,name:String} | undefined;
        genreId = genreIdsArray.find((obj) => {
          return (category === obj.name.replace(' ','-').toLowerCase())
        })
        genreId && searchMoviesByGenreId(genreId.id,currentPage)
      } else {
        setErrorParam(true)
      }
    }else if(Number.isNaN(Number(match.params.page))){
      setErrorParam(true)
    }
    // eslint-disable-next-line
  }, [category, match, currentPage])

 return (
    <>
      {(errorParam || error) && <ErrorScreen />}
      {/* {!errorParam && !error && !data && !loading && <LoadingSpinner />} */}
      {loading && (
        <>
          <MoviesCarousel loadingStatus={'loading'} />
          <main>
            <Container>
              {category && (
                <h1 className='ml-4 mt-4'>{category.toUpperCase()} Movies</h1>
              )}
              <Row className='p-5'>
                <MoviesGrid loadingStatus='loading' category={category}/>
              </Row>
              <Pagination
                totalPages={data?.total_pages}
                currentPage={currentPage}
              />
            </Container>
          </main>
        </>
      )}
      {!error && !loading && data && (
        <>
          <MoviesCarousel
            topFourMovies={data?.results.slice(0, 4)}
            loadingStatus={'loaded'}
          />
          <main>
            <Container>
              {category && (
                <h1 className='ml-5 mt-4'>{category.toUpperCase()} Movies</h1>
              )}
              <Row className='p-5'>
                <MoviesGrid loadingStatus='loaded' category={category}/>
              </Row>
              {(!!data.total_pages) && (data.total_pages !== 1) && <Pagination
                totalPages={data?.total_pages}
                currentPage={currentPage}
              />}
            </Container>
          </main>
        </>
      )}
    </>
  )
}

export default DisplayOriginalMovies
