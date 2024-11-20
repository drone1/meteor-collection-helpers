Mongo.Collection.prototype.helpers = function(helpers) {
  var self = this;

  if (self._transform && ! self._helpers)
    throw new Meteor.Error("Can't apply helpers to '" +
      self._name + "' a transform function already exists!");

  if (! self._helpers) {
    self._helpers = function Document(doc) { return Object.assign(this, doc); };
    self._transform = function(doc) {
      return new self._helpers(doc);
    };
  }

  Object.keys(helpers).forEach(function(helper, key) {
    self._helpers.prototype[key] = helper;
  });
};
