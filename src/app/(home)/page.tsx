"use client"

import { usePaginatedQuery } from 'convex/react'

import { useSearchParam } from '@/hooks/use-search-param'

import { Navbar } from './components/navbar'
import { TemplatesGallery } from './components/templates-gallery'
import { DocumentsTable } from "@/app/(home)/components/documents-table/index"

import { api } from '../../../convex/_generated/api'

const Home = () => {

  const [search] = useSearchParam();

  const {
    results,
    status,
    loadMore
  } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 })

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  )
}

export default Home