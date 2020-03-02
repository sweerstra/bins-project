export const libraries = [
  {
    name: 'Lodash',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js'
  },
  {
    name: 'jQuery',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
  },
  {
    name: 'Moment.js',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js'
  },
  {
    name: 'date-fns',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.29.0/date_fns.min.js'
  }
];

export const settings = {
  consoles: {
    label: 'Consoles to use',
    enabled: true,
    values: {
      log: true,
      error: true,
      warn: false
    }
  }
};
