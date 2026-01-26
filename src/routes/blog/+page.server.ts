import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import pb from '$lib/server/pb'
import type { ClientResponseError } from 'pocketbase'

export const load:PageServerLoad  = async () => {
    try {
        const data = await pb.collection('blog').getList(1,50, {
            fields: 'id,title,desc,image,slug'
        })
        const records = data.items.map((record) => ({
            id: record.id,
            title: record.title,
            desc: record.desc,
            image: pb.files.getURL(record, record.image),
            slug: record.slug
        }))
        return {
            records
        }   
    } catch (err) {
        error(500, `Failed to fetch Blog from Pocketbase: ${(err as ClientResponseError).message}`)
    }
}