import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { FC } from 'react'
import { useCallback } from 'react'
import PhWarning from '~icons/ph/warning'

export type ITipAlert = {
  className?: string
  show: boolean
  setShow: (show: boolean) => void
}

export const TipAlert: FC<ITipAlert> = ({ className, show, setShow }) => {
  const onClose = useCallback(() => {
    setShow(false)
  }, [setShow])

  return (
    <>
      {show && (
        <div className={`alert z-10 w-fit cursor-pointer pr-5 ${className}`} onClick={onClose}>
          <Alert variant="destructive" className="relative">
            <PhWarning className="h-4 w-4" />
            <AlertTitle>Plugin Conflicts</AlertTitle>
            <AlertDescription>If the input fails several times, it may be a conflict with the local browser plug-ins, please off the relevant plug-ins or switch browsers to try!</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  )
}
