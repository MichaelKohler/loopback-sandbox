var _ = require('lodash');

module.exports = function(NcUser) {
    NcUser.observe('after save', function(ctx, next) {
      if (ctx.isNewInstance || _.isUndefined(ctx.instance.userId)) {
        var id = ctx.instance.id.toString();
        ctx.instance.userId = id;
        ctx.instance.updateAttributes(ctx.instance, function(err, result) {
          if (err) return next(err);

          return next();
        });
      } else {
        next();
      }
    });
};
