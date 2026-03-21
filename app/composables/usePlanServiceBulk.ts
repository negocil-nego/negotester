import { useMutation, useQueryClient } from '@tanstack/vue-query'

export type BulkActionPayload = {
    action: 'link' | 'unlink'
    planId?: number
    serviceId?: number
    planIds?: number[]
    serviceIds?: number[]
}

export function usePlanServiceBulk() {
    const queryClient = useQueryClient()
    const toast = useToast()

    const { mutateAsync: bulkMutate, isPending } = useMutation({
        mutationFn: (payload: BulkActionPayload) => $fetch('/api/plan-services/bulk', {
            method: 'POST',
            body: payload
        }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['service-plans'] })
            queryClient.invalidateQueries({ queryKey: ['plan-services'] })
            const actionText = variables.action === 'link' ? 'vinculados' : 'desvinculados'
            toast.add({ title: 'Sucesso', description: `Itens ${actionText} com sucesso!`, color: 'success' })
        },
        onError: () => {
            toast.add({ title: 'Erro', description: 'Ocorreu um erro na operação.', color: 'error' })
        }
    })

    return { bulkMutate, isPending }
}
