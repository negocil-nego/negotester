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
        price: row.price ?? 0,
        icon: row.icon ?? '',
        description: row.description ?? '',
        category: toMapCategory(row.tb_categories)
    };
}
