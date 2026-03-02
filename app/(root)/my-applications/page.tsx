'use client'

import { useGetUserApplicationsQuery } from '@/store/applications/applicationsApi'
import React from 'react'

const MyApplicationsPage = () => {
  const { data: applications } = useGetUserApplicationsQuery()

  if (!applications) {
    return <div>Loading...</div>
  }
  console.log('applications', applications)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">My Applications</h1>
      <div className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="border p-4 rounded-lg shadow-lg bg-gray-800"
          >
            <h2 className="text-xl font-medium text-primary mb-2">
              {application.event.title}
            </h2>
            <p className="text-sm text-gray-400 mb-1">
              {application.event.category}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              {application.event.description}
            </p>
            {/* <img
              src={application.event.image}
              alt={application.event.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            /> */}
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-lg text-sm ${
                  application.applicationStatus === 'ACCEPTED'
                    ? 'bg-green-600 text-white'
                    : application.applicationStatus === 'REJECTED'
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-600 text-white'
                }`}
              >
                {application.applicationStatus}
              </span>
              {application.decisionByComment && (
                <p className="text-sm text-gray-300 mt-2">
                  <strong>Comment:</strong> {application.decisionByComment}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyApplicationsPage
