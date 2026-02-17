import type { Column, SortDirection } from "@tanstack/table-core";

export function columnHeaderSort<T>(column: Column<T>, isSorted: false | SortDirection, name: string) {
    return {
        color: 'neutral',
        variant: 'ghost',
        label: name,
        icon: isSorted
            ? isSorted === 'asc'
                ? 'i-lucide-arrow-up-narrow-wide'
                : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    }
}