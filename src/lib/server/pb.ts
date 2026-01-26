import PocketBase from "pocketbase"
import { PB_URL, PB_USER, PB_PASS } from '$env/static/private';

const pb = new PocketBase(PB_URL);

pb.autoCancellation(false);

await pb.collection('_superusers').authWithPassword(PB_USER || "", PB_PASS || "", {
  autoRefreshThreshold: 30 * 60
})

export default pb;