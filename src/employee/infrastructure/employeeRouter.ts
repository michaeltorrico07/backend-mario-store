import { Router } from 'express'
import { EmployeeController } from './employeeController'

const router = Router()
const controller = new EmployeeController()

router.post('/', controller.createEmployee)

export default router
