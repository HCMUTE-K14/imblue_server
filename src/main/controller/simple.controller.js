const Log = require('../log')('SimpleController');

module.exports = (Service) => {
    let SimpleController = {};

    SimpleController.create = (payload, successProcessor, errorProcessor) => {
        Service.create(payload)
            .then(data => {
                Log.info('create sucessfully: ' + payload);
                successProcessor(data);
            })
            .catch(err => {
                Log.error('create failed ' + err);
                errorProcessor(err);
            });
    }
    SimpleController.update = (data, successProcessor, errorProcessor) => {
        Service.update(data.id, data.body)
            .then(_data => {
                Log.info('update sucessfully: ' + data);
                successProcessor(_data);
            })
            .catch(err => {
                Log.error('update failed ' + err);
                errorProcessor(err);
            });
    }
    SimpleController.delete = (id, successProcessor, errorProcessor) => {
        Service.removeById(id)
            .then(data => {
                Log.info('delete sucessfully: ' + id);
                successProcessor(data);
            })
            .catch(err => {
                Log.error('delete failed ' + err);
                errorProcessor(err);
            });
    }
    SimpleController.bulkDelete = (ids, successProcessor, errorProcessor) => {
        Service.removeByIds(ids)
            .then(data => {
                Log.info('bulk delete sucessfully: ' + ids);
                successProcessor(data);
            })
            .catch(err => {
                Log.info('bulk delete failed: ' + err);
                errorProcessor(err);
            });
    }

    SimpleController.list = (pagingInfo, successProcessor, errorProcessor) => {
        Service.list(pagingInfo.limit, pagingInfo.page)
            .then(data => {
                Log.info('list sucessfully: ' + data);
                successProcessor(data);
            })
            .catch(err => {
                Log.error('list failed: ' + err);
                errorProcessor(err);
            });
    }

    SimpleController.findById = (id, successProcessor, errorProcessor) => {
        Service.findById(id)
            .then(data => {
                Log.info('findById sucessfully: ' + data);
                successProcessor(data);
            })
            .catch(err => {
                Log.error('findById failed: ' + err);
                errorProcessor(err);
            });
    }

    return SimpleController;
}