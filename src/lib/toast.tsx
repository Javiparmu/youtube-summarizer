import { toast } from "@/components/ui/use-toast"
import React from "react"
import { AlertCircleIcon } from 'lucide-react'

export const errorToast = ({
  title,
  description,
  leftIcon,
}: {
  title: string
  description?: string
  leftIcon?: React.ReactNode
}) =>
  toast({
    title,
    description,
    duration: 5000,
    variant: 'destructive',
    leftIcon: leftIcon ?? <AlertCircleIcon size={24} />,
  })