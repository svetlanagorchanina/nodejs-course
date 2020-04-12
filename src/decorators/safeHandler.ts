export async function safeHandler(callback, req, res, next) {
    try {
        await callback(req, res, next);
    } catch (error) {
        return next(error);
    }
}
