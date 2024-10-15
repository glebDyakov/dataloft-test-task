import { createMemoryHistory, createRouter } from 'vue-router'

const routes = []

const router = createRouter({ routes, history: createMemoryHistory() })
export default router