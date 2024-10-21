'use client'

import { SelectProps } from '@radix-ui/react-select'
import * as React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { languages } from '@/lib/languages'

interface LanguageSelectorProps extends SelectProps {}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Seleccionar idioma" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.name} value={language.code}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
