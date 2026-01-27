import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/server/pb'

export const load: LayoutServerLoad = async ({  }) => {
    if(!pb.authStore.isValid) error(403, {
		message: 'Database Auth Failed'
	})
    return {
    }
}