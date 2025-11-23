// Utils Barrel Export

// TODO deleted empty businessTracker.ts file
// Conditional exports - only if files exist
// export * from './api.server'; //TODO: I dont think this is being used - consider removing
// export * from './auth.server'; //TODO deleted auth.server.ts file
export { clientErrorHandler } from "./clientErrorHandler";
// export * from './csrf.server'; // TODO this is useful, but needs attention - missing remix reference.
export * from "./date";
export * from "./enums";
export * from "./env.server";
export * from "./error";
export * from "./exam"; // TODO this has been temporarily fixed*
export * from "./fileDownload"; //TODO: need to work on a robust download utility system.
// export * from './honeypot.server';// TODO same as csrf.server.ts comment above - missing remix reference.
//TODO: export * from "./http";
export * from "./session.server"; // TODO: will tie into  milestone implementation of sign-in auth - TBD
export * from "./site"; // TODO: maintain these useful functions here, with credit to epic-web institution (Kent C. Dodds et al)
export * from "./suspense-fetcher";
export * from "./theme.server"; // TODO: maintain these useful functions here, with credit to epic-web institution (Kent C. Dodds et al)
export * from "./toast.server"; // TODO: maintain these useful functions here, with credit to epic-web institution (Kent C. Dodds et al)
export * from "./user"; // TODO: milestone implementation of sign-in auth - TBD
export * from "./user-validation"; // TODO: milestone implementation of sign-in auth - TBD
