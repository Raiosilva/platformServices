export default {
    port: process.env.PORT || 3000,
    secretyKey: process.env.SECRETYKEY || '0903a002-05d2-46ba-9512-d17f242fedaa',
    publicRoutes: process.env.PUBLICROUTES || [
        'user/create',
        'user/auth',
        '/customer/create',
    ]
}