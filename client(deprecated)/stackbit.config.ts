import { defineStackbitConfig } from '@stackbit/types'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  nodeVersion: '18',
  contentSources: [
    /* ... */
  ],
  modelExtensions: [
    {
      name: 'page',
      type: 'page',
      urlPath: '/{slug}',
      fields: [
        {
          type: 'enum',
          name: 'width',
          label: 'Width',
          group: 'design',
          controlType: 'button-group',
          options: [
            { label: 'Narrow', value: 'narrow' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full', value: 'full' },
          ],
        },
      ],
    },
  ],
  // other properties ...
  // ...
})
