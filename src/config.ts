import { registerAs } from '@nestjs/config';

export const DbConfig = registerAs('db', () => ({
  prodBranchUrl: 'mysql://admin:UfntxUEd@mysql-133270-0.cloudclusters.net:15439/new',
  devBranchUrl: 'mysql://admin:UfntxUEd@mysql-133270-0.cloudclusters.net:15439/new',
}));
