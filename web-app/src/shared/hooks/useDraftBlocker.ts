import { useState, useEffect, useCallback } from 'react'
import { useBlocker, useNavigate, type Location } from 'react-router-dom'
import { routePaths } from '@core/config'

export interface UseDraftBlockerOptions {
  shouldBlock: boolean
  onSaveDraft: () => void
  onDiscardDraft: () => void
  defaultExitRoute?: string
}

export const useDraftBlocker = ({
  shouldBlock,
  onSaveDraft,
  onDiscardDraft,
  defaultExitRoute = routePaths.dashboard,
}: UseDraftBlockerOptions) => {
  const navigate = useNavigate()
  const [isManualOpen, setIsManualOpen] = useState<boolean>(false)

  // Block route navigation if unsubmitted and navigating to another route
  const blocker = useBlocker(
    useCallback(
      ({ currentLocation, nextLocation }: { currentLocation: Location; nextLocation: Location }) =>
        shouldBlock && currentLocation.pathname !== nextLocation.pathname,
      [shouldBlock]
    )
  )

  const isModalOpen = isManualOpen || blocker.state === 'blocked'

  // Persist draft and show browser dialog if tab is closed or reloaded
  useEffect(() => {
    if (!shouldBlock) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      onSaveDraft()
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [shouldBlock, onSaveDraft])

  const openModal = useCallback(() => {
    setIsManualOpen(true)
  }, [])

  const handleSaveAndExit = useCallback(() => {
    onSaveDraft()
    setIsManualOpen(false)
    if (blocker.state === 'blocked') {
      blocker.proceed()
    } else {
      navigate(defaultExitRoute)
    }
  }, [blocker, onSaveDraft, navigate, defaultExitRoute])

  const handleDiscardAndExit = useCallback(() => {
    onDiscardDraft()
    setIsManualOpen(false)
    if (blocker.state === 'blocked') {
      blocker.proceed()
    } else {
      navigate(defaultExitRoute)
    }
  }, [blocker, onDiscardDraft, navigate, defaultExitRoute])

  const handleKeepEditing = useCallback(() => {
    setIsManualOpen(false)
    if (blocker.state === 'blocked') {
      blocker.reset()
    }
  }, [blocker])

  return {
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  }
}

export default useDraftBlocker
