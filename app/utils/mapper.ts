import type { Category, Service } from "~/types";

export function toMapCategory(row: any): Category {
    if (!row) return {} as Category;

    return {
        id: row.id ?? 0,
        name: row.name ?? '',
        icon: row.icon ?? '',
        description: row.description ?? '',
    };
}

export function toMapService(row: any): Service {
    return {
        id: row.id ?? 0,
        name: row.name ?? '',
        icon: row.icon ?? '',
        price: row.price ?? 0,
        type: row.type ?? 'FREE',
        description: row.description ?? '',
        category: toMapCategory(row.tb_categories)
    };
}
