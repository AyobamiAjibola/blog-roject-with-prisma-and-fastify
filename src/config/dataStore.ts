// import settings from './settings';

// interface Options {
//   flush?: boolean;
// }

// const dataStore = {
//   init(options?: Options) {
//     const client = new Redis({
//       host: `${config.host}`,
//       username: `${config.username}`,
//       password: config.password,
//       db: +config.database,
//     });

//     if (options?.flush) client.flushdb();

//     return client;
//   },

//   async set(key: string, value: string) {
//     const client = this.init();

//     return client.set(key, value);
//   },

//   async get(key: string) {
//     const client = this.init();
//     return client.get(key);
//   },

//   async del(key: string) {
//     const client = this.init();
//     return client.del(key);
//   },

//   client() {
//     return this.init();
//   },

//   async close() {
//     return this.init().disconnect();
//   },
// };

// export default dataStore;
