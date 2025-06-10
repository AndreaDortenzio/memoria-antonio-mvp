import handler from '../pages/api/chatgpt'
import { createMocks } from 'node-mocks-http'

describe('POST /api/chatgpt', () => {
  it('returns 405 on GET', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await handler(req as any, res as any)
    expect(res._getStatusCode()).toBe(405)
  })
})
