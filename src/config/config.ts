export default {
    port: process.env.PORT || 3000,
    folderStorage: process.env.URL_STORAGE || 'app/src/storage',
    pictureQuality: process.env.PICTURE_QUALITY || 80,
    secretyKey: process.env.SECRETYKEY || '0903a002-05d2-46ba-9512-d17f242fedaa',
    publicRoutes: process.env.PUBLICROUTES || [
        'users/create',
        'users/auth',
        '/customer/create',
    ]
}