function BaseService(Model) {
    this.model = Model;

    this.findById = (id) => {
        return Model.findById(id);
    }

    this.list = (limit, page) => {
        return new Promise((resolve, reject) => {
            Model.find()
                .limit(limit)
                .skip(limit * page)
                .exec(function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        });
    }

    this.create = (data) => {
        let _model = new Model(data);
        return _model.save();
    }

    this.update = (id, data) => {
        return new Promise((resolve, reject) => {
            Model.findById(id, function(err, _model) {
                if (err) {
                    reject(err);
                };
                console.log(data);
                for (let i in data) {
                    console.log(data[i]);
                    _model[i] = data[i];
                }
                _model.save(function(err, updatedData) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(updatedData);
                    }
                });
            });
        })
    };

    this.removeById = (id) => {
        return new Promise((resolve, reject) => {
            Model.findOneAndDelete({ _id: id }, (err, data) => {
                if (err) {
                    reject(err);
                } else if (!data) {
                    reject(new Error('Data did not exist'));
                } else {
                    resolve();
                }
            });
        });
    }

    this.removeByIds = (ids) => {
        return new Promise((resolve, reject) => {
            Model.deleteMany({ _id: { $in: ids } }, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    this.removeAll = () => {
        return Model.deleteMany({});
    }

    this.deleteById = this.removeById;

    this.setSocketServer = (socket) => {
        this.socket = socket;
    }
}

module.exports = BaseService;