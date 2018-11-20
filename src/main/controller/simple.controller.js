module.exports = (Service) => {
    let SimpleController = {};

    SimpleController.create = (data, successProcessor, errorProcessor) => {
        Service.create(data)
            .then(data => {
                successProcessor(data);
            })
            .catch(err => {
                errorProcessor(err);
            });
    }
    SimpleController.update = (data, successProcessor, errorProcessor) => {
        Service.update(data.id, data.body)
            .then(data => {
                successProcessor(data);
            })
            .catch(err => {
                errorProcessor(err);
            });
    }
    SimpleController.delete = (id, successProcessor, errorProcessor) => {
        Service.removeById(id)
            .then(data => {
                successProcessor(data);
            })
            .catch(err => {
                errorProcessor(err);
            });
    }
    SimpleController.bulkDelete = (ids, successProcessor, errorProcessor) => {
        Service.removeByIds(ids)
            .then(data => {
                successProcessor(data);
            })
            .catch(err => {
                errorProcessor(err);
            });
    }
    SimpleController.list = (pagingInfo, successProcessor, errorProcessor) => {
        Service.list(pagingInfo.limit, pagingInfo.page)
            .then(data => {
                successProcessor(data);
            })
            .catch(err => {
                errorProcessor(err);
            });
    }
}