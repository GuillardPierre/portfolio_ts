// types/session.d.ts
import 'express-session';

declare module 'express-session' {
	interface Session {
		destroy(callback?: (err: Error | null) => void): void;
	}

	interface SessionData {
		userId: string; // ou number, selon le type de userId
	}
}
