import { test } from '@japa/runner'

test('get record fight page test', async ({ client }) => {
  const response = await client.get('/record').send()
  response.assertStatus(200)
})

