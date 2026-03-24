## Backend Readiness Checklist

## 1. Build and quality

    •	npx tsc -b ../../shared
    •	npx tsc --noEmit
    •	npx tsc -b
    •	npm run lint

## 2. Server startup

    •	dev server starts without crash
    •	Mongo connects
    •	Redis connects
    •	Swagger opens at /docs

## 3. Public API smoke

    •	GET /api/health
    •	GET /api/products
    •	GET /api/products/search?q=test
    •	GET /api/categories
    •	GET /api/banners?placement=home-hero
    •	GET /api/product-filters
    •	GET /api/reviews/product/:productId
    •	GET /api/search?q=test

## 4. Auth

    •	POST /api/auth/register
    •	POST /api/auth/login
    •	GET /api/auth/me
    •	POST /api/auth/logout

## Already completed

    •	auth hardening
    •	refresh rotation
    •	reuse detection
    •	revoke session by id

## 5. Protected user endpoints

    •	GET /api/cart returns 401 without auth
    •	GET /api/cart works with auth
    •	GET /api/wishlist returns 401 without auth
    •	GET /api/wishlist works with auth
    •	GET /api/orders works with auth
    •	GET /api/recently-viewed works with auth

## 6. Public forms

    •	POST /api/cooperation
    •	POST /api/consultations

## 7. Analytics

    •	POST /api/analytics
    •	GET /api/admin/analytics returns 401 without auth
    •	GET /api/admin/analytics returns 403 for non-admin
    •	GET /api/admin/analytics works with admin

## 8. Error handling

    •	errors return JSON
    •	forbidden returns { code: "FORBIDDEN", kind: "FORBIDDEN" }
    •	unauthorized returns { code: "AUTH_UNAUTHORIZED", kind: "UNAUTHORIZED" }

## 9. Admin API smoke

    •	GET /api/admin/products works with admin
    •	GET /api/admin/orders works with admin
    •	GET /api/admin/users works with admin

## 10. Admin controller autotests

    •	admin banner controller tests
    •	admin categories controller tests
    •	admin orders controller tests
    •	admin products controller tests
    •	admin reviews controller tests
    •	admin users controller tests
    •	auth/admin middleware mocked correctly in admin tests
    •	vitest run passes
    •	all backend tests green (52 passed / 52)

## 11. Admin CRUD smoke

    •	admin products create smoke
    •	admin products update smoke
    •	admin products delete smoke
    •	admin categories create smoke
    •	admin categories update smoke
    •	admin categories delete smoke
    •	admin users role update smoke
    •	admin users delete smoke
    •	admin banners list smoke
    •	admin orders list/read/status smoke
    •	admin reviews list/read/status/delete smoke

## 12. Seed and dev scripts

    •	full seed script created
    •	admin seed script created
    •	categories seed script created
    •	products seed script created
    •	banners seed script created
    •	reviews seed script created
    •	orders seed script created
    •	dev database reset script created

## Package scripts added

    •	npm run seed
    •	npm run seed:dev
    •	npm run seed:fresh
    •	npm run db:reset

## 13. Seed data coverage

    •	admin user seeded
    •	base categories seeded
    •	demo products seeded
    •	demo banners seeded
    •	demo reviews seeded
    •	demo orders seeded

## 14. Seed verification

    •	npm run seed executes successfully
    •	seed connects to Mongo
    •	seed clears database
    •	seed inserts admin/categories/products/banners/reviews/orders
    •	seed prints admin credentials
    •	seed disconnects cleanly

## 15. Production readiness — already completed

    •	rate limit
    •	tests
    •	CI
    •	Swagger
    •	env validation
    •	security / config audit

## 16. Docker / deploy prep — already completed

    •	backend Dockerfile prepared
    •	.dockerignore prepared
    •	docker-compose.yml prepared
    •	.env.docker prepared
    •	backend image builds successfully
    •	backend container starts successfully
    •	GET /api/health works in container (7184)
    •	Mongo Atlas reachable from container
    •	Redis reachable from container

## 17. Monitoring / alerts baseline — already completed

    •	structured logs
    •	request logging
    •	request context / requestId
    •	graceful shutdown
    •	SIGINT / SIGTERM handling
    •	uncaughtException handling
    •	unhandledRejection handling
    •	shutdown timeout
    •	health includes Mongo
    •	health includes Redis

## Notes

    •	admin test strategy switched from real auth/db path to middleware mocking
    •	mocked middleware now sets req.userId and req.userRole
    •	category seed/product seed/order seed adjusted to match real Mongoose schemas
    •	dev flow for manual admin/frontend checks is now ready

## Next logical step

    •	backend cleanup / consistency pass
    •	backup / migration discipline
