"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const selectedOptions = selected.map(
    (s) => options.find((o) => o.value === s) || { label: s, value: s }
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex min-h-9 w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm shadow-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 hover:cursor-text dark:bg-input/30",
            className
          )}
          onClick={() => setOpen(true)}
        >
          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {selected.length === 0 && (
              <span className="text-muted-foreground font-normal ml-0.5">{placeholder}</span>
            )}
            {selectedOptions.map((item) => (
              <Badge
                variant="secondary"
                key={item.value}
                className="flex items-center gap-1 rounded-sm px-1.5 py-0 font-medium"
                onClick={(e) => {
                  e.stopPropagation()
                  handleUnselect(item.value)
                }}
              >
                {item.label}
                <X className="h-3 w-3 hover:text-foreground text-muted-foreground/70 cursor-pointer" />
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 ml-2 shrink-0 text-muted-foreground">
            {selected.length > 0 && (
              <div 
                role="button" 
                tabIndex={0} 
                className="p-1 hover:text-foreground cursor-pointer rounded-full hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange([])
                }}
              >
                <X className="h-4 w-4" />
              </div>
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(
                      selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value]
                    )
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
