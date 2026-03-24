import { serverSupabaseClient } from "#supabase/server";
import { toMapService } from "~/utils/mapper";

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { data, error } = await client
        .from("tb_services")
        .insert({
            name: body.name,
            icon: body.icon,
            type: body.type,
            price: body.price,
            description: body.description,
            category_id: body.category.id,
        } as any)
        .select("*, tb_categories(*)")
        .single();
    if (!data || error) throw createError({ statusMessage: error.message });
    return toMapService(data);
});
