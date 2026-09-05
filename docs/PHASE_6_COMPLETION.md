# Phase 6: Content CRUD APIs — Completion Report

## Status: Complete

Phase 6 implements RESTful CRUD APIs for Services, Packages, Gallery entries, and Testimonials. Booking CRUD and dashboard data integration remain outside this phase.

## Architecture Summary

- **Routes:** Define public read endpoints and active-admin protected write endpoints.
- **Controllers:** Use a shared controller factory to return consistent JSON success responses and forward errors safely.
- **Services:** Encapsulate each resource’s database logic, relationships, and deletion rules.
- **Shared query utilities:** Provide bounded pagination, escaped text search, filter parsing, and allow-listed sorting for every list endpoint.
- **Validation middleware:** Rejects invalid ObjectIds, unsupported request fields, malformed request bodies, and invalid string-array fields before services run.

## API Endpoints

All list endpoints support `page`, `limit` (maximum 100), `search`, `sortBy`, and `sortOrder=asc|desc`. The available sort and filter fields are intentionally allow-listed per resource.

| Resource | Public endpoints | Admin-only endpoints |
| --- | --- | --- |
| Services | `GET /api/services`, `GET /api/services/:id` | `POST`, `PUT /:id`, `DELETE /:id` |
| Packages | `GET /api/packages`, `GET /api/packages/:id` | `POST`, `PUT /:id`, `DELETE /:id` |
| Gallery | `GET /api/gallery`, `GET /api/gallery/:id` | `POST`, `PUT /:id`, `DELETE /:id` |
| Testimonials | `GET /api/testimonials`, `GET /api/testimonials/:id` | `POST`, `PUT /:id`, `DELETE /:id` |

### Resource Filters

- Services: `category`, `availability`
- Packages: `serviceId`, `tier`, `availability`
- Gallery: `category`, `featured`
- Testimonials: `serviceId`, `rating`, `featured`, `isVerified`

Public read endpoints return active content only. Protected writes require the Phase 4 JWT cookie/session and an active administrator record.

## Validation and Error Handling

- Existing Mongoose schema validation handles required fields, enum values, lengths, numeric ranges, unique service names, and relationships.
- Request validation permits only documented model fields and validates required create fields.
- Packages validate their linked Service; Testimonials validate linked User, Service, and optional Booking references.
- Deleting a Service that still has Packages is prevented with a `409 Conflict` response.
- Errors are consistent JSON responses. Mongoose validation/cast errors map to `400`, duplicates map to `409`, and unexpected production errors are not exposed.

## Files Created

- `server/src/middleware/validateRequest.js`
- `server/src/utils/queryFeatures.js`
- `server/src/services/resourceService.js`
- `server/src/controllers/resourceController.js`

## Files Modified

- `server/src/server.js`
- `server/src/middleware/errorHandler.js`
- `server/src/routes/serviceRoutes.js`
- `server/src/routes/packageRoutes.js`
- `server/src/routes/galleryRoutes.js`
- `server/src/routes/testimonialRoutes.js`
- `server/src/controllers/serviceController.js`
- `server/src/controllers/packageController.js`
- `server/src/controllers/galleryController.js`
- `server/src/controllers/testimonialController.js`
- `server/src/services/serviceService.js`
- `server/src/services/packageService.js`
- `server/src/services/galleryService.js`
- `server/src/services/testimonialService.js`

## Verification

- All server JavaScript modules passed `node --check`.
- Query parser smoke check passed for bounded pagination, boolean filtering, and allow-listed sorting.
- Client production build passed (`npm run build`).
- Client lint passed (`npm run lint`).
- No frontend/backend separation violations or duplicate resource modules were introduced.

## Suggested Git Commit

`feat: add protected content CRUD APIs`

Phase 6 is complete. Await approval before beginning the next phase.
