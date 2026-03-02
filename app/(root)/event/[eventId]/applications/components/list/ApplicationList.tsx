import ApplicationItem from './ApplicationItem'

import { ApplicationListProps } from '../../types/applicationsComponents.types'

const ApplicationList = ({
  applications,
  role,
  eventId,
}: ApplicationListProps) => {
  return (
    <ul className="flex flex-col gap-4 mt-10">
      {applications?.map((item, index) => (
        <ApplicationItem
          key={`${item.id}-${index}`}
          item={item}
          role={role}
          eventId={eventId}
        />
      ))}
    </ul>
  )
}

export default ApplicationList
