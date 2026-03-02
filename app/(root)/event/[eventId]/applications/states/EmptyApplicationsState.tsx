const EmptyApplicationsState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h3 className="text-xl font-semibold mb-2">No applications found</h3>
      <p className="text-muted-foreground">
        Try changing filters or check back later.
      </p>
    </div>
  )
}

export default EmptyApplicationsState
