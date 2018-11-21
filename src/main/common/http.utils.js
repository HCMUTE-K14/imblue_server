const HttpUtils = {};

HttpUtils.getPagingInfoFromRequest = getPagingInfoFromRequest;

module.exports = HttpUtils;

function getPagingInfoFromRequest(req) {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    return { limit: parseInt(limit), page: parseInt(page) };
}