import { useRouteError } from "react-router-dom"
const SinglePageError = () => {
    const error = useRouteError();
  return (
    <div>{error.message}</div>
  )
}

export default SinglePageError