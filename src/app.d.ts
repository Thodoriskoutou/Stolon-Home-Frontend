declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').AuthModel | undefined;
			lang: string;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace App {
        interface Locals {
            pb: PocketBase
        }
    }
}

export { };
