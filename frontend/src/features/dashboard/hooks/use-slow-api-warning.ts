import { useEffect, useRef } from 'react'
import { useIsFetching } from '@tanstack/react-query'
import { toast } from 'sonner'

const SLOW_API_DELAY_MS = 5000
const SLOW_API_TOAST_DURATION_MS = 7000

export function useSlowApiWarning() {
  const isFetching = useIsFetching()
  const isFetchingRef = useRef(isFetching)
  isFetchingRef.current = isFetching

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFetchingRef.current > 0) {
        toast.info('Aguarde até 1 min. enquanto a API inicializa no Render Cloud...', {
          duration: SLOW_API_TOAST_DURATION_MS,
        })
      }
    }, SLOW_API_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])
}
