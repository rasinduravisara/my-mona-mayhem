import type { APIRoute } from 'astro';

export const prerender = false;

const GITHUB_USERNAME_REGEX = /^(?!-)[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;
const SUCCESS_TTL_MS = 5 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8_000;
const SUCCESS_CACHE_CONTROL = 'public, max-age=60, s-maxage=300, stale-while-revalidate=300';

type CacheEntry = {
	payload: unknown;
	expiresAt: number;
};

const contributionCache = new Map<string, CacheEntry>();

type ErrorBody = {
	error: string;
	message: string;
};

const jsonResponse = (
	body: unknown,
	status: number,
	cacheControl: string,
	cacheState: 'HIT' | 'MISS',
): Response => {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': cacheControl,
			'X-Cache': cacheState,
		},
	});
};

const errorResponse = (status: number, body: ErrorBody): Response => {
	return jsonResponse(body, status, 'no-store', 'MISS');
};

const isValidUsername = (username: string): boolean => {
	if (!username || username.length > 39) {
		return false;
	}

	return GITHUB_USERNAME_REGEX.test(username);
};

export const GET: APIRoute = async ({ params }) => {
	const username = params.username?.trim();

	if (!username || !isValidUsername(username)) {
		return errorResponse(400, {
			error: 'invalid_username',
			message: 'Username must be a valid GitHub username.',
		});
	}

	const cacheKey = username.toLowerCase();
	const cached = contributionCache.get(cacheKey);

	if (cached && cached.expiresAt > Date.now()) {
		return jsonResponse(cached.payload, 200, SUCCESS_CACHE_CONTROL, 'HIT');
	}

	if (cached) {
		contributionCache.delete(cacheKey);
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

	try {
		const upstreamResponse = await fetch(`https://github.com/${encodeURIComponent(username)}.contribs`, {
			headers: {
				Accept: 'application/json',
				'User-Agent': 'mona-mayhem-contribs-proxy',
			},
			signal: controller.signal,
		});

		if (!upstreamResponse.ok) {
			if (upstreamResponse.status === 404) {
				return errorResponse(404, {
					error: 'not_found',
					message: 'GitHub user was not found.',
				});
			}

			if (upstreamResponse.status === 403 || upstreamResponse.status === 429) {
				console.warn(`[contributions-proxy] upstream rate-limited for ${cacheKey}`);
				return errorResponse(503, {
					error: 'upstream_unavailable',
					message: 'GitHub contribution service is temporarily unavailable.',
				});
			}

			console.warn(`[contributions-proxy] upstream status ${upstreamResponse.status} for ${cacheKey}`);
			return errorResponse(502, {
				error: 'bad_gateway',
				message: 'Failed to fetch contributions from GitHub.',
			});
		}

		let payload: unknown;

		try {
			payload = await upstreamResponse.json();
		} catch {
			console.warn(`[contributions-proxy] invalid upstream JSON for ${cacheKey}`);
			return errorResponse(502, {
				error: 'invalid_upstream_payload',
				message: 'GitHub returned an invalid response payload.',
			});
		}

		contributionCache.set(cacheKey, {
			payload,
			expiresAt: Date.now() + SUCCESS_TTL_MS,
		});

		return jsonResponse(payload, 200, SUCCESS_CACHE_CONTROL, 'MISS');
	} catch (error: unknown) {
		if (error instanceof DOMException && error.name === 'AbortError') {
			console.warn(`[contributions-proxy] upstream timeout for ${cacheKey}`);
			return errorResponse(504, {
				error: 'upstream_timeout',
				message: 'GitHub contribution service timed out.',
			});
		}

		console.warn(`[contributions-proxy] network error for ${cacheKey}`);
		return errorResponse(502, {
			error: 'bad_gateway',
			message: 'Could not reach GitHub contribution service.',
		});
	} finally {
		clearTimeout(timeout);
	}
};
