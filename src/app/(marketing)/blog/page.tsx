import Link from "react-router-dom"
import { compareDesc } from "date-fns"

import { formatDate } from "../../../lib/utils"



export default  function BlogPage() {
  const posts = []

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A blog built using Contentlayer. Posts are written in MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
         
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
