var path = require('path');

var app = require(path.resolve(__dirname, '../server'));

var NcUser = app.models.NcUser;
var NcRole = app.models.NcRole;
var RoleMapping = app.models.RoleMapping;

NcUser.create([
    {username: 'John', email: 'john@doe.com', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
], function(err, users) {
    if (err) return console.log('%j', err);

    // Create the admin role
    NcRole.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return console.log(err);
      console.log(role);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) return console.log(err);
        console.log(principal);
      });
    });
  });
