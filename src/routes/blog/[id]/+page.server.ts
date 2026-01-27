import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/server/pb'
import type { ClientResponseError } from 'pocketbase'

export const load: PageServerLoad = async ({ params }) => {
    try {
        const recordId = params.id
        if (recordId === "new") {
            return {
                record: {
                    title: "",
                    desc: "",
                    image: "",
                    slug: ""
                }
            }
        }
        const record = await pb.collection('blog').getOne(`${recordId}`)
        return {
            record
        }
    } catch (err) {
        error(500, `Failed to fetch data from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}
